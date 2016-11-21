import moment from "moment";
import { SEARCH_OCCUPATION } from '../constants/API_URIs';

export default function searchOccupations({data, onRequest, onSucces, onFail}) {
    let searchGetParams = "?" +
        "searchType=" + data.searchType +
        "&occupGroupVal=" + (data.occupGroupVal || "") +
        "&searchText=" + data.searchText +
        "&searchTags=" + data.searchTags +
        "&inKpi=" + data.inKpi +
        "&searchTags=" + data.searchTags +
        "&startFrom=" + (data.startFrom && moment(data.startFrom).format("YYYY-MM-DD") || "") +
        "&startTo=" + (data.startTo && moment(data.startTo).format("YYYY-MM-DD") || "") +
        "&stopFrom=" + (data.stopFrom && moment(data.stopFrom).format("YYYY-MM-DD") || "") +
        "&stopTo=" + (data.stopTo && moment(data.stopTo).format("YYYY-MM-DD") || "");

    onRequest(data, searchGetParams);

    return fetch(SEARCH_OCCUPATION + searchGetParams, {
        credentials: 'include',
        mode: 'cors',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            //'X-CSRFToken': CSRF_TOKEN
        }
    })
        .then((response) => {
            //перевіряємо щоб сервер повернув JSON з інформацією про помилку
            var contentType = response.headers.get("content-type");
            if (response.status == 200 || response.status == 400) {
                if (contentType && contentType.indexOf("application/json") !== -1)
                    return response.json();
                else
                    throw {_error: 'Отримано некоректну відповідь із результатами пошуку від сервера: очікувався JSON'}
            }
            else if (response.status === 404)
                throw( {_error: 'Не знайдено відповідного методу на сервері!'} );
            else if (499 < response.status && response.status < 600)
                throw( {_error: `Сталася помилка ${response.status} на сервері!`} );
            else
                throw( {_error: 'Сталася невідома помилка при пошуку посад!'} );
        })
        .then(json => {
            if (json && json.foundOccupations)
                return onSucces(json.foundOccupations, searchGetParams);

            // here I expect that the server will return
            // { _error: 'Some error text' }
            else if (json && json._error)
                throw json;
            else
                throw ( {_error: 'Отримано некоректний результат від сервера'} );
        })
        .catch(error => {
            let errorText = error && error._error || 'Сталася невідома помилка при пошуку посад!';
            return onFail(errorText);
        });
}

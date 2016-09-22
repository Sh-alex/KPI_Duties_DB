import moment from "moment";
import { SEARCH_OCCUPATION } from '../constants/API_URIs';

export default function searchOccupations({data, onRequest, onSucces, onFail}) {
    let searchGetParams = "?" +
        "searchType=" + data.searchType +
        "&occupGroupVal=" + data.occupGroupVal +
        "&searchText=" + data.searchText +
        "&searchTags=" + data.searchTags;
    if(data.creatingInStateDate)
        searchGetParams += "" +
            "&creatingInStateDate_from=" + (data.creatingInStateDate.from && moment(data.creatingInStateDate.from).format("YYYY-MM-DD")) +
            "&creatingInStateDate_to=" + (data.creatingInStateDate.to && moment(data.creatingInStateDate.to).format("YYYY-MM-DD"));
    if(data.creatingInKPIDate)
        searchGetParams += "" +
            "&creatingInKPIDate_from=" + (data.creatingInKPIDate.from && moment(data.creatingInKPIDate.from).format("YYYY-MM-DD")) +
            "&creatingInKPIDate_to=" + (data.creatingInKPIDate.to && moment(data.creatingInKPIDate.to).format("YYYY-MM-DD"));
    if(data.cancelingInStateDate)
        searchGetParams += "" +
            "&cancelingInStateDate_from=" + (data.cancelingInStateDate.from && new Date(data.cancelingInStateDate.from).format("YYYY-MM-DD")) +
            "&cancelingInStateDate_to=" + (data.cancelingInStateDate.to && moment(data.cancelingInStateDate.to).format("YYYY-MM-DD"));
    if(data.cancelingInKPIDate)
        searchGetParams += "" +
            "&cancelingInKPIDate_from=" + (data.cancelingInKPIDate.from && moment(data.cancelingInKPIDate.from).format("YYYY-MM-DD")) +
            "&cancelingInKPIDate_to=" + (data.cancelingInKPIDate.to && moment(data.cancelingInKPIDate.to).format("YYYY-MM-DD"));

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

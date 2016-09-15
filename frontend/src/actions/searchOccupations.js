import { SEARCH_OCCUPATION } from '../constants/API_URIs';

export default function searchOccupations({data, onRequest, onSucces, onFail}) {
    let searchGetParams = "?" +
        "searchType=" + data.searchType +
        "&occupGroupVal=" + data.occupGroupVal +
        "&searchText=" + data.searchText +
        "&searchTags=" + data.searchTags;
    if(data.creatingInStateDate)
        searchGetParams += "&creatingInStateDate_takeIntoAccount=" + data.creatingInStateDate.takeIntoAccount +
            "&creatingInStateDate_from=" + data.creatingInStateDate.from +
            "&creatingInStateDate_to=" + data.creatingInStateDate.to;
    if(data.creatingInKPIDate)
        searchGetParams += "&creatingInKPIDate_takeIntoAccount=" + data.creatingInKPIDate.takeIntoAccount +
            "&creatingInKPIDate_from=" + data.creatingInKPIDate.from +
            "&creatingInKPIDate_to=" + data.creatingInKPIDate.to;
    if(data.cancelingInStateDate)
        searchGetParams += "&cancelingInStateDate_takeIntoAccount=" + data.cancelingInStateDate.takeIntoAccount +
            "&cancelingInStateDate_from=" + data.cancelingInStateDate.from +
            "&cancelingInStateDate_to=" + data.cancelingInStateDate.to;
    if(data.cancelingInKPIDate)
        searchGetParams += "&cancelingInKPIDate_takeIntoAccount=" + data.cancelingInKPIDate.takeIntoAccount +
            "&cancelingInKPIDate_from=" + data.cancelingInKPIDate.from +
            "&cancelingInKPIDate_to=" + data.cancelingInKPIDate.to;

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

import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import classNames from "classnames"

import SearchOccupBoxResTblRowDetails from "../SearchOccupBoxResTblRowDetails"
import SearchOccupBoxResTblRowShort from "../SearchOccupBoxResTblRowShort"

import {
    SORT_ASC,
    SORT_DESC,

    OCCUPATION_GROUP,
    OCCUPATION_NAME,
    START_IN_KPI_DATE,
    STOP_IN_KPI_DATE,
    START_IN_STATE_DATE,
    STOP_IN_STATE_DATE
} from "../../utils/sortSearchResData"

import "./styles.less";


function bindOnEditItem(onEditItem, itemData) {
    return () => onEditItem(itemData)
}

function bindOnDeleteItem(onDeleteItem, itemId) {
    return () => onDeleteItem(itemId)
}

function bindOnExpandItem(onToggleExpandItem, itemId) {
    return () => onToggleExpandItem(itemId)
}

export default function SearchOccupBoxResTbl(props) {
    let tblRows;
    try {
        tblRows = props.searchResData.itemsList.map( (itemId, itemIndex) => {
            return [
                <SearchOccupBoxResTblRowShort
                    occupationGroupList={props.occupationGroupList}
                    clarifiedOccupationList={props.clarifiedOccupationList}
                    clarificationList={props.clarificationList}
                    key={itemId+"_0"}
                    itemIndex={itemIndex + props.tblStartIndex}
                    data={props.searchResData.itemsById[itemId].data}
                    onEditItem={bindOnEditItem(props.onEditItem, props.searchResData.itemsById[itemId])}
                    onDeleteItem={bindOnDeleteItem(props.onDeleteItem, itemId)}
                    onToggleExpandItem={bindOnExpandItem(props.onToggleExpandItem, itemId)}
                    isExpanded={props.expandedItems[itemId]}
                    showDelSpinner={props.isDeletingOccupation && (props.deletingItem === itemId)}
                />,
                <SearchOccupBoxResTblRowDetails
                    occupationGroupList={props.occupationGroupList}
                    clarifiedOccupationList={props.clarifiedOccupationList}
                    clarificationList={props.clarificationList}
                    key={itemId+"_1"}
                    itemIndex={itemIndex}
                    data={props.searchResData.itemsById[itemId].data}
                    isExpanded={props.expandedItems[itemId]}
                />
            ];
        });
    } catch(err) {
        console.error(err);
        tblRows = (
            <tr colSpan="100" className="text-center">
                <td>
                    <Alert bsStyle="danger">
                        <p> Сталася помилка при побудові таблиці з результатами пошуку </p>
                    </Alert>
                </td>
            </tr>
        );
    }

    let occupGroupClass = classNames({
            "th-sorting": true,
            "sorting": props.sortField != OCCUPATION_GROUP,
            "sorting_asc": props.sortField == OCCUPATION_GROUP && props.sortDirection == SORT_ASC,
            "sorting_desc": props.sortField == OCCUPATION_GROUP && props.sortDirection == SORT_DESC
        }),
        occupNameClass = classNames({
            "th-sorting": true,
            "sorting": props.sortField != OCCUPATION_NAME,
            "sorting_asc": props.sortField == OCCUPATION_NAME && props.sortDirection == SORT_ASC,
            "sorting_desc": props.sortField == OCCUPATION_NAME && props.sortDirection == SORT_DESC
        }),
        startInStateClass = classNames({
            "th-sorting": true,
            "sorting": props.sortField != START_IN_STATE_DATE,
            "sorting_asc": props.sortField == START_IN_STATE_DATE && props.sortDirection == SORT_ASC,
            "sorting_desc": props.sortField == START_IN_STATE_DATE && props.sortDirection == SORT_DESC
        }),
        stopInStateClass = classNames({
            "th-sorting": true,
            "sorting": props.sortField != STOP_IN_STATE_DATE,
            "sorting_asc": props.sortField == STOP_IN_STATE_DATE && props.sortDirection == SORT_ASC,
            "sorting_desc": props.sortField == STOP_IN_STATE_DATE && props.sortDirection == SORT_DESC
        }),
        startInKPIClass = classNames({
            "th-sorting": true,
            "sorting": props.sortField != START_IN_KPI_DATE,
            "sorting_asc": props.sortField == START_IN_KPI_DATE && props.sortDirection == SORT_ASC,
            "sorting_desc": props.sortField == START_IN_KPI_DATE && props.sortDirection == SORT_DESC
        }),
        stopInKPIClass = classNames({
            "th-sorting": true,
            "sorting": props.sortField != STOP_IN_KPI_DATE,
            "sorting_asc": props.sortField == STOP_IN_KPI_DATE && props.sortDirection == SORT_ASC,
            "sorting_desc": props.sortField == STOP_IN_KPI_DATE && props.sortDirection == SORT_DESC
        });

    return (
        <div className="table-responsive">
            <table className="table table-hover table-condensed occup-table search-res-table">
                <thead>
                <tr>
                    <th title="Номер в списку">
                        №
                    </th>
                    <th className={occupGroupClass} onClick={() => props.triggerSorting(OCCUPATION_GROUP)} >
                        Посадовий склад
                    </th>
                    <th className={occupNameClass} onClick={() => props.triggerSorting(OCCUPATION_NAME)} >
                        Назва посади
                    </th>
                    <th className={startInStateClass} onClick={() => props.triggerSorting(START_IN_STATE_DATE)} title="Дата створення посади в державі">
                        Створено в державі
                    </th>
                    <th className={stopInStateClass} onClick={() => props.triggerSorting(STOP_IN_STATE_DATE)} title="Дата відміни посади в державі">
                        Відмінено в державі
                    </th>
                    <th className={startInKPIClass} onClick={() => props.triggerSorting(START_IN_KPI_DATE)} title="Дата створення посади в КПІ">
                        Створено в КПІ
                    </th>
                    <th className={stopInKPIClass} onClick={() => props.triggerSorting(STOP_IN_KPI_DATE)} title="Дата відміни посади в КПІ">
                        Відмінено в КПІ
                    </th>
                    <th> Дії </th>
                </tr>
                </thead>
                <tbody>
                    {tblRows}
                </tbody>
            </table>
        </div>
    )
}

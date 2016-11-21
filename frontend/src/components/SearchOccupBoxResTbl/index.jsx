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

    let msgSortingIsEmpty = "Сортування по полю вимкнено. Клікніть для перемикання сортування",
        msgSortingAsc = "Включено сортування по зростанню. Клікніть для перемикання сортування",
        msgSortingDesc = "Включено сортування по спаданню. Клікніть для перемикання сортування",
        classSortingIsEmpty = "th-sorting sorting",
        classSortingAsc = "th-sorting sorting_asc",
        classSortingDesc = "th-sorting sorting_desc",
        occupGroupTitle,
        occupNameTitle,
        startInStateTitle,
        stopInStateTitle,
        startInKPITitle,
        stopInKPITitle,
        occupGroupClass,
        occupNameClass,
        startInStateClass,
        stopInStateClass,
        startInKPIClass,
        stopInKPIClass;

    if(props.sortField != OCCUPATION_GROUP) {
        occupGroupClass = classSortingIsEmpty;
        occupGroupTitle = msgSortingIsEmpty;
    }
    if(props.sortField == OCCUPATION_GROUP && props.sortDirection == SORT_ASC) {
        occupGroupClass = classSortingAsc;
        occupGroupTitle = msgSortingAsc;
    }
    if(props.sortField == OCCUPATION_GROUP && props.sortDirection == SORT_DESC) {
        occupGroupClass = classSortingDesc;
        occupGroupTitle = msgSortingDesc;
    }

    if(props.sortField != OCCUPATION_NAME) {
        occupNameClass = classSortingIsEmpty;
        occupNameTitle = msgSortingIsEmpty;
    }
    if(props.sortField == OCCUPATION_NAME && props.sortDirection == SORT_ASC) {
        occupNameClass = classSortingAsc;
        occupNameTitle = msgSortingAsc;
    }
    if(props.sortField == OCCUPATION_NAME && props.sortDirection == SORT_DESC) {
        occupNameClass = classSortingDesc;
        occupNameTitle = msgSortingDesc;
    }

    if(props.sortField != START_IN_STATE_DATE) {
        startInStateClass = classSortingIsEmpty;
        startInStateTitle = msgSortingIsEmpty;
    }
    if(props.sortField == START_IN_STATE_DATE && props.sortDirection == SORT_ASC) {
        startInStateClass = classSortingAsc;
        startInStateTitle = msgSortingAsc;
    }
    if(props.sortField == START_IN_STATE_DATE && props.sortDirection == SORT_DESC) {
        startInStateClass = classSortingDesc;
        startInStateTitle = msgSortingDesc;
    }

    if(props.sortField != STOP_IN_STATE_DATE) {
        stopInStateClass = classSortingIsEmpty;
        stopInStateTitle = msgSortingIsEmpty;
    }
    if(props.sortField == STOP_IN_STATE_DATE && props.sortDirection == SORT_ASC) {
        stopInStateClass = classSortingAsc;
        stopInStateTitle = msgSortingAsc;
    }
    if(props.sortField == STOP_IN_STATE_DATE && props.sortDirection == SORT_DESC) {
        stopInStateClass = classSortingDesc;
        stopInStateTitle = msgSortingDesc;
    }

    if(props.sortField != START_IN_KPI_DATE) {
        startInKPIClass = classSortingIsEmpty;
        startInKPITitle = msgSortingIsEmpty;
    }
    if(props.sortField == START_IN_KPI_DATE && props.sortDirection == SORT_ASC) {
        startInKPIClass = classSortingAsc;
        startInKPITitle = msgSortingAsc;
    }
    if(props.sortField == START_IN_KPI_DATE && props.sortDirection == SORT_DESC) {
        startInKPIClass = classSortingDesc;
        startInKPITitle = msgSortingDesc;
    }

    if(props.sortField != STOP_IN_KPI_DATE) {
        stopInKPIClass = classSortingIsEmpty;
        stopInKPITitle = msgSortingIsEmpty;
    }
    if(props.sortField == STOP_IN_KPI_DATE && props.sortDirection == SORT_ASC) {
        stopInKPIClass = classSortingAsc;
        stopInKPITitle = msgSortingAsc;
    }
    if(props.sortField == STOP_IN_KPI_DATE && props.sortDirection == SORT_DESC) {
        stopInKPIClass = classSortingDesc;
        stopInKPITitle = msgSortingDesc;
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover table-condensed occup-table search-res-table">
                <thead>
                <tr>
                    <th title="Номер в списку">
                        №
                    </th>
                    <th
                        className={occupGroupClass}
                        onClick={() => props.triggerSorting(OCCUPATION_GROUP)}
                        title={occupGroupTitle} >
                        Посадовий склад
                    </th>
                    <th
                        className={occupNameClass}
                        onClick={() => props.triggerSorting(OCCUPATION_NAME)}
                        title={occupNameTitle} >
                        Назва посади
                    </th>
                    <th
                        className={startInStateClass}
                        onClick={() => props.triggerSorting(START_IN_STATE_DATE)}
                        title={startInStateTitle} >
                        Створено в державі
                    </th>
                    <th
                        className={stopInStateClass}
                        onClick={() => props.triggerSorting(STOP_IN_STATE_DATE)}
                        title={stopInStateTitle} >
                        Відмінено в державі
                    </th>
                    <th
                        className={startInKPIClass}
                        onClick={() => props.triggerSorting(START_IN_KPI_DATE)}
                        title={startInKPITitle} >
                        Створено в КПІ
                    </th>
                    <th
                        className={stopInKPIClass}
                        onClick={() => props.triggerSorting(STOP_IN_KPI_DATE)}
                        title={stopInKPITitle} >
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

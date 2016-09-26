import React, {Component} from "react";
import {Alert} from 'react-bootstrap'

import SearchOccupBoxResTblRowDetails from "../SearchOccupBoxResTblRowDetails"
import SearchOccupBoxResTblRowShort from "../SearchOccupBoxResTblRowShort"

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
                    key={itemId+"_0"}
                    itemIndex={itemIndex}
                    data={props.searchResData.itemsById[itemId].data}
                    onEditItem={bindOnEditItem(props.onEditItem, props.searchResData.itemsById[itemId])}
                    onDeleteItem={bindOnDeleteItem(props.onDeleteItem, itemId)}
                    onToggleExpandItem={bindOnExpandItem(props.onToggleExpandItem, itemId)}
                    isExpanded={props.expandedItems[itemId]}
                    showDelSpinner={props.isDeletingOccupation && (props.deletingItem === itemId)}
                />,
                <SearchOccupBoxResTblRowDetails
                    key={itemId+"_1"}
                    itemIndex={itemIndex}
                    data={props.searchResData.itemsById[itemId].data}
                    isExpanded={props.expandedItems[itemId]}
                />
            ];
            // return SearchOccupBoxResTblRow({
            //     key: itemId,
            //     itemIndex: itemIndex,
            //     data: props.searchResData.itemsById[itemId].data,
            //     onEditItem: bindOnEditItem(props.onEditItem, itemId, props.searchResData.itemsById[itemId].data),
            //     onDeleteItem: bindOnDeleteItem(props.onDeleteItem, itemId),
            //     onToggleExpandItem: bindOnExpandItem(props.onToggleExpandItem, itemId),
            //     isExpanded: props.expandedItems[itemId]
            // })
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
    /*
     sortDirection={this.state.sortDirection}
     sortField={this.state.sortField}
     */
    return (
        <div className="table-responsive">
            <table className="table table-hover table-condensed occup-table search-res-table">
                <thead>
                <tr>
                    <th title="Номер в списку"> № </th>
                    <th className="sorting"> Посадовий склад </th>
                    <th className="sorting_asc"> Назва посади </th>
                    <th className="sorting"> Є в КПІ </th>
                    <th className="sorting" title="Дата створення посади в державі"> Створено в державі </th>
                    <th className="sorting" title="Дата відміни посади в державі"> Відмінено в державі </th>
                    <th className="sorting" title="Дата створення посади в КПІ "> Створено в КПІ </th>
                    <th className="sorting" title="Дата відміни посади в КПІ"> Відмінено в КПІ </th>
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

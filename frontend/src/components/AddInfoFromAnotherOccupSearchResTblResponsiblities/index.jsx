import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import classNames from 'classnames'
import "./styles.less";

function bindHandleItemsSelect(itemId, itemIndex, portionIndex, props) {
    return () => {
        return props.onSelectItem({
            itemIndex,
            portionIndex,
            data: props.searchResData.itemsById[itemId].data.responsibilities[portionIndex]
        })
    }
}

function bindToggleExpandItem(itemIndex, portionIndex, props) {
    return () => {
        return props.onToggleExpandItem(itemIndex, portionIndex)
    }
}

export default function AddInfoFromAnotherOccupSearchResTblResponsiblities(props) {
    let tblRows;
    try {
        tblRows = !props.searchResData.itemsList.length ?
            (
                <tr colSpan="100" className="text-center">
                    <td>
                        <Alert bsStyle="warning alert-sm">
                            <p>
                                За вказаними критеріями не знайдено жодної посади.<br />
                                Спробуйте змінити критерії пошуку у формі.
                            </p>
                        </Alert>
                    </td>
                </tr>
            )
            :
            props.searchResData.itemsList.map( (itemId,itemIndex) => {
                return props.searchResData.itemsById[itemId].data.responsibilities.map((portion, portionIndex) => {
                    let itemIsExpanded = props.expandedItems[itemIndex+"_"+portionIndex],
                        itemIsSelected = (props.selectedItem.itemIndex == itemIndex) && (props.selectedItem.portionIndex == portionIndex),
                        bigTextCellClassName = classNames({
                            "search-similar-table__big-text-cell": true,
                            "search-similar-table__big-text-cell--expanded": itemIsExpanded
                        });

                    return (
                        <tr
                            onClick={bindHandleItemsSelect(itemId, itemIndex, portionIndex, props)}
                            key={itemIndex+"_"+portionIndex}
                        >
                            <td>
                                <input
                                    checked={itemIsSelected}
                                    type="radio"
                                    name="radio-selected-similar-occup"
                                    className="minimal" />
                            </td>
                            <td title="Номер в списку"> { itemIndex+1 } </td>
                            <td> { props.searchResData.itemsById[itemId].data.occupationName } </td>
                            <td> { props.searchResData.itemsById[itemId].data.inKPI ? "+" : "-"} </td>
                            <td className={bigTextCellClassName} >
                                {portion.text}
                            </td>
                            <td>
                                <a className="pull-right occup-table__btn-expand"
                                   href="javascript:void(0)"
                                   onClick={bindToggleExpandItem(itemIndex, portionIndex, props)}
                                   title="Переглянути деталі"
                                >
                                    {
                                        itemIsExpanded ?
                                            (<i className='fa fa-chevron-up' />) :
                                            (<i className="fa fa-chevron-down" />)
                                    }
                                </a>
                            </td>
                        </tr>
                    )
                })
            });
    } catch(err) {
        console.error(err);
        tblRows = (
            <tr colSpan="100" className="text-center">
                <Alert bsStyle="danger">
                    <p>
                        Сталася помилка при побутові таблиці з результатами пошуку
                    </p>
                </Alert>
            </tr>
        );
    }

    return (
        <table className="table table-hover occup-table search-similar-table">
            <thead>
            <tr>
                <th colSpan="2" title="Номер в списку"> № </th>
                <th> Назва посади </th>
                <th> Приналежн. до КПІ </th>
                <th colSpan="2"> Завдання, обов'язки та повноваження </th>
            </tr>
            </thead>
            <tbody>
            {tblRows}
            </tbody>
        </table>
    )
}


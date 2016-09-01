import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import "./styles.less";

function bindHandleItemsSelect(itemId, itemIndex, portionIndex, props) {
    return () => {
        return props.onSelectItem(
            itemIndex,
            props.searchResData.itemsById[itemId].data.responsibilities[portionIndex]
        )
    }
}

function bindToggleExpandItem(itemIndex, portionIndex, props) {
    return () => {
        return props.onToggleExpandItem(itemIndex, portionIndex)
    }
}

export default function AddInfoFromAnotherOccupSearchResTblCodes(props) {
    let tblRows;
    try {
        tblRows = !props.searchResData.itemsList.length ?
            (
                <tr colSpan="100">
                    <Alert bsStyle="warning">
                        <p>
                            За вказаними критеріями не знайдено жодної посади.<br />
                            Спробуйте змінити критерії пошуку у формі.
                        </p>
                    </Alert>
                </tr>
            )
            :
            props.searchResData.itemsList.map( (itemId,itemIndex) => {
                return props.searchResData.itemsById[itemId].data.responsibilities.map((portion, portionIndex) => {
                    return (
                        <tr onClick={bindHandleItemsSelect(itemId, itemIndex, portionIndex, props)} key={itemIndex+(itemIndex+1)*portionIndex}>
                            <td>
                                <input
                                    checked={props.selectedItemIndex == itemIndex}
                                    type="radio"
                                    name="radio-selected-similar-occup"
                                    className="minimal" />
                            </td>
                            <td title="Номер в списку"> { itemIndex+1 } </td>
                            <td> { props.searchResData.itemsById[itemId].data.occupationName } </td>
                            <td> { props.searchResData.itemsById[itemId].data.inKPI ? "+" : "-"} </td>
                            <td className="search-similar-table__big-text-cell search-similar-table__big-text-cell--expanded">
                                {portion.text}
                            </td>
                            <td>
                                <a className="pull-right occup-table__btn-expand"
                                   href="javascript:void(0)"
                                   onclick={bindToggleExpandItem(itemIndex, portionIndex)}
                                   title="Переглянути деталі"
                                >
                                    {
                                        props.expandedItems[itemIndex+(itemIndex+1)*portionIndex] ? (
                                            <i className='fa fa-chevron-up' />
                                        ) : (
                                            <i className="fa fa-chevron-down" aria-hidden="true" />
                                        )
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
            <tr colSpan="100">
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


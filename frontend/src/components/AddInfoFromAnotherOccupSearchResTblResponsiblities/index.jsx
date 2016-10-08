import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import classNames from 'classnames'
import "./styles.less";

function bindHandleItemsSelect(itemId, itemIndex, portionIndex, props) {
    return () => {
        let textData = props.searchResData.itemsById[itemId].data.responsibilities[portionIndex];
        return props.onSelectItem({
            itemIndex,
            portionIndex,
            data: {
                ...textData,
                //дописуємо у список використовуваних посад назву цієї посади, щоб коли додамо текст там вона теж показувалась
                usingOccupations: textData.usingOccupations.concat(props.searchResData.itemsById[itemId].data.occupationName)
            }
        })
    }
}

function bindToggleExpandItem(itemIndex, portionIndex, props) {
    return () => {
        return props.onToggleExpandItem(itemIndex, portionIndex)
    }
}

export default function AddInfoFromAnotherOccupSearchResTblResponsiblities(props) {
    let tbl,
        alert,
        tblRows;
    try {
        if(props.searchResData.itemsList.length) {
            tblRows = props.searchResData.itemsList.map((itemId, itemIndex) => {
                return props.searchResData.itemsById[itemId].data.responsibilities.map((portion, portionIndex) => {
                    let itemIsExpanded = props.expandedItems[itemIndex + "_" + portionIndex],
                        itemIsSelected = (props.selectedItem.itemIndex == itemIndex) && (props.selectedItem.portionIndex == portionIndex),
                        bigTextCellClassName = classNames({
                            "search-similar-table__big-text-cell": true,
                            "search-similar-table__big-text-cell--expanded": itemIsExpanded
                        });

                    return (
                        <tr
                            onClick={bindHandleItemsSelect(itemId, itemIndex, portionIndex, props)}
                            key={itemIndex + "_" + portionIndex}
                        >
                            <td>
                                <input
                                    checked={itemIsSelected}
                                    type="radio"
                                    name="radio-selected-similar-occup"
                                    className="minimal"/>
                            </td>
                            <td title="Номер в списку"> { itemIndex + 1 } </td>
                            <td> { props.searchResData.itemsById[itemId].data.occupationName } </td>
                            <td> { props.searchResData.itemsById[itemId].data.inKPI ? "+" : "-"} </td>
                            <td className={bigTextCellClassName}>
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
                                            (<i className='fa fa-chevron-up'/>) :
                                            (<i className="fa fa-chevron-down"/>)
                                    }
                                </a>
                            </td>
                        </tr>
                    )
                })
            });
            tbl = (
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
                    { tblRows }
                    </tbody>
                </table>
            );
        }
        else
            alert = (
                <Alert bsStyle="warning alert-sm alert--with-margin">
                    <p>
                        За вказаними критеріями не знайдено жодної посади.<br />
                        Спробуйте змінити критерії пошуку у формі.
                    </p>
                </Alert>
            );
    } catch(err) {
        console.error(err);
        alert = (
            <Alert bsStyle="danger alert-sm alert--with-margin">
                <p>
                    Сталася помилка при побутові таблиці з результатами пошуку
                </p>
            </Alert>
        );
    }

    return tbl || alert;
}


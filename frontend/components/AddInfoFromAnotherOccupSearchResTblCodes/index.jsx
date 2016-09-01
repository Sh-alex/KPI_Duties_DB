import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import "./styles.less";

function bindHandleItemsSelect(itemId, itemIndex, props) {
    return () => {
        return props.onSelectItem(
            itemIndex,
            props.searchResData.itemsById[itemId].data
        )
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
            : props.searchResData.itemsList.map( (itemId,itemIndex) => {
            if(!props.searchResData.itemsById[itemId].data.codes || !props.searchResData.itemsById[itemId].data.codes.length)
                return (
                    <tr >
                        <td>
                            <input disabled type="radio" name="radio-selected-similar-occup" className="minimal" key={itemIndex} />
                        </td>
                        <td title="Номер в списку"> { itemIndex+1 } </td>
                        <td> { props.searchResData.itemsById[itemId].data.occupationName } </td>
                        <td> { props.searchResData.itemsById[itemId].data.inKPI ? "+" : "-"} </td>
                        <td> - </td>
                        <td> - </td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                )
            else
                return (
                    <tr
                        key={itemIndex}
                        onClick={bindHandleItemsSelect(itemId, itemIndex, props)} 
                    >
                        <td>
                            <input
                                checked={props.selectedItemIndex == itemIndex}
                                type="radio"
                                name="radio-selected-similar-occup"
                                className="minimal"
                            />
                        </td>
                        <td title="Номер в списку"> { itemIndex+1 } </td>
                        <td> { props.searchResData.itemsById[itemId].data.occupationName } </td>
                        <td> { props.searchResData.itemsById[itemId].data.inKPI ? "+" : "-"} </td>
                        <td>
                            {
                                props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                    return portion.codeKP ? portion.codeKP.val + ",   " : "- ,   "
                                })
                            }
                        </td>
                        <td>
                            {
                                props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                    return portion.codeZKPPTR ? portion.codeZKPPTR.val + ",   " : "- ,   "
                                })
                            }
                        </td>
                        <td>
                            {
                                props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                    return portion.codeDKHP ? portion.codeDKHP.val + ",   " : "- ,   "
                                })
                            }
                        </td>
                        <td>
                            {
                                props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                    return portion.codeETDK ? portion.codeETDK.val + ",   " : "- ,   "
                                })/*.reduce(function (code, resArr) {
                             resArr.push(code, pu)
                             })*/
                            }
                        </td>
                    </tr>
                )
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
                <th> Код КП </th>
                <th> Код ЗКППТР </th>
                <th> Код ДКХП </th>
                <th> Код ЄТДК </th>
            </tr>
            </thead>
            <tbody>
            {tblRows}
            </tbody>
        </table>
    )
}

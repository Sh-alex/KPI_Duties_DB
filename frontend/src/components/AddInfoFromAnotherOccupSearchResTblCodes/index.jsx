import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import "./styles.less";

function bindHandleItemsSelect(itemId, itemIndex, props) {
    return () => {
        return props.onSelectItem({
            itemIndex,
            portionIndex: 0,
            data: props.searchResData.itemsById[itemId].data
        })
    }
}

export default function AddInfoFromAnotherOccupSearchResTblCodes(props) {
    let tbl,
        alert,
        tblRows;
    try {
        if(props.searchResData.itemsList.length) {
            tblRows = props.searchResData.itemsList.map( (itemId,itemIndex) => {
                if(!props.searchResData.itemsById[itemId].data.codes || !props.searchResData.itemsById[itemId].data.codes.length)
                    return (
                        <tr >
                            <td>
                                <input disabled type="radio" name="radio-selected-similar-occup" className="minimal" key={itemId} />
                            </td>
                            <td title="Номер в списку"> { props.tblStartIndex + itemIndex + 1 } </td>
                            <td> { props.searchResData.itemsById[itemId].data.occupationName } </td>
                            <td> { props.searchResData.itemsById[itemId].data.inKPI ? "+" : "-"} </td>
                            <td> - </td>
                            <td> - </td>
                            <td> - </td>
                            <td> - </td>
                        </tr>
                    );
                else
                    return (
                        <tr
                            key={itemId}
                            onClick={bindHandleItemsSelect(itemId, itemIndex, props)}
                        >
                            <td>
                                <input
                                    checked={props.selectedItem.itemIndex == itemIndex}
                                    type="radio"
                                    name="radio-selected-similar-occup"
                                    className="minimal"
                                />
                            </td>
                            <td title="Номер в списку"> { props.tblStartIndex + itemIndex + 1 } </td>
                            <td> { props.searchResData.itemsById[itemId].data.occupationName } </td>
                            <td> { props.searchResData.itemsById[itemId].data.inKPI ? "+" : "-"} </td>
                            <td>
                                {
                                    props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                        return portion.codeKP ? <div> {portion.codeKP.val} </div> : <div> - </div>
                                    })
                                }
                            </td>
                            <td>
                                {
                                    props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                        return portion.codeZKPPTR ? <div> {portion.codeZKPPTR.val} </div> : <div> - </div>
                                    })
                                }
                            </td>
                            <td>
                                {
                                    props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                        return portion.codeDKHP ? <div> {portion.codeDKHP.val} </div> : <div> - </div>
                                    })
                                }
                            </td>
                            <td>
                                {
                                    props.searchResData.itemsById[itemId].data.codes.map(portion => {
                                        return portion.codeETDK ? <div> {portion.codeETDK.val} </div> : <div> - </div>
                                    })
                                }
                            </td>
                        </tr>
                    )
            });
            tbl = (
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
                    { tblRows}
                    </tbody>
                </table>
            )
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

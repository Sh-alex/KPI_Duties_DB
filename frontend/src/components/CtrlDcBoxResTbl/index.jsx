import React, {Component} from "react";
import classNames from "classnames"
import "./styles.less";

import CtrlDcBoxResTblUsingOccupRow from "../CtrlDcBoxResTblUsingOccupRow"

function bindToggleExpandItemHandler(itemId, props) {
    return () => {
        return props.onToggleExpandItemClick(itemId)
    }
}
function bindToggleUsingOccupList(itemId, props) {
    return () => {
        return props.onToggleUsingOccupListBtnClick(itemId)
    }
}

function bindEditListItemHandler(itemId, itemVal, props) {
    return () => {
        return props.onEditListItemBtnClick(itemId, itemVal);
    }
}

function bindDelListItemHandler(itemId, itemVal, isUsedByOccup, props) {
    return () => {
        if(!isUsedByOccup)
            return props.onDelListItemBtnClick(itemId, itemVal);
    }
}

export default function CtrlDcBoxResTbl(props) {
    let tblRows = props.listDataItems.map((item, itemIndex) => {
        let isUsedByOccup = item.usingOccupations && item.usingOccupations.length,
            isNowDeletingThisItem = props.deletingItemId === item.id,
            infoRowIsExpanded = props.shownOccupDescrTextsList && props.expandedItems[item.id],
            showUsingOccupRow = isUsedByOccup && props.shownUsingOccupRows[item.id],
            btnUsingOccupClassName = classNames({
                "text-muted": true,
                "action-btns-cell__btn": true,
                "hidden": !props.showBtnToggleUsingOccupList,
                "disabled": !isUsedByOccup
            }),
            btnDelOccupClassName = classNames({
                "text-danger": true,
                "action-btns-cell__btn": true,
                "hidden": !props.showBtnDelValues,
                "disabled": isUsedByOccup || isNowDeletingThisItem
            }),
            btnEditOccupClassName = classNames({
                "text-warning": true,
                "action-btns-cell__btn": true,
                "hidden": !props.showBtnEditValues,
            }),
            textCellClassName = classNames({
                "big-text-cell--folded": !infoRowIsExpanded
            }),
            btnExpandRow = props.shownOccupDescrTextsList && (
                <a className="action-btns-cell__btn btn-expand"
                   href="javascript:void(0)"
                   onClick={bindToggleExpandItemHandler(item.id, props)}
                   title={infoRowIsExpanded ? "Приховати деталі" : "Переглянути деталі"}
                >
                    {
                        infoRowIsExpanded ?
                            <i className='fa fa-chevron-up'/> :
                            <i className="fa fa-chevron-down"/>
                    }
                </a>
            ),
            infoRow = (
                <tr className="row--short-info" key={item.id+"_1"}>
                    <td title="Номер в списку"> { itemIndex + 1 } </td>
                    <td className={textCellClassName}>
                        {item.textValue}
                    </td>
                    <th className="action-btns-cell">
                        <div className="inner">
                            <a
                                onClick={bindToggleUsingOccupList(item.id, props)}
                                className={btnUsingOccupClassName}
                                title="Посади що використовують це значення"
                            >
                                <i className="fa fa-link" />
                            </a>
                            <br className="show-for-big-text"/> {" "}
                            <a
                                onClick={bindEditListItemHandler(item.id, item.textValue, props)}
                                className={btnEditOccupClassName}
                                title="Редагувати елемент"
                            >
                                <i className="fa fa-edit" />
                            </a>
                            <br className="show-for-big-text"/> {" "}
                            <a
                                onClick={bindDelListItemHandler(item.id, item.textValue, isUsedByOccup, props)}
                                className={btnDelOccupClassName}
                                title="Видалити елемент зі списку"
                            >
                                <i className={`fa ${isNowDeletingThisItem ? "fa-spinner fa-pulse" : "fa-trash"}`} />
                            </a>
                            <br className="show-for-big-text"/> {" "}
                            { btnExpandRow }
                        </div>
                    </th>
                </tr>
            ),
            usingOccupRow = (
                <CtrlDcBoxResTblUsingOccupRow
                    key={item.id+"_2"}
                    usingOccupationsArr={item.usingOccupations}
                    show={showUsingOccupRow}
                    occupNamesById={props.occupNamesById}
                    onUsingOccupNameClick={props.onUsingOccupNameClick}
                    fetchOccupNamesById={props.fetchOccupNamesById}
                />
            );
        return [infoRow, usingOccupRow];
    });

    return (
        <div className="ctrl-occup-dc-table-wrapper">
            <table className="table table-hover table-condensed ctrl-occup-dc-table">
                {/*<thead>*/}
                {/*<tr>*/}
                {/*<th title="Номер в списку">*/}
                {/*№*/}
                {/*</th>*/}
                {/*<th className="th-sorting sorting_asc" >*/}
                {/*Назва*/}
                {/*</th>*/}
                {/*<th> Дії </th>*/}
                {/*</tr>*/}
                {/*</thead>*/}
                <tbody>
                { tblRows }
                </tbody>
            </table>
        </div>
    )
}

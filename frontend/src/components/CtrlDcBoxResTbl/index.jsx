import React, {Component} from "react";
import classNames from "classnames"
import "./styles.less";

function bindToggleExpandItemHandler(itemId, props) {
    return () => {
        return props.onToggleExpandItemClick(itemId)
    }
}

function bindUsingOccupClickHandler(itemId, props) {
    return () => {
        //return props.onUsingOccupNameClick(itemId)
    }
}

function bindToggleUsingOccupList(itemId, props) {
    return () => {
        //return props.onToggleUsingOccupListBtnClick(itemId)
    }
}

function bindEditListItemHandler(itemId, itemVal, props) {
    return () => {
        return props.onEditListItemBtnClick(itemId, itemVal);
    }
}

function bindDelListItemHandler(itemId, props) {
    return () => {
        //return props.onDelListItemBtnClick(itemId)
    }
}

export default function CtrlDcBoxResTbl(props) {
    let tblRows = props.listData.items.map((item, itemIndex) => {
        let isUsedByOccup = item.usingOccupations && item.usingOccupations.length,
            infoRowIsExpanded = props.shownOccupDescrTextsList && props.expandedItems[item.id],
            showUsingOccupRow = false,//props.shownUsingOccupRows[item.id],
            btnUsingOccupClassName = classNames({
                "text-muted": true,
                "action-btns-cell__btn": true,
                "disabled": !isUsedByOccup
            }),
            btnDelOccupClassName = classNames({
                "text-danger": true,
                "action-btns-cell__btn": true,
                "disabled": isUsedByOccup
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
                                className="action-btns-cell__btn text-warning"
                                title="Редагувати елемент"
                            >
                                <i className="fa fa-edit" />
                            </a>
                            <br className="show-for-big-text"/> {" "}
                            <a
                                onClick={bindDelListItemHandler(item.id, props)}
                                className={btnDelOccupClassName}
                                title="Видалити елемент зі списку"
                            >
                                <i className={`fa fa-trash`} />
                            </a>
                            <br className="show-for-big-text"/> {" "}
                            { btnExpandRow }
                        </div>
                    </th>
                </tr>
            ),
            //TODO: Рендерити список у окремому компоненті, який братиме назви посад із списку уточнень
            usingOccupList = isUsedByOccup && showUsingOccupRow && item.usingOccupations.map((usingOccupId, i) => {
                    return (
                        <a
                            title="Натисніть щоб відредагувати посаду"
                            href="javascript:void(0)"
                            key={item.id+i}
                            onClick={bindUsingOccupClickHandler(usingOccupId)}
                        >
                            {props.occupNamesById[usingOccupId]}
                        </a>
                    );
                }),
            usingOccupRow = isUsedByOccup && showUsingOccupRow && (
                    <tr className="row--details" key={item.id+"_2"}>
                        <td className="" colSpan="10">
                            <div>
                                <i> Посади що використовують це значення: </i>
                            </div>
                            <div className="list-of-using-occup">
                                {usingOccupList}
                            </div>
                        </td>
                    </tr>
                ) || "";

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

import React, {Component} from "react";
import moment from "moment";

import "./styles.less";

export default function SearchOccupBoxResTblRowShort(props) {
    return (
        <tr>
            <td title="Номер в списку"> {props.itemIndex + 1} </td>
            <td> {props.data.occupationGroup} </td>
            <td> {props.data.occupationName} </td>
            <td> {props.data.inKPI ? "+" : "-" } </td>
            <td title="Дата створення посади в державі">
                {props.data.creatingInStateDate ? moment(props.data.creatingInStateDate).format('DD.MM.YYYY') : "-" }
            </td>
            <td title="Дата відміни посади в державі">
                {props.data.cancelingInStateDate ? moment(props.data.cancelingInStateDate).format('DD.MM.YYYY') : "-" }
            </td>
            <td title="Дата створення посади в КПІ ">
                {props.data.creatingInKPIDate ? moment(props.data.creatingInKPIDate).format('DD.MM.YYYY') : "-"}
            </td>
            <td title="Дата відміни посади в КПІ ">
                {props.data.cancelingInKPIDate ? moment(props.data.cancelingInKPIDate).format('DD.MM.YYYY') : "-" }
            </td>
            <th className="action-btns-cell">
                <a
                    className="action-btns-cell__btn text-warning btn--btn-sm--btn-warning"
                    title="Редагувати посаду"
                    onClick={props.onEditItem}
                >
                    <i className="fa fa-edit" />
                </a> {" "}
                <a
                    className="action-btns-cell__btn text-danger btn--btn-sm--btn-danger"
                    title="Видалити посаду"
                    onClick={props.onDeleteItem}
                >
                    <i className="fa fa-trash" />
                </a> {" "}
                <a
                    className="action-btns-cell__btn occup-table__btn-expand"
                    onClick={props.onToggleExpandItem}
                    title="Переглянути деталі"
                >
                    { props.isExpanded ? <i className='fa fa-chevron-up' /> : <i className="fa fa-chevron-down" /> }
                </a>
            </th>
        </tr>
    )
}

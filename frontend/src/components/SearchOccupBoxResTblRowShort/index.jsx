import React, {Component} from "react";
import moment from "moment";

import "./styles.less";

export default function SearchOccupBoxResTblRowShort(props) {
    let occupationGroupItem = props.occupationGroupList.items.find(item => item.id == props.data.occupationGroup),
        occupationGroupText = occupationGroupItem && occupationGroupItem.textValue ||
            (<div title="Не вдалося визначити посадовий склад"> ? </div>),
        durationsInState = props.data.durations && props.data.durations.length &&
            props.data.durations.filter(item => !item.inKpi) || [],
        durationsInKPI = props.data.durations && props.data.durations.length &&
            props.data.durations.filter(item => item.inKpi) || [],
        creatingInStateDate = durationsInState.length && durationsInState.map(item => {
            let d = item.start && moment(item.start).format('DD.MM.YYYY') || "",
                v = item.virtual ? (<span title="Посада є віртуальною" key={Math.random()}>, V</span>) : "";
            return ( <div key={Math.random()}> { d && [d,v] || "-" } </div> );
        }) || "-",
        cancelingInStateDate = durationsInState.length && durationsInState.map(item => {
            return (
                <div key={Math.random()}>
                    { item.stop && moment(item.stop).format('DD.MM.YYYY') || "-" }
                </div>
            )
        }) || "-",
        creatingInKPIDate = durationsInKPI.length && durationsInKPI.map(item => {
            let d = item.start && moment(item.start).format('DD.MM.YYYY') || "",
                v = item.virtual ? (<span key={Math.random()} title="Посада є віртуальною">, V</span>) : "";
            return ( <div key={Math.random()}> { d && [d,v] || "-" } </div> );
        }) || "-",
        cancelingInKPIDate = durationsInKPI.length && durationsInKPI.map(item => {
            return (
                <div key={Math.random()}>
                    { item.stop && moment(item.stop).format('DD.MM.YYYY') || "-" }
                </div>
            )
        }) || "-",
        BtnDelOccupation = props.showBtnDelOccupations ? (
            <a
                className="action-btns-cell__btn text-danger btn--btn-sm--btn-danger"
                title="Видалити посаду"
                onClick={props.onDeleteItem}
                disabled={props.showDelSpinner}
            >
                <i className={`fa fa-${props.showDelSpinner ? 'spinner fa-pulse' : 'trash'}`} />
            </a>
        ) : null,
        BtnEditOccupation = props.showBtnEditOccupations ? (
            <a
                className="action-btns-cell__btn text-warning btn--btn-sm--btn-warning"
                title="Редагувати посаду"
                onClick={props.onEditItem}
            >
                <i className="fa fa-edit" />
            </a>
        ) : null;
    return (
        <tr>
            <td className="text-center" title="Номер в списку">
                { props.itemIndex + 1}
            </td>
            <td className="text-left">
                { occupationGroupText }
            </td>
            <td className="text-left">
                { props.data.occupationName }
            </td>
            <td className="text-center" title="Дата створення посади в державі">
                { creatingInStateDate }
            </td>
            <td className="text-center" title="Дата відміни посади в державі">
                { cancelingInStateDate }
            </td>
            <td className="text-center" title="Дата створення посади в КПІ ">
                { creatingInKPIDate }
            </td>
            <td className="text-center" title="Дата відміни посади в КПІ ">
                { cancelingInKPIDate }
            </td>
            <th className="text-center action-btns-cell">
                { BtnEditOccupation } {" "}
                { BtnDelOccupation } {" "}
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

import React, {Component} from "react";
import moment from "moment";

import "./styles.less";

export default function SearchOccupBoxResTblRowDetails(props) {
    let codesPortions = props.data.codes.map( (code, i) => {
            return (
                <div className="occupation-details__items-portion" key={i}>
                    <div className="row">
                        <div className="col-sm-2 occupation-details__title">
                            Дата введення набору кодів:
                        </div>
                        <div className="col-sm-4 occupation-details__data" style={{paddingLeft: "3%"}}>
                            { code.portionStartDate ? moment(code.portionStartDate).format('DD.MM.YYYY') : "-" }
                        </div>
                        <div className="col-sm-3 occupation-details__title">
                            Дата припинення дії набору кодів:
                        </div>
                        <div className="col-sm-3 occupation-details__data">
                            { code.portionEndDate ? moment(code.portionEndDate).format('DD.MM.YYYY') : "-" }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 occupation-details__title">
                            Код КП:
                        </div>
                        <div className="col-sm-4 occupation-details__data" style={{paddingLeft: "3%"}}>
                            {code.codeKP && code.codeKP.val || "-"}
                        </div>
                        <div className="col-sm-3 occupation-details__title">
                            Код ЗКППТР:
                        </div>
                        <div className="col-sm-3 occupation-details__data">
                            {code.codeZKPPTR && code.codeZKPPTR.val || "-"}
                        </div>
                        <div className="col-sm-2 occupation-details__title">
                            Код ЄТДК:
                        </div>
                        <div className="col-sm-4 occupation-details__data" style={{paddingLeft: "3%"}}>
                            {code.codeETDK && code.codeETDK.val || "-"}
                        </div>
                        <div className="col-sm-3 occupation-details__title">
                            Код ДКХП:
                        </div>
                        <div className="col-sm-3 col-lg-1 occupation-details__data">
                            {code.codeDKHP && code.codeDKHP.val || "-"}
                        </div>
                    </div>
                </div>
            )
        }),
        responsibPortions = props.data.responsibilities.map( (portion, i) => {
            return (
                <div className="occupation-details__items-portion" key={i}>
                    <div className="row">
                        <div className="col-sm-2 occupation-details__title">
                            Дата прийняття тексту:
                        </div>
                        <div className="col-sm-4 occupation-details__data" style={{paddingLeft: "3%"}}>
                            { portion.portionStartDate ? moment(portion.portionStartDate).format('DD.MM.YYYY') : "-" }
                        </div>
                        <div className="col-sm-3 occupation-details__title">
                            Дата припинення дії тексту:
                        </div>
                        <div className="col-sm-3 occupation-details__data">
                            { portion.portionEndDate ? moment(portion.portionEndDate).format('DD.MM.YYYY') : "-" }
                        </div>
                        <div className="col-sm-12 occupation-details__data">
                            { portion.text }
                        </div>
                    </div>
                </div>
            )
        }),
        haveToKnowPortions = props.data.haveToKnow.map( (portion, i) => {
            return (
                <div className="occupation-details__items-portion" key={i}>
                    <div className="row">
                        <div className="col-sm-2 occupation-details__title">
                            Дата прийняття тексту:
                        </div>
                        <div className="col-sm-4 occupation-details__data" style={{paddingLeft: "3%"}}>
                            { portion.portionStartDate ? moment(portion.portionStartDate).format('DD.MM.YYYY') : "-" }
                        </div>
                        <div className="col-sm-3 occupation-details__title">
                            Дата припинення дії тексту:
                        </div>
                        <div className="col-sm-3 occupation-details__data">
                            { portion.portionEndDate ? moment(portion.portionEndDate).format('DD.MM.YYYY') : "-" }
                        </div>
                        <div className="col-sm-12 occupation-details__data">
                            { portion.text }
                        </div>
                    </div>
                </div>
            )
        }),
        qualiffRequirPortions = props.data.qualiffRequir.map( (portion, i) => {
            return (
                <div className="occupation-details__items-portion" key={i}>
                    <div className="row">
                        <div className="col-sm-2 occupation-details__title">
                            Дата прийняття тексту:
                        </div>
                        <div className="col-sm-4 occupation-details__data" style={{paddingLeft: "3%"}}>
                            { portion.portionStartDate ? moment(portion.portionStartDate).format('DD.MM.YYYY') : "-" }
                        </div>
                        <div className="col-sm-3 occupation-details__title">
                            Дата припинення дії тексту:
                        </div>
                        <div className="col-sm-3 occupation-details__data">
                            { portion.portionEndDate ? moment(portion.portionEndDate).format('DD.MM.YYYY') : "-" }
                        </div>
                        <div className="col-sm-12 occupation-details__data">
                            { portion.text }
                        </div>
                    </div>
                </div>
            )
        });

    return (
        <tr className={ props.isExpanded ? "" : "hidden"}>
            <td colSpan="30">
                <div className="occupation-details container-fluid">
                    <div className="row occupation-details__row">
                        <div className="col-sm-3 occupation-details__title">
                            Скорочена назва посади:
                        </div>
                        <div className="col-sm-9 occupation-details__data">
                            {props.data.occupationNameMin}
                        </div>
                    </div>
                    <div className="row occupation-details__row">
                        <div className="col-sm-12 occupation-details__title">
                            Коди: {!props.data.codes.length && " - "}
                        </div>
                        <div className="col-sm-11 pull-right">
                            { codesPortions }
                        </div>
                    </div>
                    <div className="row occupation-details__row">
                        <div className="col-sm-3 occupation-details__title"> Завдання, обов'язки та повноваження: </div>
                        <div className="col-sm-11 pull-right">
                            { responsibPortions }
                        </div>
                    </div>
                    <div className="row occupation-details__row">
                        <div className="col-sm-3 occupation-details__title"> Повинен знати: </div>
                        <div className="col-sm-11 pull-right">
                            { haveToKnowPortions }
                        </div>
                    </div>
                    <div className="row occupation-details__row">
                        <div className="col-sm-3 occupation-details__title"> Кваліфікаційні вимоги: </div>
                        <div className="col-sm-11 pull-right">
                            { qualiffRequirPortions }
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import classNames from "classnames"

import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";

import {OCCUPATION_MIN_DATE} from "../../constants/common";

import "./styles.less";

export default function FormEditOccupInfoHaveToKnowPortion(props) {
    let topCtrlPart = props.showDelBtn ? (
        <div>
            <hr />
            <button
                type="button"
                className="close inp-portions__btn-amount-ctrl--del"
                onClick={props.handleDelHaveToKnowPortionBtnClick} >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    ) : "";

    let portionStartDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.haveToKnowPortionFields.portionStartDate.touched && props.haveToKnowPortionFields.portionStartDate.error,
            'has-success': props.haveToKnowPortionFields.portionStartDate.touched && !props.haveToKnowPortionFields.portionStartDate.error
        }),
        portionEndDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.haveToKnowPortionFields.portionEndDate.touched && props.haveToKnowPortionFields.portionEndDate.error,
            'has-success': props.haveToKnowPortionFields.portionEndDate.touched && !props.haveToKnowPortionFields.portionEndDate.error
        }),
        portionTextFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.haveToKnowPortionFields.text.touched && props.haveToKnowPortionFields.text.error,
            'has-success': props.haveToKnowPortionFields.text.touched && !props.haveToKnowPortionFields.text.error
        }),
        portionStartDateValue = props.haveToKnowPortionFields.portionStartDate.value &&
            (new Date(props.haveToKnowPortionFields.portionStartDate.value) !== "Invalid Date") &&
            new Date(props.haveToKnowPortionFields.portionStartDate.value) || null,
        portionEndDateValue = props.haveToKnowPortionFields.portionEndDate.value &&
            (new Date(props.haveToKnowPortionFields.portionEndDate.value) !== "Invalid Date") &&
            new Date(props.haveToKnowPortionFields.portionEndDate.value) || null,
        updateRelative = props.haveToKnowPortionFields.updateTextInRelativeOccup &&
            props.haveToKnowPortionFields.updateTextInRelativeOccup.value,
        occupationsUsingText = props.haveToKnowPortionFields.occupationsUsingText &&
            props.haveToKnowPortionFields.occupationsUsingText.value || "",
        showBtnUpdateRelative = occupationsUsingText && props.haveToKnowPortionFields.updateTextInRelativeOccup &&
            (props.haveToKnowPortionFields.updateTextInRelativeOccup.value !== -1);

    return (
        <div className={`inp-portions__item ${props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="clearfix">
                <div className="col-sm-8">
                    <div className={portionTextFormGroupClass}>
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.haveToKnowPortionFields.idText} />
                            <textarea
                                {...props.haveToKnowPortionFields.text}
                                value={props.haveToKnowPortionFields.text.value || ""}
                                onChange={ e => props.handleTextChange(e.target.value) }
                                className="form-control"
                                placeholder="Повинен знати"
                                rows="6" />
                            <div className="input-group-btn">
                                <button
                                    type="button"
                                    title="Додати інформацію з аналогічної посади"
                                    className="btn btn-default btn-flat btn-add-info-from-another-occup"
                                    onClick={props.handleBtnAddInfoFromAnotherOccupClick}
                                >
                                    <i className="fa fa-link" />
                                </button>
                                <br/>
                                {
                                    showBtnUpdateRelative && (
                                        <label
                                            className={`btn btn-default btn-flat should-update-in-other-occup ${updateRelative ? "active" : ""}`}
                                            title={"Оновити також цей текст у посадах які використвоують його: " + occupationsUsingText }
                                        >
                                            <input
                                                {...props.haveToKnowPortionFields.updateTextInRelativeOccup}
                                                type="checkbox"
                                                autoComplete="off"
                                                className="hidden"
                                            />
                                            {updateRelative ? [<i className="fa fa-check" key="123"/>, " "] : ""}
                                            <i className="fa fa-fast-forward"/>
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <span className="help-block">
                            { props.haveToKnowPortionFields.text.touched && props.haveToKnowPortionFields.text.error }
                        </span>
                    </div>
                </div>
                <div className="col-sm-4">
                    <input
                        type="hidden"
                        {...props.haveToKnowPortionFields.idDates} />
                    <div className={portionStartDateFormGroupClass}>
                        <label className="center-block">
                            Дата прийняття тексту <br />
                            <DateTimePicker
                                {...props.haveToKnowPortionFields.portionStartDate}
                                format="DD.MM.YYYY"
                                value={portionStartDateValue}
                                defaultValue={null}
                                onChange={props.haveToKnowPortionFields.portionStartDate.onChange}
                                onBlur={(event) => fixBlur(event, props.haveToKnowPortionFields.portionStartDate)}
                                placeholder="Дата прийняття тексту"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                        </label>
                        <span className="help-block">
                            { props.haveToKnowPortionFields.portionStartDate.touched && props.haveToKnowPortionFields.portionStartDate.error }
                        </span>
                    </div>
                    <div className={portionEndDateFormGroupClass}>
                        <label className="center-block">
                            Дата припинення дії тексту <br />
                            <DateTimePicker
                                {...props.haveToKnowPortionFields.portionEndDate}
                                format="DD.MM.YYYY"
                                value={portionEndDateValue}
                                defaultValue={null}
                                onChange={props.haveToKnowPortionFields.portionEndDate.onChange}
                                onBlur={(event) => fixBlur(event, props.haveToKnowPortionFields.portionEndDate)}
                                placeholder="Дата припинення дії тексту"
                                time={false}
                                min={portionStartDateValue || OCCUPATION_MIN_DATE}
                                max={new Date()} />
                        </label>
                        <span className="help-block">
                            { props.haveToKnowPortionFields.portionEndDate.touched && props.haveToKnowPortionFields.portionEndDate.error }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

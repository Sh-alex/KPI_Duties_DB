import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import classNames from "classnames"

import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";

import {OCCUPATION_MIN_DATE} from "../../constants/common";

import "./styles.less";

export default function FormEditOccupInfoQualiffRequirPortion(props) {
    let topCtrlPart = props.showDelBtn ? (
            <div>
                <hr />
                <button
                    type="button"
                    className="close inp-portions__btn-amount-ctrl--del"
                    onClick={props.handleDelQualiffRequirPortionBtnClick} >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        ) : "",
        portionStartDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.qualiffRequirPortionFields.portionStartDate.touched && props.qualiffRequirPortionFields.portionStartDate.error,
            'has-success': props.qualiffRequirPortionFields.portionStartDate.touched && !props.qualiffRequirPortionFields.portionStartDate.error
        }),
        portionEndDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.qualiffRequirPortionFields.portionEndDate.touched && props.qualiffRequirPortionFields.portionEndDate.error,
            'has-success': props.qualiffRequirPortionFields.portionEndDate.touched && !props.qualiffRequirPortionFields.portionEndDate.error
        }),
        portionTextFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.qualiffRequirPortionFields.text.touched && props.qualiffRequirPortionFields.text.error,
            'has-success': props.qualiffRequirPortionFields.text.touched && !props.qualiffRequirPortionFields.text.error
        }),
        portionStartDateValue = props.qualiffRequirPortionFields.portionStartDate.value &&
            (new Date(props.qualiffRequirPortionFields.portionStartDate.value) !== "Invalid Date") &&
            new Date(props.qualiffRequirPortionFields.portionStartDate.value) || null,
        portionEndDateValue = props.qualiffRequirPortionFields.portionEndDate.value &&
            (new Date(props.qualiffRequirPortionFields.portionEndDate.value) !== "Invalid Date") &&
            new Date(props.qualiffRequirPortionFields.portionEndDate.value) || null;

    return (
        <div className={`inp-portions__item ${props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="clearfix">
                <div className="col-sm-8">
                    <div className={portionTextFormGroupClass}>
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.qualiffRequirPortionFields.id} />
                            <textarea
                                {...props.qualiffRequirPortionFields.text}
                                value={props.qualiffRequirPortionFields.text.value || ""}
                                onChange={ e => props.handleTextChange(e.target.value) }
                                className="form-control"
                                placeholder="Кваліфікаційні вимоги"
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
                            </div>
                        </div>
                        <span className="help-block">
                            { props.qualiffRequirPortionFields.text.touched && props.qualiffRequirPortionFields.text.error }
                        </span>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className={portionStartDateFormGroupClass}>
                        <label className="center-block">
                            Дата прийняття тексту <br />
                            <DateTimePicker
                                {...props.qualiffRequirPortionFields.portionStartDate}
                                format="DD.MM.YYYY"
                                value={portionStartDateValue}
                                defaultValue={null}
                                onChange={props.qualiffRequirPortionFields.portionStartDate.onChange}
                                onBlur={(event) => fixBlur(event, props.qualiffRequirPortionFields.portionStartDate)}
                                placeholder="Дата прийняття тексту"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                        </label>
                        <span className="help-block">
                            { props.qualiffRequirPortionFields.portionStartDate.touched && props.qualiffRequirPortionFields.portionStartDate.error }
                        </span>
                    </div>
                    <div className={portionEndDateFormGroupClass}>
                        <label className="center-block">
                            Дата припинення дії тексту <br />
                            <DateTimePicker
                                {...props.qualiffRequirPortionFields.portionEndDate}
                                format="DD.MM.YYYY"
                                value={portionEndDateValue}
                                defaultValue={null}
                                onChange={props.qualiffRequirPortionFields.portionEndDate.onChange}
                                onBlur={(event) => fixBlur(event, props.qualiffRequirPortionFields.portionEndDate)}
                                placeholder="Дата припинення дії тексту"
                                time={false}
                                min={portionStartDateValue || OCCUPATION_MIN_DATE}
                                max={new Date()} />
                        </label>
                        <span className="help-block">
                            { props.qualiffRequirPortionFields.portionEndDate.touched && props.qualiffRequirPortionFields.portionEndDate.error }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

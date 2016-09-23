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
        });

    return (
        <div className={`inp-portions__item ${props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="clearfix">
                <div className="col-sm-8">
                    <div className={portionTextFormGroupClass}>
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.haveToKnowPortionFields.id} />
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
                            </div>
                        </div>
                        <span className="help-block">
                            { props.haveToKnowPortionFields.text.touched && props.haveToKnowPortionFields.text.error }
                        </span>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className={portionStartDateFormGroupClass}>
                        <label className="center-block">
                            Дата прийняття тексту <br />
                            <DateTimePicker
                                {...props.haveToKnowPortionFields.portionStartDate}
                                format="DD.MM.YYYY"
                                value={props.haveToKnowPortionFields.portionStartDate.value}
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
                                value={props.haveToKnowPortionFields.portionEndDate.value}
                                defaultValue={null}
                                onChange={props.haveToKnowPortionFields.portionEndDate.onChange}
                                onBlur={(event) => fixBlur(event, props.haveToKnowPortionFields.portionEndDate)}
                                placeholder="Дата припинення дії тексту"
                                time={false}
                                min={props.haveToKnowPortionFields.portionStartDate.value || OCCUPATION_MIN_DATE}
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

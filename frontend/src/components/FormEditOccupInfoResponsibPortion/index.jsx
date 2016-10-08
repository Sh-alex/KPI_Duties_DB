import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";
import classNames from "classnames"
import debounce from "../../utils/debounce"
import {OCCUPATION_MIN_DATE} from "../../constants/common";
import "./styles.less";

// let handleTextareaChange = function (newVal, reduxChangeHandler) {
//         reduxChangeHandler( replaceApostrophe(newVal) );
//     },
//     debouncedHandleTextareaChange = debounce(handleTextareaChange, 500),
//     persistedHandler = function (e, reduxChangeHandler) {
//         //e.persist();
//         let newVal = e.target.value;
//         debouncedHandleTextareaChange(newVal, reduxChangeHandler);
//     };

export default function FormEditOccupInfoResponsibPortion(props) {
    let topCtrlPart = props.showDelBtn ? (
        <div>
            <hr />
            <button
                type="button"
                className="close inp-portions__btn-amount-ctrl--del"
                onClick={props.handleDelResponsibPortionBtnClick} >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    ) : "";

    let portionStartDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.responsibPortionFields.portionStartDate.touched && props.responsibPortionFields.portionStartDate.error,
            'has-success': props.responsibPortionFields.portionStartDate.touched && !props.responsibPortionFields.portionStartDate.error
        }),
        portionEndDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.responsibPortionFields.portionEndDate.touched && props.responsibPortionFields.portionEndDate.error,
            'has-success': props.responsibPortionFields.portionEndDate.touched && !props.responsibPortionFields.portionEndDate.error
        }),
        portionTextFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.responsibPortionFields.text.touched && props.responsibPortionFields.text.error,
            'has-success': props.responsibPortionFields.text.touched && !props.responsibPortionFields.text.error
        }),
        portionStartDateValue = props.responsibPortionFields.portionStartDate.value &&
            (new Date(props.responsibPortionFields.portionStartDate.value) !== "Invalid Date") &&
            new Date(props.responsibPortionFields.portionStartDate.value) || null,
        portionEndDateValue = props.responsibPortionFields.portionEndDate.value &&
            (new Date(props.responsibPortionFields.portionEndDate.value) !== "Invalid Date") &&
            new Date(props.responsibPortionFields.portionEndDate.value) || null,
        updateRelative = props.responsibPortionFields.updateTextInRelativeOccup &&
            props.responsibPortionFields.updateTextInRelativeOccup.value,
        occupationsUsingText = props.responsibPortionFields.occupationsUsingText &&
            props.responsibPortionFields.occupationsUsingText.value || "",
        showBtnUpdateRelative = occupationsUsingText && props.responsibPortionFields.updateTextInRelativeOccup &&
            (props.responsibPortionFields.updateTextInRelativeOccup.value !== -1);

    return (
        <div className={`inp-portions__item ${props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="clearfix">
                <div className="col-sm-8">
                    <div className={portionTextFormGroupClass}>
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.responsibPortionFields.idText} />
                            <textarea
                                {...props.responsibPortionFields.text}
                                value={props.responsibPortionFields.text.value || ""}
                                onChange={ e => props.handleTextChange(e.target.value) }
                                className="form-control"
                                placeholder="Завдання, обов'язки та повноваження"
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
                                                {...props.responsibPortionFields.updateTextInRelativeOccup}
                                                type="checkbox"
                                                autoComplete="off"
                                                className="hidden"
                                            />
                                            {updateRelative ? [<i className="fa fa-check" key="321"/>, " "] : ""}
                                            <i className="fa fa-fast-forward"/>
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <span className="help-block">
                            { props.responsibPortionFields.text.touched && props.responsibPortionFields.text.error }
                        </span>
                    </div>
                </div>
                <div className="col-sm-4">
                    <input
                        type="hidden"
                        {...props.responsibPortionFields.idDates} />
                    <div className={portionStartDateFormGroupClass}>
                        <label className="center-block">
                            Дата прийняття тексту <br />
                            <DateTimePicker
                                {...props.responsibPortionFields.portionStartDate}
                                format="DD.MM.YYYY"
                                value={portionStartDateValue}
                                defaultValue={null}
                                onChange={props.responsibPortionFields.portionStartDate.onChange}
                                onBlur={(event) => fixBlur(event, props.responsibPortionFields.portionStartDate)}
                                placeholder="Дата прийняття тексту"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block">
                                { props.responsibPortionFields.portionStartDate.touched && props.responsibPortionFields.portionStartDate.error }
                            </span>
                        </label>
                    </div>
                    <div className={portionEndDateFormGroupClass}>
                        <label className="center-block">
                            Дата припинення дії тексту <br />
                            <DateTimePicker
                                {...props.responsibPortionFields.portionEndDate}
                                format="DD.MM.YYYY"
                                value={portionEndDateValue}
                                defaultValue={null}
                                onChange={props.responsibPortionFields.portionEndDate.onChange}
                                onBlur={(event) => fixBlur(event, props.responsibPortionFields.portionEndDate)}
                                placeholder="Дата припинення дії тексту"
                                time={false}
                                min={portionStartDateValue || OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block">
                                { props.responsibPortionFields.portionEndDate.touched && props.responsibPortionFields.portionEndDate.error }
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

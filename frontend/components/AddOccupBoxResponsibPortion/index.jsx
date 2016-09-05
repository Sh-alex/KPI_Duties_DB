import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";
import replaceApostrophe from "../../utils/replaceApostrophe"
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

export default function AddOccupBoxResponsibPortion(props) {
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

    return (
        <div className={`inp-portions__item ${props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="form-group">
                <div className="col-sm-8">
                    <div className="input-group">
                        <input
                            type="hidden"
                            {...props.responsibPortionFields.id} />
                        <textarea
                            {...props.responsibPortionFields.text}
                            onChange={ e => {
                                props.responsibPortionFields.text.onChange(
                                    replaceApostrophe(e.target.value)
                                )
                            }}
                            className="form-control"
                            placeholder="Завдання, обов'язки та повноваження"
                            rows="6" />
                        <div className="input-group-btn">
                            <button
                                type="button"
                                title="Додати інформацію з аналогічної посади"
                                className="btn btn-default btn-flat"
                                onClick={props.handleBtnAddInfoFromAnotherOccupClick}
                            >
                                <i className="fa fa-link" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <label className="center-block">
                        Дата прийняття тексту <br />
                        <DateTimePicker
                            {...props.responsibPortionFields.portionStartDate}
                            format="DD.MM.YYYY"
                            value={props.responsibPortionFields.portionStartDate.value}
                            defaultValue={null}
                            onChange={props.responsibPortionFields.portionStartDate.onChange}
                            onBlur={(event) => fixBlur(event, props.responsibPortionFields.portionStartDate)}
                            placeholder="Дата прийняття тексту"
                            time={false}
                            min={OCCUPATION_MIN_DATE}
                            max={new Date()} />
                    </label>
                    <label className="center-block">
                        Дата припинення дії тексту <br />
                        <DateTimePicker
                            {...props.responsibPortionFields.portionEndDate}
                            format="DD.MM.YYYY"
                            value={props.responsibPortionFields.portionEndDate.value}
                            defaultValue={null}
                            onChange={props.responsibPortionFields.portionEndDate.onChange}
                            onBlur={(event) => fixBlur(event, props.responsibPortionFields.portionEndDate)}
                            placeholder="Дата припинення дії тексту"
                            time={false}
                            min={OCCUPATION_MIN_DATE}
                            max={new Date()} />
                    </label>
                </div>
            </div>
        </div>
    )
}

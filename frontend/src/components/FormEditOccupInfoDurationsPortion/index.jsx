import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";
import classNames from "classnames"
import {OCCUPATION_MIN_DATE} from "../../constants/common";
import "./styles.less";

export default function FormEditOccupInfoDurationsPortion(props) {
    let topCtrlPart = props.showDelBtn ? (
        <div>
            <hr />
            <button
                type="button"
                className="close inp-portions__btn-amount-ctrl--del"
                onClick={props.handleDelPortionBtnClick} >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    ) : "";

    let startDateError = props.fields.start.touched && props.fields.start.error,
        stopError = props.fields.stop.touched && props.fields.stop.error,
        startStateDateFormGroupClass = classNames({
            'form-group': true,
            'has-error': startDateError,
            'has-success': props.fields.start.touched && !props.fields.start.error
        }),
        stopFormGroupClass = classNames({
            'form-group': true,
            'has-error': stopError,
            'has-success': props.fields.stop.touched && !props.fields.stop.error
        }),
        startValue = props.fields.start.value &&
            (new Date(props.fields.start.value) !== "Invalid Date") &&
            new Date(props.fields.start.value) || null,
        stopValue = props.fields.stop.value &&
            (new Date(props.fields.stop.value) !== "Invalid Date") &&
            new Date(props.fields.stop.value) || null;

    return (
        <div className={`inp-portions__item ${props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="clearfix">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className={startStateDateFormGroupClass}>
                            <label
                                htmlFor={"inp-occupation-start-date--"+props.portionKey}
                                className="col-xs-12 col-md-4 control-label"
                            >
                                Дата створення посади
                            </label>
                            <div className="col-xs-12 col-md-8">
                                <DateTimePicker
                                    {...props.fields.start}
                                    type="date"
                                    format="DD.MM.YYYY"
                                    value={startValue}
                                    defaultValue={null}
                                    onChange={props.fields.start.onChange}
                                    onBlur={(event) => fixBlur(event, props.fields.start)}
                                    id={"inp-occupation-start-date--"+props.portionKey}
                                    placeholder="Дата створення посади"
                                    time={false}
                                    min={OCCUPATION_MIN_DATE}
                                    max={new Date()} />
                                <span className="help-block"> { startDateError } </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className={stopFormGroupClass}>
                            <label
                                htmlFor={"inp-occupation-stop-date--"+props.portionKey}
                                className="col-xs-12 col-md-4 control-label"
                            >
                                Дата відміни посади
                            </label>
                            <div className="col-xs-12 col-md-8">
                                <DateTimePicker
                                    {...props.fields.stop}
                                    type="date"
                                    format="DD.MM.YYYY"
                                    value={stopValue}
                                    defaultValue={null}
                                    onChange={props.fields.stop.onChange}
                                    onBlur={(event) => fixBlur(event, props.fields.stop)}
                                    id={"inp-occupation-stop-date--"+props.portionKey}
                                    placeholder="Дата відміни посади"
                                    time={false}
                                    min={OCCUPATION_MIN_DATE}
                                    max={new Date()} />
                                <span className="help-block"> { stopError } </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-xs-12 col-md-6">
                        <div className="form-group">
                            <div className="col-xs-12 col-xs-12 col-md-offset-4 col-xs-12 col-md-8">
                                <div className="inp-toggler-block">
                                    <label htmlFor={"inp-toggler__checkbox--"+props.portionKey} className="inp-toggler__label" >
                                        В КПІ
                                    </label>
                                    <div className="inp-toggler__wrapper" title="Клікніть щоб переключити">
                                        <input
                                            {...props.fields.inKpi}
                                            type="checkbox"
                                            id={"inp-toggler__checkbox--"+props.portionKey}
                                            onChange={props.handleInKpiInpChange}
                                            className="inp-toggler__checkbox"
                                        />

                                        <div className="inp-toggler__icon-wrapper">
                                            <i className="fa fa-toggle-on inp-toggler__icon--off" />
                                            <i className="fa fa-toggle-on fa-flip-horizontal inp-toggler__icon--on" />
                                        </div>
                                    </div>

                                    <label htmlFor={"inp-toggler__checkbox--"+props.portionKey} className="inp-toggler__label" >
                                        В Державі
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        props.showInpIsVirtual && (
                            <div className="col-xs-12 col-md-6">
                                <div className="form-group">
                                    <div className="col-xs-12 col-md-offset-4 col-md-8">
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    {...props.fields.virtual}
                                                    type="checkbox"
                                                />
                                                Є "віртуальною посадою"
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

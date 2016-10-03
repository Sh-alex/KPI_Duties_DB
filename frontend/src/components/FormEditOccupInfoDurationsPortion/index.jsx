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
                    <div className="col-sm-6">
                        <div className={startStateDateFormGroupClass}>
                            <label
                                htmlFor={"inp-occupation-start-date--"+props.portionKey}
                                className="col-sm-4 control-label"
                            >
                                Дата створення посади
                            </label>
                            <div className="col-sm-8">
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
                    <div className="col-sm-6">
                        <div className={stopFormGroupClass}>
                            <label
                                htmlFor={"inp-occupation-stop-date--"+props.portionKey}
                                className="col-sm-4 control-label"
                            >
                                Дата відміни посади
                            </label>
                            <div className="col-sm-8">
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
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <div className="col-xs-12 col-sm-offset-4 col-sm-8">
                                <div className="checkbox">
                                    <label>
                                        <input {...props.fields.inKpi} type="checkbox" />
                                        В КПІ
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <div className="col-xs-12 col-sm-offset-4 col-sm-8">
                                <div className="checkbox">
                                    <label>
                                        <input {...props.fields.isVirtual} type="checkbox" />
                                        Є "віртуальною посадою"
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

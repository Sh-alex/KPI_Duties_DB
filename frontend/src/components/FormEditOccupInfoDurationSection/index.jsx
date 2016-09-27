import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import classNames from "classnames"

import {OCCUPATION_MIN_DATE} from "../../constants/common";
import "./styles.less";

export default function FormEditOccupInfoDurationSection(props){
    let fixBlur = (event, input) => {
            event.target = {value: input.value};
            input.onBlur(event);
        },
        crInStateDateError = props.durationFields.creatingInStateDate.touched && props.durationFields.creatingInStateDate.error,
        crInKPIDateError = props.durationFields.creatingInKPIDate.touched && props.durationFields.creatingInKPIDate.error,
        cancelingInStateDateError = props.durationFields.cancelingInStateDate.touched && props.durationFields.cancelingInStateDate.error,
        cancelingInKPIDateError = props.durationFields.cancelingInKPIDate.touched && props.durationFields.cancelingInKPIDate.error,
        crInStateDateFormGroupClass = classNames({
            'form-group': true,
            'has-error': crInStateDateError,
            'has-success': props.durationFields.creatingInStateDate.touched && !props.durationFields.creatingInStateDate.error
        }),
        crInKPIDateFormGroupClass = classNames({
            'form-group': true,
            'has-error': crInKPIDateError,
            'has-success': props.durationFields.creatingInKPIDate.touched && !props.durationFields.creatingInKPIDate.error
        }),
        cancelingInStateDateFormGroupClass = classNames({
            'form-group': true,
            'has-error': cancelingInStateDateError,
            'has-success': props.durationFields.cancelingInStateDate.touched && !props.durationFields.cancelingInStateDate.error
        }),
        cancelingInKPIDateFormGroupClass = classNames({
            'form-group': true,
            'has-error': cancelingInKPIDateError,
            'has-success': props.durationFields.cancelingInKPIDate.touched && !props.durationFields.cancelingInKPIDate.error
        }),
        creatingInStateDateValue = props.durationFields.creatingInStateDate.value &&
            (new Date(props.durationFields.creatingInStateDate.value) !== "Invalid Date") &&
            new Date(props.durationFields.creatingInStateDate.value) || null,
        creatingInKPIDateValue = props.durationFields.creatingInKPIDate.value &&
            (new Date(props.durationFields.creatingInKPIDate.value) !== "Invalid Date") &&
            new Date(props.durationFields.creatingInKPIDate.value) || null,
        cancelingInStateDateValue = props.durationFields.cancelingInStateDate.value &&
            (new Date(props.durationFields.cancelingInStateDate.value) !== "Invalid Date") &&
            new Date(props.durationFields.cancelingInStateDate.value) || null,
        cancelingInKPIDateValue = props.durationFields.cancelingInKPIDate.value &&
            (new Date(props.durationFields.cancelingInKPIDate.value) !== "Invalid Date") &&
            new Date(props.durationFields.cancelingInKPIDate.value) || null;

    return (
        <div>
            <h4> Терміни дії посади </h4>
            <div className="row">
                <div className="col-sm-6">
                    <div className={crInStateDateFormGroupClass}>
                        <label htmlFor="inp-occupation-creating-in-state" className="col-sm-4 control-label">
                            Дата створення посади в державі
                        </label>
                        <div className="col-sm-8">
                            <DateTimePicker
                                {...props.durationFields.creatingInStateDate}
                                type="date"
                                format="DD.MM.YYYY"
                                value={creatingInStateDateValue}
                                defaultValue={null}
                                onChange={props.durationFields.creatingInStateDate.onChange}
                                onBlur={(event) => fixBlur(event, props.durationFields.creatingInStateDate)}
                                id="inp-occupation-creating-in-state"
                                placeholder="Дата створення посади в державі"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block"> { crInStateDateError } </span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className={crInKPIDateFormGroupClass}>
                        <label htmlFor="inp-occupation-creating-in-kpi" className="col-sm-4 control-label">
                            Дата створення посади в КПІ
                        </label>
                        <div className="col-sm-8">
                            <DateTimePicker
                                {...props.durationFields.creatingInKPIDate}
                                type="date"
                                format="DD.MM.YYYY"
                                value={creatingInKPIDateValue}
                                defaultValue={null}
                                onChange={props.durationFields.creatingInKPIDate.onChange}
                                onBlur={(event) => fixBlur(event, props.durationFields.creatingInKPIDate)}
                                id="inp-occupation-creating-in-kpi"
                                placeholder="Дата створення посади в КПІ"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block"> { crInKPIDateError } </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className={cancelingInStateDateFormGroupClass}>
                        <label htmlFor="inp-occupation-creating-in-state" className="col-sm-4 control-label">
                            Дата відміни посади в державі
                        </label>
                        <div className="col-sm-8">
                            <DateTimePicker
                                {...props.durationFields.cancelingInStateDate}
                                type="date"
                                format="DD.MM.YYYY"
                                value={cancelingInStateDateValue}
                                defaultValue={null}
                                onChange={props.durationFields.cancelingInStateDate.onChange}
                                onBlur={(event) => fixBlur(event, props.durationFields.cancelingInStateDate)}
                                id="inp-occupation-creating-in-state"
                                placeholder="Дата відміни посади в державі"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block"> { cancelingInStateDateError } </span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className={cancelingInKPIDateFormGroupClass}>
                        <label htmlFor="inp-occupation-creating-in-kpi" className="col-sm-4 control-label">
                            Дата відміни посади в КПІ
                        </label>
                        <div className="col-sm-8">
                            <DateTimePicker
                                {...props.durationFields.cancelingInKPIDate}
                                type="date"
                                format="DD.MM.YYYY"
                                value={cancelingInKPIDateValue}
                                defaultValue={null}
                                onChange={props.durationFields.cancelingInKPIDate.onChange}
                                onBlur={(event) => fixBlur(event, props.durationFields.cancelingInKPIDate)}
                                id="inp-occupation-creating-in-kpi"
                                placeholder="Дата відміни посади в КПІ"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block"> { cancelingInKPIDateError } </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}

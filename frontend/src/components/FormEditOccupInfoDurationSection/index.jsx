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
        durationFieldsError = props.durationFields.creatingInStateDate.touched && props.durationFields.creatingInKPIDate.touched && props.durationFields.error,
        durationFormGroupClass = classNames({
            'form-group': true,
            'has-warning': durationFieldsError
        }),
        creatingInStateDateValue = props.durationFields.creatingInStateDate.value &&
            (new Date(props.durationFields.creatingInStateDate.value) !== "Invalid Date") &&
            new Date(props.durationFields.creatingInStateDate.value) || null,
        creatingInKPIDateValue = props.durationFields.creatingInKPIDate.value &&
            (new Date(props.durationFields.creatingInKPIDate.value) !== "Invalid Date") &&
            new Date(props.durationFields.creatingInKPIDate.value) || null,
        cancelingDates;

    if(props.durationFields.cancelingInKPIDate && props.durationFields.cancelingInStateDate) {
        let cancelingInStateDateValue = props.durationFields.cancelingInStateDate.value &&
                (new Date(props.durationFields.cancelingInStateDate.value) !== "Invalid Date") &&
                new Date(props.durationFields.cancelingInStateDate.value) || null,
            cancelingInKPIDateValue = props.durationFields.cancelingInKPIDate.value &&
                (new Date(props.durationFields.cancelingInKPIDate.value) !== "Invalid Date") &&
                new Date(props.durationFields.cancelingInKPIDate.value) || null;
        cancelingDates = (
            <div className="row">
                <div className="col-sm-6">
                    <div className={durationFormGroupClass}>
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
                            <span className="help-block"> { durationFieldsError } </span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className={durationFormGroupClass}>
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
                            <span className="help-block"> { durationFieldsError } </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h4> Терміни дії посади </h4>
            <div className="row">
                <div className="col-sm-6">
                    <div className={durationFormGroupClass}>
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
                            <span className="help-block"> { durationFieldsError } </span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className={durationFormGroupClass}>
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
                            <span className="help-block"> { durationFieldsError } </span>
                        </div>
                    </div>
                </div>
            </div>
            { cancelingDates }
            <hr />
        </div>
    );
}

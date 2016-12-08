import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";
import classNames from "classnames"
import {OCCUPATION_MIN_DATE} from "../../constants/common";
import "./styles.less";

export default function FormEditOccupInfoDescriptionTextPortion(props) {
    let TopCtrlPart = props.showDelBtn ? (
        <div>
            <hr />
            <button
                type="button"
                className="close inp-portions__btn-amount-ctrl--del"
                onClick={props.handleDelPortionBtnClick} >
                <span aria-hidden={true}>&times;</span>
            </button>
        </div>
    ) : "",
        BtnAddInfoFromAnotherOccup = props.showBtnAddInfoFromAnotherOccupations ? (
            <button
                type="button"
                title="Додати інформацію з аналогічної посади"
                className="btn btn-default btn-flat btn-add-info-from-another-occup"
                onClick={props.handleBtnAddInfoFromAnotherOccupClick}
            >
                <i className="fa fa-link" />
            </button>
        ) : null;

    let portionStartDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.fields.portionStartDate.touched && props.fields.portionStartDate.error,
            'has-success': props.fields.portionStartDate.touched && !props.fields.portionStartDate.error
        }),
        portionEndDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.fields.portionEndDate.touched && props.fields.portionEndDate.error,
            'has-success': props.fields.portionEndDate.touched && !props.fields.portionEndDate.error
        }),
        portionTextFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.fields.text.touched && props.fields.text.error,
            'has-success': props.fields.text.touched && !props.fields.text.error
        }),
        portionStartDateValue = props.fields.portionStartDate.value &&
            (new Date(props.fields.portionStartDate.value) !== "Invalid Date") &&
            new Date(props.fields.portionStartDate.value) || null,
        portionEndDateValue = props.fields.portionEndDate.value &&
            (new Date(props.fields.portionEndDate.value) !== "Invalid Date") &&
            new Date(props.fields.portionEndDate.value) || null,
        updateRelative = props.fields.updateTextInRelativeOccup &&
            props.fields.updateTextInRelativeOccup.value,
        occupationsUsingText = props.fields.occupationsUsingText &&
            props.fields.occupationsUsingText.value || "",
        showBtnUpdateRelative = occupationsUsingText && props.fields.updateTextInRelativeOccup &&
            (props.fields.updateTextInRelativeOccup.value !== -1);

    return (
        <div className={`inp-portions__item ${props.portionItemClassName}`}>
            {TopCtrlPart}
            <div className="clearfix">
                <div className="col-xs-12 col-md-8">
                    <div className={portionTextFormGroupClass}>
                        <div className={props.showBtnAddInfoFromAnotherOccupations ? "input-group" : ""}>
                            <input
                                type="hidden"
                                {...props.fields.idText} />
                            <textarea
                                onBlur={props.handleTextBlur}
                                value={props.textValue}
                                onChange={ e => props.handleTextChange(e.target.value) }
                                className="form-control"
                                placeholder={"Введіть тут текст про " + props.headline}
                                rows="6" />
                            <div className={"input-group-btn"}>
                                { BtnAddInfoFromAnotherOccup }
                                <br/>
                                {
                                    showBtnUpdateRelative && (
                                        <label
                                            className={`btn btn-default btn-flat should-update-in-other-occup ${updateRelative ? "active" : ""}`}
                                            title={"Оновити також цей текст у посадах які використвоують його: " + occupationsUsingText }
                                        >
                                            <input
                                                {...props.fields.updateTextInRelativeOccup}
                                                type="checkbox"
                                                autoComplete="off"
                                                className="hidden"
                                            />
                                            {updateRelative ? [<i className="fa fa-check" key={Math.random()}/>, " "] : ""}
                                            <i className="fa fa-fast-forward"/>
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <span className="help-block">
                            { props.fields.text.touched && props.fields.text.error }
                        </span>
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <input
                        type="hidden"
                        {...props.fields.idDates} />
                    <div className={portionStartDateFormGroupClass}>
                        <label className="center-block">
                            Дата прийняття тексту <br />
                            <DateTimePicker
                                {...props.fields.portionStartDate}
                                format="DD.MM.YYYY"
                                value={portionStartDateValue}
                                defaultValue={null}
                                onChange={props.fields.portionStartDate.onChange}
                                onBlur={(event) => fixBlur(event, props.fields.portionStartDate)}
                                placeholder="Дата прийняття тексту"
                                time={false}
                                min={OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block">
                                { props.fields.portionStartDate.touched && props.fields.portionStartDate.error }
                            </span>
                        </label>
                    </div>
                    <div className={portionEndDateFormGroupClass}>
                        <label className="center-block">
                            Дата припинення дії тексту <br />
                            <DateTimePicker
                                {...props.fields.portionEndDate}
                                format="DD.MM.YYYY"
                                value={portionEndDateValue}
                                defaultValue={null}
                                onChange={props.fields.portionEndDate.onChange}
                                onBlur={(event) => fixBlur(event, props.fields.portionEndDate)}
                                placeholder="Дата припинення дії тексту"
                                time={false}
                                min={portionStartDateValue || OCCUPATION_MIN_DATE}
                                max={new Date()} />
                            <span className="help-block">
                                { props.fields.portionEndDate.touched && props.fields.portionEndDate.error }
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

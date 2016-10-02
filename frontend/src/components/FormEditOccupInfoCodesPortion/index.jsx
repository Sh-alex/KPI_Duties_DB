import React, { Component } from 'react'
import { DateTimePicker, DropdownList } from 'react-widgets'
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur"
import classNames from "classnames"
import { OCCUPATION_MIN_DATE } from "../../constants/common"
import './styles.less'

export default function FormEditOccupInfoCodesPortion(props) {
    let topCtrlPart = props.showDelBtn ? (
            <div>
                <hr />
                <button
                    type="button"
                    className="close inp-portions__btn-amount-ctrl--del"
                    onClick={props.handleDelCodesPortionBtnClick} >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        ) : "",
        portionStartDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.codesPortionFields.portionStartDate.touched && props.codesPortionFields.portionStartDate.error,
            'has-success': props.codesPortionFields.portionStartDate.touched && !props.codesPortionFields.portionStartDate.error
        }),
        portionEndDateFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.codesPortionFields.portionEndDate.touched && props.codesPortionFields.portionEndDate.error,
            'has-success': props.codesPortionFields.portionEndDate.touched && !props.codesPortionFields.portionEndDate.error
        }),
        codeKPFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.KPCodesList.errors && props.KPCodesList.errors.length || props.codesPortionFields.codeKP.touched && props.codesPortionFields.codeKP.error,
            'has-success': props.codesPortionFields.codeKP.touched && !props.codesPortionFields.codeKP.error && !props.KPCodesList.errors.length
        }),
        codeETDKFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.ETDKCodesList.errors && props.ETDKCodesList.errors.length || props.codesPortionFields.codeETDK.touched && props.codesPortionFields.codeETDK.error,
            'has-success': props.codesPortionFields.codeETDK.touched && !props.codesPortionFields.codeETDK.error && !props.ETDKCodesList.errors.length
        }),
        codeDKHPFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.DKHPCodesList.errors && props.DKHPCodesList.errors.length || props.codesPortionFields.codeDKHP.touched && props.codesPortionFields.codeDKHP.error,
            'has-success': props.codesPortionFields.codeDKHP.touched && !props.codesPortionFields.codeDKHP.error && !props.DKHPCodesList.errors.length
        }),
        codeZKPPTRFormGroupClass = classNames({
            'form-group': true,
            'has-error':  props.ZKPPTRCodesList.errors && props.ZKPPTRCodesList.errors.length || props.codesPortionFields.codeZKPPTR.touched && props.codesPortionFields.codeZKPPTR.error,
            'has-success': props.codesPortionFields.codeZKPPTR.touched && !props.codesPortionFields.codeZKPPTR.error && !props.ZKPPTRCodesList.errors.length
        }),
        portionStartDateValue = props.codesPortionFields.portionStartDate.value &&
            (new Date(props.codesPortionFields.portionStartDate.value) !== "Invalid Date") &&
            new Date(props.codesPortionFields.portionStartDate.value) || null,
        portionEndDateValue = props.codesPortionFields.portionEndDate.value &&
            (new Date(props.codesPortionFields.portionEndDate.value) !== "Invalid Date") &&
            new Date(props.codesPortionFields.portionEndDate.value) || null;

    return <div className={`inp-portions__item ${props.portionItemClassName}`}>
        {topCtrlPart}
        <div className="row">
            <input
                type="hidden"
                {...props.codesPortionFields.id} />
            <div className="col-sm-6">
                <div className={portionStartDateFormGroupClass}>
                    <label htmlFor={"inp-codes-portion-start-date"+props.portionKey} className="col-sm-4 control-label">
                        Дата прийняття набору кодів
                    </label>
                    <div className="col-sm-8">
                        <DateTimePicker
                            {...props.codesPortionFields.portionStartDate}
                            type="date"
                            format="DD.MM.YYYY"
                            value={portionStartDateValue}
                            defaultValue={null}
                            onChange={props.codesPortionFields.portionStartDate.onChange}
                            onBlur={(event) => fixBlur(event, props.codesPortionFields.portionStartDate)}
                            id={"inp-codes-portion-start-date"+props.portionKey}
                            placeholder="Дата прийняття набору кодів"
                            time={false}
                            min={OCCUPATION_MIN_DATE}
                            max={new Date()} />
                        <span className="help-block">
                            { props.codesPortionFields.portionStartDate.touched && props.codesPortionFields.portionStartDate.error }
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className={portionEndDateFormGroupClass}>
                    <label htmlFor={"inp-codes-portion-stop-date"+props.portionKey} className="col-sm-4 control-label">
                        Дата припинення дії набору кодів
                    </label>
                    <div className="col-sm-8">
                        <DateTimePicker
                            {...props.codesPortionFields.portionEndDate}
                            format="DD.MM.YYYY"
                            value={portionEndDateValue}
                            defaultValue={null}
                            onChange={props.codesPortionFields.portionEndDate.onChange}
                            onBlur={(event) => fixBlur(event, props.codesPortionFields.portionEndDate)}
                            id={"inp-codes-portion-stop-date"+props.portionKey}
                            placeholder="Дата припинення дії набору кодів"
                            time={false}
                            min={portionStartDateValue || OCCUPATION_MIN_DATE}
                            max={new Date()} />
                        <span className="help-block">
                            { props.codesPortionFields.portionEndDate.touched && props.codesPortionFields.portionEndDate.error }
                       </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6">
                <div className={codeKPFormGroupClass}>
                    <label htmlFor={"inp-code-KP"+props.portionKey} className="col-sm-4 control-label">
                        Код КП
                    </label>
                    <div className="col-sm-8">
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.codesPortionFields.codeKP} />
                            <DropdownList
                                {...props.codesPortionFields.codeKPText}
                                id={"inp-code-KP"+props.portionKey}
                                placeholder="Оберіть варіант зі списку"
                                messages={{
                                    emptyList:"Список пустий",
                                    emptyFilter: "Не знайдено жодного елементу"
                                }}
                                data={props.KPCodesList.items}
                                valueField='id'
                                textField='textValue'
                                defaultValue={null}
                                onChange={
                                    newVal => {
                                        props.codesPortionFields.codeKP.onChange(newVal.id);
                                        props.codesPortionFields.codeKPText.onChange(newVal.textValue);
                                    }
                                }
                                busy={props.KPCodesList.isFetching}
                                caseSensitive={false}
                                filter='startsWith' />
                            <div className="input-group-btn">
                                <button
                                    type="button"
                                    title="Додати нове значення у цей список кодів"
                                    className="btn btn-default btn-flat"
                                    onClick={props.openModalAddNewKPCode} >
                                    +1
                                </button>
                            </div>
                        </div>
                        <span className="help-block">
                            {
                                props.KPCodesList.errors && props.KPCodesList.errors.length && props.KPCodesList.errors.map( err => <span> {err} <br /> </span>)  ||
                                props.codesPortionFields.codeKP.touched && props.codesPortionFields.codeKP.error
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className={codeZKPPTRFormGroupClass}>
                    <label htmlFor={"inp-code-ZKPPTR"+props.portionKey} className="col-sm-4 control-label">
                        Код ЗКППТР
                    </label>
                    <div className="col-sm-8">
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.codesPortionFields.codeZKPPTR} />
                            <DropdownList
                                {...props.codesPortionFields.codeZKPPTRText}
                                id={"inp-code-ZKPPTR"+props.portionKey}
                                placeholder="Оберіть варіант зі списку"
                                messages={{
                                    emptyList:"Список пустий",
                                    emptyFilter: "Не знайдено жодного елементу"
                                }}
                                data={props.ZKPPTRCodesList.items}
                                valueField='id'
                                textField='textValue'
                                defaultValue={null}
                                onChange={
                                    newVal => {
                                        props.codesPortionFields.codeZKPPTR.onChange(newVal.id);
                                        props.codesPortionFields.codeZKPPTRText.onChange(newVal.textValue);
                                    }
                                }
                                busy={props.ZKPPTRCodesList.isFetching}
                                caseSensitive={false}
                                filter='startsWith' />
                            <div className="input-group-btn">
                                <button
                                    type="button"
                                    title="Додати нове значення у цей список кодів"
                                    className="btn btn-default btn-flat"
                                    onClick={props.openModalAddNewZKPPTRCode} >
                                    +1
                                </button>
                            </div>
                        </div>
                        <span className="help-block">
                            {
                                props.ZKPPTRCodesList.errors && props.ZKPPTRCodesList.errors.length && props.ZKPPTRCodesList.errors.map( err => <span> {err} <br /> </span>)  ||
                                props.codesPortionFields.codeZKPPTR.touched && props.codesPortionFields.codeZKPPTR.error
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-6">
                <div className={codeETDKFormGroupClass}>
                    <label htmlFor={"inp-code-ETDK"+props.portionKey} className="col-sm-4 control-label">
                        Код ЄТДК
                    </label>
                    <div className="col-sm-8">
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.codesPortionFields.codeETDK} />
                            <DropdownList
                                {...props.codesPortionFields.codeETDKText}
                                id={"inp-code-ETDK"+props.portionKey}
                                placeholder="Оберіть варіант зі списку"
                                messages={{
                                    emptyList:"Список пустий",
                                    emptyFilter: "Не знайдено жодного елементу"
                                }}
                                data={props.ETDKCodesList.items}
                                valueField='id'
                                textField='textValue'
                                defaultValue={null}
                                onChange={
                                    newVal => {
                                        props.codesPortionFields.codeETDK.onChange(newVal.id);
                                        props.codesPortionFields.codeETDKText.onChange(newVal.textValue);
                                    }
                                }
                                busy={props.ETDKCodesList.isFetching}
                                caseSensitive={false}
                                filter='startsWith' />
                            <div className="input-group-btn">
                                <button
                                    type="button"
                                    title="Додати нове значення у цей список кодів"
                                    className="btn btn-default btn-flat"
                                    onClick={props.openModalAddNewETDKCode} >
                                    +1
                                </button>
                            </div>
                        </div>
                        <span className="help-block">
                            {
                                props.ETDKCodesList.errors && props.ETDKCodesList.errors.length && props.ETDKCodesList.errors.map( err => <span> {err} <br /> </span>)  ||
                                props.codesPortionFields.codeETDK.touched && props.codesPortionFields.codeETDK.error
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className={codeDKHPFormGroupClass}>
                    <label htmlFor={"inp-code-DKHP"+props.portionKey} className="col-sm-4 control-label">
                        Код ДКХП
                    </label>
                    <div className="col-sm-8">
                        <div className="input-group">
                            <input
                                type="hidden"
                                {...props.codesPortionFields.codeDKHP} />
                            <DropdownList
                                {...props.codesPortionFields.codeDKHPText}
                                id={"inp-code-DKHP"+props.portionKey}
                                placeholder="Оберіть варіант зі списку"
                                messages={{
                                    emptyList:"Список пустий",
                                    emptyFilter: "Не знайдено жодного елементу"
                                }}
                                data={props.DKHPCodesList.items}
                                valueField='id'
                                textField='textValue'
                                defaultValue={null}
                                onChange={
                                    newVal => {
                                        props.codesPortionFields.codeDKHP.onChange(newVal.id);
                                        props.codesPortionFields.codeDKHPText.onChange(newVal.textValue);
                                    }
                                }
                                busy={props.DKHPCodesList.isFetching}
                                caseSensitive={false}
                                filter='startsWith' />
                            <div className="input-group-btn">
                                <button
                                    type="button"
                                    title="Додати нове значення у цей список кодів"
                                    className="btn btn-default btn-flat"
                                    onClick={props.openModalAddNewDKHPCode} >
                                    +1
                                </button>
                            </div>
                        </div>
                        <span className="help-block">
                            {
                                props.DKHPCodesList.errors && props.DKHPCodesList.errors.length && props.DKHPCodesList.errors.map( err => <span> {err} <br /> </span>)  ||
                                props.codesPortionFields.codeDKHP.touched && props.codesPortionFields.codeDKHP.error
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

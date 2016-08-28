import React, { Component } from 'react'
import { DateTimePicker, DropdownList } from 'react-widgets'
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur"
import { OCCUPATION_MIN_DATE } from "../../constants/common"
import './styles.less'

export default class extends Component {
    render() {
        let topCtrlPart = this.props.showDelBtn ? (
            <div>
                <hr />
                <button
                    type="button"
                    className="close inp-portions__btn-amount-ctrl--del"
                    onClick={this.props.handleDelCodesPortionBtnClick} >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        ) : "";

        return <div className={`inp-portions__item ${this.props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="form-group">
                <label htmlFor={"inp-codes-portion-start-date"+this.props.portionKey} className="col-sm-2 control-label">
                    Дата прийняття набору кодів
                </label>
                <div className="col-sm-4">
                    <DateTimePicker
                        {...this.props.codesPortionFields.portionStartDate}
                        type="date"
                        format="DD.MM.YYYY"
                        value={this.props.codesPortionFields.portionStartDate.value}
                        defaultValue={null}
                        onChange={this.props.codesPortionFields.portionStartDate.onChange}
                        onBlur={(event) => fixBlur(event, this.props.codesPortionFields.portionStartDate)}
                        id={"inp-codes-portion-start-date"+this.props.portionKey}
                        placeholder="Дата прийняття набору кодів"
                        time={false}
                        min={OCCUPATION_MIN_DATE}
                        max={new Date()} />
                </div>
                <label htmlFor={"inp-codes-portion-stop-date"+this.props.portionKey} className="col-sm-2 control-label">
                    Дата припинення дії набору кодів
                </label>
                <div className="col-sm-4">
                    <DateTimePicker
                        {...this.props.codesPortionFields.portionEndDate}
                        format="DD.MM.YYYY"
                        value={this.props.codesPortionFields.portionEndDate.value}
                        defaultValue={null}
                        onChange={this.props.codesPortionFields.portionEndDate.onChange}
                        onBlur={(event) => fixBlur(event, this.props.codesPortionFields.portionEndDate)}
                        id={"inp-codes-portion-stop-date"+this.props.portionKey}
                        placeholder="Дата припинення дії набору кодів"
                        time={false}
                        min={OCCUPATION_MIN_DATE}
                        max={new Date()} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={"inp-code-KP"+this.props.portionKey} className="col-sm-2 control-label">
                    Код КП
                </label>
                <div className="col-sm-4">
                    <div className="input-group">
                        <DropdownList
                            {...this.props.codesPortionFields.codeKP}
                            id={"inp-code-KP"+this.props.portionKey}
                            placeholder="Оберіть варіант зі списку"
                            data={this.props.KPCodesList.items}
                            valueField='id'
                            textField='textValue'
                            defaultValue={null}
                            onChange={ newVal => this.props.codesPortionFields.codeKP.onChange(newVal.id) }
                            busy={this.props.KPCodesList.isFetching}
                            caseSensitive={false}
                            filter='startsWith' />
                        <div className="input-group-btn">
                            <button
                                type="button"
                                title="Додати нове значення у цей список кодів"
                                className="btn btn-default btn-flat"
                                onClick={this.props.openModalAddNewOccupKeyWord} >
                                +1
                            </button>
                        </div>
                    </div>
                </div>
                <label htmlFor={"inp-code-ZKPPTR"+this.props.portionKey} className="col-sm-2 control-label">
                    Код ЗКППТР
                </label>
                <div className="col-sm-4">
                    <div className="input-group">
                        <DropdownList
                            {...this.props.codesPortionFields.codeZKPPTR}
                            id={"inp-code-ZKPPTR"+this.props.portionKey}
                            placeholder="Оберіть варіант зі списку"
                            data={this.props.ZKPPTRCodesList.items}
                            valueField='id'
                            textField='textValue'
                            defaultValue={null}
                            onChange={ newVal => this.props.codesPortionFields.codeZKPPTR.onChange(newVal.id) }
                            busy={this.props.ZKPPTRCodesList.isFetching}
                            caseSensitive={false}
                            filter='startsWith' />
                        <div className="input-group-btn">
                            <button
                                type="button"
                                title="Додати нове значення у цей список кодів"
                                className="btn btn-default btn-flat"
                                onClick={this.props.openModalAddNewOccupKeyWord} >
                                +1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={"inp-code-ETDK"+this.props.portionKey} className="col-sm-2 control-label">
                    Код ЄТДК
                </label>
                <div className="col-sm-4">
                    <div className="input-group">
                        <DropdownList
                            {...this.props.codesPortionFields.codeETDK}
                            id={"inp-code-ETDK"+this.props.portionKey}
                            placeholder="Оберіть варіант зі списку"
                            data={this.props.ETDKCodesList.items}
                            valueField='id'
                            textField='textValue'
                            defaultValue={null}
                            onChange={ newVal => this.props.codesPortionFields.codeETDK.onChange(newVal.id) }
                            busy={this.props.ETDKCodesList.isFetching}
                            caseSensitive={false}
                            filter='startsWith' />
                        <div className="input-group-btn">
                            <button
                                type="button"
                                title="Додати нове значення у цей список кодів"
                                className="btn btn-default btn-flat"
                                onClick={this.props.openModalAddNewOccupKeyWord} >
                                +1
                            </button>
                        </div>
                    </div>
                </div>
                <label htmlFor={"inp-code-DKHP"+this.props.portionKey} className="col-sm-2 control-label">
                    Код ДКХП
                </label>
                <div className="col-sm-4">
                    <div className="input-group">
                        <DropdownList
                            {...this.props.codesPortionFields.codeDKHP}
                            id={"inp-code-DKHP"+this.props.portionKey}
                            placeholder="Оберіть варіант зі списку"
                            data={this.props.DKHPCodesList.items}
                            valueField='id'
                            textField='textValue'
                            defaultValue={null}
                            onChange={ newVal => this.props.codesPortionFields.codeDKHP.onChange(newVal.id) }
                            busy={this.props.DKHPCodesList.isFetching}
                            caseSensitive={false}
                            filter='startsWith' />
                        <div className="input-group-btn">
                            <button
                                type="button"
                                title="Додати нове значення у цей список кодів"
                                className="btn btn-default btn-flat"
                                onClick={this.props.openModalAddNewOccupKeyWord} >
                                +1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

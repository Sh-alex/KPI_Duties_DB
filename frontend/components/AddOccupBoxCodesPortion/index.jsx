import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";
import {OCCUPATION_MIN_DATE} from "../../constants/common";
import "./styles.less";

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
                    <input
                        {...this.props.codesPortionFields.codeKP}
                        type="text"
                        className="form-control"
                        id={"inp-code-KP"+this.props.portionKey}
                        placeholder="Код КП" />
                </div>
                <label htmlFor={"inp-code-ZKPPTR"+this.props.portionKey} className="col-sm-2 control-label">
                    Код ЗКППТР
                </label>
                <div className="col-sm-4">
                    <input
                        {...this.props.codesPortionFields.codeZKPPTR}
                        type="text"
                        className="form-control"
                        id={"inp-code-ZKPPTR"+this.props.portionKey}
                        placeholder="Код ЗКППТР" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={"inp-code-ETDK"+this.props.portionKey} className="col-sm-2 control-label">
                    Код ЄТДК
                </label>
                <div className="col-sm-4">
                    <input
                        {...this.props.codesPortionFields.codeETDK}
                        type="text"
                        className="form-control"
                        id={"inp-code-ETDK"+this.props.portionKey}
                        placeholder="Код ЄТДК" />
                </div>
                <label htmlFor={"inp-code-DKHP"+this.props.portionKey} className="col-sm-2 control-label">
                    Код ДКХП
                </label>
                <div className="col-sm-4">
                    <input
                        {...this.props.codesPortionFields.codeDKHP}
                        type="text"
                        className="form-control"
                        id={"inp-code-DKHP"+this.props.portionKey}
                        placeholder="Код ДКХП" />
                </div>
            </div>
        </div>
    }
}

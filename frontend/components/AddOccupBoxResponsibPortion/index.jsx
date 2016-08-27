import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'
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
                        onClick={this.props.handleDelResponsibPortionBtnClick} >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            ) : "";

        return <div className={`inp-portions__item ${this.props.portionItemClassName}`}>
            {topCtrlPart}
            <div className="form-group">
                <div className="col-sm-8">
                    <div className="input-group">
                        <textarea
                            {...this.props.responsibPortionFields.text}
                            className="form-control" 
                            placeholder="Завдання, обов'язки та повноваження" 
                            rows="6" />
                        <div className="input-group-btn">
                            <button 
                                type="button" 
                                title="Додати інформацію з аналогічної посади" 
                                className="btn btn-default btn-flat" 
                                data-toggle="modal" 
                                data-target=".modal-add-info-from-related"
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
                            {...this.props.responsibPortionFields.portionStartDate}
                            format="DD.MM.YYYY"
                            value={this.props.responsibPortionFields.portionStartDate.value}
                            defaultValue={null}
                            onChange={this.props.responsibPortionFields.portionStartDate.onChange}
                            onBlur={(event) => fixBlur(event, this.props.responsibPortionFields.portionStartDate)}
                            placeholder="Дата прийняття тексту"
                            time={false}
                            min={OCCUPATION_MIN_DATE}
                            max={new Date()} />
                    </label>
                    <label className="center-block">
                        Дата припинення дії тексту <br />
                        <DateTimePicker
                            {...this.props.responsibPortionFields.portionEndDate}
                            format="DD.MM.YYYY"
                            value={this.props.responsibPortionFields.portionEndDate.value}
                            defaultValue={null}
                            onChange={this.props.responsibPortionFields.portionEndDate.onChange}
                            onBlur={(event) => fixBlur(event, this.props.responsibPortionFields.portionEndDate)}
                            placeholder="Дата припинення дії тексту"
                            time={false}
                            min={OCCUPATION_MIN_DATE}
                            max={new Date()} />
                    </label>
                </div>
            </div>
        </div>
    }
}

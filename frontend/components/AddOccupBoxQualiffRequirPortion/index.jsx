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
                    onClick={this.props.handleDelQualiffRequirPortionBtnClick} >
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
                            {...this.props.qualiffRequirPortionFields.text}
                            className="form-control"
                            placeholder="Кваліфікаційні вимоги"
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
                            {...this.props.qualiffRequirPortionFields.portionStartDate}
                            format="DD.MM.YYYY"
                            value={this.props.qualiffRequirPortionFields.portionStartDate.value}
                            defaultValue={null}
                            onChange={this.props.qualiffRequirPortionFields.portionStartDate.onChange}
                            onBlur={(event) => fixBlur(event, this.props.qualiffRequirPortionFields.portionStartDate)}
                            placeholder="Дата прийняття тексту"
                            time={false}
                            min={OCCUPATION_MIN_DATE}
                            max={new Date()} />
                    </label>
                    <label className="center-block">
                        Дата припинення дії тексту <br />
                        <DateTimePicker
                            {...this.props.qualiffRequirPortionFields.portionEndDate}
                            format="DD.MM.YYYY"
                            value={this.props.qualiffRequirPortionFields.portionEndDate.value}
                            defaultValue={null}
                            onChange={this.props.qualiffRequirPortionFields.portionEndDate.onChange}
                            onBlur={(event) => fixBlur(event, this.props.qualiffRequirPortionFields.portionEndDate)}
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

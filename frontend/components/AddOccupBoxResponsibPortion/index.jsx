import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'

import './styles.less'

export default class extends Component {
  render() {
    let topCtrlPart = this.props.isFirst ? "" : (
        <div>
          <hr />
          <button type="button" className="close inp-portions__btn-amount-ctrl--del">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    );
    
    return <div className="inp-portions__item">
      {topCtrlPart}
      <div className="form-group">
        <div className="col-sm-8">
          <div className="input-group">
            <textarea className="form-control" placeholder="Завдання, обов'язки та повноваження" rows="6" />
            <div className="input-group-btn">
              <button type="button" title="Додати інформацію з аналогічної посади" className="btn btn-default btn-flat" data-toggle="modal" data-target=".modal-add-info-from-related">
                <i className="fa fa-link" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <label className="center-block">
            Дата прийняття тексту <br />
              <DateTimePicker
                  id="inp-codes-portion-start-date"
                  placeholder="Дата прийняття тексту"
                  time={false}
                  min={new Date("1992-01-01")}
                  max={new Date()} />
          </label>
          <label className="center-block">
            Дата припинення дії тексту <br />
            <DateTimePicker
                id="inp-codes-portion-start-date"
                placeholder="Дата припинення дії тексту"
                time={false}
                min={new Date("1992-01-01")}
                max={new Date()} />
          </label>
        </div>
      </div>
    </div>
  }
}

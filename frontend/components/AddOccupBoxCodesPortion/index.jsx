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
        <label htmlFor="inp-codes-portion-start-date" className="col-sm-2 control-label">
          Дата прийняття набору кодів
        </label>
        <div className="col-sm-4">
          <DateTimePicker
              id="inp-codes-portion-start-date"
              placeholder="Дата прийняття набору кодів"
              time={false}
              min={new Date("1992-01-01")}
              max={new Date()} />
        </div>
        <label htmlFor="inp-codes-portion-stop-date" className="col-sm-2 control-label">
          Дата припинення дії набору кодів
        </label>
        <div className="col-sm-4">
          <DateTimePicker
              id="inp-codes-portion-stop-date"
              placeholder="Дата припинення дії набору кодів"
              time={false}
              min={new Date("1992-01-01")}
              max={new Date()} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inp-code-KP" className="col-sm-2 control-label">
          Код КП
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="inp-code-KP" placeholder="Код КП" />
        </div>
        <label htmlFor="inp-code-ZKPPTR" className="col-sm-2 control-label">
          Код ЗКППТР
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="inp-code-ZKPPTR" placeholder="Код ЗКППТР" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inp-code-ETDK" className="col-sm-2 control-label">
          Код ЄТДК
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="inp-code-ETDK" placeholder="Код ЄТДК" />
        </div>
        <label htmlFor="inp-code-DKHP" className="col-sm-2 control-label">
          Код ДКХП
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="inp-code-DKHP" placeholder="Код ДКХП" />
        </div>
      </div>
    </div>
  }
}

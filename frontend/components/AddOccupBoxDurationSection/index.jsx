import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'

import './styles.less'

export default class extends Component {
  render() {
    return <div>
      <h4> Терміни дії посади </h4>
      <div className="form-group">
        <label htmlFor="inp-occupation-creating-in-state" className="col-sm-2 control-label">
          Дата створення посади в державі
        </label>
        <div className="col-sm-4">
          <DateTimePicker
              id="inp-occupation-creating-in-state"
              placeholder="Дата створення посади в державі"
              time={false}
              min={new Date("1992-01-01")}
              max={new Date()} />
        </div>
        <label htmlFor="inp-occupation-creating-in-kpi" className="col-sm-2 control-label">
          Дата створення посади в КПІ
        </label>
        <div className="col-sm-4">
          <DateTimePicker
              id="inp-occupation-creating-in-kpi"
              placeholder="Дата створення посади в КПІ"
              time={false}
              min={new Date("1992-01-01")}
              max={new Date()} />
        </div>
      </div>
      <hr />
    </div>
  }
}

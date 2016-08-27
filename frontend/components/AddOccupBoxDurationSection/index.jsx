import React, {Component} from "react";
import {DateTimePicker} from "react-widgets";
import {OCCUPATION_MIN_DATE} from "../../constants/common";
import "./styles.less";

export default class extends Component {
  render() {
    let fixBlur = (event, input) => {
      event.target = {value: input.value};
      input.onBlur(event);
    };
    
    return <div>
      <h4> Терміни дії посади </h4>
      <div className="form-group">
        <label htmlFor="inp-occupation-creating-in-state" className="col-sm-2 control-label">
          Дата створення посади в державі
        </label>
        <div className="col-sm-4">
          <DateTimePicker
              {...this.props.durationFields.creatingInStateDate}
              type="date"
              format="DD.MM.YYYY"
              value={this.props.durationFields.creatingInStateDate.value}
              defaultValue={null}
              onChange={this.props.durationFields.creatingInStateDate.onChange}
              onBlur={(event) => fixBlur(event, this.props.durationFields.creatingInStateDate)}
              id="inp-occupation-creating-in-state"
              placeholder="Дата створення посади в державі"
              time={false}
              min={OCCUPATION_MIN_DATE}
              max={new Date()} />
        </div>
        <label htmlFor="inp-occupation-creating-in-kpi" className="col-sm-2 control-label">
          Дата створення посади в КПІ
        </label>
        <div className="col-sm-4">
          <DateTimePicker
              {...this.props.durationFields.creatingInKPIDate}
              type="date"
              format="DD.MM.YYYY"
              value={this.props.durationFields.creatingInKPIDate.value}
              defaultValue={null}
              onChange={this.props.durationFields.creatingInKPIDate.onChange}
              onBlur={(event) => fixBlur(event, this.props.durationFields.creatingInKPIDate)}
              id="inp-occupation-creating-in-kpi"
              placeholder="Дата створення посади в КПІ"
              time={false}
              min={OCCUPATION_MIN_DATE}
              max={new Date()} />
        </div>
      </div>
      <hr />
    </div>
  }
}

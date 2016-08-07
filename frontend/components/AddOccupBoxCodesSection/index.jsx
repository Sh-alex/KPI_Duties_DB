import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'
import AddOccupBoxCodesPortion from "../AddOccupBoxCodesPortion"

import './styles.less'

export default class extends Component {
  render() {
    let portionsNum = 2,
      portionsMarkup = [];
    for(let i=0; i< portionsNum; i++) {
      portionsMarkup.push(
          <AddOccupBoxCodesPortion isFirst={i===0} key={i}/>
      );
    }
    return <div>
      <div className="col-sm-7 pull-right text-right">
        <a href="#" className="" data-toggle="modal" data-target=".modal-add-info-from-related">
          <i> Заповнити коди із аналогічної посади </i>
          <i className="fa fa-link" />
        </a>
      </div>
      <h4> Коди </h4>
      <div className="inp-portions codes-portions">
        { portionsMarkup }
        <div className="inp-portions__btn-add-wrapper">
          <hr />
            <button type="button" className="btn btn-default inp-portions__btn-amount-ctrl--add">
              <i className="fa fa-plus" />
            </button>
        </div>
      </div>
    </div>
  }
}

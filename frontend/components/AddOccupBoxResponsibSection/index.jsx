import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'
import AddOccupBoxResponsibPortion from "../AddOccupBoxResponsibPortion"

import './styles.less'

export default class extends Component {
  render() {
    let portionsNum = 2,
        portionsMarkup = [];
    for(let i=0; i< portionsNum; i++) {
      portionsMarkup.push(
          <AddOccupBoxResponsibPortion isFirst={i===0} key={i}/>
      );
    }
    return <div>
      <h4> Завдання, обов'язки та повноваження </h4>
      <div className="inp-portions responsiblities-portions">
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

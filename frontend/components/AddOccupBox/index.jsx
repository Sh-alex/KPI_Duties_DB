import React, { Component } from 'react'
import AddOccupBoxNameSection from "../AddOccupBoxNameSection"
import AddOccupBoxFeaturesSection from "../AddOccupBoxFeaturesSection"
import AddOccupBoxDurationSection from "../AddOccupBoxDurationSection"
import AddOccupBoxCodesSection from "../AddOccupBoxCodesSection"
import AddOccupBoxResponsibSection from "../AddOccupBoxResponsibSection"

import './styles.less'

export default class extends Component {
  render() {
    return <div className="box box-default">
      <div className="box-header with-border text-center">
        <h3 className="box-title"> Додавання посади </h3>
      </div>
      <div className="box-body">
        <form id="add-form" className="form-horizontal add-form" role="form">
          <div className="form-inner">
            <AddOccupBoxNameSection />
            <AddOccupBoxFeaturesSection />
            <AddOccupBoxDurationSection />
            <AddOccupBoxCodesSection />
            <AddOccupBoxResponsibSection />
          </div>
        </form>
      </div>
    </div>
  }
}

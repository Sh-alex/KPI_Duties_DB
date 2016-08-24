import React, { Component } from 'react'

import './styles.less'

export default class extends Component {
  render() {
    return <div>
      <h4> Особливості </h4>
      <div className="form-group">
        <div className="col-sm-6">
          <div className="checkbox">
            <label>
              <input type="checkbox" {...this.props.featuresFields.isIndependent} />
                Є самостійною посадою
            </label>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="checkbox">
            <label>
              <input type="checkbox" {...this.props.featuresFields.isVirtual} />
                Є "віртуальною посадою"
            </label>
          </div>
        </div>
      </div>
      <hr />
    </div>
  }
}

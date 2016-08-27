import React, { Component } from 'react'
import './styles.less'

export default class Content extends Component {
  render() {
    return <div className="content-wrapper">
      <div className="container-fluid">
        <section className="content">
          {this.props.children}
        </section>
      </div>
    </div>
  }
}

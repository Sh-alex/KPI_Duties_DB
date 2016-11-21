import React, { Component } from 'react'

//ТУТ БУДЕ НАЛАШТУВАННЯ АНІМАЦІЇ
export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

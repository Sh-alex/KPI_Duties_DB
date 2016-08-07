import React, { Component } from 'react'
import Header from '../Header'
import Content from '../Content'
import Footer from '../Footer'

export default class MainLayout extends Component {
  render() {
    return <div>
      <Header />
      <Content>
        {this.props.children}
      </Content>
      <Footer />
    </div>
  }
}

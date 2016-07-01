import React, { Component } from 'react'
import { Link } from 'react-router'

export default class List extends Component {
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <h3> Список жанров </h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <ul className='list'>
              <li className='list__item'>
                <Link to='/genre/house/'>House</Link>
              </li>
              <li className='list__item'>
                <Link to='/genre/dnb/'>Drum and bass</Link>
              </li>
              <li className='list__item'>
                <Link to='/genre/hip-hop/'>Hip-hop</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap'

import LoginBoxLogo from '../LoginBoxLogo'
import { Link } from 'react-router'

// import {
//     hideModalEditOccup
// } from '../../actions/editOccup'

import './styles.less'

export default class AboutBox extends Component {
    render() {
        return (
            <div className="login-page about-box-wrapper">
                <div className="box box-primary about-box">
                    <LoginBoxLogo />
                    <div className="about-box-body" >
                        <p className="about-box-msg">
                            <p>
                                <b className="about-box-msg-headline">
                                    Про програму:
                                </b> <br/>
                                АІС "КП" надає простий та зручний графічний інтерфейс користувачам
                                для управління базами даних посад в університеті та державі.
                            </p>
                            <p>
                                <b>Замовник:</b> <i> НТУУ "КПІ ім. Ігоря Сікорського" </i>
                            </p>
                            <p>
                                <b>Виконавець:</b> <i> КБ "ІС" </i>
                            </p>
                            <p>
                                <b>Версія:</b> <i> 1.0.0. </i>
                            </p>
                            <hr/>
                            <p className="text-center">
                                Усі права захищено (с) <br/>
                                <a href="http://kbis.kpi.ua/"> КБІС НТУУ "КПІ ім. Ігоря Сікорського"</a>, 2016
                            </p>
                        </p>
                        <div className="list-group text-center">
                            <Link to="/" className="list-group-item">
                                <i className="fa fa-long-arrow-left" /> {" "}
                                Повернутися на головну
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react'
import { Modal, Alert } from 'react-bootstrap'

import classNames from 'classnames';

import './styles.less'

export default class extends Component {
    render() {
        const submitHandler = e => {
            e.preventDefault();
            this.props.onSave(this.props.inpVal);
        };

        let errorAlert = (!this.props.errors || (this.props.errors.length < 1)) ? "" : (
                <Alert bsStyle="danger" onDismiss={this.props.onAlertDismiss}>
                    <h4>
                        <i className="icon fa fa-warning" />
                        Помилка! :(
                    </h4>
                    <p>
                        { this.props.errors.map(error => (<p> {error} </p>)) }
                    </p>
                </Alert>
            ),
            btnSpinnerClass = classNames({
                'btn-spinner': true,
                'hidden': !this.props.isLoading
            });

        return (
            <Modal {...this.props} bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                        Додати нове ключове слово для уточнення
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" onSubmit={submitHandler} id="modal-add-new-occup-key-word__form">
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.props.inpVal} 
                                onChange={e => this.props.onInpValChange(e.target.value)}
                                id="inp-add-new-occup-key-word" 
                                placeholder="Нове ключове слово у назвах посад" />
                        </div>
                    </form>
                    { errorAlert }
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default pull-left" onClick={this.props.onHide}>
                        Відміна
                    </button>
                    <button
                        type="submit"
                        form="modal-add-new-occup-key-word__form"
                        className="btn btn-primary"
                        disabled={this.props.isLoading || !this.props.inpVal}
                    >
                        <span className="btn-label"> Додати </span>
                        <span className={btnSpinnerClass}>
                            <i className="fa fa-spinner fa-pulse" />
                        </span>
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

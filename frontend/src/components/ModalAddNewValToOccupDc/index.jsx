import React, { Component } from 'react'
import { Modal, Alert } from 'react-bootstrap'
import classNames from 'classnames';

import replaceApostrophe from "../../utils/replaceApostrophe"

import './styles.less'

export default function ModalAddNewValToOccupDc(props) {
    const submitHandler = e => {
        e.preventDefault();
        props.onSave(props.inpVal);
    };

    let msgAlert,
        btnSpinnerClass = classNames({
            'btn-spinner': true,
            'hidden': !props.isLoading
        });

    if(props.errors && (props.errors.length)) {
        msgAlert = (
            <Alert bsStyle="danger" onDismiss={props.onAlertDismiss}>
                <h4>
                    <i className="icon fa fa-warning" />
                    Помилка! :(
                </h4>
                <p>
                    { props.errors.map(error => (<p> {error} </p>)) }
                </p>
            </Alert>
        );
    } else if(props.success) {
        msgAlert = (
            <Alert bsStyle="success" onDismiss={props.onAlertDismiss}>
                <h4>
                    <i className="icon fa fa-check" />
                    Успіх!
                </h4>
                <p> Нове значення успішно додано. </p>
            </Alert>
        );
        setTimeout(() => props.onHide(), 1000);
    }

    return (
        <Modal {...props} bsSize="small">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">
                    Додати нове значення у список {props.dcName || ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form role="form" onSubmit={submitHandler} id="modal-add-new-occup-key-word__form">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={props.inpVal}
                            onChange={e => props.onInpValChange( replaceApostrophe(e.target.value) ) }
                            id="inp-add-new-occup-key-word"
                            placeholder="Нове ключове слово у назвах посад" />
                    </div>
                </form>
                { msgAlert }
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-default pull-left" onClick={props.onHide}>
                    Відміна
                </button>
                <button
                    type="submit"
                    form="modal-add-new-occup-key-word__form"
                    className="btn btn-primary"
                    disabled={props.isLoading || !props.inpVal}
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

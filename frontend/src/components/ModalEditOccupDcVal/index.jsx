import React, { Component } from 'react'
import { Modal, Alert } from 'react-bootstrap'

import replaceApostrophe from "../../utils/replaceApostrophe"

import './styles.less'

function submitHandler(e, props) {
    e.preventDefault();
    props.onSubmit(props.inpVal);
    return false;
}

export default function ModalEditOccupDcVal(props) {
    let msgAlert;

    if(props.error) {
        msgAlert = (
            <Alert bsStyle="danger" className="no-margin" onDismiss={props.onAlertDismiss}>
                <h4>
                    <i className="icon fa fa-warning" />
                    Помилка! :(
                </h4>
                <p> { props.error } </p>
            </Alert>
        );
    } else if(props.success) {
        msgAlert = (
            <Alert bsStyle="success" className="no-margin" onDismiss={props.onAlertDismiss}>
                <h4>
                    <i className="icon fa fa-check" />
                    Успіх!
                </h4>
                <p> Значення успішно змінено. </p>
            </Alert>
        );
        setTimeout(() => {
            props.onHide();
            props.onAlertDismiss();
        }, 1000);
    }

    return (
        <Modal {...props} bsSize={props.shownBigTextInp ? "" : "small"}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">
                    Змінити значення у списку {props.additionalTitle || ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    role="form"
                    onSubmit={e => submitHandler(e, props)}
                    id="modal-edit-occup-dc-val__form">
                    <div className="form-group">
                        {
                            props.shownBigTextInp ? (
                            <textarea
                                rows={6}
                                className="form-control"
                                value={props.inpVal}
                                onChange={e => props.onInpValChange( replaceApostrophe(e.target.value) ) }
                                placeholder="Змінене значення" />
                        ) : (
                            <input
                                type="text"
                                className="form-control"
                                value={props.inpVal}
                                onChange={e => props.onInpValChange( replaceApostrophe(e.target.value) ) }
                                placeholder="Змінене значення" />
                        )
                    }
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
                    form="modal-edit-occup-dc-val__form"
                    className="btn btn-primary"
                    disabled={props.isLoading || !props.inpVal}
                >
                    <span className="btn-label"> Зберегти </span>
                    <i className={`fa ${props.isLoading ? "fa-spinner" : "fa-save"}`} />
                </button>
            </Modal.Footer>
        </Modal>
    );
}

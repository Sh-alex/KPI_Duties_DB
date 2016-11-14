import React, { Component } from 'react'
import { Modal, Alert } from 'react-bootstrap'

import './styles.less'

export default function ModalConfirmDelItem(props) {
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
                <p> {props.successMsgAlertTitle || "Видалення пройшло успішно."} </p>
            </Alert>
        );
        setTimeout(() => props.onHide(), 1000);
    }

    return (
        <Modal show={props.show} onHide={props.onHide} bsSize="small" className="modal-danger modal--confirm-del">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">
                    Увага!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>
                    { props.headline || "Підтвердіть видалення" }
                </h4>
                <p> <u> Зміни неможливо буде повернути. </u> </p>
                <p className="checkbox">
                    <label title="Якщо відмітити, після закриття вспливаючого вікна це попередження більше не з'являтиметься">
                        <input
                            type="checkbox"
                            checked={props.dontShowAgain}
                            onChange={props.onTriggerDontShowAgain}
                            id="dont-remind-delete-danger"
                        />
                        <i> Більше не показувати попередження </i>
                    </label>
                </p>
                { msgAlert }
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline pull-left" onClick={props.onHide}>
                    <i className="fa fa-long-arrow-left" />
                    <span className="btn-label"> Відміна </span>
                </button>
                <button
                    type="button"
                    className="btn btn-outline"
                    disabled={props.isDeletingItem}
                    onClick={(e) => props.onSubmit()}
                >
                    <span className="btn-label"> Видалити </span>
                    {
                        props.isDeletingItem ? (
                            <span className="btn-spinner">
                                <i className="fa fa-spinner fa-pulse" />
                            </span>
                        ) : (
                            <span className="btn-icon">
                                <i className="fa fa-trash" />
                            </span>
                        )
                    }
                </button>
            </Modal.Footer>
        </Modal>
    );
}
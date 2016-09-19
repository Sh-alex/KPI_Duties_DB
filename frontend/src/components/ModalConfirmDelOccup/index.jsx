import React, { Component } from 'react'
import { Modal, Alert } from 'react-bootstrap'

import './styles.less'

export default function ModalConfirmDelOccup(props) {
    let errorAlert = !props.error ? "" : (
            <Alert bsStyle="danger" onDismiss={props.onAlertDismiss}>
                <h4>
                    <i className="icon fa fa-warning" />
                    Помилка! :(
                </h4>
                <p> { props.error } </p>
            </Alert>
        );

    return (
        <Modal show={props.show} onHide={props.onHide} bsSize="small" className="modal-danger modal--confirm-del">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">
                    Увага!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3> 
                    Підтвердіть видалення інформації про посаду  
                    {" "+props.additionalTitle}
                </h3>
                <p> <u> Зміни неможливо буде повернути. </u> </p>
                <p className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={props.dontShowAgain}
                            onChange={props.onTriggerDontShowAgain}
                            id="dont-remind-delete-danger"
                            title="Якщо відмітити, після закриття вспливаючого вікна це попередження більше не з'являтиметься"
                        />
                        <i> Більше не показувати попередження </i>
                    </label>
                </p>
                { errorAlert }
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline pull-left" onClick={props.onHide}>
                    <i className="fa fa-long-arrow-left" />
                    <span className="btn-label"> Відміна </span>
                </button>
                <button
                    type="button"
                    className="btn btn-outline"
                    disabled={props.isDeletingOccupation}
                    onClick={(e) => props.onSubmit()}
                >
                    <span className="btn-label"> Видалити </span>
                    {
                        props.isDeletingOccupation ? (
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
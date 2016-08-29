import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import FormAddInfoFromAnotherOccup from '../FormAddInfoFromAnotherOccup'
import {
    hideModalAddInfoFromAnotherOccup,
    submitFormAddInfoFromAnotherOccup
} from '../../actions/addingInfoFromAnotherOccup'

import classNames from 'classnames';

import './styles.less'


class ModalAddInfoFromAnotherOccup extends Component {
    render() {
        return (
            <Modal show={this.props.show} onClose={this.props.onClose} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                        Додати інформацію про { this.props.typeText } з аналогічної посади
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAddInfoFromAnotherOccup
                        onSubmitSearchForm={this.props.onSubmitSearchForm}
                        isSubmittngSearchForm={this.props.isSubmittngSearchForm}
                        cancelSearch={this.props.onClose}
                        clarificationList={this.props.clarificationList}
                        occupationGroupList={this.props.occupationGroupList}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let modalState = state.modals.addInfoFromAnotherOccup;
    return {
        ...modalState,
        ...state.occupationNameInfo,
        /*
         show: state.modals.addInfoFromAnotherOccup.show,
         typeText: state.modals.addInfoFromAnotherOccup.typeText,
         showResults: state.modals.addInfoFromAnotherOccup.showResults,
         isSubmittngSearchForm: state.modals.addInfoFromAnotherOccup.isSubmittngSearchForm,
         */
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClose: () => {
            dispatch(hideModalAddInfoFromAnotherOccup());
        },
        onSubmitSearchForm: (data) => {
            dispatch(submitFormAddInfoFromAnotherOccup(data))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddInfoFromAnotherOccup);

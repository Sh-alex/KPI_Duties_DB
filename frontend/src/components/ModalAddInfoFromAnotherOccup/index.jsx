import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import SearchOccupationsForm from '../SearchOccupationsForm'
import AddInfoFromAnotherOccupSearchRes from '../AddInfoFromAnotherOccupSearchRes'

import {
    hideModalAddInfoFromAnotherOccup,
    submitFormAddInfoFromAnotherOccup,
    dismissFormAddInfoFromAnotherOccupAlert,
    goBackToAddInfoFromAnotherOccupForm,
    addInfoFromAnotherOccupation
} from '../../actions/addingInfoFromAnotherOccup'

import './styles.less'


class ModalAddInfoFromAnotherOccup extends Component {
    render() {
        let searchForm = (
                <SearchOccupationsForm
                    searchError={this.props.searchError}
                    onSubmitSearchForm={this.props.onSubmitSearchForm}
                    onAlertDismiss={this.props.handleSearchFormAlertDismiss}
                    isSubmittngSearchForm={this.props.isSubmittngSearchForm}
                    cancelSearch={this.props.onHide}
                    tagsList={this.props.clarificationList}
                    occupationGroupList={this.props.occupationGroupList}
                />
            ),
            resultsBlock = (
                <AddInfoFromAnotherOccupSearchRes
                    cancelSearch={this.props.onHide}
                    searchResData={this.props.searchResData}
                    resultsType={this.props.resultsType}
                    resPortionIndex={this.props.resPortionIndex}
                    goBackToSearchForm={this.props.goBackToSearchForm}
                    handleAddInfoBtnClick={this.props.handleAddInfoBtnClick}
                />
            );

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                        Додати інформацію про { this.props.typeText } з аналогічної посади
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.props.showResults ? resultsBlock : searchForm }
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
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onHide() {
            dispatch(hideModalAddInfoFromAnotherOccup());
        },
        onSubmitSearchForm(data) {
            dispatch(submitFormAddInfoFromAnotherOccup(data, dispatch))
        },
        handleSearchFormAlertDismiss() {
            dispatch(dismissFormAddInfoFromAnotherOccupAlert())
        },
        goBackToSearchForm() {
            dispatch(goBackToAddInfoFromAnotherOccupForm())
        },
        handleAddInfoBtnClick(data) {
            dispatch(addInfoFromAnotherOccupation(data, dispatch))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddInfoFromAnotherOccup);

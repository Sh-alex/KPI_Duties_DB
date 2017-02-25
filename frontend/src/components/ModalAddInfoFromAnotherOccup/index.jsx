import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Alert } from 'react-bootstrap'

import SearchOccupationsForm from '../SearchOccupationsForm'
import AddInfoFromAnotherOccupSearchRes from '../AddInfoFromAnotherOccupSearchRes'

import {
    fetchOccupGroupList,
    fetchClarifiedOccupList,
    fetchClarificationList,
} from "../../actions/occupationNameInfo"

import {
    hideModalAddInfoFromAnotherOccup,
    submitFormAddInfoFromAnotherOccup,
    dismissFormAddInfoFromAnotherOccupAlert,
    goBackToAddInfoFromAnotherOccupForm,
    addInfoFromAnotherOccupation
} from '../../actions/addingInfoFromAnotherOccup'

import {
    priorSearchOccupations,
    priorSearchOccupReset
} from '../../actions/searchOccupations'

import './styles.less'


class ModalAddInfoFromAnotherOccup extends Component {
    render() {
        let InnerBlock;
        if(!this.props.userMayAddInfoFromAnotherOccupations)
            InnerBlock = (
                <Alert bsStyle="danger" className="no-margin text-center">
                    <h4 className="no-margin"> У вас для цього не достатньо прав доступу! </h4>
                </Alert>
            );
        else if(this.props.showResults)
            InnerBlock = (
                <AddInfoFromAnotherOccupSearchRes
                    resForm={this.props.resForm}
                    cancelSearch={this.props.onHide}
                    searchResData={this.props.searchResData}
                    resultsType={this.props.resultsType}
                    resPortionIndex={this.props.resPortionIndex}
                    goBackToSearchForm={this.props.goBackToSearchForm}
                    handleAddInfoBtnClick={this.props.handleAddInfoBtnClick}
                />
            );
        else
            InnerBlock = (
                <SearchOccupationsForm
                    fetchOccupGroupList={this.props.fetchOccupGroupList}
                    fetchTagsList={this.props.fetchClarificationList}
                    searchError={this.props.searchError}
                    priorSearchOccupations={this.props.priorSearchOccupations}
                    priorSearchOccupReset={this.props.priorSearchOccupReset}
                    searchTextWillSucceed={this.props.searchTextWillSucceed}
                    searchTextResIsPrefetching={this.props.searchTextResIsPrefetching}
                    searchTextResPrefetchingError={this.props.searchTextResPrefetchingError}
                    onSubmitSearchForm={this.props.onSubmitSearchForm}
                    onAlertDismiss={this.props.handleSearchFormAlertDismiss}
                    isSubmittngSearchForm={this.props.isSubmittngSearchForm}
                    cancelSearch={this.props.onHide}
                    tagsList={this.props.clarificationList}
                    occupationGroupList={this.props.occupationGroupList}
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
                    { InnerBlock }
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let modalState = state.modals.addInfoFromAnotherOccup,
        userMayAddInfoFromAnotherOccupations = state.user.isAuthenticated &&
            state.user.permissions &&
            state.user.permissions.forms &&
            state.user.permissions.forms.addInfoFromAnotherOccupations &&
            state.user.permissions.forms.addInfoFromAnotherOccupations.show;
    return {
        ...modalState,
        ...state.occupNameInfoLists,
        userMayAddInfoFromAnotherOccupations
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onHide() {
            dispatch(hideModalAddInfoFromAnotherOccup());
        },
        fetchClarifiedOccupList: reqParams => dispatch(fetchClarifiedOccupList(null, null, reqParams)),
        fetchOccupGroupList: reqParams => dispatch(fetchOccupGroupList(null, null, reqParams)),
        fetchClarificationList: reqParams => dispatch(fetchClarificationList(null, null, reqParams)),

        priorSearchOccupations(...data) {
            dispatch(priorSearchOccupations(...data, dispatch))
        },
        priorSearchOccupReset() {
            dispatch(priorSearchOccupReset())
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

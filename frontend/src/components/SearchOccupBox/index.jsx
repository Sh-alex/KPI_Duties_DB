import React, {Component} from "react";
import { connect } from 'react-redux'

import SearchOccupBoxFormWrapper from "../SearchOccupBoxFormWrapper";
import SearchOccupBoxRes from "../SearchOccupBoxRes";

import {
    searchOccupBoxFormSubmit,
    dismissSearchOccupBoxFormAlert,
    showModalResDownloadSettings,
} from '../../actions/searchOccupBox'

import {
    priorSearchOccupations,
    priorSearchOccupReset
} from '../../actions/searchOccupations'

import {
    fetchOccupGroupList,
    fetchClarifiedOccupList,
    fetchClarificationList,
} from "../../actions/occupationNameInfo"

import {
    showModalEditOccup
} from "../../actions/editOccup"

import {
    delOccupation,
    dismissDelOccupationAlert
} from "../../actions/delOccupation"

import { denyAccessToTheUserWithRedirect } from '../../actions/user'

class SearchOccupBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResultsIsExpanded: this.props.searchResData,//Object.keys(this.props.location.query).length,
            searchFormIsExpanded: !(this.props.searchResData && this.props.searchResData.itemsList && this.props.searchResData.itemsList.length)
        };
        this.getOccupations = this.getOccupations.bind(this);
    }

    componentWillMount() {
        this.checkUserAccess(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.checkUserAccess(nextProps);

        this.setState({
            searchResultsIsExpanded: nextProps.searchResData,
            searchFormIsExpanded: !(this.props.isSubmittngSearchForm && !nextProps.isSubmittngSearchForm) ||
            !(nextProps.searchResData && nextProps.searchResData.itemsList &&
                nextProps.searchResData.itemsList.length)
        });
    }

    checkUserAccess(props) {
        if(!props.userMaySearchOccupations)
            props.denyAccessToTheUserWithRedirect()
    }

    getOccupations(data) {
        return this.props.onSubmitSearchForm({...this.props.location.query, ...data});
    }

    render() {
        console.log("SearchOccupBox.props.location.query: ", this.props.location.query);
        // if(Object.keys(this.props.location.query).length)
        let showSearchResults = this.props.searchResData && !this.props.searchError;
        return (
            <div>
                <SearchOccupBoxFormWrapper
                    searchError={this.props.searchError}
                    onSubmitSearchForm={this.props.onSubmitSearchForm}
                    priorSearchOccupations={this.props.priorSearchOccupations}
                    priorSearchOccupReset={this.props.priorSearchOccupReset}
                    searchTextWillSucceed={this.props.searchTextWillSucceed}
                    searchTextResIsPrefetching={this.props.searchTextResIsPrefetching}
                    searchTextResPrefetchingError={this.props.searchTextResPrefetchingError}
                    onAlertDismiss={this.props.handleSearchFormAlertDismiss}
                    isSubmittngSearchForm={this.props.isSubmittngSearchForm}
                    tagsList={this.props.clarificationList}

                    fetchOccupGroupList={this.props.fetchOccupGroupList}
                    fetchTagsList={this.props.fetchClarificationList}

                    occupationGroupList={this.props.occupationGroupList}
                    searchQuery={this.props.location.query}
                    boxIsExpanded={this.state.searchFormIsExpanded}
                    toggleExpand={() => this.setState({searchFormIsExpanded: !this.state.searchFormIsExpanded})}
                />
                <SearchOccupBoxRes
                    show={showSearchResults}
                    getOccupations={this.getOccupations}

                    userMayDelOccupations={this.props.userMayDelOccupations}
                    userMayEditOccupations={this.props.userMayEditOccupations}
                    userMayDownloadSearchResults={this.props.userMayDownloadSearchResults}

                    occupationGroupList={this.props.occupationGroupList}
                    clarifiedOccupationList={this.props.clarifiedOccupationList}
                    clarificationList={this.props.clarificationList}

                    searchResData={this.props.searchResData}
                    boxIsExpanded={this.state.searchResultsIsExpanded}
                    onEditItem={this.props.handleEditItem}
                    onDeleteItem={this.props.handleDeleteItem}
                    toggleExpand={() => this.setState({searchResultsIsExpanded: !this.state.searchResultsIsExpanded})}

                    dismissDelOccupationAlert={this.props.dismissDelOccupationAlert}
                    showModalResDownloadSettings={this.props.showModalResDownloadSettings}
                    delOccupationError={this.props.delOccupationError}
                    delOccupationSuccess={this.props.delOccupationSuccess}
                    isDeletingOccupation={this.props.isDeletingOccupation}
                />
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    let userMaySearchOccupations = state.user.isAuthenticated &&
        state.user.permissions &&
        state.user.permissions.forms &&
        state.user.permissions.forms.searchOccupations &&
        state.user.permissions.forms.searchOccupations.show,
    userMayDelOccupations = state.user.isAuthenticated &&
        state.user.permissions &&
        state.user.permissions.forms &&
        state.user.permissions.forms.delOccupations &&
        state.user.permissions.forms.delOccupations.show,
    userMayDownloadSearchResults = state.user.isAuthenticated &&
        state.user.permissions &&
        state.user.permissions.forms &&
        state.user.permissions.forms.downloadSearchResults &&
        state.user.permissions.forms.downloadSearchResults.show,
    userMayEditOccupations = state.user.isAuthenticated &&
        state.user.permissions &&
        state.user.permissions.forms &&
        state.user.permissions.forms.editOccupations &&
        state.user.permissions.forms.editOccupations.show;
    return {
        ...state.occupNameInfoLists,
        ...state.delOccupation,
        ...state.searchOccupBox,
        userMaySearchOccupations,
        userMayDelOccupations,
        userMayDownloadSearchResults,
        userMayEditOccupations
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        denyAccessToTheUserWithRedirect() {
            return dispatch( denyAccessToTheUserWithRedirect() );
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
            dispatch(searchOccupBoxFormSubmit(data, dispatch))
        },
        handleSearchFormAlertDismiss() {
            dispatch(dismissSearchOccupBoxFormAlert())
        },
        handleEditItem(editingOccupId) {
            dispatch(showModalEditOccup(editingOccupId));
        },
        dismissDelOccupationAlert() {
            dispatch(dismissDelOccupationAlert())
        },
        handleDeleteItem(itemId) {
            dispatch(delOccupation(itemId, dispatch))
        },
        showModalResDownloadSettings() {
            dispatch(showModalResDownloadSettings());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchOccupBox);

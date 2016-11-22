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

class SearchOccupBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResultsIsExpanded: this.props.searchResData,//Object.keys(this.props.location.query).length,
            searchFormIsExpanded: !(this.props.searchResData && this.props.searchResData.itemsList && this.props.searchResData.itemsList.length)
        };

        //this.smth = this.smth.bind(this);
    }

    componentDidMount() {
        this.props.fetchLists();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchResultsIsExpanded: nextProps.searchResData,
            searchFormIsExpanded: !(nextProps.searchResData && nextProps.searchResData.itemsList && nextProps.searchResData.itemsList.length)
        });
    }

    render() {
        console.log("SearchOccupBox.props.location.query: ", this.props.location.query);
        // if(Object.keys(this.props.location.query).length)
        let showSearchResults = this.props.searchResData && !this.props.searchError;
        if(showSearchResults)
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
                        occupationGroupList={this.props.occupationGroupList}
                        searchQuery={this.props.location.query}
                        boxIsExpanded={this.state.searchFormIsExpanded}
                        toggleExpand={() => this.setState({searchFormIsExpanded: !this.state.searchFormIsExpanded})}
                    />
                    <SearchOccupBoxRes
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
        else
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
                        occupationGroupList={this.props.occupationGroupList}
                        searchQuery={this.props.location.query}
                        boxIsExpanded={this.state.searchFormIsExpanded}
                        toggleExpand={() => this.setState({searchFormIsExpanded: !this.state.searchFormIsExpanded})}
                    />
                </div>
            );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        ...state.occupationNameInfo,
        ...state.delOccupation,
        ...state.searchOccupBox
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLists() {
            dispatch(fetchOccupGroupList());
            dispatch(fetchClarifiedOccupList());
            dispatch(fetchClarificationList());
        },
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

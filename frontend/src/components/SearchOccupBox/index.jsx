import React, {Component} from "react";
import { connect } from 'react-redux'

import SearchOccupBoxForm from "../SearchOccupBoxForm";
import SearchOccupBoxRes from "../SearchOccupBoxRes";

import {
    searchOccupBoxFormSubmit,
    dismissSearchOccupBoxFormAlert
} from '../../actions/searchOccupBox'

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
            searchFormIsExpanded: !this.props.searchResData//!Object.keys(this.props.location.query).length
        };

        //this.smth = this.smth.bind(this);
    }

    componentDidMount() {
        this.props.fetchLists();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchResultsIsExpanded: nextProps.searchResData,//Object.keys(this.props.location.query).length,
            searchFormIsExpanded: !nextProps.searchResData//!Object.keys(this.props.location.query).length
        });
    }

    render() {
        console.log("SearchOccupBox.props.location.query: ", this.props.location.query);
        // if(Object.keys(this.props.location.query).length)
        if(this.props.searchResData)
            return (
                <div>
                    <SearchOccupBoxForm
                        searchError={this.props.searchError}
                        onSubmitSearchForm={this.props.onSubmitSearchForm}
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
                        delOccupationError={this.props.delOccupationError}
                        delOccupationSuccess={this.props.delOccupationSuccess}
                        isDeletingOccupation={this.props.isDeletingOccupation}
                    />
                </div>
            );
        else
            return (
                <div>
                    <SearchOccupBoxForm
                        searchError={this.props.searchError}
                        onSubmitSearchForm={this.props.onSubmitSearchForm}
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
        onSubmitSearchForm(data) {
            dispatch(searchOccupBoxFormSubmit(data, dispatch))
        },
        handleSearchFormAlertDismiss() {
            dispatch(dismissSearchOccupBoxFormAlert())
        },
        handleEditItem(editingOccupData) {
            dispatch(showModalEditOccup(editingOccupData));
        },
        dismissDelOccupationAlert() {
            dispatch(dismissDelOccupationAlert())
        },
        handleDeleteItem(itemId) {
            dispatch(delOccupation(itemId, dispatch))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchOccupBox);

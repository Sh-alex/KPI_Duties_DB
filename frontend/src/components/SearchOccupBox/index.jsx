import React, {Component} from "react";
import { connect } from 'react-redux'

import SearchOccupBoxForm from "../SearchOccupBoxForm";
import SearchOccupBoxResults from "../SearchOccupBoxResults";

import {
    searchOccupBoxFormSubmit,
    dismissSearchOccupBoxFormAlert
} from '../../actions/searchOccupBox'

import {
    fetchOccupGroupList,
    fetchClarifiedOccupList,
    fetchClarificationList,
} from "../../actions/occupationNameInfo"
//
// import {
//     fetchKPCodesList,
//     fetchZKPPTRCodesList,
//     fetchETDKCodesList,
//     fetchDKHPCodesList
// } from "../../actions/occupCodesLists"

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
                        expanded={this.state.searchFormIsExpanded}
                        toggleExpand={() => this.setState({searchFormIsExpanded: !this.state.searchFormIsExpanded})}
                    />
                    <SearchOccupBoxResults
                        searchResData={this.props.searchResData}
                        expanded={this.state.searchResultsIsExpanded}
                        toggleExpand={() => this.setState({searchResultsIsExpanded: !this.state.searchResultsIsExpanded})}
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
                        expanded={this.state.searchFormIsExpanded}
                        toggleExpand={() => this.setState({searchFormIsExpanded: !this.state.searchFormIsExpanded})}
                    />
                </div>
            );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        ...state.occupationNameInfo,
        ...state.searchOccupBox
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLists() {
            dispatch(fetchOccupGroupList());
            dispatch(fetchClarifiedOccupList());
            dispatch(fetchClarificationList());

            // dispatch(fetchKPCodesList());
            // dispatch(fetchZKPPTRCodesList());
            // dispatch(fetchETDKCodesList());
            // dispatch(fetchDKHPCodesList());
        },
        onSubmitSearchForm(data) {
            dispatch(searchOccupBoxFormSubmit(data, dispatch))
        },
        handleSearchFormAlertDismiss() {
            dispatch(dismissSearchOccupBoxFormAlert())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchOccupBox);

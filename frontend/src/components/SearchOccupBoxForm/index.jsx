import React, {Component} from "react";
import "./styles.less";

import {
    SOME_TAGS,
    MATCH_STRING,
    CONTAINS_STRING,
    ALL_TAGS,
    ANY
} from "../../constants/searchTypes"

import SearchOccupationsForm from "../SearchOccupationsForm"
import BoxExpandBtn from "../BoxExpandBtn"

export default function SearchOccupBoxForm(props) {
    let formFields;

    if(Object.keys(props.searchQuery).length) {
        let querySearchType = props.searchQuery.searchType,
            queryOccupGroupVal = props.searchQuery.occupGroupVal;
        formFields = {
            searchType: [SOME_TAGS, MATCH_STRING, CONTAINS_STRING, ALL_TAGS, ANY].includes(querySearchType) ? querySearchType : ANY,
            occupGroupVal: props.occupationGroupList.items.includes(queryOccupGroupVal) ? queryOccupGroupVal : null,
            searchText: props.searchQuery.searchText,
            searchTags: props.searchQuery.searchTags.split(","),
            inKpi: props.searchQuery.inKpi,
            "creatingInStateDate": {
                "takeIntoAccount": props.searchQuery.creatingInStateDate_takeIntoAccount,
                "from": props.searchQuery.creatingInStateDate_from,
                "to": props.searchQuery.creatingInStateDate_to
            },
            "creatingInKPIDate": {
                "takeIntoAccount": props.searchQuery.creatingInKPIDate_takeIntoAccount,
                "from": props.searchQuery.creatingInKPIDate_from,
                "to": props.searchQuery.creatingInKPIDate_to
            },
            "cancelingInStateDate": {
                "takeIntoAccount": props.searchQuery.cancelingInStateDate_takeIntoAccount,
                "from": props.searchQuery.cancelingInStateDate_from,
                "to": props.searchQuery.cancelingInStateDate_to
            },
            "cancelingInKPIDate": {
                "takeIntoAccount": props.searchQuery.cancelingInKPIDate_takeIntoAccount,
                "from": props.searchQuery.cancelingInKPIDate_from,
                "to": props.searchQuery.cancelingInKPIDate_to
            }
        };
    }

    return (
        <div className={`box box-default box--search-form ${props.expanded ? "" : "collapsed-box"}`} >
            <div className="box-header with-border text-center">
                <h3 className="box-title">
                    Пошук посад
                </h3>
                <div className="box-tools pull-right">
                    <BoxExpandBtn
                        toggleExpand={props.toggleExpand}
                        expanded={props.expanded}
                    />
                </div>
            </div>
            <div className="box-body">
                <SearchOccupationsForm
                    {...props}
                    formFields={formFields}
                />
            </div>
        </div>
    );
}

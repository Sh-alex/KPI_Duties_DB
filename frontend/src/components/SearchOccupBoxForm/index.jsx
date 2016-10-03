import React, {Component} from "react";
import "./styles.less";

import {
    SOME_TAGS,
    MATCH_STRING,
    CONTAINS_STRING,
    ALL_TAGS,
    ANY,

    ONLY_IN_KPI,
    ONLY_IN_STATE
} from "../../constants/searchOccupationsTypes"

import SearchOccupationsForm from "../SearchOccupationsForm"
import BoxExpandBtn from "../BoxExpandBtn"

export default function SearchOccupBoxForm(props) {
    let formFields;

    if(Object.keys(props.searchQuery).length) {
        let querySearchType = props.searchQuery.searchType,
            queryInKpi = props.searchQuery.inKpi,
            queryOccupGroupVal = props.searchQuery.occupGroupVal;
        formFields = {
            searchType: [SOME_TAGS, MATCH_STRING, CONTAINS_STRING, ALL_TAGS, ANY].includes(querySearchType) ? querySearchType : ANY,
            occupGroupVal: props.occupationGroupList.items.includes(queryOccupGroupVal) ? queryOccupGroupVal : null,
            searchText: props.searchQuery.searchText,
            searchTags: props.searchQuery.searchTags.split(","),
            inKpi: [ONLY_IN_KPI, ONLY_IN_STATE, ANY].includes(queryInKpi) ? queryInKpi : ANY,
            startFrom: props.searchQuery.startFrom,
            startTo: props.searchQuery.startFrom,
            stopFrom: props.searchQuery.startFrom,
            stopTo: props.searchQuery.startFrom
        };
    }

    return (
        <div className={`box box-default box--search-form ${props.boxIsExpanded ? "" : "collapsed-box"}`} >
            <div className="box-header with-border text-center">
                <h3 className="box-title">
                    Пошук посад
                </h3>
                <div className="box-tools pull-right">
                    <BoxExpandBtn
                        toggleExpand={props.toggleExpand}
                        expanded={props.boxIsExpanded}
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

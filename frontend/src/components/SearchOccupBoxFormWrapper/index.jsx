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

export default function SearchOccupBoxFormWrapper(props) {
    let formFields;

    if(Object.keys(props.searchQuery).length) {
        let querySearchType = props.searchQuery.searchType,
            queryInKpi = props.searchQuery.inKpi,
            queryOccupGroupVal = props.searchQuery.occupGroupVal.split(",");

        for(let i=0; i< queryOccupGroupVal.length; i++) {
            let numId = Number.parseInt(queryOccupGroupVal[i]);
            if(isNaN(numId)) {
                queryOccupGroupVal = [null];
                break;
            }
            else
                queryOccupGroupVal[i] = numId;
        }

        formFields = {
            searchType: [SOME_TAGS, MATCH_STRING, CONTAINS_STRING, ALL_TAGS, ANY].includes(querySearchType) ?
                querySearchType : ANY,
            occupGroupVal: queryOccupGroupVal,
            searchText: props.searchQuery.searchText,
            searchTags: props.searchQuery.searchTags.reduce( (res, item) => {
                if(item) res.push(item);
                return res;
            }, []) || [],
            inKpi: [ONLY_IN_KPI, ONLY_IN_STATE, ANY].includes(queryInKpi) ? queryInKpi : ANY,
            startFrom: props.searchQuery.startFrom &&
                (new Date(props.searchQuery.startFrom) !== "Invalid Date") &&
                new Date(props.searchQuery.startFrom) || null,
            startTo: props.searchQuery.startTo &&
                (new Date(props.searchQuery.startTo) !== "Invalid Date") &&
                new Date(props.searchQuery.startTo) || null,
            stopFrom: props.searchQuery.stopFrom &&
                (new Date(props.searchQuery.stopFrom) !== "Invalid Date") &&
                new Date(props.searchQuery.stopFrom) || null,
            stopTo: props.searchQuery.stopTo &&
                (new Date(props.searchQuery.stopTo) !== "Invalid Date") &&
                new Date(props.searchQuery.stopTo) || null
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

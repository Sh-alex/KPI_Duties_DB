import React, {Component} from "react";
import SearchFormBox from "../SearchFormBox";
import SearchResultsBox from "../SearchResultsBox";

let searchPath = "search?" +
    "searchType=:searchType" +
    "&occupGroupVal=:occupGroupVal" +
    "&searchText=:searchText" +
    "&searchTags=:searchTags" +
    "&creatingInStateDate_takeIntoAccount=:creatingInStateDate_takeIntoAccount" +
    "&creatingInStateDate_from=:creatingInStateDate_from" +
    "&creatingInStateDate_to=:creatingInStateDate_to" +
    "&creatingInKPIDate_takeIntoAccount=:creatingInKPIDate_takeIntoAccount" +
    "&creatingInKPIDate_from=:creatingInKPIDate_from" +
    "&creatingInKPIDate_to=:creatingInKPIDate_to" +
    "&cancelingInStateDate_takeIntoAccount=:cancelingInStateDate_takeIntoAccount" +
    "&cancelingInStateDate_from=:cancelingInStateDate_from" +
    "&cancelingInStateDate_to=:cancelingInStateDate_to" +
    "&cancelingInKPIDate_takeIntoAccount=:cancelingInKPIDate_takeIntoAccount" +
    "&cancelingInKPIDate_from=:cancelingInKPIDate_from" +
    "&cancelingInKPIDate_to=:cancelingInKPIDate_to";

export default class SearchOccupBox extends Component {
    render() {
        console.log("this.props.location.query: ", this.props.location.query);
        return <div>
            <SearchFormBox />
            <SearchResultsBox />
        </div>
    }
}

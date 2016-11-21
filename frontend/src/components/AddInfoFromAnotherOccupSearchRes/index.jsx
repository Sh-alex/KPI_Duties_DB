import React, {Component} from "react";
import { Pagination } from 'react-bootstrap'
import "./styles.less";

import AddInfoFromAnotherOccupSearchResTblResponsiblities from '../AddInfoFromAnotherOccupSearchResTblResponsiblities'
import AddInfoFromAnotherOccupSearchResTblCodes from '../AddInfoFromAnotherOccupSearchResTblCodes'
import AddInfoFromAnotherOccupSearchResTblHaveToKnow from '../AddInfoFromAnotherOccupSearchResTblHaveToKnow'
import AddInfoFromAnotherOccupSearchResTblQualiffRequir from '../AddInfoFromAnotherOccupSearchResTblQualiffRequir'

import {
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR
} from '../../constants/addingInfoFromAnotherOccup'

export default class AddInfoFromAnotherOccupSearchRes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {
                itemIndex: null,
                portionIndex: null,
                data: null
            },
            activePortion: 1,                           //номер порції таблиці яку показуємо
            expandedItems: {},
        };
        this.handleItemSelect = this.handleItemSelect.bind(this);
        this.handleToggleExpandItem = this.handleToggleExpandItem.bind(this);
        this.handlePaginationPageSelect = this.handlePaginationPageSelect.bind(this);
    }

    handleItemSelect(newItem) {
        this.setState({
            selectedItem: newItem
        });
    }

    handleToggleExpandItem(itemId) {
        if(this.state.expandedItems[itemId]) {
            let newExpandedItemsState = Object.assign({}, this.state.expandedItems);
            delete newExpandedItemsState[itemId];
            this.setState({
                expandedItems: newExpandedItemsState
            });
        } else {
            this.setState({
                expandedItems: {
                    ...this.state.expandedItems,
                    [itemId]: true
                }
            });
        }
    }

    handlePaginationPageSelect(pageNum) {
        this.setState({ activePortion: pageNum });
    }

    render() {
        let paginationSize = 10,
            numOfPortions = Math.ceil(this.props.searchResData.itemsList.length / paginationSize),
            portionStartIndex = paginationSize*(this.state.activePortion-1),
            portionEndIndex = paginationSize*this.state.activePortion,
            showingSearchResData = {
                itemsById: this.props.searchResData.itemsById,
                itemsList: this.props.searchResData.itemsList.slice(portionStartIndex, portionEndIndex)
            },
            resultsTable;

        switch(this.props.resultsType) {
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblResponsiblities
                        tblStartIndex={portionStartIndex}
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={showingSearchResData}
                    />
                );
                break;
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblHaveToKnow
                        tblStartIndex={portionStartIndex}
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={showingSearchResData}
                    />
                );
                break;
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblQualiffRequir
                        tblStartIndex={portionStartIndex}
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={showingSearchResData}
                    />
                );
                break;
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblCodes
                        tblStartIndex={portionStartIndex}
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={showingSearchResData}
                    />
                );
                break;
        }

        let pagPortionSize = 1,
            pagination = this.props.searchResData.itemsList.length > pagPortionSize ? (
                <div className="pagination-wrapper">
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        bsClass={"pagination no-margin"}
                        items={numOfPortions}
                        maxButtons={5}
                        activePage={this.state.activePortion}
                        onSelect={this.handlePaginationPageSelect} />
                </div>
            ) : "";

        return (
            <form className="search-similar-results">
                <a href="javascript:void(0)" onClick={this.props.goBackToSearchForm} className="btn-back-to-search-form">
                    <i className="fa fa-long-arrow-left" />
                    <i> Повернутися до пошукової форми </i>
                </a>
                <div className="table-responsive">
                    {resultsTable}
                </div>
                <div className="clearfix search-similar__bottom-btns-part">
                    <div className="text-left">
                        <button type="button" className="btn btn-default" onClick={this.props.cancelSearch}>
                            Відміна
                        </button>
                    </div>
                    { pagination }
                    <div className="text-right">
                        <button
                            onClick={() => {
                                this.props.handleAddInfoBtnClick({
                                    data: this.state.selectedItem.data,
                                    resultsType: this.props.resultsType,
                                    resPortionIndex: this.props.resPortionIndex,
                                    resForm: this.props.resForm
                                })
                            }}
                            type="button"
                            disabled={!this.state.selectedItem.data}
                            form="search-similar-results"
                            className="btn btn-primary">
                            Додати
                        </button>
                    </div>
                </div>

            </form>
        )
    }
}

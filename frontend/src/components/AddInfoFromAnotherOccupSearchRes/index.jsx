import React, {Component} from "react";
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
            expandedItems: {},
        };
        this.handleItemSelect = this.handleItemSelect.bind(this);
        this.handleToggleExpandItem = this.handleToggleExpandItem.bind(this);
    }

    handleItemSelect(newItem) {
        this.setState({
            selectedItem: newItem
        });
    }

    handleToggleExpandItem(itemIndex, portionIndex) {
        if(this.state.expandedItems[itemIndex+"_"+portionIndex]) {
            let newExpandedItemsState = Object.assign({}, this.state.expandedItems);
            delete newExpandedItemsState[itemIndex+"_"+portionIndex];
            this.setState({
                expandedItems: newExpandedItemsState
            });
        } else {
            this.setState({
                expandedItems: {
                    ...this.state.expandedItems,
                    [itemIndex+"_"+portionIndex]: true
                }
            });    
        }
    }

    render() {
        let resultsTable;
        switch(this.props.resultsType) {
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblResponsiblities
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={this.props.searchResData}
                    />
                );
                break;
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblHaveToKnow
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={this.props.searchResData}
                    />
                );
                break;
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblQualiffRequir
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={this.props.searchResData}
                    />
                );
                break;
            case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES:
                resultsTable = (
                    <AddInfoFromAnotherOccupSearchResTblCodes
                        selectedItem={this.state.selectedItem}
                        onSelectItem={this.handleItemSelect}
                        expandedItems={this.state.expandedItems}
                        onToggleExpandItem={this.handleToggleExpandItem}
                        searchResData={this.props.searchResData}
                    />
                );
                break;
        }

        return (
            <form className="search-similar-results">
                <a href="javascript:void(0)" onClick={this.props.goBackToSearchForm} className="btn-back-to-search-form">
                    <i className="fa fa-long-arrow-left" aria-hidden="true" />
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
                    <div className="text-center">
                        <ul className="pagination no-margin">
                            <li className="disabled"><a href="#">«</a></li>
                            <li className="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">»</a></li>
                        </ul>
                    </div>
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

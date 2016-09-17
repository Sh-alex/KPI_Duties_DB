import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import "./styles.less";

import BoxExpandBtn from "../BoxExpandBtn"
import SearchOccupBoxResTbl from "../SearchOccupBoxResTbl"

export default class SearchOccupBoxRes extends Component {
    constructor(props) {
        super(props);

        let portionSizesArr = [10, 25, 50, 100, 200];
        this.state = {
            editingItem: null,                          //яка посада(ID) зараз редагується(для неї показуємо модальне вікно)
            deletingItem: null,                         //яка посада(ID) зараз видаляється(для неї показуємо модальне вікно)
            sortField: null,                            //поле по якому портується таблиця
            sortDirection: "SORT_ASC",                  //напрям сортування SORT_ASC/SORT_DESC
            portionSize: portionSizesArr[0],            //обраний розмір порції
            portionSizesArr,                            //масив розмірів порцій
            portionIndex: 0,                            //номер порції яку показуємо
            expandedItems: {},                          //які елементи розкриті(показуються деталі про посаду)
        };

        this.handleToggleExpandItem = this.handleToggleExpandItem.bind(this);
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

    render() {
        //TODO: обраховувати(на основі обраного індекса порції) які дані показувати у таблиці
        let performedSearchResData = this.props.searchResData;

        return (
            <div className={`box box-default ${this.props.boxIsExpanded ? "" : "collapsed-box"}`}>
                <div className="box-header with-border text-center">
                    <h3 className="box-title">
                        Результати пошуку
                    </h3>
                    <div className="box-tools pull-right">
                        <BoxExpandBtn
                            toggleExpand={this.props.toggleExpand}
                            expanded={this.props.boxIsExpanded}
                        />
                    </div>
                </div>
                <div className="box-body">
                    {
                        !performedSearchResData.itemsList.length ? (
                            <div className="text-center">
                                <Alert bsStyle="warning alert-sm">
                                    <p>
                                        За вказаними критеріями не знайдено жодної посади.<br />
                                        Спробуйте змінити критерії пошуку у формі.
                                    </p>
                                </Alert>
                            </div>
                        ) : (
                            <SearchOccupBoxResTbl
                                searchResData={performedSearchResData}
                                sortDirection={this.state.sortDirection}
                                sortField={this.state.sortField}
                                expandedItems={this.state.expandedItems}
                                onEditItem={this.props.onEditItem}
                                onDeleteItem={this.props.onDeleteItem}
                                onToggleExpandItem={this.handleToggleExpandItem}
                            />
                        )
                    }
                </div>
                <div className="box-footer clearfix">
                    <div className="col-sm-6">
                        <label>
                            Показувати по {" "}
                            <select
                                value={this.state.selectedPortionSize}
                                onChange={ e => this.setState({
                                        selectedPortionSize: Number.parseInt(e.currentTarget.value)
                                    })
                                }
                                className="input-sm"
                            >
                                {
                                    this.state.portionSizesArr.map( size => {
                                        return <option value={size} > { size } </option>
                                    })
                                }
                            </select>
                            {" "} записів
                        </label>
                    </div>
                    <div className="col-sm-6 text-right">
                        <ul className="pagination no-margin">
                            <li className="disabled"><a href="#">«</a></li>
                            <li className="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">»</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

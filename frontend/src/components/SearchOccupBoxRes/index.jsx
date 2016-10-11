import React, { Component } from "react";
import { Alert, Pagination } from 'react-bootstrap'
import "./styles.less";

import BoxExpandBtn from "../BoxExpandBtn"
import SearchOccupBoxResTbl from "../SearchOccupBoxResTbl"
import ModalConfirmDelOccup from "../ModalConfirmDelOccup"
import ModalEditOccup from "../ModalEditOccup"

import {
    sortSearchResData,

    SORT_ASC,
    SORT_DESC,

    OCCUPATION_GROUP,
    OCCUPATION_NAME,
    START_IN_KPI_DATE,
    STOP_IN_KPI_DATE,
    START_IN_STATE_DATE,
    STOP_IN_STATE_DATE
} from "../../utils/sortSearchResData"

export default class SearchOccupBoxRes extends Component {
    constructor(props) {
        super(props);

        let portionSizesArr = [10, 25, 50, 100, 200];
        this.state = {
            editingItem: null,                          //яка посада(ID) зараз редагується(для неї показуємо модальне вікно)
            deletingItem: null,                         //яка посада(ID) зараз видаляється(для неї показуємо модальне вікно)
            sortField: OCCUPATION_NAME,                 //поле по якому портується таблиця
            sortDirection: SORT_ASC,                    //напрям сортування SORT_ASC/SORT_DESC
            portionSize: portionSizesArr[0],            //обраний розмір порції
            portionSizesArr,                            //масив розмірів порцій
            activePortion: 1,                           //номер порції таблиці яку показуємо
            expandedItems: {},                          //які елементи розкриті(показуються деталі про посаду)

            dontShowAgainDelModal: false,               //більше не показувати повідомлення із підтвердженням видалення посади
            showModalConfirmDelOccup: false,            //чи показується(відкрите) зараз модальне вікно із підтвердженням видалення посади
        };

        this.handleToggleExpandItem = this.handleToggleExpandItem.bind(this);
        this.handlePaginationPageSelect = this.handlePaginationPageSelect.bind(this);
        this.hideModalConfirmDelOccup = this.hideModalConfirmDelOccup.bind(this);
        this.triggerDontShowAgainDel = this.triggerDontShowAgainDel.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleDeleteItemShowingModal = this.handleDeleteItemShowingModal.bind(this);
        this.triggerSorting = this.triggerSorting.bind(this);
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

    hideModalConfirmDelOccup () {
        this.setState({
            showModalConfirmDelOccup: false,
            deletingItem: null
        });
        this.props.dismissDelOccupationAlert(this.state.deletingItem);
    }

    triggerDontShowAgainDel() {
        this.setState({ dontShowAgainDelModal: !this.state.dontShowAgainDelModal });
    }

    handleDeleteItem(itemId) {
        this.props.onDeleteItem(itemId || this.state.deletingItem);
    }

    handleDeleteItemShowingModal(itemId) {
        if(!this.state.dontShowAgainDelModal) {
            this.setState({
                showModalConfirmDelOccup: true,
                deletingItem: itemId
            });
        } else {
            this.setState({
                deletingItem: itemId
            });
            this.handleDeleteItem(itemId);
        }
    }

    triggerSorting(sortField) {
        if(sortField == this.state.sortField) {
            if(this.state.sortDirection == SORT_ASC)
                return this.setState({ sortDirection: SORT_DESC });
            else
                return this.setState({ sortDirection: SORT_ASC });
        } else {
            return this.setState({
                sortField: sortField,
                sortDirection: SORT_ASC
            });
        }
    }
    
    handlePaginationPageSelect(pageNum) {
        this.setState({ activePortion: pageNum });
    }

    render() {
        let sortedSearchResData = sortSearchResData({
                data: this.props.searchResData,
                field: this.state.sortField,
                direction: this.state.sortDirection,
                occupationGroupList: this.props.occupationGroupList
            }),
            numOfPortions = Math.ceil(sortedSearchResData.itemsList.length / this.state.portionSize),
            portionStartIndex = this.state.portionSize*(this.state.activePortion-1),
            portionEndIndex = this.state.portionSize*this.state.activePortion,
            showingSearchResData = {
                itemsById: sortedSearchResData.itemsById,
                itemsList: sortedSearchResData.itemsList.slice(portionStartIndex, portionEndIndex)
            },
            modalConfirmDelOccupAdditionalTitle = this.state.deletingItem !== null &&
                this.state.deletingItem !== undefined &&
                this.props.searchResData.itemsById[this.state.deletingItem] &&
                this.props.searchResData.itemsById[this.state.deletingItem].data &&
                this.props.searchResData.itemsById[this.state.deletingItem].data.occupationName || "";

        if(this.state.dontShowAgainDelModal && this.props.delOccupationError)
            alert(this.props.delOccupationError);

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
                    <ModalConfirmDelOccup
                        additionalTitle={modalConfirmDelOccupAdditionalTitle}
                        onTriggerDontShowAgain={this.triggerDontShowAgainDel}
                        dontShowAgain={this.state.dontShowAgainDelModal}
                        show={this.state.showModalConfirmDelOccup}
                        error={this.props.delOccupationError}
                        success={this.props.delOccupationSuccess}
                        onAlertDismiss={this.props.dismissDelOccupationAlert}
                        isDeletingOccupation={this.props.isDeletingOccupation}
                        onSubmit={this.handleDeleteItem}
                        onHide={ this.hideModalConfirmDelOccup }
                    />
                    <ModalEditOccup />
                    {
                        !this.props.searchResData.itemsList.length ? (
                            <Alert bsStyle="warning alert-sm alert--with-margin">
                                <p>
                                    За вказаними критеріями не знайдено жодної посади.<br />
                                    Спробуйте змінити критерії пошуку у формі.
                                </p>
                            </Alert>
                        ) : (
                            <SearchOccupBoxResTbl
                                searchResData={showingSearchResData}
                                tblStartIndex={portionStartIndex}
                                occupationGroupList={this.props.occupationGroupList}
                                clarifiedOccupationList={this.props.clarifiedOccupationList}
                                clarificationList={this.props.clarificationList}
                                sortDirection={this.state.sortDirection}
                                sortField={this.state.sortField}
                                expandedItems={this.state.expandedItems}
                                onEditItem={this.props.onEditItem}
                                onDeleteItem={this.handleDeleteItemShowingModal}
                                onToggleExpandItem={this.handleToggleExpandItem}
                                triggerSorting={this.triggerSorting}
                                isDeletingOccupation={this.props.isDeletingOccupation}
                                deletingItem={this.state.deletingItem}
                            />
                        )
                    }
                </div>
                {
                    this.props.searchResData.itemsList.length && (
                        <div className="box-footer clearfix">
                            <div className="col-sm-6">
                                <label>
                                    Показувати по {" "}
                                    <select
                                        value={this.state.selectedPortionSize}
                                        onChange={ e =>
                                            this.setState({
                                                selectedPortionSize: Number.parseInt(e.currentTarget.value)
                                            })
                                        }
                                        className="input-sm"
                                    >
                                        {
                                            this.state.portionSizesArr.map((size, i) => {
                                                return <option value={size} key={i}> { size } </option>
                                            })
                                        }
                                    </select>
                                    {" "} записів
                                </label>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Pagination
                                    prev
                                    next
                                    first
                                    last
                                    ellipsis
                                    boundaryLinks
                                    items={numOfPortions}
                                    maxButtons={5}
                                    activePage={this.state.activePortion}
                                    onSelect={this.handlePaginationPageSelect} />
                            </div>
                        </div>
                    ) || ""
                }
            </div>
        );
    }
}

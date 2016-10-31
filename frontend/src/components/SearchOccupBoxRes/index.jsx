import React, { Component } from "react";
import { Alert, Pagination } from 'react-bootstrap'
import "./styles.less";

import BoxExpandBtn from "../BoxExpandBtn"
import SearchOccupBoxResTbl from "../SearchOccupBoxResTbl"
import ModalConfirmDelOccup from "../ModalConfirmDelOccup"
import ModalEditOccup from "../ModalEditOccup"
import ModalResDownloadSettings from "../ModalResDownloadSettings"
import PaginationSizeSelect from "../PaginationSizeSelect"

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

        let paginationSizesArr = [10, 25, 50, 100, 200];
        this.state = {
            editingItem: null,                          //яка посада(ID) зараз редагується(для неї показуємо модальне вікно)
            deletingItem: null,                         //яка посада(ID) зараз видаляється(для неї показуємо модальне вікно)
            sortField: null,                            //поле по якому портується таблиця
            sortDirection: SORT_ASC,                    //напрям сортування SORT_ASC/SORT_DESC
            searchResData: this.props.searchResData,    //дані із результатами пошуку; зберігаємо у стані компонента, бо тут вони будуть відсортовані
            paginationSize: paginationSizesArr[0],      //обраний розмір порції
            paginationSizesArr,                         //масив розмірів порцій
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
        this.handlePaginationSizeSelect = this.handlePaginationSizeSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let thisItemsList = this.state.searchResData.itemsList,
            nextItemsList = nextProps.searchResData.itemsList,
            searchResDataChanged = false,
            i = 0;

        if(thisItemsList.length !== nextItemsList.length){
            searchResDataChanged = true;
            i = nextItemsList.length+1;
        }

        for(; i < nextItemsList.length; i++) {
            if(thisItemsList[i] !== nextItemsList[i]) {
                searchResDataChanged = true;
                break;
            }
        }

        if(searchResDataChanged)
            return this.setState({
                searchResData: sortSearchResData({
                    data: nextProps.searchResData,
                    field: this.state.sortField,
                    direction: this.state.sortDirection,
                    occupationGroupList: nextProps.occupationGroupList
                })
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

    handlePaginationSizeSelect(e) {
        this.setState({
            activePortion: 1,
            paginationSize: Number.parseInt(e.currentTarget.value)
        })
    }
    
    triggerSorting(sortField) {
        let sortDirection;
        if(sortField == this.state.sortField) {
            if(this.state.sortDirection == SORT_ASC)
                sortDirection = SORT_DESC;
            else
                sortDirection = SORT_ASC;
        } else {
            sortDirection = SORT_ASC;
        }

        return this.setState({
            sortField,
            sortDirection,
            searchResData: sortSearchResData({
                data: this.state.searchResData,
                field: sortField,
                direction: sortDirection,
                occupationGroupList: this.props.occupationGroupList
            })
        });
    }
    
    handlePaginationPageSelect(pageNum) {
        this.setState({ activePortion: pageNum });
    }

    render() {
        let numOfPortions = Math.ceil(this.state.searchResData.itemsList.length / this.state.paginationSize),
            portionStartIndex = this.state.paginationSize*(this.state.activePortion-1),
            portionEndIndex = this.state.paginationSize*this.state.activePortion,
            showingSearchResData = {
                itemsById: this.state.searchResData.itemsById,
                itemsList: this.state.searchResData.itemsList.slice(portionStartIndex, portionEndIndex)
            },
            modalConfirmDelOccupAdditionalTitle = this.state.deletingItem !== null &&
                this.state.deletingItem !== undefined &&
                this.state.searchResData.itemsById[this.state.deletingItem] &&
                this.state.searchResData.itemsById[this.state.deletingItem].data &&
                this.state.searchResData.itemsById[this.state.deletingItem].data.occupationName || "";

        if(this.state.dontShowAgainDelModal && this.props.delOccupationError)
            alert(this.props.delOccupationError);

        return (
            <div className={`box box-default box-search-res ${this.props.boxIsExpanded ? "" : "collapsed-box"}`}>
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
                    <ModalResDownloadSettings />
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
                        !this.state.searchResData.itemsList.length ? (
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
                    this.state.searchResData.itemsList.length && (
                        <div className="box-footer clearfix">
                            <div className="col-sm-4">
                                <PaginationSizeSelect
                                    selectedSize={this.state.paginationSize}
                                    onSizeSelect={this.handlePaginationSizeSelect}
                                    sizesArr={this.state.paginationSizesArr} />
                            </div>
                            <div className="col-sm-4 text-center">
                                <button
                                    className="btn btn-default"
                                    title="Заватажити результати у Excel файл"
                                    onClick={this.props.showModalResDownloadSettings}
                                >
                                    <i className="fa fa-download" />
                                    {" "} Заватажити результати
                                </button>
                            </div>
                            <div className="col-sm-4 text-right">
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
                        </div>
                    ) || ""
                }
            </div>
        );
    }
}

import React, { Component } from "react";
import { Alert, Pagination } from 'react-bootstrap'
import classnames from "classnames";

import "./styles.less";

import BtnExpandBox from "../BtnExpandBox"
import SearchOccupBoxResTbl from "../SearchOccupBoxResTbl"
import ModalConfirmDelItem from "../ModalConfirmDelItem"
import ModalEditOccup from "../ModalEditOccup"
import ModalResDownloadSettings from "../ModalResDownloadSettings"
import PaginationSizeSelect from "../PaginationSizeSelect"

import {
    SORT_ASC,
    SORT_DESC,
    paginationSizesArr
} from "../../constants/common"

export default class SearchOccupBoxRes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editingItem: null,                          //яка посада(ID) зараз редагується(для неї показуємо модальне вікно)
            deletingItem: null,                         //яка посада(ID) зараз видаляється(для неї показуємо модальне вікно)
            sortField: null,                            //поле по якому портується таблиця
            sortDirection: null,                        //напрям сортування SORT_ASC/SORT_DESC
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

    componentWillReceiveProps(nextProps) {  }

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
        let paginationSize = Number.parseInt(e.currentTarget.value) || this.state.paginationSizesArr[0];

        this.props.getOccupations({
            sortField: this.state.sortField,
            sortDirection: this.state.sortDirection,
            limit: paginationSize,
            offset: this.state.paginationSize * (this.state.activePortion - 1)
        });

        this.setState({
            activePortion: 1,
            paginationSize
        });
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

        this.props.getOccupations({
            sortField,
            sortDirection,
            limit: this.state.paginationSize,
            offset: this.state.paginationSize*(this.state.activePortion-1)
        });

        this.setState({
            sortField,
            sortDirection,
        });
    }
    
    handlePaginationPageSelect(pageNum) {
        this.props.getOccupations({
            sortField: this.state.sortField,
            sortDirection: this.state.sortDirection,
            limit: this.state.paginationSize,
            offset: this.state.paginationSize*(pageNum-1)
        });

        this.setState({ activePortion: pageNum });
    }

    render() {
        if(!this.props.show)
            return <div />;

        let numOfPortions = Math.ceil((this.props.searchResData.resultsOveralSize || 0) / this.state.paginationSize),
            portionStartIndex = this.state.paginationSize*(this.state.activePortion-1),
            portionEndIndex = this.state.paginationSize*this.state.activePortion,
            showingSearchResData = {
                itemsById: this.props.searchResData && this.props.searchResData.itemsById,
                itemsList: this.props.searchResData && this.props.searchResData.itemsList.slice(0, this.state.paginationSize)
            },
            BtnDownloadSearchResults = this.props.userMayDownloadSearchResults ? (
                <button
                    className="btn btn-default btn-download-search-res"
                    title="Заватажити результати у Excel файл"
                    onClick={this.props.showModalResDownloadSettings}
                >
                    <i className="fa fa-download" />
                    {" "} Заватажити результати
                </button>
            ) : null,
            modalConfirmDelOccupAdditionalTitle = this.state.deletingItem !== null &&
                this.state.deletingItem !== undefined &&
                this.props.searchResData.itemsById[this.state.deletingItem] &&
                this.props.searchResData.itemsById[this.state.deletingItem].data &&
                this.props.searchResData.itemsById[this.state.deletingItem].data.occupationName || "",
            boxClassName = classnames({
                "box box-default box-search-res": true,
                "collapsed-box": !this.props.boxIsExpanded
            });

        if(this.state.dontShowAgainDelModal && this.props.delOccupationError)
            alert(this.props.delOccupationError);

        return (
            <div className={boxClassName}>
                <div className="box-header with-border text-center">
                    <h3 className="box-title">
                        Результати пошуку
                    </h3>
                    <div className="box-tools pull-right">
                        <BtnExpandBox
                            toggleExpand={this.props.toggleExpand}
                            expanded={this.props.boxIsExpanded}
                        />
                    </div>
                </div>
                <div className="box-body">
                    <ModalResDownloadSettings />
                    <ModalConfirmDelItem
                        headline={"Підтвердіть видалення інформації про посаду " + modalConfirmDelOccupAdditionalTitle}
                        successMsgAlertTitle={"Посаду успішно видалено."}
                        onTriggerDontShowAgain={this.triggerDontShowAgainDel}
                        dontShowAgain={this.state.dontShowAgainDelModal}
                        show={this.state.showModalConfirmDelOccup}
                        error={this.props.delOccupationError}
                        success={this.props.delOccupationSuccess}
                        onAlertDismiss={this.props.dismissDelOccupationAlert}
                        isDeletingItem={this.props.isDeletingOccupation}
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
                                showBtnDelOccupations={this.props.userMayDelOccupations}
                                showBtnEditOccupations={this.props.userMayEditOccupations}
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
                            <div className="col-xs-12 col-sm-6 col-lg-3 pagination-size-select-wrapper">
                                <PaginationSizeSelect
                                    selectedSize={this.state.paginationSize}
                                    onSizeSelect={this.handlePaginationSizeSelect}
                                    sizesArr={this.state.paginationSizesArr} />
                            </div>
                            <div className="col-xs-12 col-lg-6 text-center pagination-wrapper">
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
                            <div className="col-xs-12 col-sm-6 col-lg-3 text-right btn-download-search-res-wrapper">
                                { BtnDownloadSearchResults }
                            </div>
                        </div>
                    ) || ""
                }
            </div>
        );
    }
}

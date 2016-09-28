import React, {Component} from "react";
import {Alert} from 'react-bootstrap'
import "./styles.less";

import BoxExpandBtn from "../BoxExpandBtn"
import SearchOccupBoxResTbl from "../SearchOccupBoxResTbl"
import ModalConfirmDelOccup from "../ModalConfirmDelOccup"
import ModalEditOccup from "../ModalEditOccup"


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

            dontShowAgainDelModal: false,
            showModalConfirmDelOccup: false,
        };

        this.handleToggleExpandItem = this.handleToggleExpandItem.bind(this);
        this.hideModalConfirmDelOccup = this.hideModalConfirmDelOccup.bind(this);
        this.triggerDontShowAgainDel = this.triggerDontShowAgainDel.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleDeleteItemShowingModal = this.handleDeleteItemShowingModal.bind(this);
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

    render() {
        //TODO: обраховувати(на основі обраного індекса порції) які дані показувати у таблиці
        let performedSearchResData = this.props.searchResData,
            modalConfirmDelOccupAdditionalTitle = this.state.deletingItem !== null && this.state.deletingItem !== undefined &&
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
                        !performedSearchResData.itemsList.length ? (
                            <Alert bsStyle="warning alert-sm alert--with-margin">
                                <p>
                                    За вказаними критеріями не знайдено жодної посади.<br />
                                    Спробуйте змінити критерії пошуку у формі.
                                </p>
                            </Alert>
                        ) : (
                            <SearchOccupBoxResTbl
                                searchResData={performedSearchResData}
                                sortDirection={this.state.sortDirection}
                                sortField={this.state.sortField}
                                expandedItems={this.state.expandedItems}
                                onEditItem={this.props.onEditItem}
                                onDeleteItem={this.handleDeleteItemShowingModal}
                                onToggleExpandItem={this.handleToggleExpandItem}
                                isDeletingOccupation={this.props.isDeletingOccupation}
                                deletingItem={this.state.deletingItem}
                            />
                        )
                    }
                </div>
                {
                    performedSearchResData.itemsList.length && (
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
                                            this.state.portionSizesArr.map((size, i) => {
                                                return <option value={size} key={i}> { size } </option>
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
                    ) || ""
                }
            </div>
        );
    }
}

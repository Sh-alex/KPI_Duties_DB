import React, {Component} from "react";
import { connect } from 'react-redux'

import CtrlDcBoxRes from '../CtrlDcBoxRes'
import CtrlDcBoxMenu from '../CtrlDcBoxMenu'
import ModalEditOccupDcVal from '../ModalEditOccupDcVal'
import ModalConfirmDelItem from "../ModalConfirmDelItem"

import trimSubstr from "../../utils/trimSubstr"

import "./styles.less";

import {
    fetchOccupGroupList,
    fetchClarificationList,
    fetchClarifiedOccupList,

    addNewClarification,
    dismissModalAddNewClarificationAlert,
    addNewOccupationGroup,
    dismissModalAddNewOccupationGroupAlert,

    editOccupGroup,
    editOccupGroupClearMsg,
    editClarification,
    editClarificationClearMsg,

    delClarification,
    delClarificationClearMsg,
    delOccupGroup,
    delOccupGroupClearMsg,
} from "../../actions/occupationNameInfo"

import {
    fetchKPCodesList,
    fetchZKPPTRCodesList,
    fetchETDKCodesList,
    fetchDKHPCodesList,

    addNewKPCode,
    addNewDKHPCode,
    addNewETDKCode,
    addNewZKPPTRCode,
    clearKPCodeAddingMsg,
    clearDKHPCodeAddingMsg,
    clearETDKCodeAddingMsg,
    clearZKPPTRCodeAddingMsg,

    editKPCode,
    editETDKCode,
    editDKHPCode,
    editZKPPTRCode,
    editKPCodeClearMsg,
    editETDKCodeClearMsg,
    editDKHPCodeClearMsg,
    editZKPPTRCodeClearMsg,

    delKPCode,
    delETDKCode,
    delDKHPCode,
    delZKPPTRCode,
    delKPCodeClearMsg,
    delETDKCodeClearMsg,
    delDKHPCodeClearMsg,
    delZKPPTRCodeClearMsg,
} from "../../actions/occupCodesLists"

import {
    fetchHaveToKnowTextsList,
    fetchResponsibilitiesTextsList,
    fetchQualiffRequirTextsList,

    addNewHaveToKnowText,
    addNewResponsibilitiesText,
    addNewQualiffRequirText,
    clearHaveToKnowTextAddingMsg,
    clearQualiffRequirTextAddingMsg,
    clearResponsibilitiesTextAddingMsg,

    editHaveToKnowText,
    editQualiffRequirText,
    editResponsibilitiesText,
    editHaveToKnowTextClearMsg,
    editQualiffRequirTextClearMsg,
    editResponsibilitiesTextClearMsg,

    delHaveToKnowText,
    delQualiffRequirText,
    delResponsibilitiesText,
    delHaveToKnowTextClearMsg,
    delQualiffRequirTextClearMsg,
    delResponsibilitiesTextClearMsg,
} from "../../actions/occupDescriptionTextsLists"


class CtrlDcBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listItems: [],                              //елементи поточного списку; зберігаємо у стані компоненту щоб реалізувати функції сортування та фільтру, не викликаючи їх коли кожен раз міняється props чи state
            addingInpIsShown: false,                    //чи показано зараз поле для додавання нового значення
            activeListName: "OCCUP_GROUP",              //активний список, одне із: CLARIFICATION, CODE_KP, CODE_ZKPPTR, CODE_ETDK, CODE_DKHP, RESPONSIBILITIES, HAVE_TO_KNOW, QUALIFF_REQUIR
            editingItemId: null,                        //яка елемент(ID) зараз редагується(для нього показуємо модальне вікно)
            editingInpVal: "",                          //значення в інпуті для редагування елементів списків
            filterListInpVal: "",                       //значення в інпуті для фільтрування елементів по введеному рядку
            addingInpVal: "",                           //значення в інпуті для додавання нових елементів списків
            deletingItemId: null,                       //який елемент(ID) зараз видаляється(для нього показуємо модальне вікно)
            deletingItemVal: "",                        //значення елемента який зараз видаляється(щоб показати його у модальному вікні)
                                                        //Tip: це можна було б і розрахувати знаючи id, але так як у нас списки - масиви, доведеться пробігати по всьому масиву, тому краще вже зберігати значення в стані компоненту
            showModalConfirmDelOccupDcVal: false,       //чи показувати модальне вікно для підтвердження видалення елемента зі списку
            dontShowAgainDelModal: false,               //більше не показувати повідомлення із підтвердженням видалення посади
            sortDirection: "NONE",                      //напрям сортування списку, одне із: NONE/SORT_ASC/SORT_DESC
            expandedItems: {},                          //які елементи розкриті(показується повне значення елемента списку чи скорочене)
            shownUsingOccupRows: {},
        };

        this.showAddingInp = this.showAddingInp.bind(this);
        this.hideAddingInp = this.hideAddingInp.bind(this);
        this.changeAddingInpVal = this.changeAddingInpVal.bind(this);
        this.setActiveListName = this.setActiveListName.bind(this);
        this.showModalEditOccupDcVal = this.showModalEditOccupDcVal.bind(this);
        this.changeEditingInpVal = this.changeEditingInpVal.bind(this);
        this.hideModalEditOccupDcVal = this.hideModalEditOccupDcVal.bind(this);
        this.handleToggleExpandItem = this.handleToggleExpandItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.showModalConfirmDelOccupDcVal = this.showModalConfirmDelOccupDcVal.bind(this);
        this.hideModalConfirmDelOccupDcVal = this.hideModalConfirmDelOccupDcVal.bind(this);
        this.triggerDontShowAgainDel = this.triggerDontShowAgainDel.bind(this);
        this.triggerSorting = this.triggerSorting.bind(this);
        this.sortListItems = this.sortListItems.bind(this);
        this.filterList = this.filterList.bind(this);
        this.resetFilterListInpVal = this.resetFilterListInpVal.bind(this);
        this.onChangeFilterListInpVal = this.onChangeFilterListInpVal.bind(this);
        this.selectAddNewOccupDcValSubmitHandler = this.selectAddNewOccupDcValSubmitHandler.bind(this);
        this.selectAddNewOccupDcValClearMsgHandler = this.selectAddNewOccupDcValClearMsgHandler.bind(this);
        this.selectDelOccupDcValSubmitHandler = this.selectDelOccupDcValSubmitHandler.bind(this);
        this.selectDelOccupDcValClearMsgHandler = this.selectDelOccupDcValClearMsgHandler.bind(this);
        this.selectEditOccupDcValSubmitHandler = this.selectEditOccupDcValSubmitHandler.bind(this);
        this.selectEditOccupDcValClearMsgHandler = this.selectEditOccupDcValClearMsgHandler.bind(this);
        this.getActiveListData = this.getActiveListData.bind(this);
        this.getActiveListTitle = this.getActiveListTitle.bind(this);
        this.handleToggleUsingOccupListBtnClick = this.handleToggleUsingOccupListBtnClick.bind(this);
        this.handleUsingOccupNameClick = this.handleUsingOccupNameClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchLists();
    }

    componentWillReceiveProps(nextProps) {
        //визначаємо посилання на активні списки
        let listNamesDict = {
            OCCUP_GROUP: "occupationGroupList",
            CLARIFICATION: "clarificationList",
            CODE_KP: "KPCodesList",
            CODE_ZKPPTR: "ZKPPTRCodesList",
            CODE_ETDK: "ETDKCodesList",
            CODE_DKHP: "DKHPCodesList",
            RESPONSIBILITIES: "responsibilitiesTextsList",
            HAVE_TO_KNOW: "haveToKnowTextsList",
            QUALIFF_REQUIR: "qualiffRequirTextsList",
        };
        let prevPropsListData = this.props[listNamesDict[this.state.activeListName]],
            nextPropsListData = nextProps[listNamesDict[this.state.activeListName]];

        if(!prevPropsListData || !nextPropsListData)
            return console.error("Can't calculate prevPropsListData or nextPropsListData!");

        let successfullyAddedNewVal = !prevPropsListData.addingSuccess && nextPropsListData.addingSuccess,
            successfullyEditedVal = !prevPropsListData.updatingSuccess && nextPropsListData.updatingSuccess,
            fetchedList = prevPropsListData.isFetching && !nextPropsListData.isFetching,
            successfullyDeletedItem = !prevPropsListData.deletingSuccess && nextPropsListData.deletingSuccess;

        //очищаємо значення поля для додавання нових елементів, якщо щойно у якогось списка включився стан addingSuccess
        if(successfullyAddedNewVal)
            this.setState({ addingInpVal: "" });

        //якщо список змінився, оновлюємо і закешовані дані, за потреби викликаючи сортування ще раз
        if(successfullyEditedVal || successfullyAddedNewVal || fetchedList || successfullyDeletedItem)
            this.setState({
                listItems: this.sortListItems(nextPropsListData.items.slice(), this.state.sortDirection)
            });
    }

    triggerSorting() {
        let sortDirection = (this.state.sortDirection == "SORT_ASC") ? "SORT_DESC" : "SORT_ASC";
        return this.setState({
            sortDirection,
            listItems: this.sortListItems(this.state.listItems, sortDirection)
        });
    }

    sortListItems(listItems = this.state.listItems, sortDirection = this.state.sortDirection) {
        switch(sortDirection) {
            case "SORT_ASC":
                return listItems.sort((a, b) => +(a.textValue.toLocaleLowerCase() > b.textValue.toLocaleLowerCase()) || +(a.textValue.toLocaleLowerCase() === b.textValue.toLocaleLowerCase()) - 1);
            case "SORT_DESC":
                return listItems.sort((a, b) => +(a.textValue.toLocaleLowerCase() < b.textValue.toLocaleLowerCase()) || +(a.textValue.toLocaleLowerCase() === b.textValue.toLocaleLowerCase()) - 1);
            default:
                return listItems;
        }
    }

    onChangeFilterListInpVal(e) {
        this.setState({ filterListInpVal: e.target.value });
    }

    filterList(filterStr="") {
        let propsListData = this.getActiveListData().items.slice(),
            filteredListData = propsListData.filter(item => item.textValue.includes(filterStr));
        this.setState({
            listItems: this.sortListItems(filteredListData, this.state.sortDirection )
        });
    }

    resetFilterListInpVal() {
        let propsListData = this.getActiveListData().items.slice();
        this.setState({
            filterListInpVal: "",
            listItems: this.sortListItems(propsListData, this.state.sortDirection)
        });
    }

    selectAddNewOccupDcValSubmitHandler(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return newVal => this.props.addNewOccupGroup(newVal);
            case "CLARIFICATION":
                return newVal => this.props.addNewClarification( newVal );
            case "CODE_KP":
                return newVal => this.props.addNewKPCode( newVal );
            case "CODE_ZKPPTR":
                return newVal => this.props.addNewZKPPTRCode( newVal );
            case "CODE_ETDK":
                return newVal => this.props.addNewETDKCode( newVal );
            case "CODE_DKHP":
                return newVal => this.props.addNewDKHPCode( newVal );
            case "RESPONSIBILITIES":
                return newVal => this.props.addNewResponsibilitiesText( newVal );
            case "HAVE_TO_KNOW":
                return newVal => this.props.addNewHaveToKnowText( newVal );
            case "QUALIFF_REQUIR":
                return newVal => this.props.addNewQualiffRequirText( newVal );
            default:
                return () => console.error(`Called CtrlDcBox.selectAddNewOccupDcValSubmitHandler, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
        }
    }

    selectAddNewOccupDcValClearMsgHandler(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return this.props.addNewOccupGroupClearMsg;
            case "CLARIFICATION":
                return this.props.addNewClarificationClearMsg;
            case "CODE_KP":
                return this.props.addNewKPCodeClearMsg;
            case "CODE_ZKPPTR":
                return this.props.addNewZKPPTRCodeClearMsg;
            case "CODE_ETDK":
                return this.props.addNewETDKCodeClearMsg;
            case "CODE_DKHP":
                return this.props.addNewDKHPCodeClearMsg;
            case "RESPONSIBILITIES":
                return this.props.addNewResponsibilitiesTextClearMsg;
            case "HAVE_TO_KNOW":
                return this.props.addNewHaveToKnowTextClearMsg;
            case "QUALIFF_REQUIR":
                return this.props.addNewQualiffRequirTextClearMsg;
            default:
                return () => console.error(`Called CtrlDcBox.selectAddNewOccupDcValClearMsgHandler, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
        }
    }

    selectDelOccupDcValSubmitHandler(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return itemId => this.props.delOccupGroup(itemId);
            case "CLARIFICATION":
                return itemId => this.props.delClarification(itemId);
            case "CODE_KP":
                return itemId => this.props.delKPCode(itemId);
            case "CODE_ZKPPTR":
                return itemId => this.props.delZKPPTRCode(itemId);
            case "CODE_ETDK":
                return itemId => this.props.delETDKCode(itemId);
            case "CODE_DKHP":
                return itemId => this.props.delDKHPCode(itemId);
            case "RESPONSIBILITIES":
                return itemId => this.props.delResponsibilitiesText(itemId);
            case "HAVE_TO_KNOW":
                return itemId => this.props.delHaveToKnowText(itemId);
            case "QUALIFF_REQUIR":
                return itemId => this.props.delQualiffRequirText(itemId);
            default:
                return () => console.error(`Called CtrlDcBox.selectDelOccupDcValSubmitHandler, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
        }
    }

    selectDelOccupDcValClearMsgHandler(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return this.props.delOccupGroupClearMsg;
            case "CLARIFICATION":
                return this.props.delClarificationClearMsg;
            case "CODE_KP":
                return this.props.delKPCodeClearMsg;
            case "CODE_ZKPPTR":
                return this.props.delZKPPTRCodeClearMsg;
            case "CODE_ETDK":
                return this.props.delETDKCodeClearMsg;
            case "CODE_DKHP":
                return this.props.delDKHPCodeClearMsg;
            case "RESPONSIBILITIES":
                return this.props.delResponsibilitiesTextClearMsg;
            case "HAVE_TO_KNOW":
                return this.props.delHaveToKnowTextClearMsg;
            case "QUALIFF_REQUIR":
                return this.props.delQualiffRequirTextClearMsg;
            default:
                return () => console.error(`Called CtrlDcBox.selectDelOccupDcValClearMsgHandler, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
        }
    }

    selectEditOccupDcValSubmitHandler(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return newVal => this.props.editOccupGroup({ newVal, id: this.state.editingItemId });
            case "CLARIFICATION":
                return newVal => this.props.editClarification({ newVal, id: this.state.editingItemId });
            case "CODE_KP":
                return newVal => this.props.editKPCode({ newVal, id: this.state.editingItemId });
            case "CODE_ZKPPTR":
                return newVal => this.props.editZKPPTRCode({ newVal, id: this.state.editingItemId });
            case "CODE_ETDK":
                return newVal => this.props.editETDKCode({ newVal, id: this.state.editingItemId });
            case "CODE_DKHP":
                return newVal => this.props.editDKHPCode({ newVal, id: this.state.editingItemId });
            case "RESPONSIBILITIES":
                return newVal => this.props.editResponsibilitiesText({ newVal, id: this.state.editingItemId });
            case "HAVE_TO_KNOW":
                return newVal => this.props.editHaveToKnowText({ newVal, id: this.state.editingItemId });
            case "QUALIFF_REQUIR":
                return newVal => this.props.editQualiffRequirText({ newVal, id: this.state.editingItemId });
            default:
                return () => console.error(`Called CtrlDcBox.selectEditOccupDcValSubmitHandler, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
        }
    }

    selectEditOccupDcValClearMsgHandler(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return this.props.editOccupGroupClearMsg;
            case "CLARIFICATION":
                return this.props.editClarificationClearMsg;
            case "CODE_KP":
                return this.props.editKPCodeClearMsg;
            case "CODE_ZKPPTR":
                return this.props.editZKPPTRCodeClearMsg;
            case "CODE_ETDK":
                return this.props.editETDKCodeClearMsg;
            case "CODE_DKHP":
                return this.props.editDKHPCodeClearMsg;
            case "RESPONSIBILITIES":
                return this.props.editResponsibilitiesTextClearMsg;
            case "HAVE_TO_KNOW":
                return this.props.editHaveToKnowTextClearMsg;
            case "QUALIFF_REQUIR":
                return this.props.editQualiffRequirTextClearMsg;
            default:
                return () => console.error(`Called CtrlDcBox.selectEditOccupDcValClearMsgHandler, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
        }
    }

    getActiveListData(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return this.props.occupationGroupList;
            case "CLARIFICATION":
                return this.props.clarificationList;
            case "CODE_KP":
                return this.props.KPCodesList;
            case "CODE_ZKPPTR":
                return this.props.ZKPPTRCodesList;
            case "CODE_ETDK":
                return this.props.ETDKCodesList;
            case "CODE_DKHP":
                return this.props.DKHPCodesList;
            case "RESPONSIBILITIES":
                return this.props.responsibilitiesTextsList;
            case "HAVE_TO_KNOW":
                return this.props.haveToKnowTextsList;
            case "QUALIFF_REQUIR":
                return this.props.qualiffRequirTextsList;
            default:
                console.error(`Called CtrlDcBox.getActiveListData, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
                return {
                    isFetching: false,
                    errors: [],                 //TODO: замінити на fetchingErrors
                    items : [],
                    isAddingNewVal: false,
                    addingErrors: [],
                    addingSuccess: false,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: null,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: null,
                }
        }
    }

    getActiveListTitle(activeListName = this.state.activeListName) {
        switch(activeListName) {
            case "OCCUP_GROUP":
                return "Посадовий склад";
            case "CLARIFICATION":
                return "Уточнення";
            case "CODE_KP":
                return "Коди КП";
            case "CODE_ZKPPTR":
                return "Коди ЗКППТР";
            case "CODE_ETDK":
                return "Коди ЄТДК";
            case "CODE_DKHP":
                return "Коди ДКХП";
            case "RESPONSIBILITIES":
                return "Завдання, обов'язки та повноваження";
            case "HAVE_TO_KNOW":
                return "Повинен знати";
            case "QUALIFF_REQUIR":
                return "Кваліфікаційні вимоги";
            default:
                console.error(`Called CtrlDcBox.getActiveListTitle, but argument activeListName == ${activeListName} doesn't match any of expected values.`);
                return "";
        }
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

    showAddingInp() {
        this.setState({addingInpIsShown: true})
    }

    hideAddingInp() {
        this.setState({addingInpIsShown: false})
    }

    changeAddingInpVal(newVal) {
        this.setState({ addingInpVal: newVal });
    }

    setActiveListName(newActiveListName) {
        this.setState({
            sortDirection: "NONE",
            activeListName: newActiveListName,
            listItems: this.getActiveListData(newActiveListName).items.slice(),
        })
    }

    showModalEditOccupDcVal(itemId, oldVal) {
        this.setState({
            editingItemId: itemId,
            editingInpVal: oldVal
        });
    }

    hideModalEditOccupDcVal() {
        this.setState({
            editingItemId: null,
            editingInpVal: ""
        });
    }

    changeEditingInpVal(newVal) {
        this.setState({ editingInpVal: newVal });
    }

    handleDeleteItem(itemId = this.state.deletingItemId) {
        this.selectDelOccupDcValSubmitHandler()(itemId);
    }

    showModalConfirmDelOccupDcVal(itemId, itemVal) {
        if(!this.state.dontShowAgainDelModal) {
            this.setState({
                showModalConfirmDelOccupDcVal: true,
                deletingItemId: itemId,
                deletingItemVal: itemVal
            });
        } else {
            this.setState({
                deletingItemId: itemId,
                deletingItemVal: itemVal
            });
            this.handleDeleteItem(itemId);
        }
    }

    hideModalConfirmDelOccupDcVal () {
        this.setState({
            showModalConfirmDelOccupDcVal: false,
            deletingItemId: null,
            deletingItemVal: ""
        });

        this.selectDelOccupDcValClearMsgHandler()();
    }

    triggerDontShowAgainDel() {
        this.setState({ dontShowAgainDelModal: !this.state.dontShowAgainDelModal });
    }

    handleToggleUsingOccupListBtnClick(itemId) {
        if(this.state.shownUsingOccupRows[itemId]) {
            let newShownUsingOccupRowsState = Object.assign({}, this.state.shownUsingOccupRows);
            delete newShownUsingOccupRowsState[itemId];
            this.setState({
                shownUsingOccupRows: newShownUsingOccupRowsState
            });
        } else {
            this.setState({
                shownUsingOccupRows: {
                    ...this.state.shownUsingOccupRows,
                    [itemId]: true
                }
            });
        }
    }

    handleUsingOccupNameClick(occupId) {
        console.log("handleUsingOccupNameClick, occupId = " + occupId);
    }

    render() {
        let shownOccupDescrTextsList = ["RESPONSIBILITIES", "HAVE_TO_KNOW", "QUALIFF_REQUIR"].includes(this.state.activeListName),
            showModalEditOccupDcVal = (this.state.editingItemId !== null),
            modalConfirmDelItemHeadline = `Підтвердіть видалення елемента "${trimSubstr(this.state.deletingItemVal, 80)}" зі списку "${activeListTitle}"`,
            activeList = this.getActiveListData(),
            activeListTitle = this.getActiveListTitle(),
            editOccupDcValClearMsg = this.selectEditOccupDcValClearMsgHandler(),
            editOccupDcValSubmit = this.selectEditOccupDcValSubmitHandler(),
            delOccupDcValClearMsgHandler = this.selectDelOccupDcValClearMsgHandler(),
            addNewOccupDcValClearMsg = this.selectAddNewOccupDcValClearMsgHandler(),
            addNewOccupDcValSubmit = this.selectAddNewOccupDcValSubmitHandler();

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <CtrlDcBoxMenu
                            activeListName={this.state.activeListName}
                            setActiveListName={this.setActiveListName}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <ModalEditOccupDcVal
                            additionalTitle={activeListTitle}
                            inpVal={this.state.editingInpVal}
                            onInpValChange={this.changeEditingInpVal}
                            shownBigTextInp={shownOccupDescrTextsList}
                            show={showModalEditOccupDcVal}
                            error={activeList.updatingError}
                            success={activeList.updatingSuccess}
                            onAlertDismiss={editOccupDcValClearMsg}
                            isLoading={activeList.isUpdatingVal}
                            onSubmit={editOccupDcValSubmit}
                            onHide={this.hideModalEditOccupDcVal}
                        />
                        <ModalConfirmDelItem
                            headline={modalConfirmDelItemHeadline}
                            successMsgAlertTitle={"Елемент успішно видалено."}
                            onTriggerDontShowAgain={this.triggerDontShowAgainDel}
                            dontShowAgain={this.state.dontShowAgainDelModal}
                            show={this.state.showModalConfirmDelOccupDcVal}
                            error={activeList.deletingError}
                            success={activeList.deletingSuccess}
                            onAlertDismiss={delOccupDcValClearMsgHandler}
                            isDeletingItem={activeList.isDeletingVal}
                            onSubmit={this.handleDeleteItem}
                            onHide={this.hideModalConfirmDelOccupDcVal}
                        />
                        <CtrlDcBoxRes
                            showAddingInp={this.showAddingInp}
                            hideAddingInp={this.hideAddingInp}
                            addingInpIsShown={this.state.addingInpIsShown}
                            addNewOccupDcValClearMsg={addNewOccupDcValClearMsg}
                            addNewOccupDcValSubmit={addNewOccupDcValSubmit}
                            addingInpVal={this.state.addingInpVal}
                            handleAddingInpValChange={this.changeAddingInpVal}
                            addingErrors={activeList.addingErrors}
                            addingSuccess={activeList.addingSuccess}
                            isSavingNewVal={activeList.isAddingNewVal}
                            isFetchingItems={activeList.isFetching}
                            listDataItems={this.state.listItems}
                            occupNamesById={this.props.occupNamesById}
                            fetchingErrors={activeList.errors /*TODO: замінити на fetchingErrors*/}
                            shownOccupDescrTextsList={shownOccupDescrTextsList}
                            onEditListItemBtnClick={this.showModalEditOccupDcVal}
                            onDelListItemBtnClick={this.showModalConfirmDelOccupDcVal}
                            expandedItems={this.state.expandedItems}
                            deletingItemId={activeList.isDeletingVal ? this.state.deletingItemId : -1}
                            onToggleExpandItem={this.handleToggleExpandItem}
                            onTriggerSorting={this.triggerSorting}
                            sortDirection={this.state.sortDirection}
                            filterListInpVal={this.state.filterListInpVal}
                            filterList={this.filterList}
                            onChangeFilterListInpVal={this.onChangeFilterListInpVal}
                            resetFilterListInpVal={this.resetFilterListInpVal}
                            onUsingOccupNameClick={this.handleUsingOccupNameClick}
                            onToggleUsingOccupListBtnClick={this.handleToggleUsingOccupListBtnClick}
                            shownUsingOccupRows={this.state.shownUsingOccupRows}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //Робимо хеш-таблицю з масиву для швидшого пошуку назв посад по id
    let occupNamesById = {
        fetchingError: state.occupationNameInfo.clarifiedOccupationList.errors.join(". "),
        isFetching: state.occupationNameInfo.clarifiedOccupationList.isFetching,
        items: {}
    };
    state.occupationNameInfo.clarifiedOccupationList.items.forEach(item => {
        occupNamesById.items[item.id] = item.textValue;
    });

    return {
        ...state.occupationNameInfo,
        ...state.occupCodesLists,
        ...state.occupDescriptionTextsLists,
        occupNamesById
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLists() {
            dispatch(fetchClarifiedOccupList());
            dispatch(fetchOccupGroupList());
            dispatch(fetchClarificationList());

            dispatch(fetchKPCodesList());
            dispatch(fetchZKPPTRCodesList());
            dispatch(fetchETDKCodesList());
            dispatch(fetchDKHPCodesList());

            dispatch(fetchHaveToKnowTextsList());
            dispatch(fetchResponsibilitiesTextsList());
            dispatch(fetchQualiffRequirTextsList());
        },
        addNewOccupGroup: newVal => dispatch(addNewOccupationGroup({newVal})),
        addNewClarification: newVal => dispatch(addNewClarification({newVal})),
        addNewOccupGroupClearMsg: () => dispatch(dismissModalAddNewOccupationGroupAlert()),
        addNewClarificationClearMsg: () => dispatch(dismissModalAddNewClarificationAlert()),

        addNewKPCode: (newVal) => dispatch(addNewKPCode({newVal})),
        addNewETDKCode: (newVal) => dispatch(addNewETDKCode({newVal})),
        addNewDKHPCode: (newVal) => dispatch(addNewDKHPCode({newVal})),
        addNewZKPPTRCode: (newVal) => dispatch(addNewZKPPTRCode({newVal})),
        addNewKPCodeClearMsg: () => dispatch(clearKPCodeAddingMsg()),
        addNewETDKCodeClearMsg: () => dispatch(clearDKHPCodeAddingMsg()),
        addNewDKHPCodeClearMsg: () => dispatch(clearETDKCodeAddingMsg()),
        addNewZKPPTRCodeClearMsg: () => dispatch(clearZKPPTRCodeAddingMsg()),

        addNewHaveToKnowText: (newVal) => dispatch(addNewHaveToKnowText({newVal})),
        addNewQualiffRequirText: (newVal) => dispatch(addNewQualiffRequirText({newVal})),
        addNewResponsibilitiesText: (newVal) => dispatch(addNewResponsibilitiesText({newVal})),
        addNewHaveToKnowTextClearMsg: () => dispatch(clearHaveToKnowTextAddingMsg()),
        addNewQualiffRequirTextClearMsg: () => dispatch(clearQualiffRequirTextAddingMsg()),
        addNewResponsibilitiesTextClearMsg: () => dispatch(clearResponsibilitiesTextAddingMsg()),

        editOccupGroup: ({ newVal, id }) => dispatch(editOccupGroup({ newVal, id })),
        editClarification: ({ newVal, id }) => dispatch(editClarification({ newVal, id })),
        editOccupGroupClearMsg: () => dispatch(editOccupGroupClearMsg()),
        editClarificationClearMsg: () => dispatch(editClarificationClearMsg()),

        editKPCode: ({ newVal, id }) => dispatch(editKPCode({ newVal, id })),
        editETDKCode: ({ newVal, id }) => dispatch(editETDKCode({ newVal, id })),
        editDKHPCode: ({ newVal, id }) => dispatch(editDKHPCode({ newVal, id })),
        editZKPPTRCode: ({ newVal, id }) => dispatch(editZKPPTRCode({ newVal, id })),
        editKPCodeClearMsg: () => dispatch(editKPCodeClearMsg()),
        editETDKCodeClearMsg: () => dispatch(editETDKCodeClearMsg()),
        editDKHPCodeClearMsg: () => dispatch(editDKHPCodeClearMsg()),
        editZKPPTRCodeClearMsg: () => dispatch(editZKPPTRCodeClearMsg()),

        editHaveToKnowText: ({ newVal, id }) => dispatch(editHaveToKnowText({ newVal, id })),
        editQualiffRequirText: ({ newVal, id }) => dispatch(editQualiffRequirText({ newVal, id })),
        editResponsibilitiesText: ({ newVal, id }) => dispatch(editResponsibilitiesText({ newVal, id })),
        editHaveToKnowTextClearMsg: () => dispatch(editHaveToKnowTextClearMsg()),
        editQualiffRequirTextClearMsg: () => dispatch(editQualiffRequirTextClearMsg()),
        editResponsibilitiesTextClearMsg: () => dispatch(editResponsibilitiesTextClearMsg()),

        delOccupGroup: id => dispatch(delOccupGroup({ id })),
        delClarification: id => dispatch(delClarification({ id })),
        delOccupGroupClearMsg: () => dispatch(delOccupGroupClearMsg()),
        delClarificationClearMsg: () => dispatch(delClarificationClearMsg()),

        delKPCode: id => dispatch(delKPCode({ id })),
        delETDKCode: id => dispatch(delETDKCode({ id })),
        delDKHPCode: id => dispatch(delDKHPCode({ id })),
        delZKPPTRCode: id => dispatch(delZKPPTRCode({ id })),
        delKPCodeClearMsg: () => dispatch(delKPCodeClearMsg()),
        delETDKCodeClearMsg: () => dispatch(delETDKCodeClearMsg()),
        delDKHPCodeClearMsg: () => dispatch(delDKHPCodeClearMsg()),
        delZKPPTRCodeClearMsg: () => dispatch(delZKPPTRCodeClearMsg()),

        delHaveToKnowText: id => dispatch(delHaveToKnowText({ id })),
        delQualiffRequirText: id => dispatch(delQualiffRequirText({ id })),
        delResponsibilitiesText: id => dispatch(delResponsibilitiesText({ id })),
        delHaveToKnowTextClearMsg: () => dispatch(delHaveToKnowTextClearMsg()),
        delQualiffRequirTextClearMsg: () => dispatch(delQualiffRequirTextClearMsg()),
        delResponsibilitiesTextClearMsg: () => dispatch(delResponsibilitiesTextClearMsg()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CtrlDcBox);

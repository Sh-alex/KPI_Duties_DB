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
            addingInpIsShown: false,                    //чи показано зараз поле для додавання нового значення
            activeListName: "OCCUP_GROUP",              //активний список, одне із: CLARIFICATION, CODE_KP, CODE_ZKPPTR, CODE_ETDK, CODE_DKHP, RESPONSIBILITIES, HAVE_TO_KNOW, QUALIFF_REQUIR
            editingItemId: null,                        //яка елемент(ID) зараз редагується(для нього показуємо модальне вікно)
            editingInpVal: "",                          //значення в інпуті для редагування елементів списків
            addingInpVal: "",                           //значення в інпуті для додавання нових елементів списків
            deletingItemId: null,                       //який елемент(ID) зараз видаляється(для нього показуємо модальне вікно)
            deletingItemVal: "",                        //значення елемента який зараз видаляється(щоб показати його у модальному вікні)
                                                        //Tip: це можна було б і розрахувати знаючи id, але так як у нас списки - масиви, доведеться пробігати по всьому масиву, тому краще вже зберігати значення в стані компоненту
            showModalConfirmDelOccupDcVal: false,       //чи показувати модальне вікно для підтвердження видалення елемента зі списку
            dontShowAgainDelModal: false,               //більше не показувати повідомлення із підтвердженням видалення посади
            sortDirection: "SORT_ASC",                  //напрям сортування SORT_ASC/SORT_DESC
            expandedItems: {},                          //які елементи розкриті(показується повне значення елемента списку чи скорочене)
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
        this.selectDelOccupDcValSubmitHandler = this.selectDelOccupDcValSubmitHandler.bind(this);
        this.selectDelOccupDcValClearMsgHandler = this.selectDelOccupDcValClearMsgHandler.bind(this);
    }

    componentDidMount() {
        this.props.fetchLists();
    }

    componentWillReceiveProps(nextProps) {
        //очищаємо значення поля для додавання нових елементів, якщо щойно у якогось списка включився стан addingSuccess
        let successfullyAddedNewVal =
            !this.props.occupationGroupList.addingSuccess && nextProps.occupationGroupList.addingSuccess ||
            !this.props.KPCodesList.addingSuccess && nextProps.KPCodesList.addingSuccess ||
            !this.props.ZKPPTRCodesList.addingSuccess && nextProps.ZKPPTRCodesList.addingSuccess ||
            !this.props.ETDKCodesList.addingSuccess && nextProps.ETDKCodesList.addingSuccess ||
            !this.props.DKHPCodesList.addingSuccess && nextProps.DKHPCodesList.addingSuccess ||
            !this.props.responsibilitiesTextsList.addingSuccess && nextProps.responsibilitiesTextsList.addingSuccess ||
            !this.props.haveToKnowTextsList.addingSuccess && nextProps.haveToKnowTextsList.addingSuccess ||
            !this.props.qualiffRequirTextsList.addingSuccess && nextProps.qualiffRequirTextsList.addingSuccess ||
            !this.props.clarificationList.addingSuccess && nextProps.clarificationList.addingSuccess;
        if(successfullyAddedNewVal)
            this.setState({ addingInpVal: "" });
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

    setActiveListName(newVal) {
        this.setState({activeListName: newVal})
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

    render() {
        let shownOccupDescrTextsList = false,
            showModalEditOccupDcVal = (this.state.editingItemId !== null),
            modalConfirmDelItemHeadline = `Підтвердіть видалення елемента "${trimSubstr(this.state.deletingItemVal, 80)}" зі списку "${activeListTitle}"`,
            activeList,
            activeListTitle,
            editOccupDcValClearMsg,
            editOccupDcValSubmit,
            delOccupDcValClearMsgHandler = this.selectDelOccupDcValClearMsgHandler(),
            addNewOccupDcValClearMsg,
            addNewOccupDcValSubmit;
        //TODO: поробити окремі функції які отримують this.state.activeListName та повертають значення цих змінних
        switch(this.state.activeListName) {
            case "OCCUP_GROUP":
                activeList = this.props.occupationGroupList;
                activeListTitle = "Посадовий склад";
                editOccupDcValClearMsg = this.props.editOccupGroupClearMsg;
                editOccupDcValSubmit = newVal => this.props.editOccupGroup({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewOccupGroupClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewOccupGroup(newVal);
                break;
            case "CLARIFICATION":
                activeList = this.props.clarificationList;
                activeListTitle = "Уточнення";
                editOccupDcValClearMsg = this.props.editClarificationClearMsg;
                editOccupDcValSubmit = newVal => this.props.editClarification({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewClarificationClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewClarification( newVal );
                break;
            case "CODE_KP":
                activeList = this.props.KPCodesList;
                activeListTitle = "Коди КП";
                editOccupDcValClearMsg = this.props.editKPCodeClearMsg;
                editOccupDcValSubmit = newVal => this.props.editKPCode({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewKPCodeClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewKPCode( newVal );
                break;
            case "CODE_ZKPPTR":
                activeList = this.props.ZKPPTRCodesList;
                activeListTitle = "Коди ЗКППТР";
                editOccupDcValClearMsg = this.props.editZKPPTRCodeClearMsg;
                editOccupDcValSubmit = newVal => this.props.editZKPPTRCode({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewZKPPTRCodeClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewZKPPTRCode( newVal );
                break;
            case "CODE_ETDK":
                activeList = this.props.ETDKCodesList;
                activeListTitle = "Коди ЄТДК";
                editOccupDcValClearMsg = this.props.editETDKCodeClearMsg;
                editOccupDcValSubmit = newVal => this.props.editETDKCode({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewETDKCodeClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewETDKCode( newVal );
                break;
            case "CODE_DKHP":
                activeList = this.props.DKHPCodesList;
                activeListTitle = "Коди ДКХП";
                editOccupDcValClearMsg = this.props.editDKHPCodeClearMsg;
                editOccupDcValSubmit = newVal => this.props.editDKHPCode({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewDKHPCodeClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewDKHPCode( newVal );
                break;
            case "RESPONSIBILITIES":
                activeList = this.props.responsibilitiesTextsList;
                shownOccupDescrTextsList = true;
                activeListTitle = "Завдання, обов'язки та повноваження";
                editOccupDcValClearMsg = this.props.editResponsibilitiesTextClearMsg;
                editOccupDcValSubmit = newVal => this.props.editResponsibilitiesText({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewResponsibilitiesTextClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewResponsibilitiesText( newVal );
                break;
            case "HAVE_TO_KNOW":
                activeList = this.props.haveToKnowTextsList;
                shownOccupDescrTextsList = true;
                activeListTitle = "Повинен знати";
                editOccupDcValClearMsg = this.props.editHaveToKnowTextClearMsg;
                editOccupDcValSubmit = newVal => this.props.editHaveToKnowText({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewHaveToKnowTextClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewHaveToKnowText( newVal );
                break;
            case "QUALIFF_REQUIR":
                activeList = this.props.qualiffRequirTextsList;
                shownOccupDescrTextsList = true;
                activeListTitle = "Кваліфікаційні вимоги";
                editOccupDcValClearMsg = this.props.editQualiffRequirTextClearMsg;
                editOccupDcValSubmit = newVal => this.props.editQualiffRequirText({ newVal, id: this.state.editingItemId });
                addNewOccupDcValClearMsg = this.props.addNewQualiffRequirTextClearMsg;
                addNewOccupDcValSubmit = newVal => this.props.addNewQualiffRequirText( newVal );
                break;
        }

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
                            onHide={ this.hideModalEditOccupDcVal }
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
                            onHide={ this.hideModalConfirmDelOccupDcVal }
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
                            activeList={activeList}
                            shownOccupDescrTextsList={shownOccupDescrTextsList}
                            onEditListItemBtnClick={this.showModalEditOccupDcVal}
                            onDelListItemBtnClick={this.showModalConfirmDelOccupDcVal}
                            expandedItems={this.state.expandedItems}
                            deletingItemId={activeList.isDeletingVal ? this.state.deletingItemId : -1}
                            onToggleExpandItem={this.handleToggleExpandItem}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.occupationNameInfo,
        ...state.occupCodesLists,
        ...state.occupDescriptionTextsLists,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLists() {
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

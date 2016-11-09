import React, {Component} from "react";
import { connect } from 'react-redux'

import CtrlDcBoxRes from '../CtrlDcBoxRes'
import CtrlDcBoxMenu from '../CtrlDcBoxMenu'
import ModalEditOccupDcVal from '../ModalEditOccupDcVal'

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
} from "../../actions/occupDescriptionTextsLists"


class CtrlDcBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingInpIsShown: false,                    //чи показано зараз поле для додавання нового значення
            activeListName: "OCCUP_GROUP",              //активний список, одне із: CLARIFICATION, CODE_KP, CODE_ZKPPTR, CODE_ETDK, CODE_DKHP, RESPONSIBILITIES, HAVE_TO_KNOW, QUALIFF_REQUIR
            editingItemId: null,                        //яка посада(ID) зараз редагується(для неї показуємо модальне вікно)
            editingItemNewVal: "",
            deletingItemId: null,                       //яка посада(ID) зараз видаляється(для неї показуємо модальне вікно)
            sortDirection: "SORT_ASC",                  //напрям сортування SORT_ASC/SORT_DESC
            expandedItems: {},                          //які елементи розкриті(показуються деталі про посаду)
            dontShowAgainDelModal: false,               //більше не показувати повідомлення із підтвердженням видалення посади
        };

        this.showAddingInp = this.showAddingInp.bind(this);
        this.hideAddingInp = this.hideAddingInp.bind(this);
        this.setActiveListName = this.setActiveListName.bind(this);
        this.showModalEditOccupDcVal = this.showModalEditOccupDcVal.bind(this);
        this.changeEditingInpVal = this.changeEditingInpVal.bind(this);
        this.hideModalEditOccupDcVal = this.hideModalEditOccupDcVal.bind(this);
        this.handleToggleExpandItem = this.handleToggleExpandItem.bind(this);
    }

    componentDidMount() {
        this.props.fetchLists();
    }

    // componentWillReceiveProps(nextProps) {
    // }

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

    showAddingInp(e) {
        this.setState({addingInpIsShown: true})
    }

    hideAddingInp(e) {
        this.setState({addingInpIsShown: false})
    }

    setActiveListName(newVal) {
        this.setState({activeListName: newVal})
    }

    showModalEditOccupDcVal(occupId, oldVal) {
        this.setState({
            editingItemId: occupId,
            editingItemNewVal: oldVal
        });
    }

    changeEditingInpVal(newVal) {
        this.setState({
            editingItemNewVal: newVal
        });
    }

    hideModalEditOccupDcVal() {
        this.setState({
            editingItemId: null,
            editingItemNewVal: ""
        });
    }

    render() {
        let shownOccupDescrTextsList = false,
            showModalEditOccupDcVal = (this.state.editingItemId !== null),
            activeList,
            activeListName,
            editOccupDcValClearMsg,
            editOccupDcValSubmit;
        switch(this.state.activeListName) {
            case "OCCUP_GROUP":
                activeList = this.props.occupationGroupList;
                activeListName = "Посадовий склад";
                editOccupDcValClearMsg = this.props.editOccupGroupClearMsg;
                editOccupDcValSubmit = newVal => this.props.editOccupGroup({ newVal, id: this.state.editingItemId });
                break;
            case "CLARIFICATION":
                activeList = this.props.clarificationList;
                activeListName = "Уточнення";
                editOccupDcValClearMsg = this.props.editClarificationClearMsg;
                editOccupDcValSubmit = newVal => this.props.editClarification({ newVal, id: this.state.editingItemId });
                break;
            case "CODE_KP":
                activeList = this.props.KPCodesList;
                activeListName = "Коди КП";
                editOccupDcValClearMsg = this.props.editKPCodeClearMsg;
                editOccupDcValSubmit = newVal => {
                    this.props.editKPCode({ newVal, id: this.state.editingItemId });
                };
                break;
            case "CODE_ZKPPTR":
                activeList = this.props.ZKPPTRCodesList;
                activeListName = "Коди ЗКППТР";
                editOccupDcValClearMsg = this.props.editZKPPTRCodeClearMsg;
                editOccupDcValSubmit = newVal => this.props.editZKPPTRCode({ newVal, id: this.state.editingItemId });
                break;
            case "CODE_ETDK":
                activeList = this.props.ETDKCodesList;
                activeListName = "Коди ЄТДК";
                editOccupDcValClearMsg = this.props.editETDKCodeClearMsg;
                editOccupDcValSubmit = newVal => this.props.editETDKCode({ newVal, id: this.state.editingItemId });
                break;
            case "CODE_DKHP":
                activeList = this.props.DKHPCodesList;
                activeListName = "Коди ДКХП";
                editOccupDcValClearMsg = this.props.editDKHPCodeClearMsg;
                editOccupDcValSubmit = newVal => this.props.editDKHPCode({ newVal, id: this.state.editingItemId });
                break;
            case "RESPONSIBILITIES":
                activeList = this.props.responsibilitiesTextsList;
                shownOccupDescrTextsList = true;
                activeListName = "Завдання, обов'язки та повноваження";
                editOccupDcValClearMsg = this.props.editResponsibilitiesTextClearMsg;
                editOccupDcValSubmit = newVal => this.props.editResponsibilitiesText({ newVal, id: this.state.editingItemId });
                break;
            case "HAVE_TO_KNOW":
                activeList = this.props.haveToKnowTextsList;
                shownOccupDescrTextsList = true;
                activeListName = "Повинен знати";
                editOccupDcValClearMsg = this.props.editHaveToKnowTextClearMsg;
                editOccupDcValSubmit = newVal => this.props.editHaveToKnowText({ newVal, id: this.state.editingItemId });
                break;
            case "QUALIFF_REQUIR":
                activeList = this.props.qualiffRequirTextsList;
                shownOccupDescrTextsList = true;
                activeListName = "Кваліфікаційні вимоги";
                editOccupDcValClearMsg = this.props.editQualiffRequirTextClearMsg;
                editOccupDcValSubmit = newVal => this.props.editQualiffRequirText({ newVal, id: this.state.editingItemId });
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
                            additionalTitle={activeListName}
                            inpVal={this.state.editingItemNewVal}
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
                        <CtrlDcBoxRes
                            showAddingInp={this.showAddingInp}
                            hideAddingInp={this.hideAddingInp}
                            addingInpIsShown={this.state.addingInpIsShown}
                            activeList={activeList}
                            shownOccupDescrTextsList={shownOccupDescrTextsList}
                            onEditListItemBtnClick={this.showModalEditOccupDcVal}
                            expandedItems={this.state.expandedItems}
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CtrlDcBox);

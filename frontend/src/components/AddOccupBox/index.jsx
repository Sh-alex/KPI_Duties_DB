import React, { Component } from 'react'
import { reduxForm } from 'redux-form';

import FormEditOccupInfo from "../FormEditOccupInfo"

import {
    fetchOccupGroupList,
    fetchClarifiedOccupList,
    fetchClarificationList,
    addNewClarification,
    dismissModalAddNewClarificationAlert
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
    clearZKPPTRCodeAddingMsg
} from "../../actions/occupCodesLists"

import {
    submitFormAddNewOccup,
    addNewOccupHideServerRespMsg,
    occupationGroupInpChange,
    clarificationInpChange,
    clarifiedOccupInpChange
} from "../../actions/addNewOccup"

import {
    showModalAddInfoFromAnotherOccup
} from '../../actions/addingInfoFromAnotherOccup'

import validateFormOccupInfo from "../../utils/validateFormOccupInfo"

import './styles.less'

let initialFormState = {
    name: {
        'occupationGroup': null,
        'clarifiedOccup': null,
        'clarification': null,
        'occupationName': '',
        'occupationNameMin': ''
    },
    durations: [
        {
            "id": null,
            "start": null,
            "stop": null,
            "inKpi": false,
            "virtual": false
        }
    ],
    codes: [
        {
            'id': null,
            'portionStartDate': null,
            'portionEndDate': null,
            'codeKP': null,
            'codeKPText': "",
            'codeETDK': null,
            'codeETDKText': "",
            'codeZKPPTR': null,
            'codeZKPPTRText': "",
            'codeDKHP': null,
            'codeDKHPText': ""
        }
    ],
    responsibilities: [
        {
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'idDates': null,
            'idText': null
        }
    ],
    haveToKnow: [
        {
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'idDates': null,
            'idText': null
        }
    ],
    qualiffRequir: [
        {
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'idDates': null,
            'idText': null
        }
    ]
};

class AddOccupBox extends Component {
    constructor(props) {
        super(props);

        this.props.initializeForm(initialFormState);
    }

    render() {
        return (
            <div className="box box-default">
                <div className="box-header with-border text-center">
                    <h3 className="box-title"> Додавання посади </h3>
                </div>
                <div className="box-body">
                    <FormEditOccupInfo
                        {...this.props}
                        submitBtnText={["Додати нову посаду ", <i className="fa fa-plus" key={Math.random()}/>]}
                        successMsgText={"Посаду успішно додано"}
                    />
                </div>
            </div>
        )
    }
}

export default reduxForm(
    {
        form: 'addForm',
        fields: [
            'name.occupationGroup',
            'name.clarifiedOccup',
            'name.clarification',
            'name.occupationName',
            'name.occupationNameMin',
            'durations[].id',
            'durations[].start',
            'durations[].stop',
            'durations[].inKpi',
            'durations[].virtual',
            'codes[].id',
            'codes[].portionStartDate',
            'codes[].portionEndDate',
            'codes[].codeKP',
            'codes[].codeETDK',
            'codes[].codeZKPPTR',
            'codes[].codeDKHP',
            'codes[].codeKPText',
            'codes[].codeETDKText',
            'codes[].codeZKPPTRText',
            'codes[].codeDKHPText',
            'responsibilities[].text',
            'responsibilities[].idText',
            'responsibilities[].idDates',
            'responsibilities[].portionStartDate',
            'responsibilities[].portionEndDate',
            'haveToKnow[].text',
            'haveToKnow[].idText',
            'haveToKnow[].idDates',
            'haveToKnow[].portionStartDate',
            'haveToKnow[].portionEndDate',
            'qualiffRequir[].text',
            'qualiffRequir[].idText',
            'qualiffRequir[].idDates',
            'qualiffRequir[].portionStartDate',
            'qualiffRequir[].portionEndDate',
        ],
        touchOnChange: true,
        validate: validateFormOccupInfo,
        onSubmit: submitFormAddNewOccup
    },
    (state, ownProps) => {    //mapStateToProps
        return {
            occupNameInfoLists: state.occupationNameInfo,
            occupCodesLists: state.occupCodesLists,
            shouldShowServerRespMsg: state.form.addForm.shouldShowServerRespMsg
        }
    },
    (dispatch, ownProps) => { //mapDispatchToProps
        return {
            fetchOccupGroupList() {
                return dispatch(fetchOccupGroupList());
            },
            fetchClarifiedOccupList() {
                return dispatch(fetchClarifiedOccupList());
            },
            fetchClarificationList() {
                return dispatch(fetchClarificationList());
            },
            fetchKPCodesList() {
                return dispatch(fetchKPCodesList());
            },
            fetchZKPPTRCodesList() {
                return dispatch(fetchZKPPTRCodesList());
            },
            fetchETDKCodesList() {
                return dispatch(fetchETDKCodesList());
            },
            fetchDKHPCodesList() {
                return dispatch(fetchDKHPCodesList());
            },
            handleServerRespMsgDismiss() {
                return dispatch( addNewOccupHideServerRespMsg() );
            },
            dismissModalAddNewClarificationAlert() {
                return dispatch( dismissModalAddNewClarificationAlert() );
            },
            addNewClarification(val) {
                return dispatch(addNewClarification(val));
            },
            addNewKPCode(val) {
                return dispatch(addNewKPCode(val));
            },
            addNewDKHPCode(val) {
                return dispatch(addNewDKHPCode(val));
            },
            addNewETDKCode(val) {
                return dispatch(addNewETDKCode(val));
            },
            addNewZKPPTRCode(val) {
                return dispatch(addNewZKPPTRCode(val));
            },
            handleBtnAddInfoFromAnotherOccupClick(data){
                return dispatch(showModalAddInfoFromAnotherOccup({
                    ...data,
                    resForm: 'addForm'
                }));
            },

            handleOccupationGroupInpChange(newVal) {
                return dispatch(occupationGroupInpChange(newVal));
            },
            handleClarifiedOccupInpChange(newVal) {
                return dispatch(clarifiedOccupInpChange(newVal));
            },
            handleClarificationInpChange(newVal) {
                return dispatch(clarificationInpChange(newVal));
            },

            dismissModalAddNewKPCodeAlert() {
                return dispatch( clearKPCodeAddingMsg() );
            },
            dismissModalAddNewZKPPTRCodeAlert() {
                return dispatch( clearZKPPTRCodeAddingMsg() );
            },
            dismissModalAddNewDKHPCodeAlert() {
                return dispatch( clearDKHPCodeAddingMsg() );
            },
            dismissModalAddNewETDKCodeAlert() {
                return dispatch( clearETDKCodeAddingMsg() );
            }
        }
    }
)(AddOccupBox)
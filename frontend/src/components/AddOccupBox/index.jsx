import React, { Component } from 'react'
import { reduxForm } from 'redux-form';

import FormEditOccupInfo from "../FormEditOccupInfo"

import {
    fetchOccupGroupList,
    fetchClarifiedOccupList,
    fetchClarificationList,
    addNewClarificationAndUpdateForm,
    addNewOccupationGroupAndUpdateForm,
    dismissModalAddNewOccupationGroupAlert,
    dismissModalAddNewClarificationAlert
} from "../../actions/occupationNameInfo"

import {
    fetchKPCodesList,
    fetchZKPPTRCodesList,
    fetchETDKCodesList,
    fetchDKHPCodesList,
    addNewKPCodeAndUpdateForm,
    addNewDKHPCodeAndUpdateForm,
    addNewETDKCodeAndUpdateForm,
    addNewZKPPTRCodeAndUpdateForm,
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

import { denyAccessToTheUserWithRedirect } from '../../actions/user'

import validateFormOccupInfo from "../../utils/validateFormOccupInfo"

import './styles.less'

let initialFormState = {
    name: {
        'occupationGroup': null,
        'clarifiedOccup': null,
        'clarifiedOccupName': "",
        'clarification': null,
        'clarificationName': "",
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
        },
        {
            "id": null,
            "start": null,
            "stop": null,
            "inKpi": true,
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
    mainInfoDocRef: {
        docName: "",
        docLink: ""
    },
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
    ],
    descriptionDocRef: {
        docName: "",
        docLink: ""
    },
};

class AddOccupBox extends Component {
    constructor(props) {
        super(props);

        this.props.initializeForm(initialFormState);
    }

    componentWillMount() {
        this.checkUserAccess(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.checkUserAccess(nextProps)
    }

    checkUserAccess(props) {
        if(!props.userMayAddNewOccupations)
            props.denyAccessToTheUserWithRedirect();
    }

    render() {
        // if(!this.userHaveAccess(user))
        //     return null;
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
            'name.clarifiedOccupName',
            'name.clarification',
            'name.clarificationName',
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
            'mainInfoDocRef.docName',
            'mainInfoDocRef.docLink',
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
            'descriptionDocRef.docName',
            'descriptionDocRef.docLink',
        ],
        touchOnChange: true,
        validate: validateFormOccupInfo,
        onSubmit: submitFormAddNewOccup
    },
    (state, ownProps) => {    //mapStateToProps
        let userMayAddNewOccupations = state.user.isAuthenticated &&
                state.user.permissions &&
                state.user.permissions.forms &&
                state.user.permissions.forms.addNewOccupations &&
                state.user.permissions.forms.addNewOccupations.show,
            userMayAddInfoFromAnotherOccupations = state.user.isAuthenticated &&
                state.user.permissions &&
                state.user.permissions.forms &&
                state.user.permissions.forms.addInfoFromAnotherOccupations &&
                state.user.permissions.forms.addInfoFromAnotherOccupations.show;

        return {
            userMayAddNewOccupations,
            user: state.user,
            userMayAddInfoFromAnotherOccupations,
            occupNameInfoLists: state.occupNameInfoLists,
            occupCodesLists: state.occupCodesLists,
            shouldShowServerRespMsg: state.form.addForm.shouldShowServerRespMsg
        };
    },
    (dispatch, ownProps) => { //mapDispatchToProps
        return {
            denyAccessToTheUserWithRedirect() {
                return dispatch( denyAccessToTheUserWithRedirect() );
            },
            handleServerRespMsgDismiss() {
                return dispatch( addNewOccupHideServerRespMsg() );
            },
            handleBtnAddInfoFromAnotherOccupClick(data){
                return dispatch(showModalAddInfoFromAnotherOccup({
                    ...data,
                    resForm: 'addForm'
                }));
            },
            fetchClarifiedOccupList: reqParams => dispatch(fetchClarifiedOccupList(null, null, reqParams)),
            fetchOccupGroupList: reqParams => dispatch(fetchOccupGroupList(null, null, reqParams)),
            fetchClarificationList: reqParams => dispatch(fetchClarificationList(null, null, reqParams)),
            fetchKPCodesList: reqParams => dispatch(fetchKPCodesList(null, null, reqParams)),
            fetchZKPPTRCodesList: reqParams => dispatch(fetchZKPPTRCodesList(null, null, reqParams)),
            fetchETDKCodesList: reqParams => dispatch(fetchETDKCodesList(null, null, reqParams)),
            fetchDKHPCodesList: reqParams => dispatch(fetchDKHPCodesList(null, null, reqParams)),

            addNewOccupationGroup(newVal) {
                return dispatch(addNewOccupationGroupAndUpdateForm({
                    newVal,
                    resForm: 'formAddNewOccup'
                }));
            },
            addNewClarification(newVal) {
                return dispatch(addNewClarificationAndUpdateForm({
                    newVal,
                    resForm: 'formAddNewOccup'
                }));
            },
            addNewKPCode(newVal, resPortionIndex) {
                return dispatch(addNewKPCodeAndUpdateForm( {newVal, resForm: 'formAddNewOccup', resPortionIndex} ));
            },
            addNewDKHPCode(newVal, resPortionIndex) {
                return dispatch(addNewDKHPCodeAndUpdateForm( {newVal, resForm: 'formAddNewOccup', resPortionIndex} ));
            },
            addNewETDKCode(newVal, resPortionIndex) {
                return dispatch(addNewETDKCodeAndUpdateForm( {newVal, resForm: 'formAddNewOccup', resPortionIndex} ));
            },
            addNewZKPPTRCode(newVal, resPortionIndex) {
                return dispatch(addNewZKPPTRCodeAndUpdateForm( {newVal, resForm: 'formAddNewOccup', resPortionIndex} ));
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
            dismissModalAddNewOccupationGroupAlert() {
                return dispatch( dismissModalAddNewOccupationGroupAlert() );
            },
            dismissModalAddNewClarificationAlert() {
                return dispatch( dismissModalAddNewClarificationAlert() );
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
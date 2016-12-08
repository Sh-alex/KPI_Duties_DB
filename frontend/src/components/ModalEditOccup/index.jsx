import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { Modal, Alert } from 'react-bootstrap'

import FormEditOccupInfo from '../FormEditOccupInfo'
import LoadingBlock from "../LoadingBlock"

import {
    hideModalEditOccup
} from '../../actions/editOccup'

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
    editOccup,
    editOccupHideServerRespMsg,
    occupationGroupInpChange,
    clarificationInpChange,
    clarifiedOccupInpChange,
} from "../../actions/editOccup"

import {
    showModalAddInfoFromAnotherOccup
} from '../../actions/addingInfoFromAnotherOccup'

import validateFormOccupInfo from "../../utils/validateFormOccupInfo"

import './styles.less'

class ModalEditOccup extends Component {
    componentWillMount() {
        this.props.initializeForm({
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
            mainInfoDocRef: {
                docName: "",
                docLink: ""
            },
            responsibilities: [
                {
                    'updateTextInRelativeOccup': -1,
                    'occupationsUsingText': "",
                    'portionStartDate': null,
                    'portionEndDate': null,
                    'text': "",
                    'idDates': null,
                    'idText': null
                }
            ],
            haveToKnow: [
                {
                    'updateTextInRelativeOccup': -1,
                    'occupationsUsingText': "",
                    'portionStartDate': null,
                    'portionEndDate': null,
                    'text': "",
                    'idDates': null,
                    'idText': null
                }
            ],
            qualiffRequir: [
                {
                    'updateTextInRelativeOccup': -1,
                    'occupationsUsingText': "",
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
        });
    }

    render() {
        let InnerBlock;
        if(!this.props.userMayEditOccupations)
            InnerBlock = (
                <Alert bsStyle="danger" className="no-margin text-center">
                    <h4 className="no-margin"> У вас для цього не достатньо прав доступу! </h4>
                </Alert>
            );
        else if(this.props.modalState.fetchDataError)
            InnerBlock = (
                <Alert bsStyle="danger" className="no-margin text-center">
                    <h5 className="no-margin"> Сталася помлка при отриманні інформації про посаду :( </h5>
                </Alert>
            );
        else if(this.props.modalState.isFetchingData)
            InnerBlock = <LoadingBlock caption="Іде завантаження даних про посаду..." />;
        else if(!this.props.modalState.editingData)
            InnerBlock = (
                <Alert bsStyle="danger" className="no-margin text-center">
                    <h4> Не знайдено інформації про посаду :( </h4>
                    <p> Спробуйте оновити сторінку </p>
                </Alert>
            );
        else
            InnerBlock = (
                <FormEditOccupInfo
                    {...this.props}
                    submitBtnText={["Зберегти зміни ", <i className="fa fa-save" key={Math.random()}/>]}
                    successMsgText={"Зміни успішно збережено"}
                    cancelSearch={this.props.onHideModalEditOccup}
                />
            );

        return (
            <Modal show={this.props.modalState.show} onHide={this.props.onHideModalEditOccup} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                        Редагувати інформацію про посаду
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { InnerBlock }
                </Modal.Body>
            </Modal>
        );
    }
}


export default reduxForm(
    {
        form: 'formEditOccup',
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
            'mainInfoDocRef.docName',
            'mainInfoDocRef.docLink',
            'responsibilities[].text',
            'responsibilities[].idText',
            'responsibilities[].idDates',
            'responsibilities[].updateTextInRelativeOccup',
            'responsibilities[].occupationsUsingText',
            'responsibilities[].portionStartDate',
            'responsibilities[].portionEndDate',
            'haveToKnow[].text',
            'haveToKnow[].idText',
            'haveToKnow[].idDates',
            'haveToKnow[].updateTextInRelativeOccup',
            'haveToKnow[].occupationsUsingText',
            'haveToKnow[].portionStartDate',
            'haveToKnow[].portionEndDate',
            'qualiffRequir[].text',
            'qualiffRequir[].idText',
            'qualiffRequir[].idDates',
            'qualiffRequir[].updateTextInRelativeOccup',
            'qualiffRequir[].occupationsUsingText',
            'qualiffRequir[].portionStartDate',
            'qualiffRequir[].portionEndDate',
            'descriptionDocRef.docName',
            'descriptionDocRef.docLink',
        ],
        touchOnChange: true,
        validate: validateFormOccupInfo,
        onSubmit: (formData, dispatch, props) => editOccup(props.editingOccupId, formData, dispatch)
    },
    (state, ownProps) => {    //mapStateToProps
        let userMayEditOccupations = state.user.isAuthenticated &&
                state.user.permissions &&
                state.user.permissions.forms &&
                state.user.permissions.forms.editOccupations &&
                state.user.permissions.forms.editOccupations.show,
            userMayAddInfoFromAnotherOccupations = state.user.isAuthenticated &&
                state.user.permissions &&
                state.user.permissions.forms &&
                state.user.permissions.forms.addInfoFromAnotherOccupations &&
                state.user.permissions.forms.addInfoFromAnotherOccupations.show;

        return {
            userMayEditOccupations,
            userMayAddInfoFromAnotherOccupations,
            modalState: state.modals.editOccup,
            editingOccupId: state.modals.editOccup.editingData && state.modals.editOccup.editingData.id || null,
            occupNameInfoLists: state.occupNameInfoLists,
            occupCodesLists: state.occupCodesLists,
            shouldShowServerRespMsg: state.form.formEditOccup.shouldShowServerRespMsg
        }
    },
    (dispatch, ownProps) => { //mapDispatchToProps
        return {
            onHideModalEditOccup() {
                dispatch(hideModalEditOccup());
            },
            handleServerRespMsgDismiss() {
                return dispatch( editOccupHideServerRespMsg() );
            },
            handleBtnAddInfoFromAnotherOccupClick(data) {
                return dispatch(showModalAddInfoFromAnotherOccup({
                    ...data,
                    resForm: 'formEditOccup'
                }));
            },
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
            addNewOccupationGroup(newVal) {
                return dispatch(addNewOccupationGroupAndUpdateForm({
                    newVal,
                    resForm: 'formEditOccup'
                }));
            },
            addNewClarification(newVal) {
                return dispatch(addNewClarificationAndUpdateForm({
                    newVal,
                    resForm: 'formEditOccup'
                }));
            },
            addNewKPCode(newVal, resPortionIndex) {
                return dispatch(addNewKPCodeAndUpdateForm( {newVal, resForm: 'formEditOccup', resPortionIndex} ));
            },
            addNewDKHPCode(newVal, resPortionIndex) {
                return dispatch(addNewDKHPCodeAndUpdateForm( {newVal, resForm: 'formEditOccup', resPortionIndex} ));
            },
            addNewETDKCode(newVal, resPortionIndex) {
                return dispatch(addNewETDKCodeAndUpdateForm( {newVal, resForm: 'formEditOccup', resPortionIndex} ));
            },
            addNewZKPPTRCode(newVal, resPortionIndex) {
                return dispatch(addNewZKPPTRCodeAndUpdateForm( {newVal, resForm: 'formEditOccup', resPortionIndex} ));
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
)(ModalEditOccup)

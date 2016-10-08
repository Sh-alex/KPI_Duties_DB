import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap'

import FormEditOccupInfo from '../FormEditOccupInfo'

import {
    hideModalEditOccup
} from '../../actions/editOccup'

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
            ]
        });
    }

    render() {
        return (
            <Modal show={this.props.modalState.show} onHide={this.props.onHideModalEditOccup} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                        Редагувати інформацію про посаду
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormEditOccupInfo
                        {...this.props}
                        occupData={this.props.editingOccupData}
                        submitBtnText={["Зберегти зміни ", <i className="fa fa-save" key={Math.random()}/>]}
                        successMsgText={"Зміни успішно збережено"}
                        cancelSearch={this.props.onHideModalEditOccup}
                    />
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
        ],
        touchOnChange: true,
        validate: validateFormOccupInfo,
        onSubmit: (formData, dispatch, props) => editOccup(props.editingOccupId, formData, dispatch)
    },
    (state, ownProps) => {    //mapStateToProps
        return {
            modalState: state.modals.editOccup,
            editingOccupId: state.modals.editOccup.editingData && state.modals.editOccup.editingData.id || null,
            editingOccupData: state.modals.editOccup.editingData && state.modals.editOccup.editingData.data || {},
            occupNameInfoLists: state.occupationNameInfo,
            occupCodesLists: state.occupCodesLists,
            shouldShowServerRespMsg: state.form.formEditOccup.shouldShowServerRespMsg
        }
    },
    (dispatch, ownProps) => { //mapDispatchToProps
        return {
            onHideModalEditOccup() {
                dispatch(hideModalEditOccup());
            },
            
            fetchInitialData() {
                dispatch(fetchOccupGroupList());
                dispatch(fetchClarifiedOccupList());
                dispatch(fetchClarificationList());

                dispatch(fetchKPCodesList());
                dispatch(fetchZKPPTRCodesList());
                dispatch(fetchETDKCodesList());
                dispatch(fetchDKHPCodesList());
            },

            handleServerRespMsgDismiss() {
                return dispatch( editOccupHideServerRespMsg() );
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
            handleBtnAddInfoFromAnotherOccupClick(data) {
                return dispatch(showModalAddInfoFromAnotherOccup({
                    ...data,
                    resForm: 'formEditOccup'
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
)(ModalEditOccup)

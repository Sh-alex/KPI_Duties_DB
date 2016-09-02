import React, { Component } from 'react'
import {reduxForm} from 'redux-form';

import ModalAddInfoFromAnotherOccup from "../ModalAddInfoFromAnotherOccup"
import ModalAddNewOccupKeyWord from "../ModalAddNewOccupKeyWord"
import AddOccupBoxNameSection from "../AddOccupBoxNameSection"
import AddOccupBoxFeaturesSection from "../AddOccupBoxFeaturesSection"
import AddOccupBoxDurationSection from "../AddOccupBoxDurationSection"
import AddOccupBoxCodesSection from "../AddOccupBoxCodesSection"
import AddOccupBoxResponsibSection from "../AddOccupBoxResponsibSection"
import AddOccupBoxHaveToKnowSection from "../AddOccupBoxHaveToKnowSection"
import AddOccupBoxQualiffRequirSection from "../AddOccupBoxQualiffRequirSection"

import { Alert } from 'react-bootstrap'

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
    clearKPCodeAddingError,
    clearDKHPCodeAddingError,
    clearETDKCodeAddingError,
    clearZKPPTRCodeAddingError
} from "../../actions/occupCodesLists"

import {
    submitAddForm,
    hideAddFormServerRespMsg,
    occupationGroupInpChange,
    clarificationInpChange,
    clarifiedOccupInpChange
} from "../../actions/addOccupBox"

import {
    showModalAddInfoFromAnotherOccup
} from '../../actions/addingInfoFromAnotherOccup'

import './styles.less'

let initialFormState = {
    name: {
        'occupationGroup': null,
        'clarifiedOccup': null,
        'clarification': null,
        'occupationName': '',
        'occupationNameMin': ''
    },
    features: {
        'isIndependent': false,
        'isVirtual': false
    },
    duration: {
        'creatingInStateDate': null,
        'creatingInKPIDate': null
    },
    codes: [
        {
            'portionStartDate': null,
            'portionEndDate': null,
            'codeKP': null,
            'codeETDK': null,
            'codeZKPPTR': null,
            'codeDKHP': null
        }
    ],
    responsibilities: [
        {
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'id': null
        }
    ],
    haveToKnow: [
        {
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'id': null
        }
    ],
    qualiffRequir: [
        {
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'id': null
        }
    ]
};

class AddOccupBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newClarificationInpVal: "",
            newKPCodeInpVal: "",
            newDKHPCodeInpVal: "",
            newETDKCodeInpVal: "",
            newZKPPTRCodeInpVal: "",
            showModalAddNewClarification: false,
            showModalAddNewKPCode: false,
            showModalAddNewDKHPCode: false,
            showModalAddNewETDKCode: false,
            showModalAddNewZKPPTRCode: false
        };

        this.handleAddCodesPortionBtnClick = this.handleAddCodesPortionBtnClick.bind(this);
        this.handleDelCodesPortionBtnClick = this.handleDelCodesPortionBtnClick.bind(this);
        this.handleAddResponsibPortionBtnClick = this.handleAddResponsibPortionBtnClick.bind(this);
        this.handleDelResponsibPortionBtnClick = this.handleDelResponsibPortionBtnClick.bind(this);
        this.handleDelHaveToKnowPortionBtnClick = this.handleDelHaveToKnowPortionBtnClick.bind(this);
        this.handleAddHaveToKnowPortionBtnClick = this.handleAddHaveToKnowPortionBtnClick.bind(this);
        this.handleAddQualiffRequirPortionBtnClick = this.handleAddQualiffRequirPortionBtnClick.bind(this);
        this.handleDelQualiffRequirPortionBtnClick = this.handleDelQualiffRequirPortionBtnClick.bind(this);

        this.handleOccupationGroupInpChange = this.handleOccupationGroupInpChange.bind(this);
        this.handleClarifiedOccupInpChange = this.handleClarifiedOccupInpChange.bind(this);
        this.handleClarificationInpChange = this.handleClarificationInpChange.bind(this);

        this.props.initializeForm(initialFormState);
    }

    componentDidMount() {
        this.props.dispatch(fetchOccupGroupList());
        this.props.dispatch(fetchClarifiedOccupList());
        this.props.dispatch(fetchClarificationList());

        this.props.dispatch(fetchKPCodesList());
        this.props.dispatch(fetchZKPPTRCodesList());
        this.props.dispatch(fetchETDKCodesList());
        this.props.dispatch(fetchDKHPCodesList());
    }

    // /**
    //  * Set endDate to startDate if it's blank or would otherwise be invalid.
    //  */
    // handleStartDateChange(startDate) {
    //   var {endDate} = this.props.fields
    //   if (endDate.value == null || endDate.value < startDate) {
    //     endDate.onChange(startDate)
    //   }
    // }

    handleAddCodesPortionBtnClick() {
        this.props.fields.codes.addField({
            'portionStartDate': null,
            'portionEndDate': null,
            'codeKP': null,
            'codeETDK': null,
            'codeZKPPTR': null,
            'codeDKHP': null
        });
    }

    handleDelCodesPortionBtnClick(index) {
        this.props.fields.codes.removeField(index);
    }

    handleAddResponsibPortionBtnClick() {
        this.props.fields.responsibilities.addField({
            'portionStartDate': null,
            'portionEndDate': null,
            'id': null,
            'text': ""
        });
    }

    handleDelResponsibPortionBtnClick(index) {
        this.props.fields.responsibilities.removeField(index);
    }

    handleAddHaveToKnowPortionBtnClick() {
        this.props.fields.haveToKnow.addField({
            'portionStartDate': null,
            'portionEndDate': null,
            'id': null,
            'text': ""
        });
    }

    handleDelHaveToKnowPortionBtnClick(index) {
        this.props.fields.haveToKnow.removeField(index);
    }

    handleAddQualiffRequirPortionBtnClick() {
        this.props.fields.qualiffRequir.addField({
            'portionStartDate': null,
            'portionEndDate': null,
            'id': null,
            'text': ""
        });
    }

    handleDelQualiffRequirPortionBtnClick(index) {
        this.props.fields.qualiffRequir.removeField(index);
    }

    handleOccupationGroupInpChange(newVal) {
        this.props.fields.name.occupationGroup.onChange(newVal.id);
        this.props.dispatch(occupationGroupInpChange(newVal));
    }

    handleClarifiedOccupInpChange(newVal) {
        this.props.fields.name.clarifiedOccup.onChange(newVal.id);
        this.props.dispatch(clarifiedOccupInpChange(newVal));
    }

    handleClarificationInpChange(newVal) {
        this.props.fields.name.clarification.onChange(newVal.id);
        this.props.dispatch(clarificationInpChange(newVal));
    }

    render() {
        const {
            fields: { name, features, duration, codes, responsibilities, haveToKnow, qualiffRequir},
            handleSubmit,
            resetForm,
            invalid,
            handleServerRespMsgDismiss,
            shouldShowServerRespMsg,
            handleBtnAddInfoFromAnotherOccupClick,
            submitting
        } = this.props;

        let formAlert = !shouldShowServerRespMsg ?
            "" :
            this.props.error ? (
                <Alert bsStyle="danger" onDismiss={handleServerRespMsgDismiss}>
                    <h4>
                        <i className="icon fa fa-warning" />
                        Помилка! :(
                    </h4>
                    <p>
                        {this.props.error._error || this.props.error || 'Сталася невідома помилка при додаванні посади!'}
                    </p>
                </Alert>
            ) : (
                <Alert bsStyle="success" onDismiss={handleServerRespMsgDismiss}>
                    <h4>
                        <i className="icon fa fa-check" />
                        Успішно
                    </h4>
                    <p>
                        Посаду успішно додано
                    </p>
                </Alert>
            );

        return <div className="box box-default">
            <div className="box-header with-border text-center">
                <h3 className="box-title"> Додавання посади </h3>
            </div>
            <div className="box-body">
                <ModalAddInfoFromAnotherOccup />
                <ModalAddNewOccupKeyWord
                    inpVal={this.state.newClarificationInpVal}
                    onInpValChange={newVal => this.setState({ newClarificationInpVal: newVal })}
                    show={this.state.showModalAddNewClarification}
                    errors={this.props.occupNameInfoLists.clarificationList.addingErrors}
                    isLoading={this.props.occupNameInfoLists.clarificationList.isAddingNewVal || this.props.occupNameInfoLists.clarificationList.isFetching}
                    onSave={this.props.addNewClarification}
                    onAlertDismiss={ this.props.dismissModalAddNewClarificationAlert }
                    onHide={() => this.setState({ showModalAddNewClarification: false })} />
                <ModalAddNewOccupKeyWord
                    inpVal={this.state.newKPCodeInpVal}
                    onInpValChange={newVal => this.setState({ newKPCodeInpVal: newVal })}
                    show={this.state.showModalAddNewKPCode}
                    errors={this.props.occupCodesLists.KPCodesList.addingErrors}
                    isLoading={this.props.occupCodesLists.KPCodesList.isAddingNewVal || this.props.occupCodesLists.KPCodesList.isFetching}
                    onSave={this.props.addNewKPCode}
                    onAlertDismiss={ this.props.dismissModalAddNewKPCodeAlert }
                    onHide={() => this.setState({ showModalAddNewKPCode: false })} />
                <ModalAddNewOccupKeyWord
                    inpVal={this.state.newETDKCodeInpVal}
                    onInpValChange={newVal => this.setState({ newETDKCodeInpVal: newVal })}
                    show={this.state.showModalAddNewETDKCode}
                    errors={this.props.occupCodesLists.ETDKCodesList.addingErrors}
                    isLoading={this.props.occupCodesLists.ETDKCodesList.isAddingNewVal || this.props.occupCodesLists.ETDKCodesList.isFetching}
                    onSave={this.props.addNewETDKCode}
                    onAlertDismiss={ this.props.dismissModalAddNewETDKCodeAlert }
                    onHide={() => this.setState({ showModalAddNewETDKCode: false })} />
                <ModalAddNewOccupKeyWord
                    inpVal={this.state.newDKHPCodeInpVal}
                    onInpValChange={newVal => this.setState({ newDKHPCodeInpVal: newVal })}
                    show={this.state.showModalAddNewDKHPCode}
                    errors={this.props.occupCodesLists.DKHPCodesList.addingErrors}
                    isLoading={this.props.occupCodesLists.DKHPCodesList.isAddingNewVal || this.props.occupCodesLists.DKHPCodesList.isFetching}
                    onSave={this.props.addNewDKHPCode}
                    onAlertDismiss={ this.props.dismissModalAddNewDKHPCodeAlert }
                    onHide={() => this.setState({ showModalAddNewDKHPCode: false })} />
                <ModalAddNewOccupKeyWord
                    inpVal={this.state.newZKPPTRCodeInpVal}
                    onInpValChange={newVal => this.setState({ newZKPPTRCodeInpVal: newVal })}
                    show={this.state.showModalAddNewZKPPTRCode}
                    errors={this.props.occupCodesLists.ZKPPTRCodesList.addingErrors}
                    isLoading={this.props.occupCodesLists.ZKPPTRCodesList.isAddingNewVal || this.props.occupCodesLists.ZKPPTRCodesList.isFetching}
                    onSave={this.props.addNewZKPPTRCode}
                    onAlertDismiss={ this.props.dismissModalAddNewZKPPTRCodeAlert }
                    onHide={() => this.setState({ showModalAddNewZKPPTRCode: false })} />
                <form id="add-form" className="form-horizontal add-form" onSubmit={handleSubmit} role="form">
                    <div className="form-inner">
                        <AddOccupBoxNameSection
                            nameFields={name}
                            {...this.props.occupNameInfoLists}
                            handleOccupationGroupInpChange={this.handleOccupationGroupInpChange}
                            handleClarifiedOccupInpChange={this.handleClarifiedOccupInpChange}
                            handleClarificationInpChange={this.handleClarificationInpChange}
                            openModalAddNewClarification={() => this.setState({ showModalAddNewClarification: true })}  />
                        <AddOccupBoxFeaturesSection featuresFields={features} />
                        <AddOccupBoxDurationSection durationFields={duration} />
                        <AddOccupBoxCodesSection
                            codesFields={codes}
                            {...this.props.occupCodesLists}
                            openModalAddNewKPCode={() => this.setState({ showModalAddNewKPCode: true })}
                            openModalAddNewDKHPCode={() => this.setState({ showModalAddNewDKHPCode: true })}
                            openModalAddNewZKPPTRCode={() => this.setState({ showModalAddNewZKPPTRCode: true })}
                            openModalAddNewETDKCode={() => this.setState({ showModalAddNewETDKCode: true })}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddCodesPortionBtnClick={this.handleAddCodesPortionBtnClick}
                            handleDelCodesPortionBtnClick={this.handleDelCodesPortionBtnClick} />
                        <AddOccupBoxResponsibSection
                            responsibFields={responsibilities}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddResponsibPortionBtnClick={this.handleAddResponsibPortionBtnClick}
                            handleDelResponsibPortionBtnClick={this.handleDelResponsibPortionBtnClick} />
                        <AddOccupBoxHaveToKnowSection
                            haveToKnowFields={haveToKnow}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddHaveToKnowPortionBtnClick={this.handleAddHaveToKnowPortionBtnClick}
                            handleDelHaveToKnowPortionBtnClick={this.handleDelHaveToKnowPortionBtnClick} />
                        <AddOccupBoxQualiffRequirSection
                            qualiffRequirFields={qualiffRequir}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddQualiffRequirPortionBtnClick={this.handleAddQualiffRequirPortionBtnClick}
                            handleDelQualiffRequirPortionBtnClick={this.handleDelQualiffRequirPortionBtnClick} />
                        <div>
                            { formAlert }
                        </div>
                        <div className="form-group text-center">
                            <button
                                type="reset"
                                onClick={resetForm}
                                disabled={submitting}
                                className="btn btn-default add-form__btn-form-action add-form__btn-form-action--reset"
                            >
                                Очистити форму <i className="fa fa-refresh" aria-hidden="true" />
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || invalid}
                                className="btn btn-primary add-form__btn-form-action add-form__btn-form-action--submit"
                            >
                                Додати нову посаду  <i className="fa fa-plus" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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
            'features.isIndependent',
            'features.isVirtual',
            'duration.creatingInStateDate',
            'duration.creatingInKPIDate',
            'codes[].portionStartDate',
            'codes[].portionEndDate',
            'codes[].codeKP',
            'codes[].codeETDK',
            'codes[].codeZKPPTR',
            'codes[].codeDKHP',
            'responsibilities[].text',
            'responsibilities[].id',
            'responsibilities[].portionStartDate',
            'responsibilities[].portionEndDate',
            'haveToKnow[].text',
            'haveToKnow[].id',
            'haveToKnow[].portionStartDate',
            'haveToKnow[].portionEndDate',
            'qualiffRequir[].text',
            'qualiffRequir[].id',
            'qualiffRequir[].portionStartDate',
            'qualiffRequir[].portionEndDate'
        ],
        touchOnChange: true,
        validate(travel) {
            var errors = {};
            // if (!travel.startDate) errors.startDate = 'Please enter a start date.'
            // if (!travel.endDate) errors.endDate = 'Please enter an end date.'
            // if (travel.startDate && travel.endDate &&
            //     zeroTime(travel.endDate) < zeroTime(travel.startDate)) {
            //   errors.endDate = 'End date must not be earlier than start date.'
            // }
            // if (!travel.origin) errors.origin = 'Please enter an origin.'
            // if (!travel.destination) errors.destination = 'Please enter a destination.'
            return errors
        },
        onSubmit: submitAddForm
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
            handleServerRespMsgDismiss() {
                return dispatch( hideAddFormServerRespMsg() );
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
                return dispatch(showModalAddInfoFromAnotherOccup(data));
            },
            
            dismissModalAddNewKPCodeAlert() {
                return dispatch( clearKPCodeAddingError() );
            },
            dismissModalAddNewZKPPTRCodeAlert() {
                return dispatch( clearZKPPTRCodeAddingError() );
            },
            dismissModalAddNewDKHPCodeAlert() {
                return dispatch( clearDKHPCodeAddingError() );
            },
            dismissModalAddNewETDKCodeAlert() {
                return dispatch( clearETDKCodeAddingError() );
            }
        }
    }
)(AddOccupBox)
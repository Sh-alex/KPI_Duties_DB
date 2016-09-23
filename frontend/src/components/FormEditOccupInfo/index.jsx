import React, { Component } from 'react'

import ModalAddInfoFromAnotherOccup from "../ModalAddInfoFromAnotherOccup"
import ModalAddNewOccupKeyWord from "../ModalAddNewOccupKeyWord"
import FormEditOccupInfoNameSection from "../FormEditOccupInfoNameSection"
import FormEditOccupInfoFeaturesSection from "../FormEditOccupInfoFeaturesSection"
import FormEditOccupInfoDurationSection from "../FormEditOccupInfoDurationSection"
import FormEditOccupInfoCodesSection from "../FormEditOccupInfoCodesSection"
import FormEditOccupInfoResponsibSection from "../FormEditOccupInfoResponsibSection"
import FormEditOccupInfoHaveToKnowSection from "../FormEditOccupInfoHaveToKnowSection"
import FormEditOccupInfoQualiffRequirSection from "../FormEditOccupInfoQualiffRequirSection"

import { Alert } from 'react-bootstrap'

import replaceApostrophe from "../../utils/replaceApostrophe"

import './styles.less'

export default class FormEditOccupInfo extends Component {
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

        this.handleQualiffRequirTextChange = this.handleQualiffRequirTextChange.bind(this);
        this.handleHaveToKnowTextChange = this.handleHaveToKnowTextChange.bind(this);
        this.handleResponsibTextChange = this.handleResponsibTextChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchInitialData();
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
        this.props.handleOccupationGroupInpChange(newVal);
    }

    handleClarifiedOccupInpChange(newVal) {
        this.props.fields.name.clarifiedOccup.onChange(newVal.id);
        this.props.handleClarifiedOccupInpChange(newVal);
    }

    handleClarificationInpChange(newVal) {
        this.props.fields.name.clarification.onChange(newVal.id);
        this.props.handleClarificationInpChange(newVal);
    }

    handleResponsibTextChange(newVal, resPortionIndex) {
        //обробляємо зміни саме тут,
        // а не всередині відповідного компонента щоб тей компонент був більш універсальним
        // а не всередині action-а чи reducer-a щоб не писати лишніх екшнів та редьюсерів, бо у нас і так для цього викоритосуується redux-form

        newVal = replaceApostrophe(newVal);     //замінюємо апострофи у тексті
        this.props.fields.responsibilities[resPortionIndex].text.onChange(newVal);
        //якщо було змінено текст, то id обнуляємо, бо текст уже новий, а не взятий з іншої посади
        this.props.fields.responsibilities[resPortionIndex].id.value &&
            this.props.fields.responsibilities[resPortionIndex].id.onChange(null);
    }

    handleHaveToKnowTextChange(newVal, resPortionIndex) {
        //обробляємо зміни саме тут,
        // а не всередині відповідного компонента щоб тей компонент був більш універсальним
        // а не всередині action-а чи reducer-a щоб не писати лишніх екшнів та редьюсерів, бо у нас і так для цього викоритосуується redux-form

        newVal = replaceApostrophe(newVal);     //замінюємо апострофи у тексті
        this.props.fields.haveToKnow[resPortionIndex].text.onChange(newVal);
        //якщо було змінено текст, то id обнуляємо, бо текст уже новий, а не взятий з іншої посади
        this.props.fields.haveToKnow[resPortionIndex].id.value &&
            this.props.fields.haveToKnow[resPortionIndex].id.onChange(null);
    }

    handleQualiffRequirTextChange(newVal, resPortionIndex) {
        //обробляємо зміни саме тут,
        // а не всередині відповідного компонента щоб тей компонент був більш універсальним
        // а не всередині action-а чи reducer-a щоб не писати лишніх екшнів та редьюсерів, бо у нас і так для цього викоритосуується redux-form

        newVal = replaceApostrophe(newVal);     //замінюємо апострофи у тексті
        this.props.fields.qualiffRequir[resPortionIndex].text.onChange(newVal);
        //якщо було змінено текст, то id обнуляємо, бо текст уже новий, а не взятий з іншої посади
        this.props.fields.qualiffRequir[resPortionIndex].id.value &&
            this.props.fields.qualiffRequir[resPortionIndex].id.onChange(null);
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
                            {this.props.error._error || this.props.error /*|| 'Сталася невідома помилка при додаванні посади!'*/}
                        </p>
                    </Alert>
                ) : (
                    <Alert bsStyle="success" onDismiss={handleServerRespMsgDismiss}>
                        <h4>
                            <i className="icon fa fa-check" />
                            Успішно
                        </h4>
                        <p>
                            {this.props.successMsgText}
                        </p>
                    </Alert>
                ),
            //перевіряємо чи показувати загальне повідомлення про те що є помилки валідації
            validationError = name.occupationGroup.touched && name.occupationGroup.error ||
                name.clarification.touched && name.clarification.error ||
                name.occupationName.touched && name.occupationName.error ||
                name.occupationNameMin.touched && name.occupationNameMin.error ||
                features.isIndependent.touched && features.isIndependent.error ||
                features.isVirtual.touched && features.isVirtual.error ||
                duration.creatingInStateDate.touched &&  duration.creatingInStateDate.error ||
                duration.creatingInKPIDate.touched &&  duration.creatingInKPIDate.error ||
                codes.reduce(function(res, portion, portionIndex, fullArr) {
                    return res || portion.portionStartDate.touched &&  portion.portionStartDate.error ||
                        portion.portionEndDate.touched &&  portion.portionEndDate.error ||
                        portion.codeDKHP.touched &&  portion.codeDKHP.error ||
                        portion.codeKP.touched &&  portion.codeKP.error ||
                        portion.codeETDK.touched &&  portion.codeETDK.error ||
                        portion.codeZKPPTR.touched &&  portion.codeZKPPTR.error;
                }, false) ||
                responsibilities.reduce(function(res, portion, portionIndex, fullArr) {
                    return res || portion.portionStartDate.touched &&  portion.portionStartDate.error ||
                        portion.portionEndDate.touched &&  portion.portionEndDate.error ||
                        portion.text.touched &&  portion.text.error ||
                        portion.id.touched &&  portion.id.error;
                }, false) ||
                haveToKnow.reduce(function(res, portion, portionIndex, fullArr) {
                    return res || portion.portionStartDate.touched &&  portion.portionStartDate.error ||
                        portion.portionEndDate.touched &&  portion.portionEndDate.error ||
                        portion.text.touched &&  portion.text.error ||
                        portion.id.touched &&  portion.id.error;
                }, false) ||
                qualiffRequir.reduce(function(res, portion, portionIndex, fullArr) {
                    return res || portion.portionStartDate.touched &&  portion.portionStartDate.error ||
                        portion.portionEndDate.touched &&  portion.portionEndDate.error ||
                        portion.text.touched &&  portion.text.error ||
                        portion.id.touched &&  portion.id.error;
                }, false);

        return (
                <div className="form-edit-occup-info-wrapper">
                    <ModalAddInfoFromAnotherOccup />
                    <ModalAddNewOccupKeyWord
                        inpVal={this.state.newClarificationInpVal}
                        onInpValChange={newVal => this.setState({ newClarificationInpVal: newVal })}
                        show={this.state.showModalAddNewClarification}
                        errors={this.props.occupNameInfoLists.clarificationList.addingErrors}
                        success={this.props.occupNameInfoLists.clarificationList.addingSuccess}
                        isLoading={this.props.occupNameInfoLists.clarificationList.isAddingNewVal || this.props.occupNameInfoLists.clarificationList.isFetching}
                        onSave={this.props.addNewClarification}
                        onAlertDismiss={ this.props.dismissModalAddNewClarificationAlert }
                        onHide={ () => {
                            this.setState({showModalAddNewClarification: false});
                            this.props.dismissModalAddNewClarificationAlert()
                        }} />
                    <ModalAddNewOccupKeyWord
                        inpVal={this.state.newKPCodeInpVal}
                        onInpValChange={newVal => this.setState({ newKPCodeInpVal: newVal })}
                        show={this.state.showModalAddNewKPCode}
                        errors={this.props.occupCodesLists.KPCodesList.addingErrors}
                        success={this.props.occupCodesLists.KPCodesList.addingSuccess}
                        isLoading={this.props.occupCodesLists.KPCodesList.isAddingNewVal || this.props.occupCodesLists.KPCodesList.isFetching}
                        onSave={this.props.addNewKPCode}
                        onAlertDismiss={ this.props.dismissModalAddNewKPCodeAlert }
                        onHide={ () => {
                            this.setState({showModalAddNewKPCode: false});
                            this.props.dismissModalAddNewKPCodeAlert()
                        }} />
                    <ModalAddNewOccupKeyWord
                        inpVal={this.state.newETDKCodeInpVal}
                        onInpValChange={newVal => this.setState({ newETDKCodeInpVal: newVal })}
                        show={this.state.showModalAddNewETDKCode}
                        errors={this.props.occupCodesLists.ETDKCodesList.addingErrors}
                        success={this.props.occupCodesLists.ETDKCodesList.addingSuccess}
                        isLoading={this.props.occupCodesLists.ETDKCodesList.isAddingNewVal || this.props.occupCodesLists.ETDKCodesList.isFetching}
                        onSave={this.props.addNewETDKCode}
                        onAlertDismiss={ this.props.dismissModalAddNewETDKCodeAlert }
                            onHide={ () => {
                            this.setState({showModalAddNewETDKCode: false});
                            this.props.dismissModalAddNewETDKCodeAlert()
                        }} />
                    <ModalAddNewOccupKeyWord
                        inpVal={this.state.newDKHPCodeInpVal}
                        onInpValChange={newVal => this.setState({ newDKHPCodeInpVal: newVal })}
                        show={this.state.showModalAddNewDKHPCode}
                        errors={this.props.occupCodesLists.DKHPCodesList.addingErrors}
                        success={this.props.occupCodesLists.DKHPCodesList.addingSuccess}
                        isLoading={this.props.occupCodesLists.DKHPCodesList.isAddingNewVal || this.props.occupCodesLists.DKHPCodesList.isFetching}
                        onSave={this.props.addNewDKHPCode}
                        onAlertDismiss={ this.props.dismissModalAddNewDKHPCodeAlert }
                            onHide={ () => {
                            this.setState({showModalAddNewDKHPCode: false});
                            this.props.dismissModalAddNewDKHPCodeAlert()
                        }} />
                    <ModalAddNewOccupKeyWord
                        inpVal={this.state.newZKPPTRCodeInpVal}
                        onInpValChange={newVal => this.setState({ newZKPPTRCodeInpVal: newVal })}
                        show={this.state.showModalAddNewZKPPTRCode}
                        errors={this.props.occupCodesLists.ZKPPTRCodesList.addingErrors}
                        success={this.props.occupCodesLists.ZKPPTRCodesList.addingSuccess}
                        isLoading={this.props.occupCodesLists.ZKPPTRCodesList.isAddingNewVal || this.props.occupCodesLists.ZKPPTRCodesList.isFetching}
                        onSave={this.props.addNewZKPPTRCode}
                        onAlertDismiss={ this.props.dismissModalAddNewZKPPTRCodeAlert }
                            onHide={ () => {
                            this.setState({showModalAddNewZKPPTRCode: false});
                            this.props.dismissModalAddNewZKPPTRCodeAlert()
                        }} />
                    {/*id="add-form" */}
                    <form className="form-horizontal form-edit-occup-info" onSubmit={handleSubmit} role="form">
                        <div className="form-inner">
                            <FormEditOccupInfoNameSection
                                nameFields={name}
                                {...this.props.occupNameInfoLists}
                                handleOccupationGroupInpChange={this.handleOccupationGroupInpChange}
                                handleClarifiedOccupInpChange={this.handleClarifiedOccupInpChange}
                                handleClarificationInpChange={this.handleClarificationInpChange}
                                openModalAddNewClarification={() => this.setState({ showModalAddNewClarification: true })}  />
                            <FormEditOccupInfoFeaturesSection
                                featuresFields={features}
                                changeAddFormInpIsVirtual={this.props.changeAddFormInpIsVirtual}
                            />
                            <FormEditOccupInfoDurationSection durationFields={duration} />
                            <FormEditOccupInfoCodesSection
                                codesFields={codes}
                                {...this.props.occupCodesLists}
                                noCodesMsg="Для віртуальних посад не може бути кодів"
                                openModalAddNewKPCode={() => this.setState({ showModalAddNewKPCode: true })}
                                openModalAddNewDKHPCode={() => this.setState({ showModalAddNewDKHPCode: true })}
                                openModalAddNewZKPPTRCode={() => this.setState({ showModalAddNewZKPPTRCode: true })}
                                openModalAddNewETDKCode={() => this.setState({ showModalAddNewETDKCode: true })}
                                handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                                handleAddCodesPortionBtnClick={this.handleAddCodesPortionBtnClick}
                                handleDelCodesPortionBtnClick={this.handleDelCodesPortionBtnClick} />
                            <FormEditOccupInfoResponsibSection
                                responsibFields={responsibilities}
                                handleTextChange={this.handleResponsibTextChange}
                                handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                                handleAddResponsibPortionBtnClick={this.handleAddResponsibPortionBtnClick}
                                handleDelResponsibPortionBtnClick={this.handleDelResponsibPortionBtnClick} />
                            <FormEditOccupInfoHaveToKnowSection
                                haveToKnowFields={haveToKnow}
                                handleTextChange={this.handleHaveToKnowTextChange}
                                handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                                handleAddHaveToKnowPortionBtnClick={this.handleAddHaveToKnowPortionBtnClick}
                                handleDelHaveToKnowPortionBtnClick={this.handleDelHaveToKnowPortionBtnClick} />
                            <FormEditOccupInfoQualiffRequirSection
                                qualiffRequirFields={qualiffRequir}
                                handleTextChange={this.handleQualiffRequirTextChange}
                                handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                                handleAddQualiffRequirPortionBtnClick={this.handleAddQualiffRequirPortionBtnClick}
                                handleDelQualiffRequirPortionBtnClick={this.handleDelQualiffRequirPortionBtnClick} />
                            <div>
                                { formAlert }
                                { validationError && (
                                    <Alert bsStyle="danger">
                                        <h4>
                                            <i className="icon fa fa-warning"/>
                                            От халепа! :(
                                        </h4>
                                        <p>
                                            {'Виправте помилки на формі!'}
                                        </p>
                                    </Alert>
                                )
                                }
                            </div>
                            <div className="form-group text-center">
                                <button
                                    type="reset"
                                    onClick={resetForm}
                                    disabled={submitting}
                                    className="btn btn-default form-edit-occup-info__btn-form-action form-edit-occup-info__btn-form-action--reset"
                                >
                                    Очистити форму <i className="fa fa-refresh" />
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn btn-primary form-edit-occup-info__btn-form-action form-edit-occup-info__btn-form-action--submit"
                                >
                                    {this.props.submitBtnText}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
        )
    }
}

import React, { Component } from 'react'

import ModalAddInfoFromAnotherOccup from "../ModalAddInfoFromAnotherOccup"
import ModalAddNewValToOccupDc from "../ModalAddNewValToOccupDc"
import FormEditOccupInfoNameSection from "../FormEditOccupInfoNameSection"
import FormEditOccupInfoDurationsSection from "../FormEditOccupInfoDurationsSection"
import FormEditOccupInfoCodesSection from "../FormEditOccupInfoCodesSection"
import FormEditOccupInfoResponsibSection from "../FormEditOccupInfoResponsibSection"
import FormEditOccupInfoHaveToKnowSection from "../FormEditOccupInfoHaveToKnowSection"
import FormEditOccupInfoQualiffRequirSection from "../FormEditOccupInfoQualiffRequirSection"

import { Alert, Popover, OverlayTrigger } from 'react-bootstrap'

import replaceApostrophe from "../../utils/replaceApostrophe"

import './styles.less'

export default class FormEditOccupInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newOccupationGroupVal: "",
            newClarificationInpVal: "",
            newKPCodeInpVal: "",
            newDKHPCodeInpVal: "",
            newETDKCodeInpVal: "",
            newZKPPTRCodeInpVal: "",
            showModalAddNewOccupationGroup: false,
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
        this.handleAddDurationsPortionBtnClick = this.handleAddDurationsPortionBtnClick.bind(this);
        this.handleDelDurationsPortionBtnClick = this.handleDelDurationsPortionBtnClick.bind(this);

        this.handleOccupationGroupInpChange = this.handleOccupationGroupInpChange.bind(this);
        this.handleClarifiedOccupInpChange = this.handleClarifiedOccupInpChange.bind(this);
        this.handleClarificationInpChange = this.handleClarificationInpChange.bind(this);

        this.handleQualiffRequirTextChange = this.handleQualiffRequirTextChange.bind(this);
        this.handleHaveToKnowTextChange = this.handleHaveToKnowTextChange.bind(this);
        this.handleResponsibTextChange = this.handleResponsibTextChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchOccupGroupList();
        this.props.fetchClarifiedOccupList();
        this.props.fetchClarificationList();

        this.props.fetchKPCodesList();
        this.props.fetchZKPPTRCodesList();
        this.props.fetchETDKCodesList();
        this.props.fetchDKHPCodesList();
    }

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
            'updateTextInRelativeOccup': -1,
            'occupationsUsingText': "",
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'idDates': null,
            'idText': null
        });
    }

    handleDelResponsibPortionBtnClick(index) {
        this.props.fields.responsibilities.removeField(index);
    }

    handleAddHaveToKnowPortionBtnClick() {
        this.props.fields.haveToKnow.addField({
            'updateTextInRelativeOccup': -1,
            'occupationsUsingText': "",
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'idDates': null,
            'idText': null
        });
    }

    handleDelHaveToKnowPortionBtnClick(index) {
        this.props.fields.haveToKnow.removeField(index);
    }

    handleAddQualiffRequirPortionBtnClick() {
        this.props.fields.qualiffRequir.addField({
            'updateTextInRelativeOccup': -1,
            'occupationsUsingText': "",
            'portionStartDate': null,
            'portionEndDate': null,
            'text': "",
            'idDates': null,
            'idText': null
        });
    }

    handleDelQualiffRequirPortionBtnClick(index) {
        this.props.fields.qualiffRequir.removeField(index);
    }

    handleAddDurationsPortionBtnClick() {
        this.props.fields.durations.addField({
            "id": null,
            "start": null,
            "stop": null,
            "inKpi": false,
            "virtual": false
        });
    }

    handleDelDurationsPortionBtnClick(index) {
        this.props.fields.durations.removeField(index);
    }

    handleOccupationGroupInpChange(newVal) {
        this.props.fields.name.occupationGroup.onChange(newVal.id);
        this.props.handleOccupationGroupInpChange(newVal);
    }

    handleClarifiedOccupInpChange(newVal) {
        this.props.fields.name.clarifiedOccup && this.props.fields.name.clarifiedOccup.onChange(newVal.id);
        this.props.handleClarifiedOccupInpChange(newVal);
    }

    handleClarificationInpChange(newVal) {
        this.props.fields.name.clarification && this.props.fields.name.clarification.onChange(newVal.id);
        this.props.handleClarificationInpChange(newVal);
    }

    handleResponsibTextChange(newVal, resPortionIndex) {
        //обробляємо зміни саме тут,
        // а не всередині відповідного компонента щоб тей компонент був більш універсальним
        // а не всередині action-а чи reducer-a щоб не писати лишніх екшнів та редьюсерів, бо у нас і так для цього викоритосуується redux-form

        newVal = replaceApostrophe(newVal);     //замінюємо апострофи у тексті
        this.props.fields.responsibilities[resPortionIndex].text.onChange(newVal);
        //якщо було змінено текст, то id обнуляємо, бо текст уже новий, а не взятий з іншої посади

        if(
            this.props.fields.responsibilities[resPortionIndex].updateTextInRelativeOccup &&
            this.props.fields.responsibilities[resPortionIndex].occupationsUsingText.value
        )
            this.props.fields.responsibilities[resPortionIndex].updateTextInRelativeOccup.onChange(0);

        // this.props.fields.responsibilities[resPortionIndex].id.value &&
        //     this.props.fields.responsibilities[resPortionIndex].id.onChange(null);
    }

    handleHaveToKnowTextChange(newVal, resPortionIndex) {
        //обробляємо зміни саме тут,
        // а не всередині відповідного компонента щоб тей компонент був більш універсальним
        // а не всередині action-а чи reducer-a щоб не писати лишніх екшнів та редьюсерів, бо у нас і так для цього викоритосуується redux-form

        newVal = replaceApostrophe(newVal);     //замінюємо апострофи у тексті
        this.props.fields.haveToKnow[resPortionIndex].text.onChange(newVal);
        //якщо було змінено текст, то id обнуляємо, бо текст уже новий, а не взятий з іншої посади

        if(
            this.props.fields.haveToKnow[resPortionIndex].updateTextInRelativeOccup &&
            this.props.fields.haveToKnow[resPortionIndex].occupationsUsingText.value
        )
            this.props.fields.haveToKnow[resPortionIndex].updateTextInRelativeOccup.onChange(0);

        // this.props.fields.haveToKnow[resPortionIndex].id.value &&
        //     this.props.fields.haveToKnow[resPortionIndex].id.onChange(null);
    }

    handleQualiffRequirTextChange(newVal, resPortionIndex) {
        //обробляємо зміни саме тут,
        // а не всередині відповідного компонента щоб тей компонент був більш універсальним
        // а не всередині action-а чи reducer-a щоб не писати лишніх екшнів та редьюсерів, бо у нас і так для цього викоритосуується redux-form

        newVal = replaceApostrophe(newVal);     //замінюємо апострофи у тексті
        this.props.fields.qualiffRequir[resPortionIndex].text.onChange(newVal);
        //якщо було змінено текст, то id обнуляємо, бо текст уже новий, а не взятий з іншої посади

        if(
            this.props.fields.qualiffRequir[resPortionIndex].updateTextInRelativeOccup &&
            this.props.fields.qualiffRequir[resPortionIndex].occupationsUsingText.value
        )
            this.props.fields.qualiffRequir[resPortionIndex].updateTextInRelativeOccup.onChange(0);

        // this.props.fields.qualiffRequir[resPortionIndex].id.value &&
        //     this.props.fields.qualiffRequir[resPortionIndex].id.onChange(null);
    }


    render() {
        const {
            fields: { name, durations, codes, responsibilities, haveToKnow, qualiffRequir},
            handleSubmit,
            handleServerRespMsgDismiss,
            shouldShowServerRespMsg,
            handleBtnAddInfoFromAnotherOccupClick,
            submitting
        } = this.props;

        const popoverSubmitResetTitle = (
                <div className="popover-title-inner--warning">
                    Підтвердіть очищення форми
                </div>
            ),
            popoverSubmitReset = (
            <Popover id="form-edit-occup-info__popover-submit-reset" title={popoverSubmitResetTitle}>
                <div className="text-center">
                    <button type="reset" className="btn btn-danger btn-block" onClick={this.props.resetForm} >
                        <span className="btn-label"> Очистити </span>
                    </button>
                </div>
            </Popover>
        );

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
                name.clarification && name.clarification.touched && name.clarification.error ||
                name.occupationName.touched && name.occupationName.error ||
                name.occupationNameMin.touched && name.occupationNameMin.error ||
                durations.reduce( (res, portion, fullArr) => {
                    return res || portion.start.touched &&  portion.start.error ||
                        portion.stop.touched &&  portion.stop.error;
                }, false) ||
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
                        portion.text.touched &&  portion.text.error;
                }, false) ||
                haveToKnow.reduce(function(res, portion, portionIndex, fullArr) {
                    return res || portion.portionStartDate.touched &&  portion.portionStartDate.error ||
                        portion.portionEndDate.touched &&  portion.portionEndDate.error ||
                        portion.text.touched &&  portion.text.error;
                }, false) ||
                qualiffRequir.reduce(function(res, portion, portionIndex, fullArr) {
                    return res || portion.portionStartDate.touched &&  portion.portionStartDate.error ||
                        portion.portionEndDate.touched &&  portion.portionEndDate.error ||
                        portion.text.touched &&  portion.text.error;
                }, false);

        return (
            <div className="form-edit-occup-info-wrapper">
                <ModalAddInfoFromAnotherOccup />
                <ModalAddNewValToOccupDc
                    dcName={"Посадовий склад"}
                    inpVal={this.state.newOccupationGroupVal}
                    onInpValChange={newVal => this.setState({ newOccupationGroupVal: newVal })}
                    show={this.state.showModalAddNewOccupationGroup}
                    errors={this.props.occupNameInfoLists.occupationGroupList.addingErrors}
                    success={this.props.occupNameInfoLists.occupationGroupList.addingSuccess}
                    isLoading={this.props.occupNameInfoLists.occupationGroupList.isAddingNewVal || this.props.occupNameInfoLists.occupationGroupList.isFetching}
                    onSave={this.props.addNewOccupationGroup}
                    onAlertDismiss={ this.props.dismissModalAddNewOccupationGroupAlert }
                    onHide={ () => {
                        this.setState({showModalAddNewOccupationGroup: false});
                        this.props.dismissModalAddNewOccupationGroupAlert()
                    }} />
                <ModalAddNewValToOccupDc
                    dcName={"Уточнення"}
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
                <ModalAddNewValToOccupDc
                    dcName={"Код КП"}
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
                <ModalAddNewValToOccupDc
                    dcName={"Код ЄТДК"}
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
                <ModalAddNewValToOccupDc
                    dcName={"Код ДКХП"}
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
                <ModalAddNewValToOccupDc
                    dcName={"Код ЗКППТР"}
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
                <form className="form-horizontal form-edit-occup-info" onSubmit={handleSubmit} role="form">
                    <div className="form-inner">
                        <FormEditOccupInfoNameSection
                            nameFields={name}
                            {...this.props.occupNameInfoLists}
                            fetchOccupGroupList={this.props.fetchOccupGroupList}
                            fetchClarifiedOccupList={this.props.fetchClarifiedOccupList}
                            fetchClarificationList={this.props.fetchClarificationList}
                            handleOccupationGroupInpChange={this.handleOccupationGroupInpChange}
                            handleClarifiedOccupInpChange={this.handleClarifiedOccupInpChange}
                            handleClarificationInpChange={this.handleClarificationInpChange}
                            onBtnAddOccupationGroupClick={() => this.setState({ showModalAddNewOccupationGroup: true })}
                            openModalAddNewClarification={() => this.setState({ showModalAddNewClarification: true })}  />
                        <FormEditOccupInfoDurationsSection
                            durationsFields={durations}
                            handleAddPortionBtnClick={this.handleAddDurationsPortionBtnClick}
                            handleDelPortionBtnClick={this.handleDelDurationsPortionBtnClick}
                        />
                        <FormEditOccupInfoCodesSection
                            codesFields={codes}
                            {...this.props.occupCodesLists}
                            fetchKPCodesList={this.props.fetchKPCodesList}
                            fetchZKPPTRCodesList={this.props.fetchZKPPTRCodesList}
                            fetchETDKCodesList={this.props.fetchETDKCodesList}
                            fetchDKHPCodesList={this.props.fetchDKHPCodesList}
                            openModalAddNewKPCode={() => this.setState({ showModalAddNewKPCode: true })}
                            openModalAddNewDKHPCode={() => this.setState({ showModalAddNewDKHPCode: true })}
                            openModalAddNewZKPPTRCode={() => this.setState({ showModalAddNewZKPPTRCode: true })}
                            openModalAddNewETDKCode={() => this.setState({ showModalAddNewETDKCode: true })}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddCodesPortionBtnClick={this.handleAddCodesPortionBtnClick}
                            handleDelCodesPortionBtnClick={this.handleDelCodesPortionBtnClick} />
                        <FormEditOccupInfoResponsibSection
                            responsibFields={responsibilities}
                            occupUsingResponsibText={[] /*occupUsingResponsibText*/}
                            handleTextChange={this.handleResponsibTextChange}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddResponsibPortionBtnClick={this.handleAddResponsibPortionBtnClick}
                            handleDelResponsibPortionBtnClick={this.handleDelResponsibPortionBtnClick} />
                        <FormEditOccupInfoHaveToKnowSection
                            haveToKnowFields={haveToKnow}
                            occupUsingHaveToKnowText={[] /*occupUsingHaveToKnowText*/}
                            handleTextChange={this.handleHaveToKnowTextChange}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddHaveToKnowPortionBtnClick={this.handleAddHaveToKnowPortionBtnClick}
                            handleDelHaveToKnowPortionBtnClick={this.handleDelHaveToKnowPortionBtnClick} />
                        <FormEditOccupInfoQualiffRequirSection
                            qualiffRequirFields={qualiffRequir}
                            occupUsingQualiffRequirText={[] /*occupUsingQualiffRequirText*/}
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
                        <div className="form-group bottom-btns-part">
                            {this.props.cancelSearch && (
                                <div>
                                    <button type="button" className="btn btn-default" onClick={this.props.cancelSearch}>
                                        Відміна
                                    </button>
                                </div>
                            )}

                            <div className={this.props.cancelSearch ? "text-right" : "text-center"}>
                                <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverSubmitReset}>
                                    <button
                                        type="reset"
                                        disabled={submitting}
                                        className="btn btn-default form-edit-occup-info__btn-form-action form-edit-occup-info__btn-form-action--reset"
                                    >
                                        Очистити форму <i className="fa fa-refresh" />
                                    </button>
                                </OverlayTrigger>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn btn-primary form-edit-occup-info__btn-form-action form-edit-occup-info__btn-form-action--submit"
                                >
                                    {
                                        submitting ? (
                                            <span>
                                                Завантаження {" "}
                                                <i className="fa fa-spinner fa-pulse" />
                                            </span>
                                        ) : (
                                            this.props.submitBtnText
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

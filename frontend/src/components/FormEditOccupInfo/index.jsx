import React, { Component } from 'react'

import ModalAddInfoFromAnotherOccup from "../ModalAddInfoFromAnotherOccup"
import ModalAddNewValToOccupDc from "../ModalAddNewValToOccupDc"
import FormEditOccupInfoNameSection from "../FormEditOccupInfoNameSection"
import FormEditOccupInfoDurationsSection from "../FormEditOccupInfoDurationsSection"
import FormEditOccupInfoCodesSection from "../FormEditOccupInfoCodesSection"
import FormEditOccupInfoDescriptionTextSection from "../FormEditOccupInfoDescriptionTextSection"
import FormEditOccupInfoDocRefSection from "../FormEditOccupInfoDocRefSection"

import {
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR
} from '../../constants/addingInfoFromAnotherOccup';

import { Alert, Popover, OverlayTrigger } from 'react-bootstrap'

import replaceApostrophe from "../../utils/replaceApostrophe"

import './styles.less'

export default class FormEditOccupInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listFetchLimit: 50,             //яку максимальну кількість значень списку завантажувати за раз із сервера
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
            showModalAddNewZKPPTRCode: false,
            addNewKPCodeResPortionIndex: -1,
            addNewETDKCodeResPortionIndex: -1,
            addNewDKHPCodeResPortionIndex: -1,
            addNewZKPPTRCodeResPortionIndex: -1,
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
        this.handleInKpiInpChange = this.handleInKpiInpChange.bind(this);

        this.handleQualiffRequirTextChange = this.handleQualiffRequirTextChange.bind(this);
        this.handleHaveToKnowTextChange = this.handleHaveToKnowTextChange.bind(this);
        this.handleResponsibTextChange = this.handleResponsibTextChange.bind(this);

        this.fetchOccupGroupList = this.fetchOccupGroupList.bind(this);
        this.fetchClarifiedOccupList = this.fetchClarifiedOccupList.bind(this);
        this.fetchClarificationList = this.fetchClarificationList.bind(this);
        this.fetchKPCodesList = this.fetchKPCodesList.bind(this);
        this.fetchZKPPTRCodesList = this.fetchZKPPTRCodesList.bind(this);
        this.fetchETDKCodesList = this.fetchETDKCodesList.bind(this);
        this.fetchDKHPCodesList = this.fetchDKHPCodesList.bind(this);
    }

    componentDidMount() {
        this.fetchOccupGroupList();
        this.fetchClarifiedOccupList();
        this.fetchClarificationList();

        this.fetchKPCodesList();
        this.fetchZKPPTRCodesList();
        this.fetchETDKCodesList();
        this.fetchDKHPCodesList();
    }

    fetchOccupGroupList(params) {
        //прив'язуємо обмеження у максимальній кількості завантажуваних елементів списку
        return this.props.fetchOccupGroupList({...params, limit: this.state.listFetchLimit})
    }
    fetchClarifiedOccupList(params) {
        //прив'язуємо обмеження у максимальній кількості завантажуваних елементів списку
        return this.props.fetchClarifiedOccupList({...params, limit: this.state.listFetchLimit})
    }
    fetchClarificationList(params) {
        //прив'язуємо обмеження у максимальній кількості завантажуваних елементів списку
        return this.props.fetchClarificationList({...params, limit: this.state.listFetchLimit})
    }
    fetchKPCodesList(params) {
        //прив'язуємо обмеження у максимальній кількості завантажуваних елементів списку
        return this.props.fetchKPCodesList({...params, limit: this.state.listFetchLimit})
    }
    fetchZKPPTRCodesList(params) {
        //прив'язуємо обмеження у максимальній кількості завантажуваних елементів списку
        return this.props.fetchZKPPTRCodesList({...params, limit: this.state.listFetchLimit})
    }
    fetchETDKCodesList(params) {
        //прив'язуємо обмеження у максимальній кількості завантажуваних елементів списку
        return this.props.fetchETDKCodesList({...params, limit: this.state.listFetchLimit})
    }
    fetchDKHPCodesList(params) {
        //прив'язуємо обмеження у максимальній кількості завантажуваних елементів списку
        return this.props.fetchDKHPCodesList({...params, limit: this.state.listFetchLimit})
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

    handleInKpiInpChange(isInKPI, portionIndex) {
        if(!this.props.fields.durations || !this.props.fields.durations[portionIndex])
            return console.error("Called handleInKpiInpChange, but !this.props.fields.durations || !this.props.fields.durations[portionIndex]");

        this.props.fields.durations[portionIndex].inKpi && this.props.fields.durations[portionIndex].inKpi.onChange(isInKPI);

        //якщо ця порція дат для держави, а не для КПІ,
        // обнуляємо на всяк випадок значення поля "посада є віртуальною",
        // бо в державі не може бути віртуальних посад
        let shouldResetInpIsVirtual = !isInKPI &&
            this.props.fields.durations[portionIndex].virtual;
        if(shouldResetInpIsVirtual)
            this.props.fields.durations[portionIndex].virtual.onChange(false);
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
            fields: { name, durations, codes, mainInfoDocRef, responsibilities, haveToKnow, qualiffRequir, descriptionDocRef },
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
                mainInfoDocRef.docName && mainInfoDocRef.docName.touched && mainInfoDocRef.docName.error ||
                mainInfoDocRef.docLink && mainInfoDocRef.docLink.touched && mainInfoDocRef.docLink.error ||
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
                }, false) ||
                descriptionDocRef.docName && descriptionDocRef.docName.touched && descriptionDocRef.docName.error ||
                descriptionDocRef.docLink && descriptionDocRef.docLink.touched && descriptionDocRef.docLink.error;

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
                    onSave={val => this.props.addNewKPCode(val, this.state.addNewKPCodeResPortionIndex)}
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
                    onSave={val => this.props.addNewETDKCode(val, this.state.addNewETDKCodeResPortionIndex)}
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
                    onSave={val => this.props.addNewDKHPCode(val, this.state.addNewDKHPCodeResPortionIndex)}
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
                    onSave={val => this.props.addNewZKPPTRCode(val, this.state.addNewZKPPTRCodeResPortionIndex)}
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
                            fetchOccupGroupList={this.fetchOccupGroupList}
                            fetchClarifiedOccupList={this.fetchClarifiedOccupList}
                            fetchClarificationList={this.fetchClarificationList}
                            handleOccupationGroupInpChange={this.handleOccupationGroupInpChange}
                            handleClarifiedOccupInpChange={this.handleClarifiedOccupInpChange}
                            handleClarificationInpChange={this.handleClarificationInpChange}
                            onBtnAddOccupationGroupClick={() => this.setState({ showModalAddNewOccupationGroup: true })}
                            openModalAddNewClarification={() => this.setState({ showModalAddNewClarification: true })}  />
                        <FormEditOccupInfoDurationsSection
                            durationsFields={durations}
                            handleInKpiInpChange={this.handleInKpiInpChange}
                            handleAddPortionBtnClick={this.handleAddDurationsPortionBtnClick}
                            handleDelPortionBtnClick={this.handleDelDurationsPortionBtnClick}
                        />
                        <FormEditOccupInfoCodesSection
                            codesFields={codes}
                            {...this.props.occupCodesLists}
                            fetchKPCodesList={this.fetchKPCodesList}
                            fetchZKPPTRCodesList={this.fetchZKPPTRCodesList}
                            fetchETDKCodesList={this.fetchETDKCodesList}
                            fetchDKHPCodesList={this.fetchDKHPCodesList}
                            openModalAddNewKPCode={resPortionIndex => this.setState({
                                showModalAddNewKPCode: true,
                                addNewKPCodeResPortionIndex: resPortionIndex
                            })}
                            openModalAddNewDKHPCode={resPortionIndex => this.setState({
                                showModalAddNewDKHPCode: true,
                                addNewDKHPCodeResPortionIndex: resPortionIndex
                            })}
                            openModalAddNewZKPPTRCode={resPortionIndex => this.setState({
                                showModalAddNewZKPPTRCode: true,
                                addNewZKPPTRCodeResPortionIndex: resPortionIndex })}
                            openModalAddNewETDKCode={resPortionIndex => this.setState({
                                showModalAddNewETDKCode: true,
                                addNewETDKCodeResPortionIndex: resPortionIndex
                            })}
                            showBtnAddInfoFromAnotherOccupations={this.props.userMayAddInfoFromAnotherOccupations}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddCodesPortionBtnClick={this.handleAddCodesPortionBtnClick}
                            handleDelCodesPortionBtnClick={this.handleDelCodesPortionBtnClick} />
                        <FormEditOccupInfoDocRefSection
                            headline="Посилання на правові документи про загальну інформацію"
                            fields={mainInfoDocRef} />
                        <FormEditOccupInfoDescriptionTextSection
                            fields={responsibilities}
                            headline={"Завдання, обов'язки та повноваження"}
                            addInfoFromAnotherOccupTypeId={ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES}
                            handleTextChange={this.handleResponsibTextChange}
                            showBtnAddInfoFromAnotherOccupations={this.props.userMayAddInfoFromAnotherOccupations}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddPortionBtnClick={this.handleAddResponsibPortionBtnClick}
                            handleDelPortionBtnClick={this.handleDelResponsibPortionBtnClick} />
                        <FormEditOccupInfoDescriptionTextSection
                            fields={haveToKnow}
                            headline={"Повинен знати"}
                            addInfoFromAnotherOccupTypeId={ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW}
                            handleTextChange={this.handleHaveToKnowTextChange}
                            showBtnAddInfoFromAnotherOccupations={this.props.userMayAddInfoFromAnotherOccupations}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddPortionBtnClick={this.handleAddHaveToKnowPortionBtnClick}
                            handleDelPortionBtnClick={this.handleDelHaveToKnowPortionBtnClick} />
                        <FormEditOccupInfoDescriptionTextSection
                            fields={qualiffRequir}
                            headline={"Кваліфікаційні вимоги"}
                            addInfoFromAnotherOccupTypeId={ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR}
                            handleTextChange={this.handleQualiffRequirTextChange}
                            showBtnAddInfoFromAnotherOccupations={this.props.userMayAddInfoFromAnotherOccupations}
                            handleBtnAddInfoFromAnotherOccupClick={handleBtnAddInfoFromAnotherOccupClick}
                            handleAddPortionBtnClick={this.handleAddQualiffRequirPortionBtnClick}
                            handleDelPortionBtnClick={this.handleDelQualiffRequirPortionBtnClick} />
                        <FormEditOccupInfoDocRefSection
                            headline="Посилання на правові документи про тексти з описом посади"
                            fields={descriptionDocRef} />
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
                                <OverlayTrigger
                                    trigger="click"
                                    rootClose={true}
                                    placement="top"
                                    overlay={popoverSubmitReset}
                                >
                                    <button
                                        type="reset"
                                        disabled={submitting}
                                        className="btn btn-default form-edit-occup-info__btn-form-action form-edit-occup-info__btn-form-action--reset"
                                    >
                                        Очистити форму <i className="fa fa-undo" />
                                    </button>
                                </OverlayTrigger>
                                <button
                                    type="submit"
                                    disabled={submitting || validationError}
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

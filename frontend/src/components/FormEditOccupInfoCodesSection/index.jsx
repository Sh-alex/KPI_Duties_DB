import React, {Component} from "react";
import FormEditOccupInfoCodesPortion from "../FormEditOccupInfoCodesPortion";
import "./styles.less";

import { ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES } from '../../constants/addingInfoFromAnotherOccup';

export default class FormEditOccupInfoCodesSection extends Component {
    render() {
        let originalDelCodesPortionHandler = this.props.handleDelCodesPortionBtnClick,
            originalOpenModalAddNewKPCode = this.props.openModalAddNewKPCode,
            originalOpenModalAddNewDKHPCode = this.props.openModalAddNewDKHPCode,
            originalOpenModalAddNewZKPPTRCode = this.props.openModalAddNewZKPPTRCode,
            originalOpenModalAddNewETDKCode = this.props.openModalAddNewETDKCode,
            handleBtnAddInfoFromAnotherOccupClick = () => {
                this.props.handleBtnAddInfoFromAnotherOccupClick({
                    typeText: "коди",
                    typeId: ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES,
                    resPortionIndex: null
                })
            },
            portionsMarkup = this.props.codesFields.map((codesFieldsItem, i, codesFieldsArr) => {
                //прив'язуємо обробник видалення до номера порції
                let decoratedDelHandler = (index => {
                        return () => originalDelCodesPortionHandler(index)
                    })(i),
                    decoratedOpenModalAddNewKPCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewKPCode(resPortionIndex)
                    })(i),
                    decoratedOpenModalAddNewDKHPCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewDKHPCode(resPortionIndex)
                    })(i),
                    decoratedOpenModalAddNewZKPPTRCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewZKPPTRCode(resPortionIndex)
                    })(i),
                    decoratedOpenModalAddNewETDKCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewETDKCode(resPortionIndex)
                    })(i);
                return (
                    <FormEditOccupInfoCodesPortion
                        codesPortionFields={codesFieldsItem}
                        showDelBtn={ codesFieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        openModalAddNewKPCode={decoratedOpenModalAddNewKPCode}
                        openModalAddNewDKHPCode={decoratedOpenModalAddNewDKHPCode}
                        openModalAddNewZKPPTRCode={decoratedOpenModalAddNewZKPPTRCode}
                        openModalAddNewETDKCode={decoratedOpenModalAddNewETDKCode}
                        handleDelCodesPortionBtnClick={decoratedDelHandler}
                        fetchKPCodesList={this.props.fetchKPCodesList}
                        fetchZKPPTRCodesList={this.props.fetchZKPPTRCodesList}
                        fetchETDKCodesList={this.props.fetchETDKCodesList}
                        fetchDKHPCodesList={this.props.fetchDKHPCodesList}
                        DKHPCodesList={this.props.DKHPCodesList}
                        ETDKCodesList={this.props.ETDKCodesList}
                        ZKPPTRCodesList={this.props.ZKPPTRCodesList}
                        KPCodesList={this.props.KPCodesList} />
                )
            });

        return (
            <div>
                <div className="col-xs-12 col-md-7 pull-right text-right">
                    <a href="javascript:void(0)" className="" onClick={handleBtnAddInfoFromAnotherOccupClick}>
                        <i> Заповнити коди із аналогічної посади </i>
                        <i className="fa fa-link" />
                    </a>
                </div>
                <h4> Коди </h4>
                <div className="inp-portions codes-portions">
                    { portionsMarkup }
                    <div className="inp-portions__btn-add-wrapper">
                        <hr />
                        <button
                            type="button"
                            className="btn btn-default inp-portions__btn-amount-ctrl--add"
                            onClick={this.props.handleAddCodesPortionBtnClick} >
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

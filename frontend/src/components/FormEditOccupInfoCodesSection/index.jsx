import React, {Component} from "react";
import FormEditOccupInfoCodesPortion from "../FormEditOccupInfoCodesPortion";
import "./styles.less";

import { ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES } from '../../constants/addingInfoFromAnotherOccup';

export default class FormEditOccupInfoCodesSection extends Component {
    render() {
        if(this.props.codesFields && this.props.codesFields.length) {
            let originalHandler = this.props.handleDelCodesPortionBtnClick,
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
                        return () => originalHandler(index)
                    })(i);
                    return(
                        <FormEditOccupInfoCodesPortion
                            codesPortionFields={codesFieldsItem}
                            showDelBtn={ codesFieldsArr.length > 1 }
                            portionItemClassName={ i===0 ? "is-first-item" : "" }
                            key={i}
                            portionKey={i}
                            openModalAddNewKPCode={this.props.openModalAddNewKPCode}
                            openModalAddNewDKHPCode={this.props.openModalAddNewDKHPCode}
                            openModalAddNewZKPPTRCode={this.props.openModalAddNewZKPPTRCode}
                            openModalAddNewETDKCode={this.props.openModalAddNewETDKCode}
                            handleDelCodesPortionBtnClick={decoratedDelHandler}
                            DKHPCodesList={this.props.DKHPCodesList}
                            ETDKCodesList={this.props.ETDKCodesList}
                            ZKPPTRCodesList={this.props.ZKPPTRCodesList}
                            KPCodesList={this.props.KPCodesList} />
                    )
                });

            return (
                <div>
                    <div className="col-sm-7 pull-right text-right">
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
        } else {
            return (
                <div>
                    <h4> Коди </h4>
                    <div className="clearfix inp-portions codes-portions">
                        <div className="col-xs-12">
                            { this.props.noCodesMsg || "Інформацію про коди вводити не потрібно" }
                        </div>
                        <br/>
                        <hr />
                    </div>
                </div>
            )
        }
    }
}

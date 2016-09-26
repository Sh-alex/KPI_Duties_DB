import React, {Component} from "react";
import FormEditOccupInfoQualiffRequirPortion from "../FormEditOccupInfoQualiffRequirPortion";
import "./styles.less";

import { ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR } from '../../constants/addingInfoFromAnotherOccup';

export default class FormEditOccupInfoQualiffRequirSection extends Component {
    render() {
        let originalDelPortionHandler = this.props.handleDelQualiffRequirPortionBtnClick,
            originalAddInfoFromAnotherOccupHandler = this.props.handleBtnAddInfoFromAnotherOccupClick,
            portionsMarkup = this.props.qualiffRequirFields.map((fieldsItem, i, fieldsArr) => {
                //прив'язуємо обробники до номера порції
                let decoratedDelHandler = (index => {
                    return () => originalDelPortionHandler(index)
                })(i),
                    decoratedTextChangeHandler = ((index, f) => {
                        return newVal => f(newVal, index)
                    })(i, this.props.handleTextChange),
                    decoratedAddInfoFromAnotherOccupHandler = (index => {
                        return () => originalAddInfoFromAnotherOccupHandler({
                            typeText: "кваліфікаційні вимоги",
                            typeId: ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR,
                            resPortionIndex: index
                        })
                    })(i);
                return(
                    <FormEditOccupInfoQualiffRequirPortion
                        qualiffRequirPortionFields={fieldsItem}
                        showDelBtn={ fieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        handleTextChange={decoratedTextChangeHandler}
                        handleDelQualiffRequirPortionBtnClick={decoratedDelHandler}
                        handleBtnAddInfoFromAnotherOccupClick={decoratedAddInfoFromAnotherOccupHandler}
                    />
                )
            });

        return <div>
            <h4> Кваліфікаційні вимоги </h4>
            <div className="inp-portions have-to-know-portions">
                { portionsMarkup }
                <div className="inp-portions__btn-add-wrapper">
                    <hr />
                    <button
                        type="button"
                        className="btn btn-default inp-portions__btn-amount-ctrl--add"
                        onClick={this.props.handleAddQualiffRequirPortionBtnClick}
                    >
                        <i className="fa fa-plus" />
                    </button>
                </div>
            </div>
        </div>
    }
}

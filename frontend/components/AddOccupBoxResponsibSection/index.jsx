import React, {Component} from "react";
import AddOccupBoxResponsibPortion from "../AddOccupBoxResponsibPortion";
import "./styles.less";

import { ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES } from '../../constants/addingInfoFromAnotherOccup';

export default class extends Component {
    render() {
        let originalDelPortionHandler = this.props.handleDelResponsibPortionBtnClick,
            originalAddInfoFromAnotherOccupHandler = this.props.handleBtnAddInfoFromAnotherOccupClick,
            portionsMarkup = this.props.responsibFields.map((fieldsItem, i, fieldsArr) => {
                //прив'язуємо обробники до номера порції
                let decoratedDelHandler = (index => {
                        return () => originalDelPortionHandler(index)
                    })(i),
                    decoratedAddInfoFromAnotherOccupHandler = (index => {
                        return () => originalAddInfoFromAnotherOccupHandler({
                            typeText: "завдання, обов'язки та повноваження",
                            typeId: ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES,
                            resPortionIndex: index
                        })
                    })(i);
                return(
                    <AddOccupBoxResponsibPortion
                        responsibPortionFields={fieldsItem}
                        showDelBtn={ fieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        handleDelResponsibPortionBtnClick={decoratedDelHandler}
                        handleBtnAddInfoFromAnotherOccupClick={decoratedAddInfoFromAnotherOccupHandler}
                    />
                )
            });

        return <div>
            <h4> Завдання, обов'язки та повноваження </h4>
            <div className="inp-portions responsiblities-portions">
                { portionsMarkup }
                <div className="inp-portions__btn-add-wrapper">
                    <hr />
                    <button
                        type="button"
                        className="btn btn-default inp-portions__btn-amount-ctrl--add"
                        onClick={this.props.handleAddResponsibPortionBtnClick} >
                        <i className="fa fa-plus" />
                    </button>
                </div>
            </div>
        </div>
    }
}

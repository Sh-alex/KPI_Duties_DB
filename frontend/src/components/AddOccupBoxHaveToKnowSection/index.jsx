import React, {Component} from "react";
import AddOccupBoxHaveToKnowPortion from "../AddOccupBoxHaveToKnowPortion";
import "./styles.less";

import { ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW } from '../../constants/addingInfoFromAnotherOccup';

export default class AddOccupBoxHaveToKnowSection extends Component {
    render() {
        let originalDelPortionHandler = this.props.handleDelHaveToKnowPortionBtnClick,
            originalAddInfoFromAnotherOccupHandler = this.props.handleBtnAddInfoFromAnotherOccupClick,
            portionsMarkup = this.props.haveToKnowFields.map((fieldsItem, i, fieldsArr) => {
                //прив'язуємо обробники до номера порції
                let decoratedDelHandler = (index => {
                        return () => originalDelPortionHandler(index)
                    })(i),
                    decoratedTextChangeHandler = ((index, f) => {
                        return newVal => f(newVal, index)
                    })(i, this.props.handleTextChange),
                    decoratedAddInfoFromAnotherOccupHandler = (index => {
                        return () => originalAddInfoFromAnotherOccupHandler({
                            typeText: "'Повинен знати'",
                            typeId: ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW,
                            resPortionIndex: index
                        })
                    })(i);
                return(
                    <AddOccupBoxHaveToKnowPortion
                        haveToKnowPortionFields={fieldsItem}
                        showDelBtn={ fieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        handleTextChange={decoratedTextChangeHandler}
                        handleDelHaveToKnowPortionBtnClick={decoratedDelHandler}
                        handleBtnAddInfoFromAnotherOccupClick={decoratedAddInfoFromAnotherOccupHandler}
                    />
                )
            });

        return <div>
            <h4> Повинен знати </h4>
            <div className="inp-portions have-to-know-portions">
                { portionsMarkup }
                <div className="inp-portions__btn-add-wrapper">
                    <hr />
                    <button
                        type="button"
                        className="btn btn-default inp-portions__btn-amount-ctrl--add"
                        onClick={this.props.handleAddHaveToKnowPortionBtnClick} >
                        <i className="fa fa-plus" />
                    </button>
                </div>
            </div>
        </div>
    }
}

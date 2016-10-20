import React, {Component} from "react";
import FormEditOccupInfoDescriptionTextPortion from "../FormEditOccupInfoDescriptionTextPortion";
import "./styles.less";

export default class FormEditOccupInfoDescriptionTextSection extends Component {
    render() {
        let sectionHeadline = this.props.headline,
            addInfoFromAnotherOccupTypeId = this.props.addInfoFromAnotherOccupTypeId,
            originalDelPortionHandler = this.props.handleDelPortionBtnClick,
            originalAddInfoFromAnotherOccupHandler = this.props.handleBtnAddInfoFromAnotherOccupClick,
            portionsMarkup = this.props.fields.map((fieldsItem, i, fieldsArr) => {
                //прив'язуємо обробники до номера порції
                let decoratedDelHandler = (index => {
                        return () => originalDelPortionHandler(index)
                    })(i),
                    decoratedTextChangeHandler = ((index, f) => {
                        return newVal => f(newVal, index)
                    })(i, this.props.handleTextChange),
                    decoratedAddInfoFromAnotherOccupHandler = (index => {
                        return () => originalAddInfoFromAnotherOccupHandler({
                            typeText: sectionHeadline,
                            typeId: addInfoFromAnotherOccupTypeId,
                            resPortionIndex: index
                        })
                    })(i);
                return(
                    <FormEditOccupInfoDescriptionTextPortion
                        headline={sectionHeadline}
                        fields={fieldsItem}
                        showDelBtn={ fieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        handleTextChange={decoratedTextChangeHandler}
                        handleDelPortionBtnClick={decoratedDelHandler}
                        handleBtnAddInfoFromAnotherOccupClick={decoratedAddInfoFromAnotherOccupHandler}
                    />
                )
            });

        return <div>
            <h4> { sectionHeadline } </h4>
            <div className="inp-portions">
                { portionsMarkup }
                <div className="inp-portions__btn-add-wrapper">
                    <hr />
                    <button
                        type="button"
                        className="btn btn-default inp-portions__btn-amount-ctrl--add"
                        onClick={this.props.handleAddPortionBtnClick} >
                        <i className="fa fa-plus" />
                    </button>
                </div>
            </div>
        </div>
    }
}

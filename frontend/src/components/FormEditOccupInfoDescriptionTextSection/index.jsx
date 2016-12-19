import React, {Component} from "react";
import FormEditOccupInfoDescriptionTextPortion from "../FormEditOccupInfoDescriptionTextPortion";
import "./styles.less";

export default class FormEditOccupInfoDescriptionTextSection extends Component {
    constructor(props) {
        super(props);

        // зберігаємо значення текстових полів у локальному state,
        // а потім при події Blur записуємо локальне значення у Store
        // при зміні props, перезаписуємо значення текстових полів у локальному state,

        this.state = {
            textFieldsVals: props.fields.map(fieldsItem => fieldsItem.text.value)
        };

        this.handleTextBlur = this.handleTextBlur.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            textFieldsVals: nextProps.fields.map(fieldsItem => fieldsItem.text.value)
        });
    }

    handleTextChange(newVal, i) {
        let newTextFieldsVals = this.state.textFieldsVals.slice();
        newTextFieldsVals[i] = newVal;
        this.setState({
            textFieldsVals: newTextFieldsVals
        });
    }

    handleTextBlur(e, i) {
        this.props.handleTextChange(e.target.value, i)
    }

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
                    })(i, this.handleTextChange),
                    decoretedTextBlurHandler = ((index, f) => {
                        return e => f(e, index)
                    })(i, this.handleTextBlur),
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
                        textValue={this.state.textFieldsVals[i] || ""}
                        handleTextBlur={decoretedTextBlurHandler}
                        showDelBtn={ fieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        handleTextChange={decoratedTextChangeHandler}
                        handleDelPortionBtnClick={decoratedDelHandler}
                        showBtnAddInfoFromAnotherOccupations={this.props.showBtnAddInfoFromAnotherOccupations}
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

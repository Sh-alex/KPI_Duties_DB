import React, {Component} from "react";
import AddOccupBoxCodesPortion from "../AddOccupBoxCodesPortion";
import "./styles.less";

export default class extends Component {
    render() {
        let originalHandler = this.props.handleDelCodesPortionBtnClick,
            portionsMarkup = this.props.codesFields.map((codesFieldsItem, i, codesFieldsArr) => {
                //прив'язуємо обробник видалення до номера порції
                let decoratedDelHandler = (index => {
                    return () => originalHandler(index)
                })(i);
                return(
                    <AddOccupBoxCodesPortion
                        codesPortionFields={codesFieldsItem}
                        showDelBtn={ codesFieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        handleDelCodesPortionBtnClick={decoratedDelHandler}
                    />
                )
            });

        return <div>
            <div className="col-sm-7 pull-right text-right">
                <a href="#" className="" data-toggle="modal" data-target=".modal-add-info-from-related">
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
    }
}

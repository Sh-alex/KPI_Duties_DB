import React, {Component} from "react";
import AddOccupBoxResponsibPortion from "../AddOccupBoxResponsibPortion";
import "./styles.less";

export default class extends Component {
  render() {
    let originalHandler = this.props.handleDelResponsibPortionBtnClick,
        portionsMarkup = this.props.responsibFields.map((fieldsItem, i, fieldsArr) => {
          //прив'язуємо обробник видалення до номера порції
          let decoratedDelHandler = (index => {
            return () => originalHandler(index)
          })(i);
          return(
              <AddOccupBoxResponsibPortion
                  responsibPortionFields={fieldsItem}
                  showDelBtn={ fieldsArr.length > 1 }
                  portionItemClassName={ i===0 ? "is-first-item" : "" }
                  key={i}
                  portionKey={i}
                  handleDelResponsibPortionBtnClick={decoratedDelHandler}
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

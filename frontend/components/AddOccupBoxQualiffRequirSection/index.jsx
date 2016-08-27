import React, { Component } from 'react'
import AddOccupBoxQualiffRequirPortion from "../AddOccupBoxQualiffRequirPortion"

import './styles.less'

export default class extends Component {
    render() {
        let originalHandler = this.props.handleDelQualiffRequirPortionBtnClick,
            portionsMarkup = this.props.qualiffRequirFields.map((fieldsItem, i, fieldsArr) => {
                //прив'язуємо обробник видалення до номера порції
                let decoratedDelHandler = (index => {
                    return () => originalHandler(index)
                })(i);
                return(
                    <AddOccupBoxQualiffRequirPortion
                        qualiffRequirPortionFields={fieldsItem}
                        showDelBtn={ fieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        handleDelQualiffRequirPortionBtnClick={decoratedDelHandler}
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

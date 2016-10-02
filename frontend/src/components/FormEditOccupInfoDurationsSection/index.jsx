import React, {Component} from "react";

import FormEditOccupInfoDurationsPortion from "../FormEditOccupInfoDurationsPortion"

export default function FormEditOccupInfoDurationsSection(props) {
    let originalDelPortionHandler = props.handleDelPortionBtnClick,
        portionsMarkup = props.durationsFields.map((fieldsItem, i, fieldsArr) => {
            //прив'язуємо обробники до номера порції
            let decoratedDelHandler = (index => {
                    return () => originalDelPortionHandler(index)
                })(i);

            return (
                <FormEditOccupInfoDurationsPortion
                    fields={fieldsItem}
                    showDelBtn={ fieldsArr.length > 1 }
                    portionItemClassName={ i===0 ? "is-first-item" : "" }
                    key={i}
                    portionKey={i}
                    handleDelPortionBtnClick={decoratedDelHandler}
                />
            );
        });

    return (
        <div>
            <h4> Терміни дії посади </h4>
            <div className="inp-portions">
                { portionsMarkup }
                <div className="inp-portions__btn-add-wrapper">
                    <hr />
                    <button
                        type="button"
                        className="btn btn-default inp-portions__btn-amount-ctrl--add"
                        onClick={props.handleAddPortionBtnClick} >
                        <i className="fa fa-plus" />
                    </button>
                </div>
            </div>
        </div>
    );
}

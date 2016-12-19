import React, {Component} from "react";

import FormEditOccupInfoDurationsPortion from "../FormEditOccupInfoDurationsPortion"

export default function FormEditOccupInfoDurationsSection(props) {
    let originalDelPortionHandler = props.handleDelPortionBtnClick,
        originalInKpiInpChangeHandler = props.handleInKpiInpChange,
        portionsMarkup = props.durationsFields.map((fieldsItem, i, fieldsArr) => {
            //прив'язуємо обробники до номера порції
            let decoratedDelHandler = (index => {
                    return () => originalDelPortionHandler(index)
                })(i),
                decoratedInKpiInpChangeHandler = (index => {
                    return e => originalInKpiInpChangeHandler(e.currentTarget.checked, index)
                })(i),
                //показуємо поле "є віртуальною", лише якщо ця порція дат для КПІ
                showInpIsVirtual = fieldsItem.inKpi && fieldsItem.inKpi.value;

            return (
                <FormEditOccupInfoDurationsPortion
                    fields={fieldsItem}
                    showDelBtn={ fieldsArr.length > 1 }
                    showInpIsVirtual={showInpIsVirtual}
                    portionItemClassName={ i===0 ? "is-first-item" : "" }
                    key={i}
                    portionKey={i}
                    handleDelPortionBtnClick={decoratedDelHandler}
                    handleInKpiInpChange={decoratedInKpiInpChangeHandler}
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

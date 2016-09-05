import React, {Component} from "react";
import {DropdownList} from "react-widgets";
import classNames from "classnames"
import replaceApostrophe from "../../utils/replaceApostrophe"

import "./styles.less";

export default class AddOccupBoxNameSection extends Component {
    render() {
        let {
                nameFields,
                occupationGroupList,
                clarifiedOccupationList,
                clarificationList
            } = this.props,
            occupGroupFormGroupClass = classNames({
                'form-group': true,
                'has-error':  occupationGroupList.errors && occupationGroupList.errors.length || nameFields.occupationGroup.touched && nameFields.occupationGroup.error,
                'has-success': nameFields.occupationGroup.touched && !nameFields.occupationGroup.error && !occupationGroupList.errors.length
            }),
            clarifiedOccupFormGroupClass = classNames({
                'form-group': true,
                'has-error':  clarifiedOccupationList.errors && clarifiedOccupationList.errors.length || nameFields.clarifiedOccup.touched && nameFields.clarifiedOccup.error,
                'has-success': nameFields.clarifiedOccup.touched && !nameFields.clarifiedOccup.error && !clarifiedOccupationList.errors.length
            }),
            clarificationFormGroupClass = classNames({
                'form-group': true,
                'has-error':  clarificationList.errors && clarificationList.errors.length || nameFields.clarification.touched && nameFields.clarification.error,
                'has-success': nameFields.clarification.touched && !nameFields.clarification.error && !clarificationList.errors.length
            }),
            occupationNameFormGroupClass = classNames({
                'form-group': true,
                'has-error':  nameFields.occupationName.touched && nameFields.occupationName.error,
                'has-success': nameFields.occupationName.touched && !nameFields.occupationName.error
            }),
            occupationNameMinFormGroupClass = classNames({
                'form-group': true,
                'has-error':  nameFields.occupationNameMin.touched && nameFields.occupationNameMin.error,
                'has-success': nameFields.occupationNameMin.touched && !nameFields.occupationNameMin.error
            });

        return <div>
            <h4> Назва посади </h4>
            <div className={occupGroupFormGroupClass}>
                <label htmlFor="inp-occupation-group" className="col-sm-2 control-label"> Посадовий склад </label>
                <div className="col-sm-10">
                    <DropdownList
                        {...nameFields.occupationGroup}
                        id="inp-occupation-group"
                        className="form-control no-padding"
                        placeholder="Оберіть варіант зі списку"
                        data={occupationGroupList.items}
                        valueField='id'
                        textField='textValue'
                        defaultValue={null}
                        onChange={ this.props.handleOccupationGroupInpChange }
                        busy={occupationGroupList.isFetching}
                        caseSensitive={false}
                        filter='contains' />
                    <span className="help-block">
                        {
                            occupationGroupList.errors && occupationGroupList.errors.length && occupationGroupList.errors.map( err => <span> {err} <br /> </span>)  ||
                            nameFields.occupationGroup.touched && nameFields.occupationGroup.error
                        }
                    </span>
                </div>
            </div>


            <div className="row">
                <div className="col-sm-6">
                    <div className={clarifiedOccupFormGroupClass}>
                        <label htmlFor="select-clarified-occup" className="col-sm-4 control-label">
                            Уточнювана посада
                        </label>
                        <div className="col-sm-8">
                            <DropdownList
                                {...nameFields.clarifiedOccup}
                                id="select-clarified-occup"
                                className="form-control no-padding"
                                placeholder="Оберіть варіант зі списку"
                                data={[
                            {
                                "id": -1,
                                "textValue": "-(Відсутня)-"
                            },
                            ...this.props.clarifiedOccupationList.items
                        ]}
                                defaultValue={-1}
                                valueField='id'
                                textField='textValue'
                                onChange={ this.props.handleClarifiedOccupInpChange }
                                caseSensitive={false}
                                busy={clarifiedOccupationList.isFetching}
                                filter='contains' />
                            <span className="help-block">
                                {
                                    clarifiedOccupationList.errors && clarifiedOccupationList.errors.length && clarifiedOccupationList.errors.map( err => <span> {err} <br /> </span>)  ||
                                    nameFields.clarifiedOccup.touched && nameFields.clarifiedOccup.error
                                }
                            </span>
                        </div>
                        {/*
                         disabled={true}
                         title="Оберіть спочатку Посадовий склад"
                         */
                        }
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className={clarificationFormGroupClass}>
                        <label htmlFor="select-clarification" className="col-sm-4 control-label">
                            Уточнення
                        </label>
                        <div className="col-sm-8">
                            <div className="input-group">
                                <DropdownList
                                    {...nameFields.clarification}
                                    id="select-clarification"
                                    className="form-control no-padding"
                                    placeholder="Оберіть варіант зі списку"
                                    data={clarificationList.items}
                                    valueField='id'
                                    textField='textValue'
                                    defaultValue={null}
                                    onChange={ this.props.handleClarificationInpChange }
                                    caseSensitive={false}
                                    busy={clarificationList.isFetching}
                                    filter='contains'/>
                                <div className="input-group-btn">
                                    <button
                                        type="button"
                                        title="Додати нове ключове слово для уточнення"
                                        className="btn btn-default btn-flat"
                                        onClick={this.props.openModalAddNewClarification} >
                                        +1
                                    </button>
                                </div>
                            </div>
                            <span className="help-block">
                                {
                                    clarificationList.errors && clarificationList.errors.length && clarificationList.errors.map( err => <span> {err} <br /> </span>)  ||
                                    nameFields.clarification.touched && nameFields.clarification.error
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={occupationNameFormGroupClass}>
                <label htmlFor="inp-occupation-name" className="col-sm-2 control-label"> Повна назва посади </label>
                <div className="col-sm-10">
                    <input
                        {...nameFields.occupationName}
                        onChange={ e => {
                                nameFields.occupationName.onChange(
                                    replaceApostrophe(e.target.value)
                                )
                            }}
                        type="text"
                        className="form-control"
                        id="inp-occupation-name"
                        placeholder="Повна назва посади" />
                    <span className="help-block">
                        { nameFields.occupationName.touched && nameFields.occupationName.error }
                    </span>
                </div>
            </div>
            <div className={occupationNameMinFormGroupClass}>
                <label htmlFor="inp-occupation-name-min" className="col-sm-2 control-label">
                    Скорочена назва посади
                </label>
                <div className="col-sm-10">
                    <input
                        {...nameFields.occupationNameMin}
                        onChange={ e => {
                                nameFields.occupationNameMin.onChange(
                                    replaceApostrophe(e.target.value)
                                )
                            }}
                        type="text"
                        className="form-control"
                        id="inp-occupation-name-min"
                        placeholder="Скорочена назва посади" />
                    <span className="help-block">
                        { nameFields.occupationNameMin.touched && nameFields.occupationNameMin.error }
                    </span>
                </div>
            </div>
            <hr />
        </div>
    }
}

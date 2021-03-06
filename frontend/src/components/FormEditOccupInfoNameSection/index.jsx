import React, {Component} from "react";
import {DropdownList} from "react-widgets";
import classNames from "classnames"
import replaceApostrophe from "../../utils/replaceApostrophe"
import debounce from "../../utils/debounce"
import fixBlur from "../../utils/fixReactWidgetsDatepickerBlur";

import "./styles.less";

export default class FormEditOccupInfoNameSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            occupationGroupFilterStr: "",
            clarifiedOccupFilterStr: "",
            clarificationFilterStr: ""
        };

        this.onOccupationGroupFilterStrChange = this.onOccupationGroupFilterStrChange.bind(this);
        this.onClarificationFilterStrChange = this.onClarificationFilterStrChange.bind(this);
        this.onClarifiedOccupFilterStrChange = this.onClarifiedOccupFilterStrChange.bind(this);
        this.handleOccupGroupFilterListSubmit = debounce(this.handleOccupGroupFilterListSubmit.bind(this), 400);
        this.handleClarifiedOccupFilterListSubmit = debounce(this.handleClarifiedOccupFilterListSubmit.bind(this), 400);
        this.handleClarificationFilterListSubmit = debounce(this.handleClarificationFilterListSubmit.bind(this), 400);
    }

    onOccupationGroupFilterStrChange(newVal) {
        if(newVal == this.state.occupationGroupFilterStr)
            return;
        this.setState({occupationGroupFilterStr: newVal});
        this.handleOccupGroupFilterListSubmit(newVal);
    }

    onClarificationFilterStrChange(newVal) {
        if(newVal == this.state.clarificationFilterStr)
            return;
        this.setState({clarificationFilterStr: newVal});
        this.handleClarificationFilterListSubmit(newVal);
    }

    onClarifiedOccupFilterStrChange(newVal) {
        if(newVal == this.state.clarifiedOccupFilterStr)
            return;
        this.setState({clarifiedOccupFilterStr: newVal});
        this.handleClarifiedOccupFilterListSubmit(newVal);
    }

    handleOccupGroupFilterListSubmit(filterStr = this.state.occupationGroupFilterStr) {
        this.props.fetchOccupGroupList({ filterStr });
    }

    handleClarificationFilterListSubmit(filterStr = this.state.clarificationFilterStr) {
        this.props.fetchClarificationList({ filterStr });
    }

    handleClarifiedOccupFilterListSubmit(filterStr = this.state.clarifiedOccupFilterStr) {
        this.props.fetchClarifiedOccupList({ filterStr });
    }

    render() {
        let {
                nameFields,
                occupationGroupList,
                clarifiedOccupationList,
                clarificationList
            } = this.props,
            clarifiedOccupVal,
            clarificationVal,
            occupGroupFormGroupClass = classNames({
                'form-group': true,
                'has-error':  occupationGroupList.fetchingError || nameFields.occupationGroup.touched && nameFields.occupationGroup.error,
                'has-success': nameFields.occupationGroup.touched && !nameFields.occupationGroup.error && !occupationGroupList.fetchingError
            }),
            occupationNameFormGroupClass = classNames({
                'form-group': true,
                'has-error': nameFields.occupationName.touched && nameFields.occupationName.error,
                'has-success': nameFields.occupationName.touched && !nameFields.occupationName.error
            }),
            occupationNameMinFormGroupClass = classNames({
                'form-group': true,
                'has-error': nameFields.occupationNameMin.touched && nameFields.occupationNameMin.error,
                'has-success': nameFields.occupationNameMin.touched && !nameFields.occupationNameMin.error
            }),
            clarificationFormGroupClass = classNames({
                'form-group': true,
                'has-error': clarificationList.fetchingError || nameFields.clarification.touched && nameFields.clarification.error,
                'has-success': nameFields.clarification.touched && !nameFields.clarification.error && !clarificationList.fetchingError
            }),
            clarifiedOccupFormGroupClass = classNames({
                'form-group': true,
                'has-error': clarifiedOccupationList.fetchingError || nameFields.clarifiedOccup.touched && nameFields.clarifiedOccup.error,
                'has-success': nameFields.clarifiedOccup.touched && !nameFields.clarifiedOccup.error && !clarifiedOccupationList.fetchingError
            });

        if(nameFields.clarifiedOccup.value === undefined || nameFields.clarifiedOccup.value === "")
            clarifiedOccupVal = null;
        else
            clarifiedOccupVal = {
                id: nameFields.clarifiedOccup.value,
                textValue: nameFields.clarifiedOccupName.value
            };

        if(nameFields.clarification.value === undefined || nameFields.clarification.value === "" || nameFields.clarification.value === null)
            clarificationVal = null;
        else
            clarificationVal = {
                id: nameFields.clarification.value,
                textValue: nameFields.clarificationName.value
            };

        return (
            <div>
                <h4> Назва посади </h4>
                <div className={occupGroupFormGroupClass}>
                    <label htmlFor="inp-occupation-group" className="col-xs-12 col-md-2 control-label"> Посадовий склад </label>
                    <div className="col-xs-12 col-md-10">
                        <div className="input-group input-group--occupation-group">
                            <DropdownList
                                {...nameFields.occupationGroup}
                                id="inp-occupation-group"
                                className="form-control no-padding"
                                placeholder="Оберіть варіант зі списку"
                                messages={{
                                    emptyList:"Список пустий",
                                    emptyFilter: "Не знайдено жодного елементу",
                                    filterPlaceholder: "Введіть текст для пошуку значень",
                                    open: "Відкрити випадаючий список"
                                }}
                                data={occupationGroupList.items}
                                valueField='id'
                                textField='textValue'
                                defaultValue={null}
                                onChange={this.props.handleOccupationGroupInpChange}
                                busy={occupationGroupList.isFetching}
                                onSearch={this.onOccupationGroupFilterStrChange}
                                searchTerm={this.state.occupationGroupFilterStr}
                                defaultSearchTerm=""
                                filter={(dataItem, searchTerm) => true}
                            />
                            <div className="input-group-btn">
                                <button
                                    type="button"
                                    title="Додати нове значення до списку"
                                    className="btn btn-default btn-flat"
                                    onClick={this.props.onBtnAddOccupationGroupClick} >
                                    +1
                                </button>
                                <button
                                    type="button"
                                    title="Оновити список"
                                    className="btn btn-default btn-flat"
                                    onClick={() => this.handleOccupGroupFilterListSubmit()} >
                                    <i className="fa fa-refresh" />
                                </button>
                            </div>
                        </div>
                        <span className="help-block">
                            {
                                occupationGroupList.fetchingError ||
                                nameFields.occupationGroup.touched && nameFields.occupationGroup.error
                            }
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className={clarifiedOccupFormGroupClass}>
                            <label htmlFor="select-clarified-occup" className="col-xs-12 col-md-4 control-label">
                                Уточнювана посада
                            </label>
                            <div className="col-xs-12 col-md-8">
                                <div className="input-group input-group--clarified-occup">
                                    <DropdownList
                                        {...nameFields.clarifiedOccup}
                                        id="select-clarified-occup"
                                        className="form-control no-padding"
                                        placeholder="Оберіть варіант зі списку"
                                        messages={{
                                            emptyList: "Список пустий",
                                            emptyFilter: "Не знайдено жодного елементу",
                                            filterPlaceholder: "Введіть текст для пошуку значень",
                                            open: "Відкрити випадаючий список"
                                        }}
                                        data={[
                                            {
                                                "id": null,
                                                "textValue": "-(Відсутня)-"
                                            },
                                            ...clarifiedOccupationList.items
                                        ]}
                                        value={clarifiedOccupVal}
                                        defaultValue={{
                                            "id": null,
                                            "textValue": "-(Відсутня)-"
                                        }}
                                        valueField='id'
                                        textField={item => item.textValue}
                                        onChange={this.props.handleClarifiedOccupInpChange}
                                        onBlur={e => fixBlur(e, nameFields.clarifiedOccup)}
                                        busy={clarifiedOccupationList.isFetching}
                                        onSearch={this.onClarifiedOccupFilterStrChange}
                                        searchTerm={this.state.clarifiedOccupFilterStr}
                                        defaultSearchTerm=""
                                        filter={(dataItem, searchTerm) => true}
                                    />
                                    <div className="input-group-btn">
                                        <button
                                            type="button"
                                            title="Оновити список"
                                            className="btn btn-default btn-flat"
                                            onClick={() => this.handleClarifiedOccupFilterListSubmit()} >
                                            <i className="fa fa-refresh" />
                                        </button>
                                    </div>
                                </div>
                                <span className="help-block">
                                    {
                                        clarifiedOccupationList.fetchingError ||
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
                    <div className="col-xs-12 col-md-6">
                        <div className={clarificationFormGroupClass}>
                            <label htmlFor="select-clarification" className="col-xs-12 col-md-4 control-label">
                                Уточнення
                            </label>
                            <div className="col-xs-12 col-md-8">
                                <div className="input-group">
                                    <DropdownList
                                        {...nameFields.clarification}
                                        id="select-clarification"
                                        className="form-control no-padding"
                                        placeholder="Оберіть варіант зі списку"
                                        messages={{
                                            emptyList:"Список пустий",
                                            emptyFilter: "Не знайдено жодного елементу",
                                            filterPlaceholder: "Введіть текст для пошуку значень",
                                            open: "Відкрити випадаючий список"
                                        }}
                                        data={clarificationList.items}
                                        valueField='id'
                                        textField={item => item.textValue}
                                        defaultValue={null}
                                        value={clarificationVal}
                                        onChange={ this.props.handleClarificationInpChange }
                                        onBlur={e => fixBlur(e, nameFields.clarification)}
                                        busy={clarificationList.isFetching}
                                        onSearch={this.onClarificationFilterStrChange}
                                        searchTerm={this.state.clarificationFilterStr}
                                        defaultSearchTerm=""
                                        filter={(dataItem, searchTerm) => true}
                                    />
                                    <div className="input-group-btn">
                                        <button
                                            type="button"
                                            title="Додати нове значення до списку"
                                            className="btn btn-default btn-flat"
                                            onClick={this.props.openModalAddNewClarification} >
                                            +1
                                        </button>
                                        <button
                                            type="button"
                                            title="Оновити список"
                                            className="btn btn-default btn-flat"
                                            onClick={() => this.handleClarificationFilterListSubmit()} >
                                            <i className="fa fa-refresh" />
                                        </button>
                                    </div>
                                </div>
                                <span className="help-block">
                                    {
                                        clarificationList.fetchingError ||
                                        nameFields.clarification.touched && nameFields.clarification.error
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={occupationNameFormGroupClass}>
                    <label htmlFor="inp-occupation-name" className="col-xs-12 col-md-2 control-label"> Повна назва посади </label>
                    <div className="col-xs-12 col-md-10">
                        <input
                            {...nameFields.occupationName}
                            onChange={ e => {
                                nameFields.occupationName.onChange(
                                    replaceApostrophe(e.target.value)
                                )
                            }}
                            value={nameFields.occupationName.value || ""}
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
                    <label htmlFor="inp-occupation-name-min" className="col-xs-12 col-md-2 control-label">
                        Скорочена назва посади
                    </label>
                    <div className="col-xs-12 col-md-10">
                        <input
                            {...nameFields.occupationNameMin}
                            onChange={ e => {
                                nameFields.occupationNameMin.onChange(
                                    replaceApostrophe(e.target.value)
                                )
                            }}
                            value={nameFields.occupationNameMin.value || ""}
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
        )
    }
}

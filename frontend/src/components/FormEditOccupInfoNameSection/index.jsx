import React, {Component} from "react";
import {DropdownList} from "react-widgets";
import classNames from "classnames"
import replaceApostrophe from "../../utils/replaceApostrophe"
import debounce from "../../utils/debounce"

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
        this.setState({occupationGroupFilterStr: newVal});
        this.handleOccupGroupFilterListSubmit(newVal);
    }

    onClarificationFilterStrChange(newVal) {
        this.setState({clarificationFilterStr: newVal});
        this.handleClarificationFilterListSubmit(newVal);
    }

    onClarifiedOccupFilterStrChange(newVal) {
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
                                            ...this.props.clarifiedOccupationList.items
                                        ]}
                                        value={nameFields.clarifiedOccup.value || null}
                                        defaultValue={{
                                            "id": null,
                                            "textValue": "-(Відсутня)-"
                                        }}
                                        valueField='id'
                                        textField='textValue'
                                        onChange={ this.props.handleClarifiedOccupInpChange }
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
                                        textField='textValue'
                                        defaultValue={null}
                                        onChange={ this.props.handleClarificationInpChange }
                                        caseSensitive={false}
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

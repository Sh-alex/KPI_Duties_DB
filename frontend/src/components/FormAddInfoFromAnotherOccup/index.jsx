import React, { Component } from 'react'
import { DropdownList, Multiselect } from "react-widgets";
import { Alert } from 'react-bootstrap'
import classNames from 'classnames';

import {
    SOME_TAGS,
    MATCH_STRING,
    CONTAINS_STRING,
    ALL_TAGS,
    ANY
} from "../../constants/searchTypes"

import './styles.less'


export default class FormAddInfoFromAnotherOccup extends Component {
    constructor(props) {
        super(props);

        this.resetState = this.resetState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);

        this.state = {
            form: {
                searchType: ANY,       //"MATCH_STRING", "CONTAINS_STRING", "ALL_TAGS", "SOME_TAGS"
                occupGroupVal: null,   // 8
                searchText: "",        //"інженер"
                searchTags: [],        // ["Старший", "Інженер", "1 розряду"]
                inKpi: true,
            }
        };
    }

    resetState() {
        this.setState({
            form: {
                searchType: ANY,       //"MATCH_STRING", "CONTAINS_STRING", "ALL_TAGS", "SOME_TAGS"
                occupGroupVal: null,   // 8
                searchText: "",        //"інженер"
                searchTags: [],        // ["Старший", "Інженер", "1 розряду"]
                inKpi: true,
            }
        });
    }

    submitForm(e) {
        e.preventDefault();
        this.props.onSubmitSearchForm({
            ...this.state.form,
            searchTags: this.state.form.searchTags
        });
    }

    handleTagsChange(newVal) {
        this.setState({
            form: {
                ...this.state.form,
                searchTags: [...this.state.form.searchTags, newVal]
            }
        })
    }

    render() {
        let errorAlert = (!this.props.searchError) ? "" : (
            <Alert bsStyle="danger" onDismiss={this.props.onAlertDismiss}>
                <h4>
                    <i className="icon fa fa-warning" />
                    Помилка! :(
                </h4>
                <p>
                    { this.props.searchError }
                </p>
            </Alert>
        ),
            btnSpinnerClass = classNames({
            'btn-spinner': true,
            'hidden': !this.props.isSubmittng
        });

        return (
            <form
                onSubmit={this.submitForm}
                className="form-horizontal search-form form-search-similar"
                id="form-search-similar"
                role="form">
                <div className="form-inner">
                    <div className="form-group">
                        <label htmlFor="form-search-similar__inp-occupation-group" className="col-sm-3 control-label"> Посадовий склад </label>
                        <div className="col-sm-9">
                            <DropdownList
                                id="inp-occupation-group"
                                placeholder="Оберіть варіант зі списку"
                                messages={{emptyList:"Список пустий"}}
                                data={[
                                    {
                                        "id": null,
                                        "textValue": "Будь-який"
                                    },
                                    ...this.props.occupationGroupList.items
                                ]}
                                valueField='id'
                                textField='textValue'
                                defaultValue={-1}
                                value={this.state.form.occupGroupVal}
                                onChange={ newVal => {
                                    this.setState({
                                        form: { ...this.state.form, occupGroupVal: newVal}
                                    })
                                }}
                                busy={this.props.occupationGroupList.isFetching}
                                caseSensitive={false}
                                filter='contains' />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="form-search-similar__select-occupation-name" className="col-sm-3 control-label">
                            Назва посади
                        </label>
                        <div className="col-sm-9">
                            <select
                                value={this.state.form.searchType}
                                onChange={ e => {
                                    this.setState({
                                        form: { ...this.state.form, searchType: e.currentTarget.value}
                                    })
                                }}
                                className="form-control"
                                id="form-search-similar__select-occupation-name"
                            >
                                <option value={ANY} >
                                    Будь-яка
                                </option>
                                <option value={MATCH_STRING} >
                                    Точна відповідність
                                </option>
                                <option value={CONTAINS_STRING} >
                                    Рядок міститься у назві
                                </option>
                                <option value={SOME_TAGS} >
                                    Назва містить хоча б один із тегів
                                </option>
                                <option value={ALL_TAGS} >
                                    Назва містить кожен із тегів
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            {
                                this.state.form.searchType === CONTAINS_STRING || this.state.form.searchType === MATCH_STRING ?
                                    (
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="form-search-similar__inp-occupation-name"
                                            placeholder="Введіть текст"
                                            value={this.state.form.searchText}
                                            onChange={ e => {
                                                this.setState({
                                                    form: { ...this.state.form, searchText: e.currentTarget.value}
                                                })
                                            }} />
                                    ) : ""
                            }
                            {
                                this.state.form.searchType === ALL_TAGS || this.state.form.searchType === SOME_TAGS ?
                                    (
                                        <Multiselect
                                            id="form-search-similar__inp-occupation-name"
                                            placeholder="Введіть тут теги"
                                            messages={{emptyList: "Список пустий", createNew: "Додати новий тег"}}
                                            defaultValue={""}
                                            value={this.state.form.searchTags}
                                            onChange={this.handleTagsChange}
                                            onCreate={this.handleTagsChange}
                                            caseSensitive={false}
                                            filter='contains' />
                                    ) : ""
                            }
                            {/* data={this.props.clarificationList.items} */}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9 checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={this.state.form.inKpi}
                                    onChange={ e => {
                                        this.setState({
                                            form: { ...this.state.form, inKpi: e.currentTarget.value}
                                        })
                                    }} />
                                Приналежність до КПІ
                            </label>
                        </div>
                    </div>
                </div>
                { errorAlert }
                <div className="clearfix search-similar__bottom-btns-part">
                    <button type="button" className="btn btn-default pull-left" onClick={this.props.cancelSearch}>
                        Відміна
                    </button>

                    <div className="pull-right">
                        <button
                            type="reset"
                            className="btn btn-default"
                            onClick={this.resetState}
                        >
                            Очистити поля {" "}
                            <i className="fa fa-refresh" aria-hidden="true" title="Очистити поля форми" />
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            title="Шукати посаду"
                            disabled={this.props.isSubmittng || this.props.errors}
                        >
                            <span className="btn-label"> 
                                Шукати {" "}
                                <i className="fa fa-search" aria-hidden="true" />
                            </span>
                            <span className={btnSpinnerClass}>
                                <i className="fa fa-spinner fa-pulse" />
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

import React, { Component } from 'react'
import { DropdownList, Multiselect, DateTimePicker } from "react-widgets";
import { Alert } from 'react-bootstrap'
import classNames from 'classnames';

import {OCCUPATION_MIN_DATE} from "../../constants/common";

import {
    SOME_TAGS,
    MATCH_STRING,
    CONTAINS_STRING,
    ALL_TAGS,
    ANY
} from "../../constants/searchTypes"

import './styles.less'


export default class SearchOccupationsForm extends Component {
    constructor(props) {
        super(props);

        this.getInitState = this.getInitState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleTagsCreate = this.handleTagsCreate.bind(this);

        this.state = this.getInitState();
    }

    getInitState() {
        return {
            form: Object.assign({
                searchType: ANY,       //"MATCH_STRING", "CONTAINS_STRING", "ALL_TAGS", "SOME_TAGS"
                occupGroupVal: null,   // 8
                searchText: "",        //"інженер"
                searchTags: [],        // ["Старший", "Інженер", "1 розряду"]
                inKpi: true,
                "creatingInStateDate": {
                    "from": null,
                    "to": null
                },
                "creatingInKPIDate": {
                    "from": null,
                    "to": null
                },
                "cancelingInStateDate": {
                    "from": null,
                    "to": null
                },
                "cancelingInKPIDate": {
                    "from": null,
                    "to": null
                }
            }, this.props.formFields),
            //описали окремо в store, а не просто юзаємо через props на випадок якщо треба буде не показувати у підсказці вже обрані елементи
            tagsList: this.props.tagsList && this.props.tagsList.items && this.props.tagsList.items.map(item => item.textValue) || []
        };
    }

    submitForm(e) {
        e.preventDefault();
        this.props.onSubmitSearchForm({
            ...this.state.form,
            searchTags: this.state.form.searchTags  //перевірити втф!!!!!!!!!!!!!
        });
    }

    handleTagsChange(newVal) {
        this.setState({
            form: {
                ...this.state.form,
                searchTags: newVal
            }
        })
    }

    handleTagsCreate(newVal) {
        this.setState({
            form: {
                ...this.state.form,
                searchTags: this.state.form.searchTags.concat(newVal)
            }
        })
    }

    render() {
        let
            // fixBlur = (event, input) => {
            //     event.target = {value: input.value};
            //     input.onBlur(event);
            // },
            errorAlert = (!this.props.searchError) ? "" : (
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
                'hidden': !this.props.isSubmittngSearchForm
            });

        return (
            <form
                onSubmit={this.submitForm}
                className="form-horizontal ssearch-occup-form"
                role="form">
                <div className="form-inner">
                    <div className="form-group">
                        <label htmlFor="search-occup-form__inp-occupation-group" className="col-sm-3 control-label">
                            Посадовий склад
                        </label>
                        <div className="col-sm-9">
                            <DropdownList
                                id="inp-occupation-group"
                                placeholder="Оберіть варіант зі списку"
                                messages={{
                                    emptyList:"Список пустий",
                                    emptyFilter: "Не знайдено жодного елементу"
                                }}
                                data={[
                                    {
                                        "id": null,
                                        "textValue": "Будь-який"
                                    },
                                    ...this.props.occupationGroupList.items
                                ]}
                                valueField='id'
                                textField='textValue'
                                defaultValue={null}
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
                        <label htmlFor="search-occup-form__select-occupation-name" className="col-sm-3 control-label">
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
                                id="search-occup-form__select-occupation-name"
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
                    <div className={classNames({
                        'form-group': true,
                        'hidden': this.state.form.searchType === ANY
                    })}>
                        <div className="col-sm-offset-3 col-sm-9">
                            {
                                this.state.form.searchType === CONTAINS_STRING || this.state.form.searchType === MATCH_STRING ?
                                    (
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="search-occup-form__inp-occupation-name"
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
                                            id="search-occup-form__inp-occupation-name"
                                            placeholder="Введіть тут теги"
                                            messages={{
                                                emptyList: "Список пустий",
                                                emptyFilter: "Не знайдено жодного елементу",
                                                createNew: "Додати новий тег"
                                            }}
                                            defaultValue={""}
                                            data={ this.state.tagsList }
                                            value={this.state.form.searchTags}
                                            busy={this.props.tagsList.isFetching}
                                            onChange={this.handleTagsChange}
                                            onCreate={this.handleTagsCreate}
                                            caseSensitive={false}
                                            filter='contains' />
                                    ) : ""
                            }
                        </div>
                    </div>

                    <div className="row">
                        <label className="col-xs-10 col-sm-3 control-label">
                            Дата створення посади в державі
                        </label>
                        <div className="col-xs-12 col-sm-9">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.creatingInStateDate.from}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        creatingInStateDate: {
                                                            ...this.state.form.creatingInStateDate,
                                                            from: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату початку фільтра"
                                                time={false}
                                                min={OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.creatingInStateDate.to}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        creatingInStateDate: {
                                                            ...this.state.form.creatingInStateDate,
                                                            to: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату кінця фільтра"
                                                time={false}
                                                min={this.state.form.creatingInStateDate.from || OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-xs-10 col-sm-3 control-label">
                            Дата відміни посади в державі
                        </label>
                        <div className="col-xs-12 col-sm-9">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.cancelingInStateDate.from}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        cancelingInStateDate: {
                                                            ...this.state.form.cancelingInStateDate,
                                                            from: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату початку фільтра"
                                                time={false}
                                                min={OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.cancelingInStateDate.to}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        cancelingInStateDate: {
                                                            ...this.state.form.cancelingInStateDate,
                                                            to: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату кінця фільтра"
                                                time={false}
                                                min={this.state.form.cancelingInStateDate.from || OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-xs-10 col-sm-3 control-label">
                            Дата створення посади в КПІ
                        </label>
                        <div className="col-xs-12 col-sm-9">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.creatingInKPIDate.from}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        creatingInKPIDate: {
                                                            ...this.state.form.creatingInKPIDate,
                                                            from: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату початку фільтра"
                                                time={false}
                                                min={OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.creatingInKPIDate.to}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        creatingInKPIDate: {
                                                            ...this.state.form.creatingInKPIDate,
                                                            to: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату кінця фільтра"
                                                time={false}
                                                min={this.state.form.creatingInKPIDate.from || OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-xs-10 col-sm-3 control-label">
                            Дата відміни посади в КПІ
                        </label>
                        <div className="col-xs-12 col-sm-9">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.cancelingInKPIDate.from}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        cancelingInKPIDate: {
                                                            ...this.state.form.cancelingInKPIDate,
                                                            from: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату початку фільтра"
                                                time={false}
                                                min={OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.cancelingInKPIDate.to}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        cancelingInKPIDate: {
                                                            ...this.state.form.cancelingInKPIDate,
                                                            to: newVal
                                                        }
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату кінця фільтра"
                                                time={false}
                                                min={this.state.form.cancelingInKPIDate.from || OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            form: { ...this.state.form, inKpi: e.currentTarget.checked}
                                        })
                                    }} />
                                Приналежність до КПІ
                            </label>
                        </div>
                    </div>
                </div>
                { errorAlert }
                <div className="clearfix search-occup-form__bottom-btns-part">
                    {this.props.cancelSearch && (
                        <button type="button" className="btn btn-default pull-left" onClick={this.props.cancelSearch}>
                            Відміна
                        </button>
                    )}

                    <div className={this.props.cancelSearch ? "pull-right" : "text-center"}>
                        <button
                            type="reset"
                            className="btn btn-default"
                            onClick={() => this.setState(this.getInitState())}
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
                                <i className="fa fa-search" />
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

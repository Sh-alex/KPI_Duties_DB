import React, { Component } from 'react'
import { DropdownList, Multiselect, DateTimePicker } from "react-widgets";
import { Alert } from 'react-bootstrap'
import classNames from 'classnames';

import deepEqual from "../../utils/deepEqual"

import {OCCUPATION_MIN_DATE} from "../../constants/common";

import {
    SOME_TAGS,
    MATCH_STRING,
    CONTAINS_STRING,
    ALL_TAGS,
    ANY,

    ONLY_IN_KPI,
    ONLY_IN_STATE
} from "../../constants/searchOccupationsForm"

import './styles.less'


export default class SearchOccupationsForm extends Component {
    constructor(props) {
        super(props);

        this.getInitState = this.getInitState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleTagsCreate = this.handleTagsCreate.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearchTextBlur = this.handleSearchTextBlur.bind(this);
        this.handleOccupGroupChange = this.handleOccupGroupChange.bind(this);
        this.toggleInpOccupGroupIsOpen = this.toggleInpOccupGroupIsOpen.bind(this);

        this.state = this.getInitState(this.props.formFields);
    }

    getInitState(formFields = {}) {
        return {
            form: Object.assign({
                searchType: ANY,       // усі в "constants/searchOccupationsTypes"
                occupGroupVal: [null],     // [8, 3, 6] || [null]
                searchText: "",        // "інженер"
                searchTags: [],        // ["Старший", "Інженер", "1 розряду"]
                inKpi: ANY,            // "ANY", "ONLY_IN_KPI", "ONLY_IN_STATE"
                startFrom: null,
                startTo: null,
                stopFrom: null,
                stopTo: null,
            }, formFields),
            inpOccupGroupIsOpen: false,         //чи показувати зараз список із посадовим складом
            //описали окремо в store, а не просто юзаємо через props на випадок якщо треба буде не показувати у підсказці вже обрані елементи
            tagsList: this.props.tagsList && this.props.tagsList.items && this.props.tagsList.items.map(item => item.textValue) || []
        };
    }

    componentWillReceiveProps(nextProps) {
        if(!deepEqual(nextProps.formFields, this.props.formFields))
            this.setState({
                form: Object.assign({
                    searchType: ANY,       // усі в "constants/searchOccupationsTypes"
                    occupGroupVal: [null], // [8, 3, 6] || [null]
                    searchText: "",        // "інженер"
                    searchTags: [],        // ["Старший", "Інженер", "1 розряду"]
                    inKpi: ANY,            // "ANY", "ONLY_IN_KPI", "ONLY_IN_STATE"
                    startFrom: null,
                    startTo: null,
                    stopFrom: null,
                    stopTo: null,
                }, nextProps.formFields)
            });

        if(!deepEqual(nextProps.tagsList, this.props.tagsList))
            this.setState({
                tagsList: nextProps.tagsList && nextProps.tagsList.items && nextProps.tagsList.items.map(item => item.textValue) || []
            })
    }

    submitForm(e) {
        e.preventDefault();
        this.props.onSubmitSearchForm({
            ...this.state.form,
            searchTags: this.state.form.searchTags  //перевірити втф!!!!!!!!!!!!!
        });
    }

    handleSearchTypeChange (e) {
        let newSearchType = e.currentTarget.value;
        this.setState({
            form: { ...this.state.form, searchType: newSearchType}
        });

        //чи треба знов зробити "предпошук посад", чи очистити попередні результати предпошуку
        let shouldSearch = this.state.form.searchText &&
            (newSearchType === CONTAINS_STRING || newSearchType === MATCH_STRING);

        if(shouldSearch)
            this.props.priorSearchOccupations(newSearchType, this.state.form.searchText);
        else
            this.props.priorSearchOccupReset();
    }

    handleSearchTextChange(e) {
        let searchText = e.currentTarget.value;
        this.setState({
            form: {
                ...this.state.form,
                searchText
            }
        });
    }

    handleSearchTextBlur (e) {
        //якщо рядок не пустий - шукаємо
        if(this.state.form.searchText)
            this.props.priorSearchOccupations(this.state.form.searchType, this.state.form.searchText);
        else
            this.props.priorSearchOccupReset();
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

    handleOccupGroupChange(newVal = []) {
        let idArr = newVal.map(item => item.id);
        if(idArr.includes(null))
            this.setState({
                form: { ...this.state.form, occupGroupVal: [null]}
            });
        else
            this.setState({
                form: { ...this.state.form, occupGroupVal: idArr}
            });
    }

    toggleInpOccupGroupIsOpen (shouldBeOpen) {
        //якщо обрано варіант "будь-який", не даємо можливість обрати інший варіант
        if(this.state.form.occupGroupVal.includes(null))
            return this.setState({ inpOccupGroupIsOpen: false });

        //інакше показуємо список з посадовим складом якщо треба
        this.setState({ inpOccupGroupIsOpen: shouldBeOpen });
    }


    render() {
        let searchTextFeedbackIconClassName, searchTextTitle;
        if(this.props.searchTextResIsPrefetching) {
            searchTextFeedbackIconClassName = "fa fa-spinner fa-pulse text-muted form-control-feedback";
            searchTextTitle = "Йде перевірка чи дасть пошук результати по введеному рядку";
        } else if(this.props.searchTextResPrefetchingError) {
            searchTextFeedbackIconClassName = "glyphicon text-danger glyphicon-warning-sign form-control-feedback";
            searchTextTitle = this.props.searchTextResPrefetchingError;
        } else if(this.props.searchTextWillSucceed === true) {
            searchTextFeedbackIconClassName = "glyphicon text-success glyphicon-ok form-control-feedback";
            searchTextTitle = "Знайдено посади, що відповідають введеному рядку";
        } else if(this.props.searchTextWillSucceed === false) {
            searchTextFeedbackIconClassName = "glyphicon text-danger glyphicon-remove form-control-feedback";
            searchTextTitle = "НЕ знайдено посад, що відповідають введеному рядку";
        } else {
            searchTextFeedbackIconClassName = "";
            searchTextTitle = "Введіть текст";
        }

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
            searchTextFeedbackIcon = searchTextFeedbackIconClassName && (
                <span className={searchTextFeedbackIconClassName} />
            ) || "",
            inpSearchText = this.state.form.searchType === CONTAINS_STRING || this.state.form.searchType === MATCH_STRING ? (
                <input
                    type="text"
                    className="form-control"
                    id="search-occup-form__inp-occupation-name"
                    placeholder="Введіть текст"
                    title={searchTextTitle}
                    value={this.state.form.searchText}
                    onChange={ this.handleSearchTextChange }
                    onBlur={ this.handleSearchTextBlur }
                />
            ) : "",
            inpSearchTags = this.state.form.searchType === ALL_TAGS || this.state.form.searchType === SOME_TAGS ? (
                <Multiselect
                    id="search-occup-form__inp-occupation-name"
                    placeholder="Введіть тут теги(ключові слова)"
                    messages={{
                        emptyList: "Список пустий",
                        emptyFilter: "Не знайдено жодного елементу",
                        createNew: "Додати новий тег(ключове слово)"
                    }}
                    defaultValue={""}
                    data={ this.state.tagsList }
                    value={this.state.form.searchTags}
                    busy={this.props.tagsList.isFetching}
                    onChange={this.handleTagsChange}
                    onCreate={this.handleTagsCreate}
                    caseSensitive={false}
                    filter='contains' />
            ) : "";

        return (
            <form
                onSubmit={this.submitForm}
                className="form-horizontal search-occup-form"
                role="form"
            >
                <div className="form-inner">
                    <div className="form-group">
                        <label htmlFor="search-occup-form__inp-occupation-group" className="col-sm-3 control-label">
                            Посадовий склад
                        </label>
                        <div className="col-sm-9">
                            <Multiselect
                                id="inp-occupation-group"
                                open={this.state.inpOccupGroupIsOpen}
                                onToggle={this.toggleInpOccupGroupIsOpen}
                                placeholder="Оберіть варіанти зі списку"
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
                                value={this.state.form.occupGroupVal}
                                onChange={this.handleOccupGroupChange}
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
                                onChange={ this.handleSearchTypeChange }
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
                                    Назва містить хоча б один із тегів(ключових слів)
                                </option>
                                <option value={ALL_TAGS} >
                                    Назва містить кожен із тегів(ключових слів)
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={classNames({
                        'form-group': true,
                        'hidden': this.state.form.searchType === ANY,
                        'has-feedback': searchTextFeedbackIcon
                    })}>
                        <div className="col-sm-offset-3 col-sm-9">
                            { inpSearchText }
                            { searchTextFeedbackIcon }
                            { inpSearchTags }
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="search-occup-form__select-in-kpi" className="col-sm-3 control-label">
                            Приналежність посади
                        </label>
                        <div className="col-sm-9">
                            <select
                                value={this.state.form.inKpi}
                                onChange={ e => {
                                    this.setState({
                                        form: { ...this.state.form, inKpi: e.currentTarget.value}
                                    })
                                }}
                                className="form-control"
                                id="search-occup-form__select-in-kpi"
                            >
                                <option value="ANY" >
                                    Будь-яка
                                </option>
                                <option value={ONLY_IN_KPI} >
                                    Лише в КПІ
                                </option>
                                <option value={ONLY_IN_STATE} >
                                    Лише в державі
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <label className="col-xs-10 col-sm-3 control-label">
                            Дата створення посади
                        </label>
                        <div className="col-xs-12 col-sm-9">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.startFrom}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        startFrom: newVal
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
                                                value={this.state.form.startTo}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        startTo: newVal
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату кінця фільтра"
                                                time={false}
                                                min={this.state.form.startFrom || OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-xs-10 col-sm-3 control-label">
                            Дата відміни посади
                        </label>
                        <div className="col-xs-12 col-sm-9">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <DateTimePicker
                                                type="date"
                                                format="DD.MM.YYYY"
                                                value={this.state.form.stopFrom}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        stopFrom: newVal
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
                                                value={this.state.form.stopTo}
                                                defaultValue={null}
                                                onChange={ newVal => this.setState({
                                                    form: {
                                                        ...this.state.form,
                                                        stopTo: newVal
                                                    }
                                                })
                                                }
                                                placeholder="Оберіть дату кінця фільтра"
                                                time={false}
                                                min={this.state.form.stopFrom || OCCUPATION_MIN_DATE}
                                                max={new Date()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { errorAlert }
                <div className="bottom-btns-part">
                    {this.props.cancelSearch && (
                        <div className="">
                            <button type="button" className="btn btn-default" onClick={this.props.cancelSearch}>
                                Відміна
                            </button>
                        </div>
                    )}

                    <div className={this.props.cancelSearch ? "text-right" : "text-center"}>
                        <button
                            type="reset"
                            className="btn btn-default"
                            onClick={() => this.setState(this.getInitState())}
                            disabled={this.props.isSubmittngSearchForm}
                        >
                            Очистити поля {" "}
                            <i className="fa fa-undo" title="Очистити поля форми" />
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            title="Шукати посаду"
                            disabled={this.props.isSubmittngSearchForm || this.props.errors}
                        >
                            Шукати {" "}
                            <i className={`fa ${this.props.isSubmittngSearchForm ? "fa-spinner fa-pulse" : "fa-search"}`} />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

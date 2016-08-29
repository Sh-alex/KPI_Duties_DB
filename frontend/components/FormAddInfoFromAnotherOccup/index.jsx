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


export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: ANY,       //"MATCH_STRING", "CONTAINS_STRING", "ALL_TAGS", "SOME_TAGS"
            occupGroupVal: null,    // 8
            searchText: "",         //"інженер"
            searchTags: null,       // [4, 7, 19] => ["Старший", "Інженер", "1 розряду"]
            inKpi: true,
        };
    }

    render() {
        const submitHandler = e => {
            e.preventDefault();
            this.props.onSubmit(this.props.inpVal);
        };

        let btnSpinnerClass = classNames({
            'btn-spinner': true,
            'hidden': !this.props.isSubmittng
        });

        return (
            <form
                onSubmit={submitHandler}
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
                                data={[
                                    {
                                        "id": -1,
                                        "textValue": "Будь-який"
                                    },
                                    ...this.props.occupationGroupList.items
                                ]}
                                valueField='id'
                                textField='textValue'
                                defaultValue={null}
                                value={this.state.occupGroupVal}
                                onChange={ newVal => this.setState({occupGroupVal: newVal}) }
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
                                value={this.state.searchType}
                                onChange={e => this.setState({searchType: e.currentTarget.value}) }
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
                                this.state.searchType === CONTAINS_STRING || this.state.searchType === MATCH_STRING ?
                                    (
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="form-search-similar__inp-occupation-name"
                                            placeholder="Введіть текст"
                                            value={this.state.searchText}
                                            onChange={ newVal => this.setState({searchText: newVal}) }/>
                                    ) : ""
                            }
                            {
                                this.state.searchType === ALL_TAGS || this.state.searchType === SOME_TAGS ?
                                    (
                                        <Multiselect
                                            id="form-search-similar__inp-occupation-name"
                                            placeholder="Оберіть теги зі списку"
                                            data={this.props.clarificationList.items}
                                            valueField='id'
                                            textField='textValue'
                                            defaultValue={null}
                                            value={this.state.searchTags}
                                            onChange={ newVal => this.setState({searchTags: newVal}) }
                                            busy={this.props.occupationGroupList.isFetching}
                                            caseSensitive={false}
                                            filter='contains' />
                                    ) : ""
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9 checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={this.state.inKpi}
                                    onChange={ newVal => this.setState({inKpi: newVal}) } />
                                Приналежність до КПІ
                            </label>
                        </div>
                    </div>
                </div>

                { /* errorAlert */}
                <div className="clearfix form-search-similar__bottom-btns-part">
                    <button type="button" className="btn btn-default pull-left" onClick={this.props.cancelSearch}>
                        Відміна
                    </button>

                    <div className="pull-right">
                        <button
                            type="reset"
                            className="btn btn-default"
                        >
                            Очистити поля {" "}
                            <i className="fa fa-refresh" aria-hidden="true" title="Очистити поля форми" />
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            title="Шукати посаду"
                            disabled={this.props.isSubmittng || !this.state.inpVal}
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

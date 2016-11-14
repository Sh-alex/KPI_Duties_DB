import React, {Component} from "react";
import classNames from "classnames"
import "./styles.less";

function submitHandler(e, props) {
    e.preventDefault();
    props.filterList(props.filterListInpVal);
}

export default function CtrlDcBoxResListSettingsMenu(props) {
    let sortBtnIconClass = classNames({
        "fa": true,
        "fa-sort-amount-asc": props.sortDirection == "SORT_ASC",
        "fa-sort-amount-desc": props.sortDirection == "SORT_DESC",
        "fa-sort": (props.sortDirection != "SORT_ASC") && (props.sortDirection != "SORT_DESC"),
    });

    return (
        <form className="res-list-settings-menu" onSubmit={e => submitHandler(e, props)}>
            <div className="form-group">
                <div className="input-group">
                    <div className="btn-reset-text-inp-filter-wrapper">
                        <a
                            href="javascript:void(0)"
                            type="button"
                            onClick={props.resetFilterListInpVal}
                            className={`fa fa-times-circle btn-reset-text-filter ${!props.filterListInpVal ? 'hidden' : ""}`}
                            title="Скинути фільтр по введеному рядку"
                        >
                            <span className="sr-only"> Скинути фільтр </span>
                        </a>
                        <input
                            value={props.filterListInpVal}
                            onChange={props.onChangeFilterListInpVal}
                            type="text"
                            className="form-control"
                            placeholder="Пошук значень у списку"
                            title="Відфільтрувати таблицю по введеному рядку" />
                    </div>
                    <div className="input-group-btn">
                        <button
                            type="submit"
                            className="btn btn-default btn-flat"
                            title="Відфільтрувати таблицю по введеному рядку">
                            <i className="fa fa-search"/>
                        </button>
                        <button
                            type="button"
                            onClick={props.onTriggerSorting}
                            className="btn btn-default btn-flat"
                            title="Переключити сортування таблиці">
                            <i className={sortBtnIconClass}/>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

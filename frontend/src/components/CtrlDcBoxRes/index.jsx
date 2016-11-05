import React, {Component} from "react";
import { Alert } from 'react-bootstrap'

import CtrlDcBoxResTbl from "../CtrlDcBoxResTbl"
import LoadingBlock from "../LoadingBlock"

import "./styles.less";

export default function CtrlDcBoxRes(props) {
    let listIsEmpty = !(props.activeList && props.activeList.items && props.activeList.items.length),
        listIsLoading = !props.activeList || !props.activeList.items || props.activeList && props.activeList.isFetching,
        listHasErrors = props.activeList && props.activeList.errors  && props.activeList.errors.length,
        mainHeader = document.getElementsByClassName("main-header"),
        mainHeaderH = mainHeader.length && mainHeader[0].clientHeight || 73,
        mainFooter = document.getElementsByClassName("main-footer"),
        mainFooterH = mainFooter.length && mainFooter[0].clientHeight || 82,
        ctrlDcBoxMenu = document.getElementsByClassName("ctrl-dc-box-menu"),
        marginTop = 20,
        marginBottom = 20,
        calcContainerH = window.innerHeight - marginTop - marginBottom - mainHeaderH - mainFooterH,
        ctrlDcBoxMenuH = ctrlDcBoxMenu.length && ctrlDcBoxMenu[0].clientHeight || 1,
        resBoxMaxHeight = Math.max(...[calcContainerH, ctrlDcBoxMenuH, 200]),
        //TODO: коли реалізовуватиму рендерінг на основі переданих даних, обирати просто який тип TR рендерити, а не всієї таблиці
        msgListIsEmpty = listIsEmpty && (
            <Alert bsStyle="warning">
                <p>
                    Список поки що пустий :( <br/>
                    Але ви можете додати сюди нові значення.
                </p>
            </Alert>
        ),
        msgListHasErrors = listHasErrors && (
            <Alert bsStyle="warning">
                <p>
                    Сталася помлка :( <br/>
                    { props.activeList.errors.map(errMsg => <p>{errMsg}</p>) }
                </p>
            </Alert>
        ),
        inpNewVal = (
            <div className="input-group">
                <textarea
                    className="form-control show-for-big-text"
                    placeholder="Нове значення у списку"
                    title="Введіть тут нове значення щоб додати його до списку"
                    rows="6" />
                <input
                    type="text"
                    className="form-control hide-for-big-text"
                    placeholder="Нове значення у списку"
                    title="Введіть тут нове значення щоб додати його до списку" />
                <div className="input-group-btn">
                    <button type="button" className="btn btn-default btn-flat" title="Додати введене значення до списку">
                        {/*Додати*/}
                        <i className="fa fa-save"/>
                    </button>
                    <br className="show-for-big-text"/>
                    <button
                        type="button"
                        className="btn btn-default btn-flat"
                        title="Відмінити додавання нового значення"
                        onClick={props.hideAddingInp}
                    >
                        <i className="fa fa-close"/>
                    </button>
                </div>
            </div>
        ),
        btnShowAddingInp = (
            <button
                type="button"
                className="btn btn-default btn-sm btn-block btn-show-adding-inp"
                title="Додати нове значення до списку"
                onClick={props.showAddingInp}
            >
                <i className="fa fa-plus"/>
            </button>
        ),
        inpFilterList = (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Пошук значень у списку" title="Відфільтрувати таблицю по введеному рядку" />
                <div className="input-group-btn">
                    <button type="button" className="btn btn-default btn-flat" title="Відфільтрувати таблицю по введеному рядку">
                        <i className="fa fa-search"/>
                    </button>
                    <button type="button" className="btn btn-default btn-flat" title="Переключити сортування таблиці">
                        <i className="fa fa-sort-amount-asc"/>
                    </button>
                </div>
            </div>
        ),
        hasBigText = props.shownOccupDescrTextsList ? "has-big-text" : "";

    return (
        <div className={`box box-default ctrl-dc-box-res`}>
            {/*<div className="box-header with-border text-center">*/}
            {/*<h3 className="box-title"> Списки </h3>*/}
            {/*</div>*/}
            <div className={`box-body ${hasBigText}`} style={{maxHeight: resBoxMaxHeight + "px"}}>
                <div>
                    <form>
                        <div className="form-group">
                            { !listIsEmpty && !listIsLoading && !listHasErrors && inpFilterList }
                        </div>
                    </form>
                </div>
                {
                    listHasErrors ?
                        msgListHasErrors:
                        listIsLoading ?
                            <LoadingBlock caption="Іде завантаження списку..." /> :
                            listIsEmpty ?
                                msgListIsEmpty :
                                <CtrlDcBoxResTbl
                                    shownOccupDescrTextsList={props.shownOccupDescrTextsList}
                                    listData={props.activeList}
                                />
                }
                <div className="btn-show-adding-inp-wrapper">
                    {
                        (listIsLoading || listHasErrors) ? "" :
                            props.addingInpIsShown ?
                                inpNewVal :
                                btnShowAddingInp
                    }
                </div>
            </div>
        </div>
    )
}

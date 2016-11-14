import React, {Component} from "react";
import { Alert } from 'react-bootstrap'

import CtrlDcBoxResTbl from "../CtrlDcBoxResTbl"
import LoadingBlock from "../LoadingBlock"
import CtrlDcBoxResListSettingsMenu from "../CtrlDcBoxResListSettingsMenu"
import replaceApostrophe from "../../utils/replaceApostrophe"

import "./styles.less";

export default function CtrlDcBoxRes(props) {
    let listIsEmpty = !(props.listDataItems && props.listDataItems.length),
        listIsLoading = props.isFetchingItems,
        listHasErrors = props.fetchingErrors  && props.fetchingErrors.length,
        mainHeader = document.getElementsByClassName("main-header"),
        mainHeaderH = mainHeader.length && mainHeader[0].clientHeight || 73,
        mainFooter = document.getElementsByClassName("main-footer"),
        mainFooterH = mainFooter.length && mainFooter[0].clientHeight || 82,
        ctrlDcBoxMenu = document.getElementsByClassName("ctrl-dc-box-menu"),
        marginTop = 20,
        marginBottom = 20,
        calcContainerH = window.innerHeight - marginTop - marginBottom - mainHeaderH - mainFooterH,
        ctrlDcBoxMenuH = ctrlDcBoxMenu.length && ctrlDcBoxMenu[0].clientHeight || 1,
        //розраховуємо висоту блока з інформацією про список(доводиться робити через JS, бо через CSS не виходить)
        resBoxMaxHeight = Math.max(...[calcContainerH, ctrlDcBoxMenuH, 200]),
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
                        { props.fetchingErrors.map((errMsg, i) => <p key={i}>{errMsg}</p>) }
                    </p>
                </Alert>
            ),
        // addingNewValMsgSuccess = props.addingSuccess && (
        //     <Alert bsStyle="success" className="no-margin" onDismiss={props.addNewOccupDcValClearMsg}>
        //         <h4>
        //             <i className="icon fa fa-check" />
        //             Успіх!
        //         </h4>
        //         <p> Нове значення успішно додано. </p>
        //     </Alert>
        // ) || "",
        addingNewValMsgErrors = props.addingErrors && props.addingErrors.length && (
                <Alert
                    bsStyle="danger"
                    className="alert--add-new-occup-dc-val"
                    onDismiss={props.addNewOccupDcValClearMsg}
                >
                    <h4>
                        <i className="icon fa fa-warning" />
                        Помилка! :(
                    </h4>
                    <div> { props.addingErrors.map((errMsg, i) => <p key={i}>{errMsg}</p>) } </div>
                </Alert>
            ) || "",
        inpNewVal = (
            <div>
                <div className="input-group">
                <textarea
                    value={props.addingInpVal}
                    onChange={e => props.handleAddingInpValChange( replaceApostrophe(e.target.value) ) }
                    className="form-control show-for-big-text"
                    placeholder="Нове значення у списку"
                    title="Введіть тут нове значення щоб додати його до списку"
                    rows="6" />
                    <input
                        type="text"
                        value={props.addingInpVal}
                        onChange={e => props.handleAddingInpValChange( replaceApostrophe(e.target.value) ) }
                        className="form-control hide-for-big-text"
                        placeholder="Нове значення у списку"
                        title="Введіть тут нове значення щоб додати його до списку" />
                    <div className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-default btn-flat"
                            title="Додати введене значення до списку"
                            onClick={e => props.addNewOccupDcValSubmit(props.addingInpVal)}
                        >
                            <i className={`fa ${props.isSavingNewVal ? "fa-spinner" : "fa-save"}`} />
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
                { addingNewValMsgErrors }
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
        hasBigText = props.shownOccupDescrTextsList ? "has-big-text" : "";

    return (
        <div className={`box box-default ctrl-dc-box-res`}>
            {/*<div className="box-header with-border text-center">*/}
            {/*<h3 className="box-title"> Списки </h3>*/}
            {/*</div>*/}
            <div className={`box-body ${hasBigText}`} style={{maxHeight: resBoxMaxHeight + "px"}}>
                <div>
                    {
                        !listIsEmpty && !listIsLoading && !listHasErrors && (
                            <CtrlDcBoxResListSettingsMenu
                                sortDirection={props.sortDirection}
                                onTriggerSorting={props.onTriggerSorting}
                            />
                        )
                    }
                </div>
                {
                    listHasErrors ?
                        msgListHasErrors :
                        listIsLoading ?
                            <LoadingBlock caption="Іде завантаження списку..." /> :
                            listIsEmpty ?
                                msgListIsEmpty :
                                <CtrlDcBoxResTbl
                                    shownOccupDescrTextsList={props.shownOccupDescrTextsList}
                                    listDataItems={props.listDataItems}
                                    onEditListItemBtnClick={props.onEditListItemBtnClick}
                                    onDelListItemBtnClick={props.onDelListItemBtnClick}
                                    expandedItems={props.expandedItems}
                                    deletingItemId={props.deletingItemId}
                                    onToggleExpandItemClick={props.onToggleExpandItem}
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

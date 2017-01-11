import React, {Component} from "react";
import { Alert, Pagination } from 'react-bootstrap'

import CtrlDcBoxResTbl from "../CtrlDcBoxResTbl"
import LoadingBlock from "../LoadingBlock"
import CtrlDcBoxResListSettingsMenu from "../CtrlDcBoxResListSettingsMenu"
import replaceApostrophe from "../../utils/replaceApostrophe"

import "./styles.less";

export default function CtrlDcBoxRes(props) {
    let listIsEmpty = !(props.listDataItems && props.listDataItems.length),
        listIsLoading = props.isFetchingItems,
        listHasErrors = props.fetchingError,
        numOfPortions = Math.ceil(props.resultsOveralSize / props.paginationSize),
        showPagination = !(listIsLoading || listHasErrors || listIsEmpty || (numOfPortions < 2)),
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
        showMsgFilterMadeListEmpty = listIsEmpty && props.filterListInpVal,
        showMsgListIsEmpty = listIsEmpty && !props.filterListInpVal,
        MsgListIsEmpty = showMsgListIsEmpty && (
                <Alert bsStyle="warning">
                    <p>
                        Список поки що пустий :( <br/>
                        Але ви можете додати сюди нові значення.
                    </p>
                </Alert>
            ),
        MsgFilterMadeListEmpty = showMsgFilterMadeListEmpty && (
                <Alert bsStyle="warning">
                    <p>
                        Не знайдено результатів що відповідють вказаним критеріям :( <br/>
                        Спробуйте змінити фільтр. <br/>
                        <a
                            href="javascript:void(0)"
                            type="button"
                            onClick={props.resetFilterListInpVal}
                            title="Скинути фільтр по введеному рядку"
                        >
                            <i> Скинути фільтр </i>
                        </a>
                    </p>
                </Alert>
            ),
        MsgListHasErrors = listHasErrors && (
                <Alert bsStyle="danger" className="no-margin">
                    <p>
                        Сталася помлка :( <br/>
                        { props.fetchingError }
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
        AddingNewValMsgErrors = props.addingErrors && props.addingErrors.length && (
                <Alert
                    bsStyle="danger"
                    className="alert--add-new-occup-dc-val"
                    onDismiss={props.addNewOccupDcValClearMsg}
                >
                    <h4>
                        <i className="icon fa fa-warning" />
                        Помилка! :(
                    </h4>
                    <div> { props.addingErrors.map((errMsg, i) => (<p key={i}>{errMsg.toString()}</p>) ) } </div>
                </Alert>
            ) || "",
        InpNewVal = (
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
                            disabled={props.isSavingNewVal}
                            onClick={e => props.addNewOccupDcValSubmit(props.addingInpVal)}
                        >
                            <i className={`fa ${props.isSavingNewVal ? "fa-spinner fa-pulse" : "fa-save"}`} />
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
                { AddingNewValMsgErrors }
            </div>
        ),
        BtnShowAddingInp = (
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
                        !showMsgListIsEmpty && !listIsLoading && !listHasErrors && (
                            <CtrlDcBoxResListSettingsMenu
                                sortDirection={props.sortDirection}
                                onTriggerSorting={props.onTriggerSorting}
                                filterListInpVal={props.filterListInpVal}
                                filterList={props.filterList}
                                onChangeFilterListInpVal={props.onChangeFilterListInpVal}
                                resetFilterListInpVal={props.resetFilterListInpVal}
                            />
                        )
                    }
                </div>
                {
                    listHasErrors ?
                        MsgListHasErrors :
                        listIsLoading ?
                            <LoadingBlock caption="Іде завантаження списку..." /> :
                            showMsgListIsEmpty ?
                                MsgListIsEmpty :
                                showMsgFilterMadeListEmpty ?
                                    MsgFilterMadeListEmpty :
                                    <CtrlDcBoxResTbl
                                        showBtnDelValues={props.userMayDelValues}
                                        showBtnEditValues={props.userMayEditValues}
                                        showBtnToggleUsingOccupList={props.userMaySeeUsingOccupationsValues}

                                        shownOccupDescrTextsList={props.shownOccupDescrTextsList}
                                        listDataItems={props.listDataItems}
                                        onEditListItemBtnClick={props.onEditListItemBtnClick}
                                        onDelListItemBtnClick={props.onDelListItemBtnClick}
                                        expandedItems={props.expandedItems}
                                        deletingItemId={props.deletingItemId}
                                        onToggleExpandItemClick={props.onToggleExpandItem}
                                        occupNamesById={props.occupNamesById}
                                        fetchOccupNamesById={props.fetchOccupNamesById}
                                        onUsingOccupNameClick={props.onUsingOccupNameClick}
                                        onToggleUsingOccupListBtnClick={props.onToggleUsingOccupListBtnClick}
                                        shownUsingOccupRows={props.shownUsingOccupRows}
                                    />
                }
                <div className="text-center pagination-wrapper">
                    {
                        !showPagination ? null :
                            <Pagination
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                bsClass={"pagination no-margin"}
                                items={numOfPortions}
                                maxButtons={3}
                                activePage={props.activePortion}
                                onSelect={props.handlePaginationPageSelect} />
                    }
                </div>
                <div className="btn-show-adding-inp-wrapper">
                    {
                        (listIsLoading || listHasErrors || !props.userMayAddNewValues) ? null :
                            props.addingInpIsShown ?
                                InpNewVal :
                                BtnShowAddingInp
                    }
                </div>
            </div>
        </div>
    )
}

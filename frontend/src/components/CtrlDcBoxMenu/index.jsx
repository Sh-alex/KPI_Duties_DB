import React, {Component} from "react";
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import classNames from "classnames"

import "./styles.less";

const switchEventPropagation = (handler, isLoading) => {
    return function (e) {
        e.stopPropagation();
        if(!isLoading)
            handler();
    }
};

export default function CtrlDcBoxMenu(props) {
    let btnRefreshOccupGroupListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.occupGroupListIsLoading }
    ),
    btnRefreshClarificationListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.clarificationListIsLoading }
    ),
    btnRefreshKPCodesListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.KPCodesListIsLoading }
    ),
    btnRefreshETDKCodesListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.ETDKCodesListIsLoading }
    ),
    btnRefreshZKPPTRCodesListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.ZKPPTRCodesListIsLoading }
    ),
    btnRefreshDKHPCodesListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.DKHPCodesListIsLoading }
    ),
    btnRefreshResponsibilitiesTextsListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.responsibilitiesTextsListIsLoading }
    ),
    btnRefreshHaveToKnowTextsListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.haveToKnowTextsListIsLoading }
    ),
    btnRefreshQualiffRequirTextsListClassName = classNames(
        'pull-right', 'btn-reset-list',
        { 'is-loading': props.qualiffRequirTextsListIsLoading }
    );
    
    return (
        <div className="box box-default ctrl-dc-box-menu">
            <div className="box-header with-border text-center">
                <h3 className="box-title"> Списки значень у посадах </h3>
            </div>
            <div className="box-body">
                <ListGroup className="no-margin">
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "OCCUP_GROUP"}
                        onClick={e => props.setActiveListName("OCCUP_GROUP")}
                    >
                        Посадовий склад
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshOccupGroupListClassName}
                            onClick={switchEventPropagation(props.fetchOccupGroupList, props.occupGroupListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CLARIFICATION"}
                        onClick={e => props.setActiveListName("CLARIFICATION")}
                    >
                        Уточнення
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshClarificationListClassName}
                            onClick={switchEventPropagation(props.fetchClarificationList, props.clarificationListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_KP"}
                        onClick={e => props.setActiveListName("CODE_KP")}
                    >
                        Код КП
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshKPCodesListClassName}
                            onClick={switchEventPropagation(props.fetchKPCodesList, props.KPCodesListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_ETDK"}
                        onClick={e => props.setActiveListName("CODE_ETDK")}
                    >
                        Код ЄТДК
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshETDKCodesListClassName}
                            onClick={switchEventPropagation(props.fetchETDKCodesList, props.ETDKCodesListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_ZKPPTR"}
                        onClick={e => props.setActiveListName("CODE_ZKPPTR")}
                    >
                        Код ЗКППТР
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshZKPPTRCodesListClassName}
                            onClick={switchEventPropagation(props.fetchZKPPTRCodesList, props.ZKPPTRCodesListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_DKHP"}
                        onClick={e => props.setActiveListName("CODE_DKHP")}
                    >
                        Код ДКХП
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshDKHPCodesListClassName}
                            onClick={switchEventPropagation(props.fetchDKHPCodesList, props.DKHPCodesListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "RESPONSIBILITIES"}
                        onClick={e => props.setActiveListName("RESPONSIBILITIES")}
                    >
                        Завдання, обов'язки та повноваження
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshResponsibilitiesTextsListClassName}
                            onClick={switchEventPropagation(props.fetchResponsibilitiesTextsList, props.responsibilitiesTextsListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "HAVE_TO_KNOW"}
                        onClick={e => props.setActiveListName("HAVE_TO_KNOW")}
                    >
                        Повинен знати
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshHaveToKnowTextsListClassName}
                            onClick={switchEventPropagation(props.fetchHaveToKnowTextsList, props.haveToKnowTextsListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "QUALIFF_REQUIR"}
                        onClick={e => props.setActiveListName("QUALIFF_REQUIR")}
                    >
                        Кваліфікаційні вимоги
                        <a
                            href="javascript:void(0)"
                            role="button"
                            title="Оновити список"
                            className={btnRefreshQualiffRequirTextsListClassName}
                            onClick={switchEventPropagation(props.fetchQualiffRequirTextsList, props.qualiffRequirTextsListIsLoading)}
                        >
                            <i className="fa fa-refresh"/>
                        </a>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    )
}
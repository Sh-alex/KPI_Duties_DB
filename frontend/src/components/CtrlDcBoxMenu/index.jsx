import React, {Component} from "react";
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import "./styles.less";

export default function CtrlDcBoxMenu(props) {
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
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CLARIFICATION"}
                        onClick={e => props.setActiveListName("CLARIFICATION")}
                    >
                        Уточнення
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_KP"}
                        onClick={e => props.setActiveListName("CODE_KP")}
                    >
                        Код КП
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_ETDK"}
                        onClick={e => props.setActiveListName("CODE_ETDK")}
                    >
                        Код ЄТДК
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_ZKPPTR"}
                        onClick={e => props.setActiveListName("CODE_ZKPPTR")}
                    >
                        Код ЗКППТР
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "CODE_DKHP"}
                        onClick={e => props.setActiveListName("CODE_DKHP")}
                    >
                        Код ДКХП
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "RESPONSIBILITIES"}
                        onClick={e => props.setActiveListName("RESPONSIBILITIES")}
                    >
                        Завдання, обов'язки та повноваження
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "HAVE_TO_KNOW"}
                        onClick={e => props.setActiveListName("HAVE_TO_KNOW")}
                    >
                        Повинен знати
                    </ListGroupItem>
                    <ListGroupItem
                        href="javascript:void(0)"
                        active={props.activeListName == "QUALIFF_REQUIR"}
                        onClick={e => props.setActiveListName("QUALIFF_REQUIR")}
                    >
                        Кваліфікаційні вимоги
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    )
}
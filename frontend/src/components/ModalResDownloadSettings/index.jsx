import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Alert } from 'react-bootstrap'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import {
    hideModalResDownloadSettings,
    dismissDownloadSearchOccupResAlert,
    downloadSearchOccupRes
} from '../../actions/searchOccupBox'

import './styles.less'

const DragHookBtn = SortableHandle(() => <div className="drag-hook-btn">::</div>); // This can be any component you want

const SortableItem = SortableElement( props => {
    return (
        <li className="list-res-download-settings-item">
            <span className="order-num" title="Порядковий номер стовпця у результуючій таблиці">
                { props.item.show ? props.orderNum : "-" }
            </span>
            <span className="checkbox">
                <label title="Переключити наявність поля у результуючій таблиці">
                    <input
                        type="checkbox"
                        checked={props.item.show}
                        onChange={ e => props.onTriggerFieldShow(props.item.fieldId, e.currentTarget.checked) } />
                    { props.item.fieldTitle }
                </label>
            </span>
            <DragHookBtn />
        </li>
    )
});

const SortableList = SortableContainer( props => {
    let orderNumOffset = 0; //номер який показуємо у таблиці менший на кількість вимкнених елементів
    return (
        <ul className="list-res-download-settings list-unstyled">
            {
                props.items.map((item, i) => {
                    if(!item.show)
                        ++orderNumOffset;
                    return (
                        <SortableItem
                            key={`item-${i}`}
                            index={i}
                            orderNum={1 + i - orderNumOffset}
                            onTriggerFieldShow={props.onTriggerFieldShow}
                            item={item} />
                    );
                })
            }
        </ul>
    );
});

class ModalResDownloadSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    fieldId: "occupationName",
                    fieldTitle: "Назва посади",
                    show: true
                },
                {
                    fieldId: "occupationNameMin",
                    fieldTitle: "Скорочена назва посади",
                    show: true
                },
                {
                    fieldId: "occupationGroup",
                    fieldTitle: "Посадовий склад",
                    show: true
                },
                {
                    fieldId: "qualiffRequirText",
                    fieldTitle: "Кваліфікаційні вимоги: текст",
                    show: true
                },
                {
                    fieldId: "qualiffRequirStartDate",
                    fieldTitle: "Кваліфікаційні вимоги: дата прийняття тексту",
                    show: true
                },
                {
                    fieldId: "qualiffRequirEndDate",
                    fieldTitle: "Кваліфікаційні вимоги: дата відміни тексту",
                    show: true
                },
                {
                    fieldId: "responsibilitiesText",
                    fieldTitle: "Завдання, обов'язки та повноваження: текст",
                    show: true
                },
                {
                    fieldId: "responsibilitiesStartDate",
                    fieldTitle: "Завдання, обов'язки та повноваження: дата прийняття тексту",
                    show: true
                },
                {
                    fieldId: "responsibilitiesEndDate",
                    fieldTitle: "Завдання, обов'язки та повноваження: дата відміни тексту",
                    show: true
                },
                {
                    fieldId: "haveToKnowText",
                    fieldTitle: "Повинен знати: текст",
                    show: true
                },
                {
                    fieldId: "haveToKnowStartDate",
                    fieldTitle: "Повинен знати: дата прийняття тексту",
                    show: true
                },
                {
                    fieldId: "haveToKnowEndDate",
                    fieldTitle: "Повинен знати: дата відміни тексту",
                    show: true
                },
                {
                    fieldId: "codeDKHP",
                    fieldTitle: "Код ДКХП",
                    show: true
                },
                {
                    fieldId: "codeETDK",
                    fieldTitle: "Код ЄТДК",
                    show: true
                },
                {
                    fieldId: "codeKP",
                    fieldTitle: "Код КП",
                    show: true
                },
                {
                    fieldId: "codeZKPPTR",
                    fieldTitle: "Код ЗКППТР",
                    show: true
                },
                {
                    fieldId: "codesStartDate",
                    fieldTitle: "Дата прийняття кодів",
                    show: true
                },
                {
                    fieldId: "codesEndDate",
                    fieldTitle: "Дата відміни кодів",
                    show: true
                },
                {
                    fieldId: "durationsStartDate",
                    fieldTitle: "Дати створення посади",
                    show: true
                },
                {
                    fieldId: "durationsStopDate",
                    fieldTitle: "Дати відміни посади",
                    show: true
                },
                {
                    fieldId: "inKpi",
                    fieldTitle: "Приналежність до КПІ",
                    show: true
                },
            ],
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let filteredFieldsList = this.state.items
            .filter(item => item.show)
            .map(item => item.fieldId);
        this.props.downloadSearchOccupRes(filteredFieldsList)
    }

    onTriggerFieldShow = (fieldId, show) => {
        this.setState({
            items: this.state.items.map(item => {
                if(item.fieldId == fieldId)
                    return { ...item, show};
                else
                    return item
            })
        });
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };

    render() {
        let selectedNoOneItem = !this.state.items.filter(item => item.show).length,
            msgError = this.props.downloadResError && (
                <div>
                    <br/>
                    <Alert bsStyle="danger" onDismiss={this.props.dismissDownloadSearchOccupResAlert} className="no-margin">
                        <h4>
                            <i className="icon fa fa-warning" />
                            Помилка! :(
                        </h4>
                        <p> { this.props.downloadResError } </p>
                    </Alert>
                </div>
            ) || "",
            msgSelectedNoOneItem = selectedNoOneItem && (
                    <div>
                        <br/>
                        <Alert bsStyle="warning" className="no-margin">
                            <h4>
                                <i className="icon fa fa-warning" />
                                Увага!
                            </h4>
                            <p> Щоб завантажити результати, необхідно обрати хоча б одне поле. </p>
                        </Alert>
                    </div>
                ) || "";

        return (
            <Modal show={this.props.showModal} onHide={this.props.onHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                        Налаштувати завантаження результатів пошуку у Excel файл
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" onSubmit={this.handleFormSubmit} className="form-horizontal" id="form-res-download-settings">
                        <p className="text-center">
                            <b> Оберіть поля посад які треба експорувати у файл: </b>
                        </p>
                        <div className="form-inner">
                            <SortableList
                                helperClass="list-res-download-settings-helper-item"
                                lockAxis="y"
                                items={this.state.items}
                                onSortEnd={this.onSortEnd}
                                onTriggerFieldShow={this.onTriggerFieldShow}
                                useDragHandle={true}
                            />
                        </div>
                    </form>
                    { msgError }
                    { msgSelectedNoOneItem }
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default pull-left" onClick={this.props.onHideModal}>
                        Відміна
                    </button>
                    <button
                        type="submit"
                        form="form-res-download-settings"
                        className="btn btn-primary"
                        disabled={this.props.isLoading || selectedNoOneItem}
                    >
                        <span className="btn-label"> Завантажити </span>
                        { this.props.isLoading && ( <i className="fa fa-spinner fa-pulse" /> ) }
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        downloadResError: state.searchOccupBox.downloadResError,
        isLoading: state.searchOccupBox.isDownloadingResError,
        showModal: state.searchOccupBox.showModalResDownloadSettings
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onHideModal() {
            dispatch(hideModalResDownloadSettings());
        },
        dismissDownloadSearchOccupResAlert() {
            dispatch(dismissDownloadSearchOccupResAlert())
        },
        downloadSearchOccupRes(data) {
            dispatch(downloadSearchOccupRes(data))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalResDownloadSettings);

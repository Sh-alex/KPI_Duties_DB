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

        this.getInitState = this.getInitState.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onTriggerFieldShow = this.onTriggerFieldShow.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);

        this.state = this.getInitState();
    }

    getInitState(){
        return {
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
    };

    resetForm() {
        this.setState(this.getInitState());
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let filteredFieldsList = this.state.items
            .filter(item => item.show)
            .map(item => item.fieldId);
        this.props.downloadSearchOccupRes(filteredFieldsList)
    }

    onTriggerFieldShow(fieldId, show) {
        this.setState({
            items: this.state.items.map(item => {
                if(item.fieldId == fieldId)
                    return { ...item, show};
                else
                    return item
            })
        });
    }

    onSortEnd({oldIndex, newIndex}) {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    }

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
            <Modal show={this.props.showModal} className="modal-res-download-settings" onHide={this.props.onHideModal}>
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
                    <div className="bottom-btns-part">
                        <div className="text-left">
                            <button type="button" className="btn btn-default" onClick={this.props.onHideModal}>
                                Відміна
                            </button>
                            <button type="button" className="btn btn-default" onClick={this.resetForm}>
                                Повернути початковий стан {" "}
                                <i className="fa fa-undo"/>
                            </button>
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                form="form-res-download-settings"
                                className="btn btn-primary"
                                disabled={this.props.isLoading || selectedNoOneItem}
                            >
                                <span className="btn-label"> Завантажити </span>
                                <span className="btn-icon">
                                    <img className="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC3klEQVRoQ+2ZP2zTUBDG71whdSBS2IChZIJKIHwtLEw4Y4AiwgBq2QC10AlRiQERETVMSI2YClQCJgrqQCMa1DFsDPQPzQQssFAYK5WBIe1D52Lz6jwHO4niV+S3JHGe7e9399096xlhhw/c4fohBog6g3EG/tsM9OYptWsTTNw0SICwEIGqheU97QZui4UO3ybqQjCFYRAIQYhoqYRWC0ttuZ987dAXPHKHLAPAFGgQCkGASEGj2lEAylNyYwNNFGgJAEIUBICpoGIjz8DRXL9oRazq3J7+nqYuKQA+vMmW+lQn+1pIJwAWXs6WlFpjgDCeaNZCcQbCRLnR3JXxRffvgVLW/j53btb3FGeONhmIFODSiSG4lRlzo5WbzcPr5Tn3d6J7N8zfLEOiO2Efuz8/Ac/fTW+LbqQArIQF7k/us0V9W1uFU8UBVyDDMSSPTz8+w4XJwTprRF7Ex1PH4MnlKVfYlafDsPB10YZiOGc4x70EkQOwoAdDE5Du3XpWe/9lAa4+G4FCNg9n+7aywbZie6lG5BZiUd5os1gG4LH+6ydkiqftT20BWNj19AhcSw//Eb3esHBlEC0ywIK448yMvnQLulHhygBa1IADILdMVVdSWUgbALllrq59dzPxqDIFDyuPlf7ng1pYSG6lXKy5V3ftzuSMTPEMMJS2RSwvZk7EeW1gMLm1agmwvfv8bZneBe7G9BhUPr6tY4i0Bg7tPQgzoy9cUV6/y4sZP2ZcnBysWw8iBZBtwh5nr8vDu8Dxgxw/0Gm5Dvi2mX/8oUUXala8Nm20FYBIa6AV4c65MYAiivG+UBhrNW0hASvl8yXlJrJvBnhzt1YDMsCwBApCAbwTfSCMYO/cju5O+wm1t9fRIGFvrQMhoBkUSgsAlVh+wWF0AaEwyM4W4EnVPG0BVGLtV0w1zpANZaFAqt5bSgbNVtB5od/QBL1wp+bFAJ2KtN994gzEGWgxAr8Byt6WQDtv/5IAAAAASUVORK5CYII=" height="17" />
                                </span>
                                { this.props.isLoading && ( <i className="fa fa-spinner fa-pulse" /> ) }
                            </button>
                        </div>
                    </div>
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

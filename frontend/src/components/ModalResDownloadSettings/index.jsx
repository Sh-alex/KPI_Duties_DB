import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Alert } from 'react-bootstrap'

import {
    hideModalResDownloadSettings,
    dismissDownloadSearchOccupResAlert,
    downloadSearchOccupRes
} from '../../actions/searchOccupBox'

import './styles.less'

class ModalResDownloadSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            occupationName: true,
            occupationNameMin: true,
            occupationGroup: true,
            qualiffRequirText: true,
            // qualiffRequirStartDate: true,
            // qualiffRequirEndDate: true,
            responsibilitiesText: true,
            // responsibilitiesStartDate: true,
            // responsibilitiesEndDate: true,
            haveToKnowText: true,
            // haveToKnowStartDate: true,
            // haveToKnowEndDate: true,
            codeDKHP: true,
            codeETDK: true,
            codeKP: true,
            codeZKPPTR: true,
            durationsStartDate: true,
            durationsStopDate: true,
            inKpi: true
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.props.downloadSearchOccupRes(this.state)
    }

    render() {
        let msgAlert = this.props.downloadResError && (
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
                        <b>
                            Оберіть поля посад які треба експорувати у файл:
                        </b>
                        <div className="form-inner">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.occupationName}
                                        onChange={ e => this.setState({ occupationName: e.currentTarget.checked }) } />
                                    Назва посади
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.occupationNameMin}
                                        onChange={ e => this.setState({ occupationNameMin: e.currentTarget.checked }) } />
                                    Скорочена назва посади
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.occupationGroup}
                                        onChange={ e => this.setState({ occupationGroup: e.currentTarget.checked }) } />
                                    Посадовий склад
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.qualiffRequirText}
                                        onChange={ e => this.setState({ qualiffRequirText: e.currentTarget.checked }) } />
                                    Кваліфікаційні вимоги
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.responsibilitiesText}
                                        onChange={ e => this.setState({ responsibilitiesText: e.currentTarget.checked }) } />
                                    Завдання, обов'язки та повноваження
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.haveToKnowText}
                                        onChange={ e => this.setState({ haveToKnowText: e.currentTarget.checked }) } />
                                    Повинен знати
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.codeDKHP}
                                        onChange={ e => this.setState({ codeDKHP: e.currentTarget.checked }) } />
                                    Код ДКХП
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.codeKP}
                                        onChange={ e => this.setState({ codeKP: e.currentTarget.checked }) } />
                                    Код КП
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.codeZKPPTR}
                                        onChange={ e => this.setState({ codeZKPPTR: e.currentTarget.checked }) } />
                                    ПКод ЗКППТР
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.codeETDK}
                                        onChange={ e => this.setState({ codeETDK: e.currentTarget.checked }) } />
                                    Код ЄТДК
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.durationsStartDate}
                                        onChange={ e => this.setState({ durationsStartDate: e.currentTarget.checked }) } />
                                    Дити створення посади
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.durationsStopDate}
                                        onChange={ e => this.setState({ durationsStopDate: e.currentTarget.checked }) } />
                                    Дати відміни посади
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.inKpi}
                                        onChange={ e => this.setState({ inKpi: e.currentTarget.checked }) } />
                                    Приналежність до КПІ
                                </label>
                            </div>
                        </div>
                    </form>
                    { msgAlert }
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default pull-left" onClick={this.props.onHideModal}>
                        Відміна
                    </button>
                    <button
                        type="submit"
                        form="form-res-download-settings"
                        className="btn btn-primary"
                        disabled={this.props.isLoading}
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

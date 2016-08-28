import React, {Component} from "react";
import {DropdownList} from "react-widgets";
import "./styles.less";

export default class extends Component {
    render() {
        let {
                nameFields,
                occupationGroupList,
                clarifiedOccupationList,
                clarificationList
            } = this.props;

        return <div>
            <h4> Назва посади </h4>
            <div className="form-group">
                <label htmlFor="inp-occupation-group" className="col-sm-2 control-label"> Посадовий склад </label>
                <div className="col-sm-10">
                    <DropdownList
                        {...nameFields.occupationGroup}
                        id="inp-occupation-group"
                        placeholder="Оберіть варіант зі списку"
                        data={occupationGroupList.items}
                        valueField='id'
                        textField='textValue'
                        defaultValue={null}
                        onChange={ this.props.handleOccupationGroupInpChange }
                        busy={occupationGroupList.isFetching}
                        caseSensitive={false}
                        filter='contains' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="select-clarified-occup" className="col-sm-2 control-label">
                    Уточнювана посада
                </label>
                <div className="col-sm-4">
                    <DropdownList
                        {...nameFields.clarifiedOccup}
                        id="select-clarified-occup"
                        placeholder="Оберіть варіант зі списку"
                        data={clarifiedOccupationList.items}
                        valueField='id'
                        textField='textValue'
                        defaultValue={null}
                        onChange={ this.props.handleClarifiedOccupInpChange }
                        caseSensitive={false}
                        busy={clarifiedOccupationList.isFetching}
                        filter='contains' />
                </div>
                {/*
                 disabled={true}
                 title="Оберіть спочатку Посадовий склад"
                 */
                }
                <label htmlFor="select-clarification" className="col-sm-2 control-label">
                    Уточнення
                </label>
                <div className="col-sm-4">
                    <div className="input-group">
                        <DropdownList
                            {...nameFields.clarification}
                            id="select-clarification"
                            placeholder="Оберіть варіант зі списку"
                            data={clarificationList.items}
                            valueField='id'
                            textField='textValue'
                            defaultValue={null}
                            onChange={ this.props.handleClarificationInpChange }
                            caseSensitive={false}
                            busy={clarificationList.isFetching}
                            filter='contains'/>
                        <div className="input-group-btn">
                            <button
                                type="button"
                                title="Додати нове ключове слово для уточнення"
                                className="btn btn-default btn-flat"
                                onClick={this.props.openModalAddNewOccupKeyWord} >
                                +1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inp-occupation-name" className="col-sm-2 control-label"> Повна назва посади </label>
                <div className="col-sm-10">
                    <input
                        {...nameFields.occupationName}
                        type="text"
                        className="form-control"
                        id="inp-occupation-name"
                        placeholder="Повна назва посади" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inp-occupation-name-min" className="col-sm-2 control-label">
                    Скорочена назва посади
                </label>
                <div className="col-sm-10">
                    <input
                        {...nameFields.occupationNameMin}
                        type="text"
                        className="form-control"
                        id="inp-occupation-name-min"
                        placeholder="Скорочена назва посади" />
                </div>
            </div>
            <hr />
        </div>
    }
}

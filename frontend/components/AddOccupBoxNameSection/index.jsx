import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'

import './styles.less'

export default class extends Component {
  render() {
    let occupationGroupItems = ["Керівники", "Професіонали", "Фахівці", "Технічні службовці", "Найпростіші професії"],
        clarifiedOccupationItems = ["-(Відсутня)-", "Інженер", "Інженер молодший", "Інженер старший 1 категорії", "Директор", "Посол", "Фрезерувальник"],
        clarificationItems = ["Патімейкер", "Молодший", "Замістник", "Старший", "1 категорії", "3 розряду"];

    return <div>
      <h4> Назва посади </h4>
      <div className="form-group">
        <label htmlFor="inp-occupation-group" className="col-sm-2 control-label"> Посадовий склад </label>
        <div className="col-sm-10">
          <DropdownList
              id="inp-occupation-group"
              placeholder="Оберіть варіант зі списку"
              data={occupationGroupItems}
              caseSensitive={false}
              filter='contains'/>
          {/* value={this.state.occupationGroupSelectedItem} */}
          {/* onChange={value => this.setState({ value })} */}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="select-clarified-occup" className="col-sm-2 control-label">
          Уточнювана посада
        </label>
        <div className="col-sm-4">
          <DropdownList
              id="select-clarified-occup"
              placeholder="Оберіть варіант зі списку"
              data={clarifiedOccupationItems}
              caseSensitive={false}
              filter='contains'/>
        </div>
        <label htmlFor="select-clarification" className="col-sm-2 control-label">
          Уточнення
        </label>
        <div className="col-sm-4">
          <div className="input-group">
            <DropdownList
                id="select-clarification"
                placeholder="Оберіть варіант зі списку"
                data={clarificationItems}
                caseSensitive={false}
                filter='contains'/>
            <div className="input-group-btn">
              <button type="button" title="Додати нове ключове слово для уточнення" className="btn btn-default btn-flat" data-toggle="modal" data-target=".modal-add-new-occup-key-word">
                +1
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inp-occupation-name" className="col-sm-2 control-label"> Повна назва посади </label>
        <div className="col-sm-10">
          <input type="text" className="form-control disabled" id="inp-occupation-name" placeholder="Повна назва посади" value="Старший інженер 1 категорії" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inp-occupation-name-min" className="col-sm-2 control-label">
          Скорочена назва посади
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inp-occupation-name-min" placeholder="Скорочена назва посади" value="Ст. інж. 1 кат." />
        </div>
      </div>
      <hr />
    </div>
  }
}

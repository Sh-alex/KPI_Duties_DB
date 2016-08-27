import React, {Component} from "react";
import "./styles.less";

export default class AddOccupBox extends Component {
  render() {
    return <div className="box box-default">
          <div className="box-header with-border text-center">
            <h3 className="box-title">
              Результати пошуку
            </h3>
            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool btn--collapse-box">
                <i className="fa fa-minus" />
              </button>
            </div>
          </div>
          <div className="box-body">
            <div className="table-responsive">
              Тут Таблиця
            </div>
          </div>
      <div className="box-footer clearfix">
        <div className="col-sm-6">
          <label>
            Показувати по
            <select name="portions-size" className="input-sm">
              <option value="10">  10  </option>
              <option value="25">  25  </option>
              <option value="50">  50  </option>
              <option value="100"> 100 </option>
            </select>
            записів
          </label>
        </div>
        <div className="col-sm-6 text-right">
          <ul className="pagination no-margin">
            <li className="disabled"><a href="#">«</a></li>
            <li className="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
      </div>
    </div>
  }
}

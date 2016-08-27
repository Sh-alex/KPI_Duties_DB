import React, {Component} from "react";
import "./styles.less";

export default class SearchFormBox extends Component {
  render() {
    return <div className="box box-default box--search-form search-min">
      <div className="box-header with-border text-center">
        <h3 className="box-title search-form-title--min">
          Пошук посад
        </h3>
        <h3 className="box-title search-form-title--extended">
          Розширений пошук посад
        </h3>
        <div className="box-tools pull-right">
          <button type="button" className="btn btn-box-tool btn--collapse-box">
            <i className="fa fa-minus"></i>
          </button>
        </div>
      </div>
      <div className="box-body">
        <form id="search-form" className="form-horizontal search-form" role="form">
          <div className="form-inner">
            <div className="form-group">
              <div className="col-xs-12 text-right">
                <button className="btn btn-primary btn-sm" type="button">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  Переглянути усі доступні посади
                </button>
              </div>
            </div>
            Тут Поля форми
          </div>
        </form>
      </div>
      <div className="box-footer">
        <a role="button" id="btn-toggle-extended-search" className="btn btn-default btn-toggle-extended-search">
          Розширений пошук
          <i className="fa fa-chevron-down btn-toggle-icon--min" aria-hidden="true"></i>
          <i className="fa fa-chevron-up btn-toggle-icon--extended" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  }
}

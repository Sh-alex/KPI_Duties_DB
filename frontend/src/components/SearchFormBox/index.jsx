import React, {Component} from "react";
import "./styles.less";

export default class SearchFormBox extends Component {
    render() {
        return <div className="box box-default box--search-form">
            <div className="box-header with-border text-center">
                <h3 className="box-title">
                    Пошук посад
                </h3>
                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool btn--collapse-box">
                        <i className="fa fa-minus" />
                    </button>
                </div>
            </div>
            <div className="box-body">
                <form id="search-form" className="form-horizontal search-form" role="form">
                    <div className="form-inner">
                        <div className="form-group">

                        </div>
                        Тут Поля форми
                    </div>
                </form>
            </div>
        </div>
    }
}

import React, {Component} from "react";
import "./styles.less";

import BoxExpandBtn from "../BoxExpandBtn"

export default class SearchOccupBoxResults extends Component {
    render() {
        return (
            <div className={`box box-default ${this.props.expanded ? "" : "collapsed-box"}`}>
                <div className="box-header with-border text-center">
                    <h3 className="box-title">
                        Результати пошуку
                    </h3>
                    <div className="box-tools pull-right">
                        <BoxExpandBtn
                            toggleExpand={this.props.toggleExpand}
                            expanded={this.props.expanded}
                        />
                    </div>
                </div>
                <div className="box-body">
                    <div className="table-responsive">
                        Результати пошку: <br/> {JSON.stringify(this.props.searchResData, null, 2)}
                    </div>
                </div>
                <div className="box-footer clearfix">
                    <div className="col-sm-6">
                        <label>
                            Показувати по {" "}
                            <select name="portions-size" className="input-sm">
                                <option value="10">  10  </option>
                                <option value="25">  25  </option>
                                <option value="50">  50  </option>
                                <option value="100"> 100 </option>
                            </select>  {" "}
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
        );
    }
}

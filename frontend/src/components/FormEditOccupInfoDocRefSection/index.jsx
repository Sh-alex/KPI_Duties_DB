import React, {Component} from "react";
import classNames from "classnames"

import "./styles.less";

export default class FormEditOccupInfoDocRefSection extends Component {
    render() {
        let docNameFormGroupClass = classNames({
                'form-group': true,
                'has-error':  this.props.fields.docName.touched && this.props.fields.docName.error,
                'has-success': this.props.fields.docName.touched && !this.props.fields.docName.error
            }),
            docLinkFormGroupClass = classNames({
                'form-group': true,
                'has-error':  this.props.fields.docLink.touched && this.props.fields.docLink.error,
                'has-success': this.props.fields.docLink.touched && !this.props.fields.docLink.error
            });

        return (
            <div>
                <h4> {this.props.headline || "Посилання на правові документи"} </h4>
                <div className="row">
                    <div className="col-sm-6">
                        <div className={docNameFormGroupClass}>
                            <label htmlFor="inp-docName" className="col-sm-4 control-label">
                                Назва документа
                            </label>
                            <div className="col-sm-8">
                                <input
                                    {...this.props.fields.docName}
                                    id="inp-docName"
                                    className="form-control"
                                    placeholder="Введіть тут назву документа"
                                    type="text" />
                                <span className="help-block">
                                    { this.props.fields.docName.touched && this.props.fields.docName.error }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className={docLinkFormGroupClass}>
                            <label htmlFor="inp-clarified-occup" className="col-sm-4 control-label">
                                Посилання на документ
                            </label>
                            <div className="col-sm-8">
                                <input
                                    {...this.props.fields.docLink}
                                    id="inp-clarified-occup"
                                    className="form-control"
                                    placeholder="Введіть тут посилання на документ"
                                    type="text" />
                                    {/*type="url"*/}
                                <span className="help-block">
                                    { this.props.fields.docLink.touched && this.props.fields.docLink.error }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}

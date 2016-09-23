import React, {Component} from "react";
import "./styles.less";

export default function FormEditOccupInfoFeaturesSection(props) {
    function handleChange(e, props) {
        props.featuresFields.isVirtual.onChange(e);
        props.changeAddFormInpIsVirtual(e.target.checked);
    }

    return <div>
        <h4> Особливості </h4>
        <div className="form-group">
            <div className="col-sm-6">
                <div className="checkbox">
                    <label>
                        <input type="checkbox" {...props.featuresFields.isIndependent} />
                        Є самостійною посадою
                    </label>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="checkbox">
                    <label>
                        <input
                            {...props.featuresFields.isVirtual}
                            type="checkbox"
                            onChange={e => handleChange(e, props)}
                        />
                        Є "віртуальною посадою"
                    </label>
                </div>
            </div>
        </div>
        <hr />
    </div>
}

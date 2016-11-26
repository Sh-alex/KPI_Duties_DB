import React, {Component} from "react";

export default function BtnExpandBox (props) {
    return (
        <button type="button"
                onClick={props.toggleExpand}
                className="btn btn-box-tool btn--collapse-box">
            {
                props.expanded && <i className="fa fa-minus" /> ||
                !props.expanded && <i className="fa fa-chevron-down" />
            }
        </button>
    );
}
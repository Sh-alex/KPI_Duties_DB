import React, { Component } from 'react'
import './styles.less'

export default function LoadingBlock(props) {
    return (
        <div className="text-center loading-block">
            <div className="img-responsive loading-block__spinner-wrapper">
                <i className="fa fa-spinner fa-pulse" />
            </div>
            <p className="loading-block__caption">
                {props.caption || "Іде завантаження..."}
            </p>
        </div>
    )
}
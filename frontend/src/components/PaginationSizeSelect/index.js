import React, { Component } from 'react'
import { Link } from 'react-router'

import './styles.less'

export default function PaginationSizeSelect(props) {
    return (
        <label>
            Показувати по {" "}
            <select
                value={props.selectedSize}
                onChange={props.onSizeSelect}
                className="input-sm"
            >
                {
                    props.sizesArr.map((size, i) => {
                        return <option value={size} key={i}> { size } </option>
                    })
                }
            </select>
            {" "} записів
        </label>
    );
}

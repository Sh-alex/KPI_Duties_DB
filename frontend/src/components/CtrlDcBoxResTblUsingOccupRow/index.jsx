import React, {Component} from "react";
import "./styles.less";

function bindUsingOccupClickHandler(itemId, props) {
    return () => {
        return props.onUsingOccupNameClick(itemId)
    }
}

export default function CtrlDcBoxResTblUsingOccupRow(props) {
    let isUsedByOccup = props.usingOccupationsArr && props.usingOccupationsArr.length;

    if(isUsedByOccup && props.show) {
        let innerBlock;
        if(props.occupNamesById.isFetching)
            innerBlock = (
                <div>
                    <div className="text-center">
                        <i className="fa fa-spinner fa-pulse fa-lg" />
                    </div>
                    <div> Іде завантаження назв посад... </div>
                </div>
            );
        else if(props.occupNamesById.fetchingError)
            innerBlock = (
                <Alert bsStyle="danger" className="no-margin">
                    <p>
                        Сталася помлка :( <br/>
                        { props.occupNamesById.fetchingError }
                    </p>
                </Alert>
            );
        else {
            let usingOccupationsList = props.usingOccupationsArr.map((occupId, i) => {
                let occupName = props.occupNamesById.items[occupId];
                if(!occupName)
                    occupName = (
                        <span title="Не вдалося визначити назву посади по її ідентифікатору" className="text-danger">
                            id{occupId} <i className="fa fa-warning"/>
                        </span>
                    );
                return (
                    <a
                        title="Натисніть щоб відредагувати посаду"
                        href="javascript:void(0)"
                        key={occupId}
                        onClick={bindUsingOccupClickHandler(occupId, props)}
                    >
                        {occupName}
                        {", "}
                    </a>
                );
            });

            innerBlock = (
                <div>
                    <div>
                        <i> Посади що використовують це значення: </i>
                    </div>
                    <div className="list-of-using-occup">
                        { usingOccupationsList }
                    </div>
                </div>
            )
        }

        return (
            <tr className="row--details">
                <td className="" colSpan="10">
                    { innerBlock }
                </td>
            </tr>
        )
    } else
        return null;
}

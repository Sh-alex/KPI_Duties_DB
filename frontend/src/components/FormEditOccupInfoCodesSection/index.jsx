import React, {Component} from "react";
import FormEditOccupInfoCodesPortion from "../FormEditOccupInfoCodesPortion";
import debounce from "../../utils/debounce"
import "./styles.less";

import { ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES } from '../../constants/addingInfoFromAnotherOccup';

export default class FormEditOccupInfoCodesSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            KPCodeFilterStr: "",
            DKHPCodeFilterStr: "",
            ZKPPTRCodeFilterStr: "",
            ETDKCodeFilterStr: "",
        };

        this.onKPCodeFilterStrChange = this.onKPCodeFilterStrChange.bind(this);
        this.onDKHPCodeFilterStrChange = this.onDKHPCodeFilterStrChange.bind(this);
        this.onZKPPTRCodeFilterStrChange = this.onZKPPTRCodeFilterStrChange.bind(this);
        this.onETDKCodeFilterStrChange = this.onETDKCodeFilterStrChange.bind(this);
        this.handleKPCodeFilterListSubmit = debounce(this.handleKPCodeFilterListSubmit.bind(this), 400);
        this.handleDKHPCodeFilterListSubmit = debounce(this.handleDKHPCodeFilterListSubmit.bind(this), 400);
        this.handleZKPPTRCodeFilterListSubmit = debounce(this.handleZKPPTRCodeFilterListSubmit.bind(this), 400);
        this.handleETDKCodeFilterListSubmit = debounce(this.handleETDKCodeFilterListSubmit.bind(this), 400);
    }

    onKPCodeFilterStrChange(newVal) {
        if(newVal == this.state.KPCodeFilterStr)
            return;
        this.setState({KPCodeFilterStr: newVal});
        this.handleKPCodeFilterListSubmit(newVal);
    }

    onDKHPCodeFilterStrChange(newVal) {
        if(newVal == this.state.DKHPCodeFilterStr)
            return;
        this.setState({DKHPCodeFilterStr: newVal});
        this.handleDKHPCodeFilterListSubmit(newVal);
    }

    onZKPPTRCodeFilterStrChange(newVal) {
        if(newVal == this.state.ZKPPTRCodeFilterStr)
            return;
        this.setState({ZKPPTRCodeFilterStr: newVal});
        this.handleZKPPTRCodeFilterListSubmit(newVal);
    }

    onETDKCodeFilterStrChange(newVal) {
        if(newVal == this.state.ETDKCodeFilterStr)
            return;
        this.setState({ETDKCodeFilterStr: newVal});
        this.handleETDKCodeFilterListSubmit(newVal);
    }

    handleKPCodeFilterListSubmit(filterStr = this.state.KPCodeFilterStr) {
        console.log(`handleKPCodeFilterListSubmit(newVal=${filterStr})`);

        this.props.fetchKPCodesList({ filterStr });
    }

    handleDKHPCodeFilterListSubmit(filterStr = this.state.DKHPCodeFilterStr) {
        console.log(`handleDKHPCodeFilterListSubmit(newVal=${filterStr})`);

        this.props.fetchDKHPCodesList({ filterStr });
    }

    handleZKPPTRCodeFilterListSubmit(filterStr = this.state.ZKPPTRCodeFilterStr) {
        console.log(`handleZKPPTRCodeFilterListSubmit(newVal=${filterStr})`);

        this.props.fetchZKPPTRCodesList({ filterStr });
    }

    handleETDKCodeFilterListSubmit(filterStr = this.state.ETDKCodeFilterStr) {
        console.log(`handleETDKCodeFilterListSubmit(newVal=${filterStr})`);

        this.props.fetchETDKCodesList({ filterStr });
    }

    render() {
        let originalDelCodesPortionHandler = this.props.handleDelCodesPortionBtnClick,
            originalOpenModalAddNewKPCode = this.props.openModalAddNewKPCode,
            originalOpenModalAddNewDKHPCode = this.props.openModalAddNewDKHPCode,
            originalOpenModalAddNewZKPPTRCode = this.props.openModalAddNewZKPPTRCode,
            originalOpenModalAddNewETDKCode = this.props.openModalAddNewETDKCode,
            handleBtnAddInfoFromAnotherOccupClick = () => {
                this.props.handleBtnAddInfoFromAnotherOccupClick({
                    typeText: "коди",
                    typeId: ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES,
                    resPortionIndex: null
                })
            },
            BtnAddInfoFromAnotherOccup = this.props.showBtnAddInfoFromAnotherOccupations ? (
                <div className="col-xs-12 col-md-7 pull-right text-right">
                    <a href="javascript:void(0)" className="" onClick={handleBtnAddInfoFromAnotherOccupClick}>
                        <i> Заповнити коди із аналогічної посади </i>
                        <i className="fa fa-link" />
                    </a>
                </div>
            ) : null,
            PortionsMarkup = this.props.codesFields.map((codesFieldsItem, i, codesFieldsArr) => {
                //прив'язуємо обробник видалення до номера порції
                let decoratedDelHandler = (index => {
                        return () => originalDelCodesPortionHandler(index)
                    })(i),
                    decoratedOpenModalAddNewKPCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewKPCode(resPortionIndex)
                    })(i),
                    decoratedOpenModalAddNewDKHPCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewDKHPCode(resPortionIndex)
                    })(i),
                    decoratedOpenModalAddNewZKPPTRCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewZKPPTRCode(resPortionIndex)
                    })(i),
                    decoratedOpenModalAddNewETDKCode = (resPortionIndex => {
                        return () => originalOpenModalAddNewETDKCode(resPortionIndex)
                    })(i);
                return (
                    <FormEditOccupInfoCodesPortion
                        codesPortionFields={codesFieldsItem}
                        showDelBtn={ codesFieldsArr.length > 1 }
                        portionItemClassName={ i===0 ? "is-first-item" : "" }
                        key={i}
                        portionKey={i}
                        openModalAddNewKPCode={decoratedOpenModalAddNewKPCode}
                        openModalAddNewDKHPCode={decoratedOpenModalAddNewDKHPCode}
                        openModalAddNewZKPPTRCode={decoratedOpenModalAddNewZKPPTRCode}
                        openModalAddNewETDKCode={decoratedOpenModalAddNewETDKCode}
                        handleDelCodesPortionBtnClick={decoratedDelHandler}
                        onKPCodeFilterStrChange={this.onKPCodeFilterStrChange}
                        onDKHPCodeFilterStrChange={this.onDKHPCodeFilterStrChange}
                        onZKPPTRCodeFilterStrChange={this.onZKPPTRCodeFilterStrChange}
                        onETDKCodeFilterStrChange={this.onETDKCodeFilterStrChange}
                        handleKPCodeFilterListSubmit={this.handleKPCodeFilterListSubmit}
                        handleDKHPCodeFilterListSubmit={this.handleDKHPCodeFilterListSubmit}
                        handleZKPPTRCodeFilterListSubmit={this.handleZKPPTRCodeFilterListSubmit}
                        handleETDKCodeFilterListSubmit={this.handleETDKCodeFilterListSubmit}
                        KPCodeFilterStr={this.state.KPCodeFilterStr}
                        DKHPCodeFilterStr={this.state.DKHPCodeFilterStr}
                        ZKPPTRCodeFilterStr={this.state.ZKPPTRCodeFilterStr}
                        ETDKCodeFilterStr={this.state.ETDKCodeFilterStr}
                        DKHPCodesList={this.props.DKHPCodesList}
                        ETDKCodesList={this.props.ETDKCodesList}
                        ZKPPTRCodesList={this.props.ZKPPTRCodesList}
                        KPCodesList={this.props.KPCodesList} />
                )
            });

        return (
            <div>
                { BtnAddInfoFromAnotherOccup }
                <h4> Коди </h4>
                <div className="inp-portions codes-portions">
                    { PortionsMarkup }
                    <div className="inp-portions__btn-add-wrapper">
                        <hr />
                        <button
                            type="button"
                            className="btn btn-default inp-portions__btn-amount-ctrl--add"
                            onClick={this.props.handleAddCodesPortionBtnClick} >
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

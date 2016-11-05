import React, {Component} from "react";
import { connect } from 'react-redux'

import CtrlDcBoxRes from '../CtrlDcBoxRes'
import CtrlDcBoxMenu from '../CtrlDcBoxMenu'

import "./styles.less";


import {
    fetchOccupGroupList,
    fetchClarificationList,
    addNewClarification,
    addNewOccupationGroup,
    dismissModalAddNewOccupationGroupAlert,
    dismissModalAddNewClarificationAlert
} from "../../actions/occupationNameInfo"

import {
    fetchKPCodesList,
    fetchZKPPTRCodesList,
    fetchETDKCodesList,
    fetchDKHPCodesList,
    addNewKPCode,
    addNewDKHPCode,
    addNewETDKCode,
    addNewZKPPTRCode,
    clearKPCodeAddingMsg,
    clearDKHPCodeAddingMsg,
    clearETDKCodeAddingMsg,
    clearZKPPTRCodeAddingMsg
} from "../../actions/occupCodesLists"

import {
    fetchHaveToKnowTextsList,
    fetchResponsibilitiesTextsList,
    fetchQualiffRequirTextsList,
} from "../../actions/occupDescriptionTextsLists"


class CtrlDcBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingInpIsShown: false,
            activeListName: "OCCUP_GROUP" // CLARIFICATION, CODE_KP, CODE_ZKPPTR, CODE_ETDK, CODE_DKHP, RESPONSIBILITIES, HAVE_TO_KNOW, QUALIFF_REQUIR
        };

        this.showAddingInp = this.showAddingInp.bind(this);
        this.hideAddingInp = this.hideAddingInp.bind(this);
        this.setActiveListName = this.setActiveListName.bind(this);
    }

    componentDidMount() {
        this.props.fetchLists();
    }

    componentWillReceiveProps(nextProps) {
    }

    showAddingInp(e) {
        this.setState({addingInpIsShown: true})
    }

    hideAddingInp(e) {
        this.setState({addingInpIsShown: false})
    }

    setActiveListName(newVal) {
        this.setState({activeListName: newVal})
    }

    render() {
        let shownOccupDescrTextsList = false,
            activeList;
        switch(this.state.activeListName) {
            case "OCCUP_GROUP":
                activeList = this.props.occupationGroupList;    //!!! Warning!!! у reducer-і не предбачено додавання до цього списку
                break;
            case "CLARIFICATION":
                activeList = this.props.clarificationList;
                break;
            case "CODE_KP":
                activeList = this.props.KPCodesList;
                break;
            case "CODE_ZKPPTR":
                activeList = this.props.ZKPPTRCodesList;
                break;
            case "CODE_ETDK":
                activeList = this.props.ETDKCodesList;
                break;
            case "CODE_DKHP":
                activeList = this.props.DKHPCodesList;
                break;
            case "RESPONSIBILITIES":
                activeList = this.props.responsibilitiesTextsList;
                shownOccupDescrTextsList = true;
                break;
            case "HAVE_TO_KNOW":
                activeList = this.props.haveToKnowTextsList;
                shownOccupDescrTextsList = true;
                break;
            case "QUALIFF_REQUIR":
                activeList = this.props.qualiffRequirTextsList;
                shownOccupDescrTextsList = true;
                break;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <CtrlDcBoxMenu
                            activeListName={this.state.activeListName}
                            setActiveListName={this.setActiveListName}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <CtrlDcBoxRes
                            showAddingInp={this.showAddingInp}
                            hideAddingInp={this.hideAddingInp}
                            addingInpIsShown={this.state.addingInpIsShown}
                            activeList={activeList}
                            shownOccupDescrTextsList={shownOccupDescrTextsList}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.occupationNameInfo,
        ...state.occupCodesLists,
        ...state.occupDescriptionTextsLists,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLists() {
            dispatch(fetchOccupGroupList());
            dispatch(fetchClarificationList());

            dispatch(fetchKPCodesList());
            dispatch(fetchZKPPTRCodesList());
            dispatch(fetchETDKCodesList());
            dispatch(fetchDKHPCodesList());

            dispatch(fetchHaveToKnowTextsList());
            dispatch(fetchResponsibilitiesTextsList());
            dispatch(fetchQualiffRequirTextsList());
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CtrlDcBox);

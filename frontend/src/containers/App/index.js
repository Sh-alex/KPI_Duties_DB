import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/user';
import mathDocumentTitleByPathName from "../../utils/mathDocumentTitleByPathName"
import LoginBox from "../../components/LoginBox";

class App extends Component {
    componentWillMount() {
        this.props.getUserInfo();
        document.title = mathDocumentTitleByPathName(this.props.location && this.props.location.pathname);
    }

    componentWillReceiveProps (nextProps) {
        document.title = mathDocumentTitleByPathName(nextProps.location && nextProps.location.pathname);
    }

    render() {
        if(this.props.user.isGettingUserInfo || (!this.props.user.isAuthenticated) )
            return (
                <div>
                    <LoginBox />
                    {/*<div className="hidden">*/}
                        {/*{this.props.children}*/}
                    {/*</div>*/}
                </div>
            );
        else
            return (
                <div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
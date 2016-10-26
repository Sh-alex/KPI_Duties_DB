import React, { Component } from 'react'
import { connect } from 'react-redux';
import { refreshTokenAndGetUserInfo } from '../../actions/user';

class App extends Component {
    componentWillMount() {
        this.props.refreshTokenAndGetUserInfo();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        refreshTokenAndGetUserInfo: () => dispatch(refreshTokenAndGetUserInfo())
    }
}


export default connect(null, mapDispatchToProps)(App);
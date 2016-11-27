import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/user';
import mathDocumentTitleByPathName from "../../utils/mathDocumentTitleByPathName"

class App extends Component {
    componentWillMount() {
        this.props.getUserInfo();
        document.title = mathDocumentTitleByPathName(this.props.location && this.props.location.pathname);
    }

    componentWillReceiveProps (nextProps) {
        document.title = mathDocumentTitleByPathName(nextProps.location && nextProps.location.pathname);
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
        getUserInfo: () => dispatch(getUserInfo())
    }
};


export default connect(null, mapDispatchToProps)(App);
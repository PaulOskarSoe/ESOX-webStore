import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { userPropTypes } from '../reducers';
import protectedRedirect from './../components/protectedRedircet.jsx'
import { connect } from 'react-redux'
import * as selectors from './../../src/store/selectors'

class UserPage extends Component {
    render() {
        console.log(this.props, "from user")
        return (
            <div>
                <div>Email       : {this.props.user.email}</div>
                <div>Created at  : {this.props.user.createdAt}</div>
            </div>
        );
    }
}


UserPage.propTypes = {
    user    : PropTypes.shape(userPropTypes)
}

const mapStateToProps = (store) => {
    return {
        user: selectors.getUser(store)
    }
}

export default connect(mapStateToProps)(protectedRedirect(UserPage))

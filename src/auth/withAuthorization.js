import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';
import * as routes from '../components/Routes';

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends Component {
        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push(routes.SIGN_IN);
                }
            });
        }

        render() {
            return this.context.authUser ? <Component /> : null;
        }
    }

    WithAuthorization.contextTypes = {
        authUser: PropTypes.object,
    };

    return withRouter(WithAuthorization);
}

export default withAuthorization;
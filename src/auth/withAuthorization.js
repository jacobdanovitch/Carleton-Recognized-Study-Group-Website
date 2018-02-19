import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';
import * as routes from '../components/Routes';

import './SignInBody'
import SignInBody from "./SignInBody";

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';

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
            return(
                <Fabric>
                    {this.context.authUser ? <Component /> : <SignInBody/>}
                </Fabric>
        )
        }
    }

    WithAuthorization.contextTypes = {
        authUser: PropTypes.object,
    };

    return withRouter(WithAuthorization);
}

export default withAuthorization;
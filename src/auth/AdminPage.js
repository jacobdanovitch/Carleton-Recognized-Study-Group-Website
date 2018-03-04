import React from 'react';
import PropTypes from 'prop-types';
import withAuthorization from './withAuthorization'
import { db, auth } from '../firebase/index'

const AdminPage = (props, { authUser }) =>
    <div>
        <h1>Admin</h1>
        <p>Restricted area! Only users with the admin rule are authorized.</p>
        <button onClick={() => console.log(props)}>Test</button>
    </div>

AdminPage.contextTypes = {
    authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AdminPage);
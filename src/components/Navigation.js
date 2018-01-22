import React from 'react';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import SignOutButton from '../auth/SignOut';
import * as routes from './Routes';

const Navigation = ({authUser}) =>
    <div>
        {authUser ?
            <NavigationAuth/> : <NavigationNonAuth/>
        }
    </div>

Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationItem = (props) =>
    <LinkContainer exact to={props.to}>
        <NavItem>
            {props.children}
        </NavItem>
    </LinkContainer>

const NavigationAuth = () =>
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer to={routes.HOME}><a>Home</a></LinkContainer>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavigationItem to={routes.LANDING}>Landing</NavigationItem>
            <NavigationItem to={routes.ACCOUNT}>Account</NavigationItem>
        </Nav>
        <Nav pullRight>
            <NavItem>
                <SignOutButton/>
            </NavItem>
        </Nav>
    </Navbar>

const NavigationNonAuth = () =>
    <Navbar>
        <Nav>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavigationItem to={routes.SIGN_IN}>Sign In</NavigationItem>
                </Navbar.Brand>
            </Navbar.Header>
        </Nav>
    </Navbar>

export default Navigation;
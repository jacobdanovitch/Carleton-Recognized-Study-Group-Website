import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Icon from 'react-icons-kit'
import {github} from 'react-icons-kit/icomoon/github'
import {facebook2 as facebook} from 'react-icons-kit/icomoon/facebook2'

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
    <Navbar collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer to={routes.HOME}><Navbar.Text pullLeft>Home</Navbar.Text></LinkContainer>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
                <MenuItem href="https://github.com/jacobdanovitch/rsg-website">
                    <Icon size={32} icon={github}/>
                </MenuItem>
                <MenuItem href="https://www.facebook.com/groups/1571999506153827/?ref=br_rs">
                    <Icon size={32} icon={facebook}/>
                </MenuItem>
            <MenuItem>
                <SignOutButton/>
            </MenuItem>
        </Nav>
    </Navbar>

const NavigationNonAuth = () =>
    <Navbar>
        <Nav>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavigationItem to={routes.SIGN_IN}><Navbar.Text>Sign In</Navbar.Text></NavigationItem>
                </Navbar.Brand>
            </Navbar.Header>
        </Nav>
    </Navbar>

export default Navigation;
import React, {Component} from 'react';
import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import {loadTheme} from 'office-ui-fabric-react/lib/Styling';
import {Button, Form, FormControl} from 'react-bootstrap'

import {SessionTable} from './SessionTable'
import Questions from './FAQ'
import './Home.css';

import withAuthorization from '../auth/withAuthorization';
import {db} from '../firebase'
import * as firebase from "../firebase/firebase";

import * as _ from 'underscore'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUserName: '',
            activeUserID: '',
            sessions: {},
            numSessions: 0,
            code: '',
        };
    }

    updateSessions = (userID) => {
        db.getUserSessions(userID).then(snapshot =>
            this.setState(() => ({sessions: snapshot.val()}),
                function () {
                    this.setState({numSessions : _.size(this.state.sessions)})
                }
            )
        );
    };

    setActiveUser = () => {
        firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState(
                    {activeUserID: user.uid},
                    function () {
                        this.updateSessions(this.state.activeUserID)
                    })
            }
        })

    };
    componentDidMount = () => {
        this.setActiveUser();
    };

    verifyAttendance = (inputCode, userID, userSessions) => {
        db.getSessions().then((snapshot) => {
                const sessions = snapshot.val();
                const currentSession = sessions[sessions.length - 1];

                let verified = db.validateSession(currentSession, inputCode, userSessions);
                if (verified) {
                    alert('All good!');
                    db.userAttendedSession(userID, currentSession.date)
                }
            }
        )
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.verifyAttendance(this.state.code, this.state.activeUserID, this.state.sessions);
        this.updateSessions(this.state.activeUserID);
    };

    render() {
        loadTheme({
            palette: {
                'themePrimary': '#a80000'
            }
        });
        return (

                <div className="App ms-Grid">
                    <header className="App-header">
                        <h1 className="App-title ms-Grid-row">COMP1406 Recognized Study Group</h1>
                        <hr/>
                        <div className="ms-Grid-col ms-sm12 ms-u-md4 ms-lg4" style={{marginTop: "2%"}}>
                            <p>
                                Welcome to Jacob and Tim's recognized study group for COMP1406 at Carleton University.
                                We're two volunteer first year students in Mark Lanthier's course.
                                Here, you'll find information about when and where the group meets, what topics we'll be
                                covering, and more.

                                Join our facebook group to stay up to date: &nbsp;
                                <a
                                    style={{color: "White", textDecoration: "Underline"}}
                                    href="https://www.facebook.com/groups/1571999506153827/">
                                    COMP 1406 Recognized Study Group
                                </a>
                            </p>
                        </div>
                        <div className="session-table ms-Grid-col ms-sm12 ms-u-md4 ms-lg8">
                            <SessionTable/>
                        </div>
                        <div style={{display: "table", margin: "0 auto", textAlign: "center"}}>
                            <h3>Number of sessions attended: {!!this.state.sessions && this.state.numSessions || 0}</h3>
                            <Form onSubmit={this.handleSubmit}>
                                <Button type="submit">Attend a session</Button>
                                <FormControl
                                    value={this.state.code}
                                    onChange={event => this.setState({code: event.target.value})}
                                    type="text"
                                    placeholder="Session Code"
                                />
                            </Form>
                        </div>
                    </header>
                    <div>
                        <h1>FAQ</h1>
                        <hr/>
                        <Questions/>
                    </div>
                </div>

        );
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);

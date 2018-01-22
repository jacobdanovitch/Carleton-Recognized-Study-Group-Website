import React, {Component} from 'react';
import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import {loadTheme} from 'office-ui-fabric-react/lib/Styling';
import {Button, Form, FormControl} from 'react-bootstrap'
import * as _ from 'underscore'

import {SessionTable} from './SessionTable'
import Questions from './FAQ'
import './Home.css';

import withAuthorization from '../auth/withAuthorization';
import {db} from '../firebase'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUser: 'ZIaodEJJlMU1W8Ocv1GG26PKsMc2',
            users: null,
            sessions: null,
            code: '',
        };
    }

    updateSessions = () => {
        db.getUserSessions(this.state.activeUser).then(snapshot =>
            this.setState(() => ({sessions: snapshot.val()}))
        );
    };

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({users: snapshot.val()}))
        );
        this.updateSessions();
    }

    verifyAttendance = (inputCode, userID, userSessions) => {
        db.getSessions().then(function (snapshot) {
                const sessions = snapshot.val();
                const currentSession = sessions[sessions.length - 1];

                let verified = db.validateSession(currentSession, inputCode, userSessions);
                if (verified) { db.userAttendedSession(userID, currentSession.date) }
            }
        )
    };

    render() {
        const {activeUser, users, sessions, code} = this.state;

        loadTheme({
            palette: {
                'themePrimary': '#a80000'
            }
        });

        return (
            <Fabric>
                <div className="App ms-Grid">
                    <header className="App-header">
                        <h1 className="App-title ms-Grid-row">COMP1406 Recognized Study Group</h1>
                        <hr/>
                        <div>
                            <p className="ms-Grid-col ms-sm12 ms-u-md4 ms-lg4" style={{marginTop: "2%"}}>
                                Welcome to Jacob and Tim's recognized study group for COMP1406 at Carleton University.
                                We're two volunteer first year students in Mark Lanthier's course.
                                Here, you'll find information about when and where the group meets, what topics we'll be
                                covering, and more.

                                Join our facebook group to stay up to date: &nbsp;
                                <a style={{color: "White", textDecoration: "Underline"}}
                                   href="https://www.facebook.com/groups/1571999506153827/">
                                    COMP 1406 Recognized Study Group
                                </a>
                            </p>
                        </div>
                        <div className="session-table ms-Grid-col ms-sm12 ms-u-md4 ms-lg8">
                            <SessionTable/>
                        </div>
                        <div style={{display: "table", margin: "0 auto", textAlign: "center"}}>
                            <h3>Number of sessions attended: {!!sessions && _.size(sessions) || 0}</h3>
                            <Form onSubmit={(event) => {
                                event.preventDefault();
                                this.verifyAttendance(code, activeUser, sessions);
                                this.updateSessions();
                            }}>
                                <Button type="submit">Attend a session</Button>
                                <FormControl
                                    value={code}
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
            </Fabric>
        );
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);

import {db} from './firebase';

// User API

export const doCreateUser = (userID, username, email) =>
    db.ref(`users/${userID}`).set({
        username,
        email,
    });

export const onceGetUsers = () => db.ref('users').once('value');

// ATTENDANCE VERIFICATION


export const userAttendedSession = (userID, sessionAttended) => {
    db.ref('users/' + userID + '/sessions').push().set({
        sessionAttended
    })
};

export const getUserSessions = (userID) => db.ref('users/' + userID + '/sessions').once('value');

export const getSessions = () => db.ref('sessions').once('value');

export const checkCode = (currentSession, inputCode) => {
    return (currentSession.code === inputCode)
};

export const checkTime = (currentSession) => {
    const startTime = '/17:30';
    const currentStartDate = new Date(currentSession.date + startTime);

    const endTime = '/18:30';
    const currentEndDate = new Date(currentSession.date + endTime);

    //const submitDate = new Date();
    const submitDate = new Date('2018/1/21/18:00');

    return currentStartDate.getTime() < submitDate.getTime() && submitDate.getTime() < currentEndDate.getTime()
};

export const checkDuplicateSession = (currentSession, userSessions) => {
    var duplicate = null;
    for (var session in userSessions) { if(session.sessionAttended) {
            duplicate = ( session.sessionAttended === currentSession.date )
        }}
    return duplicate;
};

export const validateSession = (currentSession, code, sessions) => {
    const validCode = checkCode(currentSession, code);
    const validTime = checkTime(currentSession);
    const validSession = checkDuplicateSession(currentSession, sessions);

    let verified = (validCode && validTime && validSession);
    if (verified) { return verified }
    else {
        if (!validCode) {
            alert("Incorrect code")
        }
        else if (!validTime) {
            alert("This session is locked")
        }
        else if (!validSession) {
            alert("You have already checked in for this session")
        }
        else {
            alert('Unknown error')
        }
    }
};
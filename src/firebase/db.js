import {db} from './firebase';

// User API

export const doCreateUser = (userID, name, email, studentID) =>
    db.ref(`users/${userID}`).set({
        name,
        email,
        studentID
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
    let submitDate = new Date();
    let startTime = 12; // open at 12pm
    let endTime = 19; // end at 7pm

    let currentSessionDate = new Date(currentSession.date);

    return (submitDate.toLocaleDateString() === currentSessionDate.toLocaleDateString() &&
        submitDate.getHours() > startTime &&
        submitDate.getHours() < endTime);
};

export const checkValidSession = (currentSession, userSessions) => {
    var duplicate = false;
    for (var i in userSessions) {
        if (userSessions.hasOwnProperty(i)) {
            duplicate = ( userSessions[i].sessionAttended === currentSession.date )
        }
    }
    return !(duplicate);
};

export const validateSession = (currentSession, code, sessions) => {
    const validCode = checkCode(currentSession, code);
    const validTime = checkTime(currentSession);
    const validSession = checkValidSession(currentSession, sessions);

    let verified = (validCode && validTime && validSession);
    if (verified) {
        return verified
    }
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
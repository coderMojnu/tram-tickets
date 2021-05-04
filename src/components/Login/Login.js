import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: ''
    })
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.initializeApp(firebaseConfig);
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var { displayName, email } = result.user;
                const user = { name: displayName, email };
                setLoggedInUser(user);
                history.replace(from);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    }
    const handleBlur = (e) => {
        console.log(e.target.value, e.target.name)
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isFormValid = /\d{1}/.test(e.target.value);
        }
        if (isFormValid) {
            console.log(isFormValid);
            // const newUserInfo = { ...user };
            // newUserInfo[e.target.name] = e.target.value;
            // setUser(newUserInfo);
            // console.log(user)
        }
    }
    const handleSubmit = (e) => {
        if(user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    console.log(errorCode, errorMessage)
                });
        }
        e.preventDefault();
    }
    return (
        <div>
            <h1>This is Login</h1>
            <p>{user.name}</p>
            <p>{loggedInUser.name}</p>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <form onSubmit={handleSubmit}>
                <h3>Create an Account</h3>
                <input type="text" name="name" id="" placeholder="your name" onBlur={handleBlur} />
                <br />
                <input type="text" name="email" id="" placeholder="enter your mail" onBlur={handleBlur} required />
                <br />
                <input type="password" name="password" id="" placeholder="enter 8 digit password" onBlur={handleBlur} required />
                <br />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default Login;;
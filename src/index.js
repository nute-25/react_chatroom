// import de react
import React from 'react';
import ReactDOM from 'react-dom'; // importe tout reactDOM. oui c'est con
// si je m'utilisais que le 'render' de React.DOM je pourrais juste dire que j'ai besoin que de ca
// import { render } from 'react-dom';
import firebase from 'firebase';
import {BrowserRouter} from 'react-router-dom';
/*
import 'typeface-raleway';
*/
import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import App from './App';



// Initialize Firebase
const config = {
    apiKey: "AIzaSyCe5ZRFsJUzpN761c55q2A0KJifrIaAWH0",
    authDomain: "chat-room-70b95.firebaseapp.com",
    databaseURL: "https://chat-room-70b95.firebaseio.com",
    projectId: "chat-room-70b95",
    storageBucket: "chat-room-70b95.appspot.com",
    messagingSenderId: "317799036206"
    /*apiKey: "AIzaSyCzbQnJn_Z9fiY0bwTGoqEVqL_OmqXaKSk",
    authDomain: "chat-room-1990b.firebaseapp.com",
    databaseURL: "https://chat-room-1990b.firebaseio.com",
    projectId: "chat-room-1990b",
    storageBucket: "chat-room-1990b.appspot.com",
    messagingSenderId: "720020663390"*/
};
// eslint-disable-next-line to ignore the next line
firebase.initializeApp(config);


ReactDOM.render((
    <BrowserRouter basename={'/'}>
        <App/>
    </BrowserRouter>
), document.getElementById('root'))
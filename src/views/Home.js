import React, { Component } from "react";
import '../App.css';
import Chatroom from '../components/Chatroom.js'

class Home extends Component {
    render() {
        return (
            <section className="header">
                <h2 className="title">React : Chatroom</h2>
                <a className="button button-primary" href="">rien</a>
                <Chatroom/>
            </section>

        );
    }
}

export default Home
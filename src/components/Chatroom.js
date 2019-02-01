import React, { Component } from 'react';
import firebase from 'firebase';



class Chatroom extends Component {
    constructor() {
        super();
        this.state = {
            number: [2,5,7],
            firebase_tab: [],
            user: false,
            msg: ''
        };
    }
    // se met à jour regulièrement dès qu'il y a modif
    //render exécuté avant componentDidMount
    render() {
        return (
            <div>
                {
                    this.state.number.map((num) => {
                        return num+1;
                    })
                }

                <button onClick={this.login.bind(this)}>Se connecter !</button>
                { (this.state.user) ? <button onClick={this.logout.bind(this)}>Se déconnecter !</button> : '' }

                <ul>
                    {
                        this.state.firebase_tab.map((elem) => {
                            return (
                                <li key={elem.ts}>
                                    { elem.ts } - { elem.displayName } :
                                    <p> { elem.message }</p>
                                </li>
                            )
                        })
                    }
                </ul>

                { (this.state.user)
                    ? <form onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" onChange={ this.handleChange.bind(this) } placeholder="Saisissez votre message"/>
                        <input type="submit" value="Envoyer"/>
                      </form>
                    : ''
                }


            </div>
        );
    }
    // dans le mounted a lieu les changements d'état
    componentDidMount() {
        // ajout d'un elem à l'objet state
        this.setState({
            letter : 'flute'
        });
        // ajout d'un nouvel élément dans le tableau number
        // > on créé une copie du tab existant
        let copytab_number = this.state.number.slice();
        // > on ajoute le nombre 25 à ce nouveau tab
        copytab_number.push(25);
        // > on set le tab/ecrase à la place de number
        this.setState({number:copytab_number});

        firebase.database().ref('messages/').on('value', snapshot => {
            if (snapshot.val() !== null) {

                this.setState({
                    /*Object.values() transforme un objet en tableau*/
                    firebase_tab : Object.values(snapshot.val())
                })
            }
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Utilisateur connecté.
                this.setState( {
                    user: user
                })
            } else {
                // Aucun utilisateur connecté.
                this.setState( {
                    user: false
                })
            }
        });
    }
    // qd le texte saisi par l'utilisateur change
    handleChange (event) {
        this.setState({
            msg: event.target.value
        })
    }

    // qd l'utilisateur valide son message via le btn
    handleSubmit(event) {
        console.log('test', event)
        event && event.preventDefault();
        if (this.state.user) {
            console.log('test2')
            let entry = {
                ts: new Date().getTime(),
                uid: this.state.user.uid,
                displayName: this.state.user.displayName,
                message: this.state.msg
            }
            firebase.database().ref('messages/').push(entry)
        }


    }

    login () {
        let googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        googleAuthProvider.addScope('https://www.googleapis.com/auth/plus.login')
        //firebase.auth().languageCode = 'fr'
        firebase.auth().signInWithPopup(googleAuthProvider)
    }
    logout () {
        firebase.auth().signOut()
    }
}

export default Chatroom;

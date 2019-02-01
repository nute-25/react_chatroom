import React, { Component } from 'react';
import firebase from 'firebase';



class Chatroom extends Component {
    constructor() {
        super();
        this.state = {
            number: [2,5,7],
            firebase_tab: []
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

                <ul>
                    {
                        this.state.firebase_tab.map((elem) => {
                            return (
                                <li>
                                    { elem.ts } - { elem.displayName } :
                                    <p> { elem.message }</p>
                                </li>
                            )
                        })
                    }
                </ul>

                <form>
                    <input type="text" placeholder="Saisissez votre message"/>
                    <input type="submit" value="Envoyer"/>
                </form>
            </div>
        );
    }
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
    }
}

export default Chatroom;

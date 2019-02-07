import { Component } from 'react';
import firebase from 'firebase';

class About extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }


    // le lifecycle de mise a dispo React c'est
    // constructor -> componentWillMount -> Render -> ComponentDidMount
    // si on arrive sur la page pas loggué ca nous redirige en utilisant les props AVANT le render
    componentWillMount () {
        console.log('currentUser :', firebase.auth().currentUser);
        /* si firebase considere qu'il n'y a pas de user authentifié le dernier état ou tu dois te rendre c'est /Home
        * history est le dernier historique de navigation ou on doit se trouver */
        !firebase.auth().currentUser && this.props.history.push('/');
    }

    render () {
        return(
            'Si utilisateur pas loggé, il est redirigé vers Home'
        )
    }
}

export default About

import React, { Component } from 'react';
import firebase from 'firebase';
import marked from 'marked';



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
                        this.markdownTab.map((elem) => {
                            return (
                                <li key={elem.ts}>
                                    { elem.ts } - { elem.displayName } :
                                    <p dangerouslySetInnerHTML={{__html: elem.message }}/>
                                    {/*Si l'élément a une image on la récupère depuis this.state[IMG_NAME]*/}
                                    { (elem.img_file_name) ? <img src={ this.state[elem.img_file_name] }/> : '' }
                                </li>
                            )
                        })
                    }
                </ul>

                {/*ref rend l'élément accessible à REACT*/}
                <canvas ref="canvas"></canvas>
                { (this.state.user)
                    ? <form onSubmit={this.handleSubmit.bind(this)}>

                        {/*appel de la methode loadFile qd le file input change*/}
                        <input type="file" ref="fileInput" onChange={ this.loadFile.bind(this) }/>

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
                });
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
        });
    }

    // qd l'utilisateur valide son message via le btn
    handleSubmit(event) {
        event && event.preventDefault();
        if (this.state.user) {
            let entry = {
                ts: new Date().getTime(),
                uid: this.state.user.uid,
                displayName: this.state.user.displayName,
                message: this.state.msg
            };
            //inject into storage then send msg
            /*upluoad blob*/
            /*retourne moi le snapshot */
            if (this.state.img && this.state.img.data) {
                /*push de l'image vers firebase */
                entry.img_file_name = this.state.img.file_name;
                firebase.storage().ref(`images/${this.state.user.uid}/`).child(this.state.img.file_name)
                    .put(this.state.img.data)
                    .then(snapshot => {
                        this.render();
                    });
            }
            firebase.database().ref('messages/').push(entry, (error) => {
                if(error) {
                    console.log(error);
                }
                else {
                    console.log('OK');
                }
            });

        }
        event && event.preventDefault();

    }

    // qd l'utilisateur charge une image
    loadFile(event) {
        /*si il y a un fichier dans le tableau*/
        if(event.target.files[0]){
            // on le stoke
            const file = event.target.files[0];
            // TODO : check si c'est une image
            //creer en memoire <img src=".."...>
            let img = new Image();
            img.src = URL.createObjectURL(file);

            /*quand l'image est chargée*/
            img.onload = () => {
                /*on fait le lien avec notre canvas html*/
                let canvas = this.refs.canvas;
                /*on definit le contexte d'écriture*/
                let ctx = canvas.getContext('2d');
                /*on écrit dans le canvas*/
                ctx.drawImage (img, 0, 0, img.width, img.height, 0, 0, 100, 100);

                // convertion du canva  en blob
                canvas.toBlob(blob => {
                    //inject into storage then send msg
                    /*upluoad blob*/
                    /*retourne moi le snapshot */
                    firebase.storage().ref('images/').child(file.name)
                        .put(blob)
                        .then(snapshot => {
                            // update input with blod url
                            snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    this.setState({
                                        messages: downloadURL,
                                    })
                                    this.handleSubmit()
                                    // TODO : cleanup canvas && fileinput
                                });
                        })
                }, 'image/webp', 0.8)
            };
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

    get markdownTab () {
        return (this.state.firebase_tab).map(entry => {
            return ({
                ts: entry.ts,
                uid: entry.uid,
                displayName: entry.displayName,
                message: (entry.message) ? marked((entry.message).toString(), {sanitize: true}) : ''
            })
        })
    }
}

export default Chatroom;
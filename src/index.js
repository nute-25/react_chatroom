// import de react
import React from 'react';
import ReactDOM from 'react-dom'; // importe tout reactDOM. oui c'est con
// si je m'utilisais que le 'render' de React.DOM je pourrais juste dire que j'ai besoin que de ca
// import { render } from 'react-dom';
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


//custom comp
import Home from './App'; // la mon module s'appelle App mais j'ai emvie de lui donner un autre nom qd je l'utilise ici parce que contextuellement c'est la Home
import SeriesItemLister from './series/ItemLister';
import EpisodesItemLister from './episodes/ItemLister';


// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/all'>SeriesItemLister</Link></li>
                <li><Link to='/search'>EpisodesItemLister</Link></li>
            </ul>
        </nav>
    </header>
)

const Main = () => (
    <main>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/all' component={SeriesItemLister}/>
        <Route path='/search' component={EpisodesItemLister}/>
        </Switch>
    </main>
)


const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'))

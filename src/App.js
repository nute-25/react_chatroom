import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';
//custom comp
import Home from './views/Home.js';
import About from './views/About.js'
import SeriesItemLister from './series/ItemLister';
import EpisodesItemLister from './episodes/ItemLister';
import EpisodesCachedItemLister from './episodes/CachedItemLister';
import ApiItemLister from './series/ApiItemLister';


// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <nav className="navbar">
        <ul className="navbar-list clearfix">
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/json_search`}>JSON</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/cached_json_search`}>CACHED + JSON</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/api_search`}>API</Link></li>
        </ul>
    </nav>
)

const MainWrapper = () => (
    <main className="container">
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
            <Route path={`${process.env.PUBLIC_URL}/about`} component={About}/>
            <Route path={`${process.env.PUBLIC_URL}/all`} component={SeriesItemLister}/>
            <Route path={`${process.env.PUBLIC_URL}/json_search`} component={EpisodesItemLister}/>
            <Route path={`${process.env.PUBLIC_URL}/cached_json_search`} component={EpisodesCachedItemLister}/>
            <Route path={`${process.env.PUBLIC_URL}/api_search`} component={ApiItemLister}/>
        </Switch>
    </main>
);

const App = () => (
    <div className="">
        <Header/>
        <MainWrapper/>
    </div>
);

export default App

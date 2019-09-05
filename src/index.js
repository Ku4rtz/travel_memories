import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import App from './App';
import Connexion from './screens/Connexion/index.js';
import * as serviceWorker from './serviceWorker';
import Test from './ExampleComponent';
import Profile from './screens/Profile/Profile.js';
import Security from './Security';
import WorldMap from './screens/Profile/WorldMap';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Security(App)} />
                <Route exact path='/connexion' component={Connexion} />
                <Route exact path='/test' component={Test} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/map' component={WorldMap} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

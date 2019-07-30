import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Recipes } from './Recipes'
import { Sessions } from './Sessions'

import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));

function Home(props : any) {
    return (
        <div>
            <div className='home-buttons'>
                <Link to="/recipes">Recipes</Link>
                <Link to="/sessions">Sessions</Link>
            </div>
            <div className='home-content'>Home page visuals</div>   
        </div>
    );
}



function Root(props : Readonly<{}>) {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/sessions" component={Sessions} />
        </BrowserRouter>
    );
}

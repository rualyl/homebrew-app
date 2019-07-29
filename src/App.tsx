import * as React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route path="/page1" component={Page1} />
                <Route path="/page2" component={Page2} />
            </BrowserRouter>
        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className='home-buttons'>
                    <Link to="/page1">Page1</Link>
                    <Link to="/page2">Page2</Link>
                </div>
                <div className='home-content'>Home page visuals</div>   
            </div>
        );
    }
}

class Page1 extends React.Component {
    render() {
        return (<span>Page1</span>);
    }
}

class Page2 extends React.Component {
    render() {
        return (<span>Page2</span>)
    }
}

export default App;

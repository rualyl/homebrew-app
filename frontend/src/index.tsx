import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Recipes } from './Recipes'
import { Sessions } from './Sessions'
//import { IRecipe } from 'homebrew-types/BrewingTypes'

import './index.css';
import { TemperatureChart } from './TemperatureChart';

class Home extends React.Component {
    timerId: number | undefined;
    startTime = new Date().getTime();
    tempChart = React.createRef<TemperatureChart>();

    componentDidMount() {
        this.timerId = window.setInterval(() => {
            let tempChart = this.tempChart.current;
            if (tempChart) {
                let elapsedTime = new Date().getTime() - this.startTime;
                tempChart.addSeriesPoint(0, 150 + Math.random(), elapsedTime);
                tempChart.addSeriesPoint(1, 140 + Math.random(), elapsedTime);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div>
                <div className='home-buttons'>
                    <Link to="/recipes">Recipes</Link>
                    <Link to="/sessions">Sessions</Link>
                </div>
                <div className='home-content'>
                    <TemperatureChart seriesNames={["A", "B"]} title="Temp Chart Component" ref={this.tempChart}/>
                </div>   
            </div>
        );
    }
}

ReactDOM.render((
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/sessions" component={Sessions} />
    </BrowserRouter>
), document.getElementById('root'));

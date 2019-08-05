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
        let tempChart = this.tempChart.current;
        if (tempChart) {
            let i = 0;
            for (; i<600; i++) {
                tempChart.addSeriesPoint(1, 62 + Math.random(), i * 1000, false);
            }
            tempChart.addSeriesPoint(1, 62 + Math.random(), i * 1000, true);
        }

        this.timerId = window.setInterval(() => {
            if (tempChart) {
                let elapsedTime = new Date().getTime() - this.startTime;
                tempChart.addSeriesPoint(0, 60 + Math.random(), elapsedTime, true);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        let fermentingList = Array.from({length:2}, (v, k) => <li><span>Work in progress #{k}</span></li>);
        let onTapList = Array.from({length:4}, (v, k) => <li><span>Work in progress #{k}</span></li>);

        return (
            <div>
                <div className='home-buttons'>
                    <Link to="/recipes">Recipes</Link>
                    <Link to="/sessions">Brew Sessions</Link>
                    <Link to="/fermentations">Fermentations</Link>
                </div>
                <div className='home-content'>
                    <div className='fermenting'>
                        <h2>Currently Fermenting</h2>
                        <ul className='fermentingList'>
                            {fermentingList}
                        </ul>
                    </div>
                    <div className='onTap'>
                        <h2>Currently On Tap</h2>
                        <ul className='onTapList'>
                            {onTapList}
                        </ul>
                    </div>
                    
                    {/*<TemperatureChart seriesNames={["Actual", "Target"]} title="Temperature" pixelsPerSecond={50} ref={this.tempChart}/>*/}
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
        <Route path="/fermentations" component={() => <span>Work in progress</span>} />
    </BrowserRouter>
), document.getElementById('root'));

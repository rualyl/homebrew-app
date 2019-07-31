import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Highcharts, { Chart, Series, ChartOptions, Options, SeriesLineOptions } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { Recipes } from './Recipes'
import { Sessions } from './Sessions'

import './index.css';





class RandomDataChart extends HighchartsReact {
    
}

class Home extends React.Component {
    timerId: number | undefined;

    chartOptions : Options = {
        chart : {
            type: 'line',
            zoomType: 'x'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Random Data'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: "{value:%H:%M:%S}"
            }
        },
        series: [{
            type: 'line',
        } as SeriesLineOptions]
    }
    
    componentDidMount() {
        var randSeries = (this.refs.chartWrapper as HighchartsReact).chart.series[0];
        var startTime = (new Date()).getTime();
        this.timerId = window.setInterval(() => {randSeries.addPoint([(new Date()).getTime() - startTime, Math.random()], true, false)}, 1000);
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
                    <HighchartsReact highcharts={Highcharts} options={this.chartOptions} ref="chartWrapper" />    
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

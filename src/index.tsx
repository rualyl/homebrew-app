import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Highcharts, { Chart, Series, ChartOptions, Options, SeriesLineOptions } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { Recipes } from './Recipes'
import { Sessions } from './Sessions'

import './index.css';



const homeChartOptions : Options = {
    chart : {
        type: 'line',
        events: {
            load: function () {
                var randSeries = this.series[0]
                var startTime = (new Date()).getTime();
                setInterval(() => {randSeries.addPoint([(new Date()).getTime() - startTime, Math.random()], true, false)}, 1000);
            }
        },
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

function Home(props : any) {
    return (
        <div>
            <div className='home-buttons'>
                <Link to="/recipes">Recipes</Link>
                <Link to="/sessions">Sessions</Link>
            </div>
            <div className='home-content'>
                <HighchartsReact highcharts={Highcharts} options={homeChartOptions} />    
            </div>   
        </div>
    );
}

ReactDOM.render((
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/sessions" component={Sessions} />
    </BrowserRouter>
), document.getElementById('root'));

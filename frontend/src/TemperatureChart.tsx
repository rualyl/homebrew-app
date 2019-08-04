import * as React from 'react';
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export interface TemperatureChartProps {
    seriesNames: string[],
    title: string
}

export class TemperatureChart extends React.Component<TemperatureChartProps> {
    chartRef = React.createRef<HighchartsReact>();

    constructor(props : TemperatureChartProps) {
        super(props)
        this.addSeriesPoint = this.addSeriesPoint.bind(this);
    }

    render() {
        let chartOptions : Options = {
            chart : {
                type: 'line',
                zoomType: 'x'
            },
            credits: {
                enabled: false
            },
            title: {
                text: this.props.title
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    format: "{value:%H:%M:%S}"
                }
            },
            tooltip: {
                xDateFormat: "%H:%M:%S"
            },
            yAxis: {
                title: {
                    text: '\u2103'
                }
            },
            series: this.props.seriesNames.map(x => {return {type: 'line', name: x}})
        };

        return (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={this.chartRef} />    
        );
    }

    addSeriesPoint(seriesIndex: number, temperature: number, elapsedTime: number, redraw : boolean) {
        let chart = this.chartRef.current;
        if (chart) {
            chart.chart.series[seriesIndex].addPoint([elapsedTime, temperature], redraw, false);
        }
    }
}
import * as React from 'react';
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export interface TemperatureChartProps {
    seriesNames: string[],
    title: string,
    pixelsPerSecond: number
}

/** The first series is always centered */
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
                //zoomType: 'x',
                panning: true
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
            chart.chart.series[seriesIndex].addPoint([elapsedTime, temperature], false, false);

            // if seriesIndex is 0, update chart extremes so new point is centered
            if (seriesIndex == 0) {
                let millsecondsToPlotEdge = ((chart.chart.plotWidth / 2) / this.props.pixelsPerSecond) * 1000;
                let leftElapsedTime = elapsedTime - millsecondsToPlotEdge;
                let rightElapsedTime = elapsedTime + millsecondsToPlotEdge;
                chart.chart.xAxis[0].setExtremes(leftElapsedTime, rightElapsedTime, false)
            }

            if (redraw) {
                chart.chart.redraw();
            }
        }
    }
}
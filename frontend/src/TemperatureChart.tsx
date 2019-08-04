import * as React from 'react';
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export interface TemperatureChartProps {
    seriesNames: string[],
    title: string
}

interface TemperatureChartState {
    series: Highcharts.Series[] | undefined
}

export class TemperatureChart extends React.Component<TemperatureChartProps> {
    chartOptions : Options;
    chartRef = React.createRef<HighchartsReact>();

    constructor(props : TemperatureChartProps) {
        super(props)
        this.state = {
            series: undefined
        } as TemperatureChartState;

        this.chartOptions = {
            chart : {
                type: 'line',
                zoomType: 'x'
            },
            credits: {
                enabled: false
            },
            title: {
                text: props.title
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    format: "{value:%H:%M:%S}"
                }
            },
            series: props.seriesNames.map(x => {return {type: 'line', name: x}})
        };

        this.addSeriesPoint = this.addSeriesPoint.bind(this);
    }

    componentDidMount() {
        let chart = this.chartRef.current;
        if (chart) {
            let seriesCount = (this.props as TemperatureChartProps).seriesNames.length;
            this.setState({
                series: chart.chart.series.slice(0, seriesCount)
            } as TemperatureChartState);
        }
    }

    render() {
        return (
            <HighchartsReact highcharts={Highcharts} options={this.chartOptions} ref={this.chartRef} />    
        );
    }

    addSeriesPoint(seriesIndex: number, temperature: number, elapsedTime: number) {
        let series = (this.state as TemperatureChartState).series;
        if (series) {
            series[seriesIndex].addPoint([elapsedTime, temperature], true, false);
        }
    }

    componentWillUnmount() {
        this.setState({
            series: undefined
        } as TemperatureChartState);
    }
}
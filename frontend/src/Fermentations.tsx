import * as React from 'react';

import { TemperatureChart } from './TemperatureChart'

interface IFermentationProps {
    data: Array<[number, number]>
}

class Fermentation extends React.Component<IFermentationProps> {
    tempChart = React.createRef<TemperatureChart>();

    render() {
        return (
            <div className="fermentation">
                <span>Kveik NE IPA v3</span>
                
                <TemperatureChart seriesNames={["Measured", "Target"]} seriesData={[[], this.props.data]} title="Temperature" pixelsPerSecond={50} ref={this.tempChart}/>
            </div>
        );
    }
}

export class ActiveFermentations extends React.Component {
    render() {
        return (
            <div className="activeFermentations">
                <h2>Currently Fermenting:</h2>
                <Fermentation data={Array.from({length:100}, (v, k) => [k * 1000, 16.6 + (Math.random() / 2)])}/>
                <Fermentation data={Array.from({length:100}, (v, k) => [k * 1000, 16.6 + (Math.random() / 2)])}/>
            </div>
        );
    }
}

export function Fermentations() {
    return (
        <span>Fermentations</span>
    );
}
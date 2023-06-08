import * as React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, Filler } from 'chart.js';
import { Line as LineChart } from 'react-chartjs-2';

interface Props {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor?: string;
            borderColor?: string;
            fill?: Boolean;
        }[];
    };
};

const Line = (props: Props) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Filler
    );
    
    return (
        <LineChart
            data={props.data}
        />
    );
};

export default Line;
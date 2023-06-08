import * as React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';

interface Props {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor?: string; 
        }[];
    };
};

const Bar = (props: Props) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip
    );
    
    return (
        <BarChart
            data={props.data}
        />
    );
};

export default Bar;
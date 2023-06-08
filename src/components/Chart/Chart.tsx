import * as React from 'react';
import { ActivityData as ActivityDataModel } from '../../model/ActivityData';
import { addDays, calculateDaysBetween, compare, getDateString } from '../../service/Date';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import Bar from './Bar';
import Line from './Line';

interface Props {
    data: ActivityDataModel[];
};

type ChartType = 'bar' | 'line';

const Chart = (props: Props) => {
    const [chartType, setChartType] = React.useState<ChartType>('bar');
    const [startDate, setStartDate] = React.useState<string>(getDateString(props.data.sort((a, b) => compare(a.date, b.date)).map(e => e.date)[0]));
    const [endDate, setEndDate] = React.useState<string>(getDateString());

    const theme = useTheme();

    const data: {
        date: string,
        amount: number
    }[] = [];

    for (let index = 0; index <= calculateDaysBetween(endDate, startDate); index++) {
        const date = getDateString(addDays(startDate, index));
        const amount = props.data.filter(e => getDateString(e.date) === date).reduce((total, current) => total + current.amount, 0);

        data.push({
            date,
            amount
        });
    }

    return (
        <>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                    lg={6}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="start date"
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(getDateString(event.target.value))}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={6}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="end date"
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(getDateString(event.target.value))}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel id="chart-type-label">chart type</InputLabel>
                        <Select
                            labelId="chart-type-label"
                            value={chartType}
                            onChange={(event) => setChartType(event.target.value as ChartType)}
                        >
                            <MenuItem
                                value={'bar'}
                            >
                                bar
                            </MenuItem>
                            <MenuItem
                                value={'line'}
                            >
                                line
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    {
                        chartType === 'bar' ? (
                            <Bar
                                data={{
                                    labels: data.map(entry => entry.date),
                                    datasets: [
                                        {
                                            data: data.map(entry => entry.amount),
                                            backgroundColor: theme.palette.primary.dark
                                        }
                                    ]
                                }}
                            />
                        ) : (
                            <Line
                                data={{
                                    labels: data.map(entry => entry.date),
                                    datasets: [
                                        {
                                            data: data.map(entry => entry.amount),
                                            backgroundColor: theme.palette.primary.dark,
                                            borderColor: theme.palette.secondary.dark,
                                            fill: true
                                        }
                                    ]
                                }}
                            />
                        )
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default Chart;
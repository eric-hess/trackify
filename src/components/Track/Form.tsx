import { Button, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { formatFromString } from '../../service/Date';
import { v4 as uuidV4 } from 'uuid';

interface Props {
    id?: string;
    date?: string;
    amount?: number;
    track: (id: string, date: string, amount: number) => void;
};

const Form = (props: Props) => {
    const [id] = React.useState<string>(props.id ?? uuidV4());
    const [date, setDate] = React.useState<string>(props.date ?? '');
    const [amount, setAmount] = React.useState<number>(props.amount ?? 0);
    
    return (
        <>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={amount}
                        type="number"
                        placeholder="amount"
                        onChange={(event) => setAmount(Number(event.target.value))}
                    />
                </Grid>
                <Grid
                    item
                    xs={8}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={date}
                        placeholder='date'
                        onChange={(event) => setDate(event.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setDate(formatFromString())}
                    >
                        now
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => props.track(id, date, amount)}
                        disabled={amount <= 0 || date === ''}
                    >
                        track
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Form;
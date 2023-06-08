import { Button, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';

interface Props {
    id?: string;
    text?: string;
    amount?: number;
    save: (id: string, text: string, amount: number) => void;
};

const Form = (props: Props) => {
    const [id] = React.useState<string>(props.id ?? uuidV4());
    const [text, setText] = React.useState<string>(props.text ?? '');
    const [amount, setAmount] = React.useState<number>(props.amount ?? 0)
    
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
                        value={text}
                        placeholder="text"
                        onChange={(event) => setText(event.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={amount}
                        placeholder="amount"
                        onChange={(event) => setAmount(Number(event.target.value))}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => props.save(id, text, amount)}
                        disabled={Boolean(text === '' || amount <= 0)}
                    >
                        save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Form;
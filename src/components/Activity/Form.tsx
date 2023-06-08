import { Button, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';

interface Props {
    id?: string;
    name?: string;
    unit?: string;
    save: (id: string, name: string, unit: string) => void;
};

const Form = (props: Props) => {
    const [id] = React.useState<string>(props.id ?? uuidV4());
    const [name, setName] = React.useState<string>(props.name ?? '');
    const [unit, setUnit] = React.useState<string>(props.unit ?? '');

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
                        value={name}
                        placeholder="name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={unit}
                        placeholder="unit"
                        onChange={(event) => setUnit(event.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            props.save(id, name, unit);
                        }}
                        disabled={name === '' || unit === ''}
                    >
                        save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Form;
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import * as React from 'react';
import {v4 as uuidV4} from 'uuid';
import {ActivityAttributeType} from '../../model/ActivityAttribute';

interface Props {
    id?: string;
    name?: string;
    type?: ActivityAttributeType;
    save: (id: string, name: string, type: ActivityAttributeType) => void;
};

const Form = (props: Props) => {
    const [id] = React.useState<string>(props.id ?? uuidV4());
    const [name, setName] = React.useState<string>(props.name ?? '');
    const [type, setType] = React.useState<ActivityAttributeType>(props.type ?? ActivityAttributeType.Text)

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
                    <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel id="attribute-type-label">type</InputLabel>
                        <Select
                            labelId="attribute-type-label"
                            value={type}
                            onChange={(event) => setType(event.target.value as ActivityAttributeType)}
                        >
                            <MenuItem
                                key={ActivityAttributeType.Number}
                                value={ActivityAttributeType.Number}
                            >
                                <em>Number</em>
                            </MenuItem>
                            <MenuItem
                                key={ActivityAttributeType.Text}
                                value={ActivityAttributeType.Text}
                            >
                                <em>Text</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => props.save(id, name, type)}
                        disabled={Boolean(name === '' || type === undefined)}
                    >
                        save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Form;
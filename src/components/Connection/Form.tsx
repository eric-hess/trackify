import * as React from 'react';
import { ConnectionDetail as ConnectionDetailModel } from '../../model/ConnectionDetail';
import {v4 as uuidV4 } from 'uuid';
import { Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material';

interface Props {
    connectionDetail?: ConnectionDetailModel;
    save: (connectionDetail: ConnectionDetailModel) => void;
};

const Form = (props: Props) => {
    const [id] = React.useState<string>(props.connectionDetail?.id || uuidV4());
    const [connectionString, setConnectionString] = React.useState<string>(props.connectionDetail?.connectionString || '');
    const [documentId, setDocumentId] = React.useState<string>(props.connectionDetail?.documentId || '');
    const [autoConnect, setAutoConnect] = React.useState<boolean>(props.connectionDetail?.autoConnect || false);
    
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
                        placeholder="connection string (http://<user>:<password>@<host>/<database> OR <database> for local database)"
                        label="connection string"
                        value={connectionString}
                        onChange={(event) => setConnectionString(event.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="document id"
                        label="document id"
                        value={documentId}
                        onChange={(event) => setDocumentId(event.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <FormControlLabel
                        label="auto connect"
                        control={<Switch
                            checked={autoConnect}
                            onChange={(event) => setAutoConnect(event.target.checked)}
                        />}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        disabled={Boolean(connectionString === '' || documentId === '')}
                        onClick={() => props.save({
                            id,
                            connectionString,
                            documentId,
                            autoConnect
                        })}
                    >
                        save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Form;
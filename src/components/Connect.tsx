import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import * as React from 'react';
import PouchDB from 'pouchdb-browser';
import { ConnectionDetail as ConnectionDetailModel } from '../model/ConnectionDetail';
import { v4 as uuidV4 } from 'uuid';

interface Props {
    savedConnectionDetails: ConnectionDetailModel[];
    connect: (connectionString: string, documentId: string) => void;
    saveConnectionDetail: (connectionDetail: ConnectionDetailModel) => void;
    deleteConnectionDetail: (id: string) => void;
};

const Connect = (props: Props) => {
    const [connectionString, setConnectionString] = React.useState<string>('');
    const [documentId, setDocumentId] = React.useState<string>('');

    const checkConnection = () => {
        const couchDbClient = new PouchDB(connectionString);
        
        couchDbClient.get(documentId).then(doc => {
            props.connect(connectionString, documentId);
        }).catch((error: {status: number}) => {
            if (error.status === 404) {
                props.connect(connectionString, documentId);
            } else {
                console.log(error);
            }
        });
    };

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
                    <Autocomplete
                        freeSolo
                        options={props.savedConnectionDetails.map(e => {
                            return {
                                ...e,
                                label: `${e.connectionString} - ${e.documentId}`
                            };
                        })}
                        value={connectionString}
                        onChange={(event, newValue) => {
                            if (newValue instanceof Object) {
                                setConnectionString(newValue.connectionString);
                                setDocumentId(newValue.documentId);
                            }
                        }}
                        onInputChange={(event, newValue) => setConnectionString(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                placeholder="connection string (http://<user>:<password>@<host>/<database> OR <database> for local database)"
                                value={connectionString}
                            />
                        )}
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
                        value={documentId}
                        onChange={(event) => setDocumentId(event.target.value)}
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
                            props.saveConnectionDetail({
                                id: uuidV4(),
                                connectionString,
                                documentId,
                                autoConnect: false
                            });
                        }}
                        disabled={!Boolean(connectionString !== '' && documentId !== '')}
                    >
                        save connection
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => checkConnection()}
                        disabled={!Boolean(connectionString !== '' && documentId !== '')}
                    >
                        connect
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Connect;
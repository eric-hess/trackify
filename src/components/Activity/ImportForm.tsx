import { Alert, Button, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { Activity as ActivityModel, isActivity as isActivityModel } from '../../model/Activity';

interface Props {
    importActivity: (actvity: ActivityModel) => void;
};

const ImportForm = (props: Props) => {
    const [importJson, setImportJson] = React.useState<string>('');
    const [importError, setImportError] = React.useState<string>('');
    
    return (
        <>
            <Grid
                container
                spacing={2}
            >
                {
                    importError ? (
                        <Grid
                            item
                            xs={12}
                        >
                            <Alert
                                severity="error"
                            >
                                {importError}
                            </Alert>
                        </Grid>
                    ) : null
                }
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={12}
                        value={importJson}
                        onChange={(event) => setImportJson(event.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        disabled={importJson === ''}
                        onClick={() => {
                            setImportError('');

                            let noValidJson = false;
                            
                            try {
                                const object = JSON.parse(importJson);

                                if (isActivityModel(object)) {
                                    props.importActivity(object);

                                    return;
                                }
                            } catch (exception) {
                                noValidJson = true;
                            }

                            setImportError(
                                `activity could not be imported: ${noValidJson ? 'no valid json' : 'wrong format'}`
                            );
                        }}
                    >
                        import
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ImportForm;
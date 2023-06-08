import * as React from 'react';
import { Activity as ActivityModel } from '../model/Activity';
import { Container, Grid, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import ActivityCard from './Activity/Card';
import { Add as AddIcon, Clear as ClearIcon, Logout as LogoutIcon, Search as SearchIcon, SearchOff as SearchOffIcon, Upload as UploadIcon } from '@mui/icons-material';
import Modal from './Modal';
import ActivityForm from './Activity/Form';
import ActivityImportForm from './Activity/ImportForm';
import ConnectionDetailList from './Connection/List';
import { ConnectionDetail as ConnectionDetailModel } from '../model/ConnectionDetail';
import { SpeedDialAction as SpeedDialActionModel } from '../model/SpeedDialAction';

interface Props {
    data: ActivityModel[];
    connectionDetails: ConnectionDetailModel[];
    saveActivity: (activity: ActivityModel) => void;
    deleteActivity: (activity: ActivityModel) => void;
    saveConnectionDetail: (connectionDetail: ConnectionDetailModel) => void;
    deleteConnectionDetail: (id: string) => void;
    disconnect: () => void;
    addSpeedDialActions: (speedDialActions: SpeedDialActionModel[]) => void;
    removeSpeedDialActions: (ids: string[]) => void;
};

const Dashboard = (props: Props) => {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
    const [isImportModalOpen, setIsImportModalOpen] = React.useState<boolean>(false);
    const [snackBarContent, setSnackBarContent] = React.useState<{
        message: React.ReactElement;
        action?: React.ReactNode;
        onClose?: () => void;
    } | undefined>(undefined);
    const [displaySearch, setDisplaySearch] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isListConnectionDetailsModalOpen, setIsListConnectionDetailsModalOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const speedDialActions: SpeedDialActionModel[] = [
            {
                id: 'dasboard-disconnect',
                icon: <LogoutIcon/>,
                tooltip: 'disconnect',
                onClick: () => props.disconnect()
            },
            {
                id: 'dasboard-add-activity',
                icon: <AddIcon/>,
                tooltip: 'add activity',
                onClick: () => setIsAddModalOpen(true)
            },
            {
                id: 'dasboard-import-activity',
                icon: <UploadIcon/>,
                tooltip: 'import activity',
                onClick: () => setIsImportModalOpen(true)
            },
            {
                id: 'dasboard-search-toggle',
                icon: displaySearch ? <SearchOffIcon/> : <SearchIcon/>,
                tooltip: displaySearch ? 'hide search' : 'display search',
                onClick: () => {
                    setDisplaySearch(!displaySearch);
                    setSearchTerm('');
                }
            }
        ];

        props.addSpeedDialActions(speedDialActions);

        return () => {
            props.removeSpeedDialActions(speedDialActions.map(e => e.id));
        };
    }, [displaySearch]);

    return (
        <>
            <Grid
                container
                spacing={2}
            >
                {
                    displaySearch ? (
                        <Grid
                            item
                            xs={12}
                        >
                            <Container>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="search term"
                                    label="search"
                                    InputProps={{
                                        endAdornment: searchTerm !== '' ? (
                                            <InputAdornment
                                                position="end"
                                            >
                                                <IconButton
                                                    onClick={() => setSearchTerm('')}
                                                >
                                                    <ClearIcon/>
                                                </IconButton>
                                            </InputAdornment>

                                        ): undefined
                                    }}
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </Container>
                        </Grid>
                    ) : null
                }
                {
                    props.data.filter(e => e.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1).sort((a, b) => a.name.localeCompare(b.name)).map((entry) => {
                        return (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={entry.id}
                            >
                                <ActivityCard
                                    activity={entry}
                                    quickTrackActions={entry.quickTrackActions}
                                    track={(id, date, amount) => {
                                        props.saveActivity({
                                            ...entry,
                                            data: [
                                                ...entry.data.filter(e => e.id !== id),
                                                {
                                                    id,
                                                    date,
                                                    amount
                                                }
                                            ]
                                        });
                                    }}
                                    deleteTracked={(id) => {
                                        props.saveActivity({
                                            ...entry,
                                            data: [
                                                ...entry.data.filter(e => e.id !== id)
                                            ]
                                        });
                                    }}
                                    delete={() => props.deleteActivity(entry)}
                                    edit={(name, unit) => {
                                        props.saveActivity({
                                            ...entry,
                                            name,
                                            unit,
                                        });
                                    }}
                                    saveQuickTrackAction={(id, text, amount) => {
                                        props.saveActivity({
                                            ...entry,
                                            quickTrackActions: [
                                                ...entry.quickTrackActions.filter(e => e.id !== id),
                                                {
                                                    id,
                                                    text,
                                                    amount
                                                }
                                            ]
                                        });
                                    }}
                                    deleteQuickTrackAction={(id) => {
                                        props.saveActivity({
                                            ...entry,
                                            quickTrackActions: [
                                                ...entry.quickTrackActions.filter(e => e.id !== id)
                                            ]
                                        });
                                    }}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="add activity"
                component={(
                    <ActivityForm
                        save={(id, name, unit) => {
                            props.saveActivity({
                                id,
                                name,
                                unit,
                                data: [],
                                quickTrackActions: []
                            });
                            setIsAddModalOpen(false);
                        }}
                    />
                )}
            />
            <Modal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                component={(
                    <>
                        <ActivityImportForm
                            importActivity={props.saveActivity}
                        />
                    </>
                )}
            />
            <Modal
                isOpen={isListConnectionDetailsModalOpen}
                onClose={() => setIsListConnectionDetailsModalOpen(false)}
                component={(
                    <>
                        <ConnectionDetailList
                            connectionDetails={props.connectionDetails}
                            saveConnectionDetail={props.saveConnectionDetail}
                            deleteConnectionDetail={props.deleteConnectionDetail}
                        />
                    </>
                )}
            />
            <Snackbar
                open={Boolean(snackBarContent)}
                onClose={() => {
                    if (snackBarContent?.onClose) {
                        snackBarContent?.onClose();
                    }

                    setSnackBarContent(undefined);
                }}
                action={snackBarContent?.action}
            >
                {snackBarContent?.message}
            </Snackbar>
        </>
    );
};

export default Dashboard;
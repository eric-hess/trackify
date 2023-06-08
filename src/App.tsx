import { CssBaseline, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, ThemeProvider, createTheme } from '@mui/material';
import {Activity as ActivityModel } from './model/Activity';
import * as React from 'react';
import PouchDB from 'pouchdb-browser';
import Connect from './components/Connect';
import Dashboard from './components/Dashboard';
import { ConnectionDetail as ConnectionDetailModel } from './model/ConnectionDetail';
import { Storage as StorageIcon } from '@mui/icons-material';
import Modal from './components/Modal';
import ConnectionDetailList from './components/Connection/List';
import { SpeedDialAction as SpeedDialActionModel } from './model/SpeedDialAction';

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

const App = () => {
    const [isDataLoaded, setIsDataLoaded] = React.useState<Boolean>(false);
    const [couchDb, setCouchDb] = React.useState<{client: PouchDB.Database, documentId: string} | undefined>(undefined);
    const [data, setData] = React.useState<ActivityModel[]>([]);
    const [savedConnectionDetails, setSavedConnectionDetails] = React.useState<ConnectionDetailModel[]>(
        JSON.parse(
            localStorage.getItem('saveConnectionDetails') || '[]'
        )
    );
    const [isWindowFocused, setIsWindowFocused] = React.useState<boolean>(window.document.hasFocus());
    const [speedDialActions, setSpeedDialActions] = React.useState<SpeedDialActionModel[]>([
        {
            id: 'app-show-stored-connections',
            icon: <StorageIcon/>,
            tooltip: 'show stored connections',
            onClick: () => setIsShowStoredConnectionsModalOpen(true)
        }
    ]);
    const [isShowStoredConnectionsModalOpen, setIsShowStoredConnectionsModalOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!couchDb || !isWindowFocused) {
            return;
        }
        
        couchDb.client.get<{data: ActivityModel[]}>(couchDb.documentId).then((doc) => {
            if (JSON.stringify({
                _id: couchDb.documentId,
                _rev: doc._rev,
                data: data.sort((a, b) => a.name.localeCompare(b.name)),
            }) === JSON.stringify(doc)) {
                return;
            }
            
            setData(doc.data);
        }).catch((error) => {
            setData([]);
        }).finally(() => setIsDataLoaded(true));
    }, [couchDb, isWindowFocused]);
    
    React.useEffect(() => {
        if (!isDataLoaded || !couchDb) {
            return;
        }

        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

        couchDb.client!.get(couchDb.documentId).then((doc) => {
            if (JSON.stringify({
                _id: couchDb.documentId,
                _rev: doc._rev,
                data: sortedData,
            }) === JSON.stringify(doc)) {
                return;
            }
            
            couchDb.client!.put({
                _id: couchDb.documentId,
                _rev: doc._rev,
                data: sortedData,
            });
        }).catch((error) => {
            couchDb.client!.put({
                _id: couchDb.documentId,
                data: data.sort((a, b) => a.name.localeCompare(b.name)),
            });
        });
    }, [data]);

    React.useEffect(() => {
        localStorage.setItem('saveConnectionDetails', JSON.stringify(savedConnectionDetails));
    }, [savedConnectionDetails]);

    React.useEffect(() => {
        const onFocus = () => setIsWindowFocused(true);
        const onBlur = () => setIsWindowFocused(false);

        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        const autoConnectConnection = savedConnectionDetails.filter(e => e.autoConnect).at(0);

        if (autoConnectConnection) {
            setCouchDb({
                client: new PouchDB(autoConnectConnection.connectionString),
                documentId: autoConnectConnection.documentId
            });
        }

        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, []);

    const saveActivity = (activity: ActivityModel) => {
        setData(
            [
                ...data.filter(entry => entry.id !== activity.id),
                activity
            ]
        );
    };

    const deleteActivity = (activity: ActivityModel) => {
        setData([...data.filter(entry => entry.id !== activity.id)]);
    };

    const saveConnectionDetail = (connectionDetail: ConnectionDetailModel) => {
        setSavedConnectionDetails([
            ...savedConnectionDetails
                .map((e): ConnectionDetailModel => {
                    return {
                        id: e.id,
                        connectionString: e.connectionString,
                        documentId: e.documentId,
                        autoConnect: false
                    };
                })
                .filter(e => e.id !== connectionDetail.id),
            connectionDetail
        ]);
    };

    const deleteConnectionDetail = (id: string) => {
        setSavedConnectionDetails(savedConnectionDetails.filter(e => e.id === id));
    };

    const addSpeedDialActions = (actions: SpeedDialActionModel[]) => {
        setSpeedDialActions([
            ...speedDialActions.filter(e => !(actions.map(a => a.id).includes(e.id))),
            ...actions
        ]);
    };

    const removeSpeedDialActions = (ids: string[]) => {
        setSpeedDialActions([
            ...speedDialActions.filter(e => !ids.includes(e.id))
        ]);
    };
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid
                sx={{
                    padding: 2
                }}
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                >
                    {
                        couchDb === undefined
                            ? (
                                <Connect
                                    connect={(connectionString, documentId) => {
                                        setCouchDb({
                                            client: new PouchDB(connectionString),
                                            documentId,
                                        });
                                    }}
                                    saveConnectionDetail={saveConnectionDetail}
                                    deleteConnectionDetail={deleteConnectionDetail}
                                    savedConnectionDetails={savedConnectionDetails}
                                />
                            ) : (
                                <Dashboard
                                    data={data}
                                    saveActivity={saveActivity}
                                    deleteActivity={deleteActivity}
                                    connectionDetails={savedConnectionDetails}
                                    saveConnectionDetail={saveConnectionDetail}
                                    deleteConnectionDetail={deleteConnectionDetail}
                                    disconnect={() => {
                                        setCouchDb(undefined);
                                        setIsDataLoaded(false);
                                    }}
                                    addSpeedDialActions={addSpeedDialActions}
                                    removeSpeedDialActions={removeSpeedDialActions}
                                />
                            )
                    }
                </Grid>
            </Grid>
            <SpeedDial
                sx={{
                    position: 'fixed',
                    bottom: theme => theme.spacing(2),
                    right: theme => theme.spacing(2)
                }}
                ariaLabel="speed dial"
                icon={<SpeedDialIcon/>}
            >
                {
                    speedDialActions.map(e => (
                        <SpeedDialAction
                            key={e.id}
                            icon={e.icon}
                            tooltipTitle={e.tooltip}
                            onClick={e.onClick}
                        />
                    ))
                }
            </SpeedDial>
            <Modal
                isOpen={isShowStoredConnectionsModalOpen}
                onClose={() => setIsShowStoredConnectionsModalOpen(false)}
                component={(
                    <>
                        <ConnectionDetailList
                            connectionDetails={savedConnectionDetails}
                            saveConnectionDetail={saveConnectionDetail}
                            deleteConnectionDetail={deleteConnectionDetail}
                        />
                    </>
                )}
            />
        </ThemeProvider>
    );
};

export default App;

import { IconButton } from '@mui/material';
import * as React from 'react';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Modal from '../Modal';
import DataTable from '../DataTable';
import { ConnectionDetail as ConnectionDetailModel } from '../../model/ConnectionDetail';
import ConnectionDetailForm from './Form';

interface Props {
    connectionDetails: ConnectionDetailModel[];
    saveConnectionDetail: (connectionDetail: ConnectionDetailModel) => void;
    deleteConnectionDetail: (id: string) => void;
};

const List = (props: Props) => {
    const [selectedConnectionDetail, setSelectedConnectionDetail] = React.useState<ConnectionDetailModel | undefined>(undefined);

    return (
        <>
            <DataTable
                header={['connection string', 'document id', 'auto connect', '']}
                data={props.connectionDetails
                    .sort((a, b) => `${a.connectionString} - ${a.documentId}`.localeCompare(`${b.connectionString} - ${b.documentId}`))
                    .map(e => {
                        return [
                            e.connectionString,
                            e.documentId,
                            e.autoConnect ? 'true' : 'false',
                            (
                                <>
                                    <IconButton
                                        onClick={() => setSelectedConnectionDetail(e)}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => props.deleteConnectionDetail(e.id)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </>
                            )
                        ];
                    }
                )}
            />
            <Modal
                isOpen={Boolean(selectedConnectionDetail)}
                onClose={() => setSelectedConnectionDetail(undefined)}
                component={(
                    <ConnectionDetailForm
                        connectionDetail={selectedConnectionDetail}
                        save={(connectionDetail) => {
                            props.saveConnectionDetail(connectionDetail);
                            setSelectedConnectionDetail(undefined);
                        }}
                    />
                )}
            />
        </>
    );
};

export default List;
import { IconButton } from '@mui/material';
import * as React from 'react';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Modal from '../Modal';
import AttributeForm from './Form';
import DataTable from '../DataTable';
import {ActivityAttribute, ActivityAttributeType} from '../../model/ActivityAttribute';

interface Props {
    attributes: ActivityAttribute[];
    saveAttribute: (id: string, name: string, type: ActivityAttributeType) => void;
    deleteAttribute: (id: string) => void;
};

const List = (props: Props) => {
    const [selectedEditAttribute, setSelectedEditAttribute] = React.useState<ActivityAttribute | undefined>(undefined);

    return (
        <>
            <DataTable
                header={['name', 'type', '']}
                data={props.attributes.map(e => {
                    return [
                        e.name,
                        e.type,
                        (
                            <>
                                <IconButton
                                    onClick={() => setSelectedEditAttribute(e)}
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    onClick={() => props.deleteAttribute(e.id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </>
                        )
                    ];
                })}
            />
            <Modal
                isOpen={Boolean(selectedEditAttribute)}
                onClose={() => setSelectedEditAttribute(undefined)}
                component={(
                    <AttributeForm
                        id={selectedEditAttribute?.id}
                        name={selectedEditAttribute?.name}
                        type={selectedEditAttribute?.type}
                        save={(id, name, type) => {
                            props.saveAttribute(id, name, type);
                            setSelectedEditAttribute(undefined);
                        }}
                    />
                )}
            />
        </>
    );
};

export default List;
import { IconButton } from '@mui/material';
import * as React from 'react';
import { ActivityQuickTrackAction as ActivityQuickTrackActionModel } from '../../model/ActivityQuickTrackAction';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Modal from '../Modal';
import QuickTrackActionForm from './Form';
import DataTable from '../DataTable';

interface Props {
    quickTrackActions: ActivityQuickTrackActionModel[];
    saveQuickTrackAction: (id: string, text: string, amount: number) => void;
    deleteQuickTrackAction: (id: string) => void;
};

const List = (props: Props) => {
    const [selectedEditQuickTrackAction, setSelectedEditQuickTrackAction] = React.useState<ActivityQuickTrackActionModel | undefined>(undefined);

    return (
        <>
            <DataTable
                header={['text', 'amount', '']}
                data={props.quickTrackActions.map(e => {
                    return [
                        e.text,
                        e.amount,
                        (
                            <>
                                <IconButton
                                    onClick={() => setSelectedEditQuickTrackAction(e)}
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    onClick={() => props.deleteQuickTrackAction(e.id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </>
                        )
                    ];
                })}
            />
            <Modal
                isOpen={Boolean(selectedEditQuickTrackAction)}
                onClose={() => setSelectedEditQuickTrackAction(undefined)}
                component={(
                    <QuickTrackActionForm
                        id={selectedEditQuickTrackAction?.id}
                        text={selectedEditQuickTrackAction?.text}
                        amount={selectedEditQuickTrackAction?.amount}
                        save={(id, text, amount) => {
                            props.saveQuickTrackAction(id, text, amount);
                            setSelectedEditQuickTrackAction(undefined);
                        }}
                    />
                )}
            />
        </>
    );
};

export default List;
import { Dialog, Grid, IconButton } from '@mui/material';
import * as React from 'react';
import { ActivityData as ActivityDataModel } from '../../model/ActivityData';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import TrackForm from './Form';
import DataTable from '../DataTable';

interface Props {
    unit: string;
    data: ActivityDataModel[];
    delete: (id: string) => void;
    edit: (id: string, date: string, amount: number) => void;
};

const List = (props: Props) => {
    const [selectedDataForEdit, setSelectedDataForEdit] = React.useState<ActivityDataModel | undefined>(undefined);

    return (
        <>
            <Grid
                container
                spacing={2}
            >
                <DataTable
                    header={['date', 'amount', '']}
                    data={props.data.map(e => {
                        return [
                            e.date,
                            `${e.amount} ${props.unit}`,
                            (
                                <>
                                    <IconButton
                                        onClick={() => props.delete(e.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setSelectedDataForEdit(e)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </>
                            )
                        ];
                    })}
                /> 
            </Grid>
            <Dialog
                open={selectedDataForEdit ? true : false}
                onClose={() => setSelectedDataForEdit(undefined)}
            >
                <TrackForm
                    id={selectedDataForEdit?.id}
                    date={selectedDataForEdit?.date}
                    amount={selectedDataForEdit?.amount}
                    track={(id, date, amount) => {
                        props.edit(id, date, amount)
                        setSelectedDataForEdit(undefined)
                    }}
                />
            </Dialog>
        </>
    );
};

export default List;
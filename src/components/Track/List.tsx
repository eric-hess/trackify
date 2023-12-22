import { Dialog, Grid, IconButton } from '@mui/material';
import * as React from 'react';
import { ActivityData as ActivityDataModel } from '../../model/ActivityData';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import TrackForm from './Form';
import DataTable from '../DataTable';
import { ActivityDataAttribute } from '../../model/ActivityDataAttribute';
import { Activity } from '../../model/Activity';

interface Props {
    activity: Activity
    delete: (id: string) => void;
    edit: (id: string, date: string, amount: number, attributes: ActivityDataAttribute[]) => void;
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
                    data={props.activity.data.map(e => {
                        return [
                            e.date,
                            `${e.amount} ${props.activity.unit}`,
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
                    activity={props.activity}
                    id={selectedDataForEdit?.id}
                    date={selectedDataForEdit?.date}
                    amount={selectedDataForEdit?.amount}
                    attributes={selectedDataForEdit?.attributes}
                    track={(id, date, amount, attributes) => {
                        props.edit(id, date, amount, attributes)
                        setSelectedDataForEdit(undefined)
                    }}
                />
            </Dialog>
        </>
    );
};

export default List;
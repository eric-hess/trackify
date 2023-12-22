import { Button, ButtonGroup, Card as MuiCard, CardActions as MuiCardActions, CardContent as MuiCardContent, CardHeader as MuiCardHeader, Grid, IconButton, Typography, TextField } from '@mui/material';
import { calculateDaysBetween, formatFromString, getDateString, localizedFormat } from '../../service/Date';
import * as React from 'react';
import TrackForm from '../Track/Form';
import TrackList from '../Track/List';
import Create from './Form';
import Chart from '../Chart/Chart';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { v4 as uuidV4 } from 'uuid';
import QuickTrackActionForm from '../QuickTrackAction/Form';
import ActionMenu from '../ActionMenu';
import Modal from '../Modal';
import QuickTrackActionList from '../QuickTrackAction/List';
import { Activity as ActivityModel } from '../../model/Activity';
import AttributeForm from '../Attribute/Form';
import AttributeList from '../Attribute/List';
import {ActivityAttributeType} from '../../model/ActivityAttribute';
import {ActivityDataAttribute} from '../../model/ActivityDataAttribute';

interface Props {
    activity: ActivityModel;
    track: (id: string, date: string, amount: number, attributes: ActivityDataAttribute[]) => void;
    deleteTracked: (id: string) => void;
    delete: () => void;
    edit: (name: string, unit: string) => void;
    saveQuickTrackAction: (id: string, text: string, amount: number) => void;
    deleteQuickTrackAction: (id: string) => void;
    saveAttribute: (id: string, name: string, type: ActivityAttributeType) => void;
    deleteAttribute: (id: string) => void;
};

const Card = (props: Props) => {
    const [isTrackModalOpen, setIsTrackModalOpen] = React.useState<boolean>(false);
    const [isDataModalOpen, setIsDataModalOpen] = React.useState<boolean>(false);
    const [isChartModalOpen, setIsChartModalOpen] = React.useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
    const [isListQuickTrackActionModalOpen, setIsListQuickTrackActionModalOpen] = React.useState<boolean>(false);
    const [isAddQuickTrackActionModalOpen, setIsAddQuickTrackActionModalOpen] = React.useState<boolean>(false);
    const [isListAttributesModalOpen, setIsListAttributesModalOpen] = React.useState<boolean>(false);
    const [isAddAttributeModalOpen, setIsAddAttributeModalOpen] = React.useState<boolean>(false);
    const [actionMenuAnchorElement, setActionMenuAnchorElement] = React.useState<undefined | HTMLElement>(undefined);
    const [isExportAsJsonModalOpen, setIsExportAsJsonModalOpen] = React.useState<boolean>(false);
    const [contentEntries, setContentEntries] = React.useState<string[]>([]);

    React.useEffect(() => {
        const amount = props.activity.data.reduce((total, data) => total + data.amount, 0);
        const lastTracked = props.activity.data.sort((a, b) => a.date.localeCompare(b.date)).at(-1);
        const amountLastSevenDays = props.activity.data.filter(e => calculateDaysBetween(getDateString(), e.date) < 7).reduce((total, current) => total + current.amount, 0);

        setContentEntries([
            `total: ${amount} ${props.activity.unit}`,
            `last 7 days Σ: ${amountLastSevenDays} ${props.activity.unit}`,
            `last 7 days ⌀: ${(amountLastSevenDays / 7).toFixed(amountLastSevenDays - Number(amountLastSevenDays.toFixed(2)) > 0 ? 2 : 0)} ${props.activity.unit}`,
            `current day: ${props.activity.data.filter(e => getDateString() === getDateString(e.date)).reduce((total, current) => total + current.amount, 0)} ${props.activity.unit}`,
            `last: ${lastTracked ? `${lastTracked.amount} ${props.activity.unit} at ${formatFromString(lastTracked.date, localizedFormat)}` : 'never'}`
        ]);
    }, [props.activity.data]);

    return (
        <>
            <MuiCard
                variant="outlined"
            >
                <MuiCardHeader
                    title={props.activity.name}
                    action={(
                        <IconButton
                            onClick={(event) => setActionMenuAnchorElement(event.currentTarget)}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    )}
                />
                <MuiCardContent>
                    <Grid
                        container
                        spacing={2}
                    >
                        {
                            contentEntries.map((e, i) => (
                                <Grid
                                    key={i}
                                    item
                                    xs={12}
                                >
                                    <Typography>
                                        {e}
                                    </Typography>
                                </Grid>
                            ))
                        }
                    </Grid>
                </MuiCardContent>
                <MuiCardActions>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => setIsTrackModalOpen(true)}
                            >
                                track
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <ButtonGroup
                                fullWidth
                            >
                                {
                                    props.activity.quickTrackActions.length > 0
                                        ? props.activity.quickTrackActions.map(entry => {
                                            return (
                                                <Button
                                                    key={entry.id}
                                                    variant="outlined"
                                                    fullWidth
                                                    onClick={() => props.track(uuidV4(), formatFromString(), entry.amount, props.activity.attributes.map(attribute => {
                                                        return {
                                                            activityAttributeId: attribute.id,
                                                            value: null
                                                        };
                                                    }))}
                                                >
                                                    {entry.text}
                                                </Button>
                                            );
                                        })
                                        : (
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() => setIsAddQuickTrackActionModalOpen(true)}
                                            >
                                                add quick track actions
                                            </Button>
                                        )
                                }
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </MuiCardActions>
            </MuiCard>
            <ActionMenu
                anchorElement={actionMenuAnchorElement}
                isOpen={Boolean(actionMenuAnchorElement)}
                onClose={() => setActionMenuAnchorElement(undefined)}
                items={[
                    {
                        text: 'add quick track actions',
                        onClick: () => setIsAddQuickTrackActionModalOpen(true)
                    },
                    {
                        text: 'list quick track actions',
                        onClick: () => setIsListQuickTrackActionModalOpen(true)
                    },
                    {
                        text: 'add attribute',
                        onClick: () => setIsAddAttributeModalOpen(true)
                    },
                    {
                        text: 'list attributes',
                        onClick: () => setIsListAttributesModalOpen(true)
                    },
                    {
                        text: 'show data',
                        onClick: () => setIsDataModalOpen(true)
                    },
                    {
                        text: 'show chart',
                        onClick: () => setIsChartModalOpen(true)
                    },
                    {
                        text: 'edit',
                        onClick: () => setIsEditModalOpen(true)
                    },
                    {
                        text: 'delete',
                        onClick: () => props.delete()
                    },
                    {
                        text: 'export as json',
                        onClick: () => setIsExportAsJsonModalOpen(true)
                    }
                ]}
            />
            <Modal
                isOpen={isAddQuickTrackActionModalOpen}
                onClose={() => setIsAddQuickTrackActionModalOpen(false)}
                component={(
                    <QuickTrackActionForm
                        save={(id, text, amount) => {
                            props.saveQuickTrackAction(id, text, amount);
                            setIsAddQuickTrackActionModalOpen(false);
                        }}
                    />
                )}
            />
            <Modal
                isOpen={isListQuickTrackActionModalOpen}
                onClose={() => setIsListQuickTrackActionModalOpen(false)}
                component={(
                    <QuickTrackActionList
                        quickTrackActions={props.activity.quickTrackActions}
                        saveQuickTrackAction={(id, text, amount) => props.saveQuickTrackAction(id, text, amount)}
                        deleteQuickTrackAction={(id) => props.deleteQuickTrackAction(id)}
                    />
                )}
            />
            <Modal
                isOpen={isAddAttributeModalOpen}
                onClose={() => setIsAddAttributeModalOpen(false)}
                component={(
                    <AttributeForm
                        save={(id, name, type) => {
                            props.saveAttribute(id, name, type);
                            setIsAddAttributeModalOpen(false);
                        }}
                    />
                )}
            />
            <Modal
                isOpen={isListAttributesModalOpen}
                onClose={() => setIsListAttributesModalOpen(false)}
                component={(
                    <AttributeList
                        attributes={props.activity.attributes}
                        saveAttribute={(id, name, type) => props.saveAttribute(id, name, type)}
                        deleteAttribute={(id) => props.deleteAttribute(id)}
                    />
                )}
            />
            <Modal
                isOpen={isTrackModalOpen}
                onClose={() => setIsTrackModalOpen(false)}
                component={(
                    <TrackForm
                        activity={props.activity}
                        track={(id, date, amount, attributes) => {
                            props.track(id, date, amount, attributes)
                            setIsTrackModalOpen(false)
                        }}
                    />
                )}
            />
            <Modal
                isOpen={isDataModalOpen}
                onClose={() => setIsDataModalOpen(false)}
                component={(
                    <TrackList
                        activity={props.activity}
                        edit={(id, date, amount, attributes) => props.track(id, date, amount, attributes)}
                        delete={(id) => props.deleteTracked(id)}
                    />
                )}
            />
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                component={(
                    <Create
                        name={props.activity.name}
                        unit={props.activity.unit}
                        save={(id, name, unit) => {
                            props.edit(name, unit);
                            setIsEditModalOpen(false);
                        }}
                    />
                )}
            />
            <Modal
                isOpen={isChartModalOpen}
                onClose={() => setIsChartModalOpen(false)}
                component={(
                    <Chart
                        data={props.activity.data}
                    />
                )}
            />
            <Modal
                isOpen={isExportAsJsonModalOpen}
                onClose={() => setIsExportAsJsonModalOpen(false)}
                component={(
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
                                multiline
                                rows={12}
                                disabled
                                value={JSON.stringify(props.activity)}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => navigator.clipboard.writeText(JSON.stringify(props.activity))}
                                disabled={!Boolean(navigator.clipboard)}
                            >
                                {(navigator.clipboard) ? 'copy' : 'copy to clipboard is not supported in in this setup'}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            />
        </>
    );
};

export default Card;
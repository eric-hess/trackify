import { Menu, MenuItem } from '@mui/material';
import * as React from 'react';

interface Props {
    anchorElement?: Element;
    isOpen: boolean;
    items: {
        text: string;
        onClick: () => void;
    }[];
    onClose: () => void;
};

const ActionMenu = (props: Props) => {
    return (
        <>
            <Menu
                anchorEl={props.anchorElement}
                open={props.isOpen}
                onClose={props.onClose}
            >
                {
                    props.items.map(entry => {
                        return (
                            <MenuItem
                                key={entry.text}
                                onClick={() => {
                                    entry.onClick();
                                    props.onClose();
                                }}
                            >
                                {entry.text}
                            </MenuItem>
                        );
                    })
                }
            </Menu>
        </>
    );
};

export default ActionMenu;
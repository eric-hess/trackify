import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';

interface Props {
    isOpen: boolean;
    title?: string;
    component: React.ReactNode;
    onClose: () => void;
};

const Modal = (props: Props) => {
    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.onClose}
                fullWidth
            >
                {
                    props.title 
                        ? (
                            <DialogTitle>
                                {props.title}
                            </DialogTitle>
                        ) : null
                }
                <DialogContent>
                    {props.component}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Modal;
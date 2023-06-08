import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';

interface Props {
    header: string[];
    data: (string | number | React.ReactNode)[][];
};

const DataTable = (props: Props) => {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                props.header.map((e, i) => (
                                    <TableCell
                                        key={i}
                                    >
                                        {e}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.data.map((row, index) => (
                                <TableRow
                                    key={index}
                                >
                                    {row.map((e, i) => (
                                        <TableCell
                                            key={i}
                                        >
                                            {e}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default DataTable;
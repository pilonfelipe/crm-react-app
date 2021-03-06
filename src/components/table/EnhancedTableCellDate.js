import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { FormattedDate } from 'react-intl';

const EnhancedTableCellDatetime = (props) => {
    const value = props.row[props.column.name] || props.column.value || '';

    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                <FormattedDate value={value}/>
            </Typography>
        </TableCell>
    );
}
 
export default EnhancedTableCellDatetime;
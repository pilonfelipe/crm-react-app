import React from 'react';
import { TableRow } from '@material-ui/core';
import EnhancedTablCell from './EnhancedTableCell';
import { getObjectValue } from '../../utils/ObjectValueReader';

const EnhancedTableRow = (props) => {
    return (
        <TableRow>
            {
                props.columns.map((column, i) => {
                    const value = getObjectValue(props.row, column.name) || '';

                    return (
                        <EnhancedTablCell
                            key={column.name}
                            icon={column.icon}
                            name={column.name}
                            colIndex={i}
                            _rowId={props.row._rowId}
                            value={value}
                            handleCellClick={props.handleCellClick}
                        />
                    );
                })
            }
        </TableRow>
    );
}
 
export default EnhancedTableRow;
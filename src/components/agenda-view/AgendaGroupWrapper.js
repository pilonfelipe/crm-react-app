import { Box, useTheme } from '@material-ui/core';
import React from 'react';

const AgendaGroupWrapper = ({children, marginTop}) => {
    const theme = useTheme();

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop={marginTop || 0}>
            {children}
        </Box>
    );
}
 
export default AgendaGroupWrapper;
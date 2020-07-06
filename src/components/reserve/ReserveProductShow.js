import React from 'react';
import { Typography, makeStyles, Paper, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveProductData from './ReserveProductData';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
}));

const ReserveProductShow = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Box
                display='flex'
                justifyContent='center'
            >
                <Typography variant='h6'>
                    <FormattedMessage id='Products' />
                </Typography>
            </Box>
            {
                props.products.length ?
                <ReserveProductData products={props.products}/> :
                <Typography variant='h6'>
                    <FormattedMessage id='Please inform a product'/>
                </Typography>
            }
        </Paper>
    );
};
 
export default ReserveProductShow;
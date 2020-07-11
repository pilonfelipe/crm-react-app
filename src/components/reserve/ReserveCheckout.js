import React, { Fragment, useState } from 'react';
import { Grid, Paper, makeStyles, Box, Typography, Button } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import StoreSelect from '../fields/StoreSelect';
import SalesmanSelect from '../fields/SalesmanSelect';
import { KeyboardDatePicker } from "@material-ui/pickers";
import addDays from 'date-fns/addDays'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const ReserveCheckout = (props) => {
    const [ rememberDate, setRememberDate ] = useState(addDays(new Date(), 7));

    const classes = useStyles();

    const intl = useIntl();

    const isActive = props.step === props.activeStep;

    const xs = isActive ? 6 : 3;

    return (
        <Grid item xs={xs}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='subtitle1'>
                                <FormattedMessage id='Confirm'/>
                            </Typography>
                        </Box>
                    </Grid>
                    {
                        isActive ?
                        <Fragment>
                            <Grid item xs={12}>
                                <StoreSelect
                                    store={props.store}
                                    setStore={props.setStore}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SalesmanSelect
                                    salesman={props.salesman}
                                    setSalesman={props.setSalesman}
                                    store={props.store}
                                />
                            </Grid> 
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    label={intl.formatMessage({ id: 'Remember me at' })}
                                    value={rememberDate}
                                    onChange={setRememberDate}
                                    format="dd/MM/yyyy"
                                    size='small'
                                    clearable
                                    disablePast
                                />
                            </Grid>
                        </Fragment> :
                        null
                    }
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={props.disableSubmit}
                        >
                            <FormattedMessage id='Confirm reserve'/>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};
 
export default ReserveCheckout;
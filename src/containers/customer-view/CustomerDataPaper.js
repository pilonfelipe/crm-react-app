import React, { useState } from 'react';
import { Paper, Typography, useTheme, Box, Button } from '@material-ui/core';
import { FormattedMessage, FormattedDate } from 'react-intl';
import LabelMasks from '../../utils/LabelMasks';
import CustomerEditDialog from '../customer/CustomerEditDialog';

const CustomerDataPaper = ({customer, handleLoadCustomer}) => {
    const theme = useTheme();
    
    const [openEditCustomer, setOpenEditCustomer] = useState(false);

    return (
        <Paper style={{padding: theme.spacing(2)}}>
            <Typography variant='body1'>
                <FormattedMessage id="CPF"/>
                : {LabelMasks.cpf(customer.cpf)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Date of Birth"/>
                : <FormattedDate value={customer.date_of_birth} timeZone='utc' />
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Email"/>
                : {customer.email}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Phone 1"/>
                : {LabelMasks.phone(customer.phone1)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Phone 2"/>
                : {LabelMasks.phone(customer.phone2)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="ZIP"/>
                : {LabelMasks.zip(customer.zip)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Address 1"/>
                : {customer.addr1}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Address 2"/>
                : {customer.addr2}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Address 3"/>
                : {customer.addr3}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="City"/>
                : {customer.city}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="State"/>
                : {customer.state}
            </Typography>
            <Box display='flex' justifyContent='flex-end'>
                <Button onClick={(e) => setOpenEditCustomer(true)}><FormattedMessage id='Edit Customer'/></Button>
            </Box>
            {
                openEditCustomer &&
                <CustomerEditDialog
                    customer_id={customer.customer_id}
                    open={openEditCustomer}
                    handleClose={() => setOpenEditCustomer(false)}
                    handleCustomerUpdated={handleLoadCustomer}
                />
            }
        </Paper>
    );
}
 
export default CustomerDataPaper;
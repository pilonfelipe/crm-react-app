import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, useTheme, Box } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import isEmail from 'validator/lib/isEmail';
import { AuthContext } from '../../contexts/Auth';
import { get_User } from '../../services/Auth';
import { useHistory } from 'react-router-dom';

const Email = () => {
    const { user, setUser } = useContext(AuthContext);

    const hist = useHistory();
    const theme = useTheme();
    const intl = useIntl();

    const [ canProceed, setCanProceed ] = useState(user.email && isEmail(user.email));
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ email, setEmail ] = useState(user.email || '')

    const handleChange = e =>
    {
        const { value } = e.target;

        if (!value || !isEmail(value))
            setCanProceed(false);
        else
            setCanProceed(true);

        setEmail(value);
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        get_User({email})
        .then(res => {
            if (!res.active) {
                setErrorMsg('User inactive. Contact system administrator');
                return;
            }

            setUser({ ...user, ...res });
            hist.push('/login/password');
        })
        .catch(err => {
            console.log('err.message', err.message)
            setErrorMsg(err.message || 'Unknown error');
        });
    }

    useEffect(() => {
        if (errorMsg)
            setErrorMsg('')
    // eslint-disable-next-line
    }, [email])

    const error = errorMsg ? true : false;

    return (
        <form style={{width: '100%'}}>
            <TextField
                label='Email'
                autoFocus
                margin="normal"
                required
                fullWidth
                value={email}
                autoComplete="email"
                onChange={handleChange}
                error={error}
                helperText={error && intl.formatMessage({id: errorMsg})}
            />
            <Box width='100%' display='flex'>
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{margin: theme.spacing(2, 1, 2)}}
                    disabled={!canProceed}
                    onClick={handleSubmit}
                >
                    <FormattedMessage id='Next'/>
                </Button>
            </Box>
        </form>
    );
}
 
export default Email;
import React, { useContext, useEffect, useState } from 'react';
import { 
    post_UserStore,
} from '../../services/UserStore';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';
import { get_Users } from '../../services/User';
import { get_Stores } from '../../services/Store';

const UserStoreAddDialog = ({handleUpdated, open, handleClose, user_id, store_id}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({user_id, store_id});

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const handleFieldChange = (fieldKey, newValue) => setData({...data, ...{[fieldKey]: newValue}});

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        setData({});
        setErrors({});
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }

    const handleConfirm = () => {
        setLoading(true);

        post_UserStore(data)
        .then(() => {
            setSucessSnack('Record added successfully');
            handleUpdated();
            handleClose();
        })
        .catch((err) => {
            setErrors(err);
            setLoading(false);
        })
    }
    
    return (
        <EditDialogWrapper title='New User Store' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField 
                    fieldKey='user_id'
                    title='User'
                    value={data.user_id}
                    error={errors.user_id} 
                    handleChange={handleFieldChange}
                    comp='select'
                    loadOptionsFnc={get_Users}
                    loadOptionsParams={{user_id}}
                    optionLabel='name'
                    defaultValue={user_id}
                    readOnly={user_id}
                />
                <PageField 
                    fieldKey='store_id'
                    title='Store'
                    value={data.store_id}
                    error={errors.store_id} 
                    handleChange={handleFieldChange}
                    comp='select'
                    loadOptionsFnc={get_Stores}
                    loadOptionsParams={{unassigned_to: user_id}}
                    optionLabel='name'
                    defaultValue={store_id}
                    readOnly={store_id}
                />
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default UserStoreAddDialog;
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Contact = (params) => {
    return api.post('/contacts', params)
    .then(handleResponse)
    .catch(handleError);
}

export const post_Interactions = (params) => {
    return api.post('/contacts/interactions', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Contacts = (params) => {
    return api.post('/contacts/list', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_MsgPreset = (params) => {
    return api.get('/contacts/msgPreset', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Interactions = (params) => {
    return api.get('/contacts/interactions', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_SumToDoBirthday = (params) => {
    return api.get('/contacts/toDoSum/birthday', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ToDoBirthday = (params) => {
    return api.get('/contacts/toDo/birthday', {params})
    .then(handleResponse)
    .catch(handleError);
}
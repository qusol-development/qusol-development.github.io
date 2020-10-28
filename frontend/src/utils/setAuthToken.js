import request from './requests'

const setAuthToken = token => {
    if (token) {
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete request.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken
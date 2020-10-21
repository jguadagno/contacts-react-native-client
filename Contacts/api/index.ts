import Axios from 'axios';
import MsalHandler from '../msal/MsalHandler';
import { ContactsApi } from './generated';

const msalHandler = MsalHandler.getInstance();

const instance = Axios.create({baseURL: 'https://localhost:5001'});
instance.interceptors.request.use(
    async request => {
        var token = await msalHandler.acquireAccessToken(request.url);
        request.headers["Authorization"] = "Bearer " + token;
        return request;
    }
);

export default {
    Contacts: new ContactsApi(null, 'https://localhost:5001', instance)
};
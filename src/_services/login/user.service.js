import Global from '../../_helpers/global';

export const userService={
    login
}

async function login(username, password) {
    debugger;
    const requestOptions = {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }

    return fetch(Global.BASE_API_PATH + 'UserMaster/Login/', requestOptions)
        .then(handleResponse)
    .then(res => {
        return res;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if(!response.ok) {
            if(response.status === 401) {

            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
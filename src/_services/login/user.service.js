import Global from '../../_helpers/global';
import authHeader from '../../_helpers/auth-header';


export const userService={
    login,
    register,

    save,
    update,
    getAll,
    getById,
    delete: _delete
}

async function login(username, password) {
    debugger;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    }

    return fetch(Global.BASE_API_PATH + 'UserMaster/Login/', requestOptions)
        .then(handleResponse)
    .then(res => {
        return res;
    });
}

//register the user
async function register(obj) {
    var requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(obj)
    };

    return fetch(Global.BASE_API_PATH + 'UserMaster/Save/', requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        debugger;
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

//all paid customer list

async function getAll() {
    debugger;
    const requestOptions = {
        method: 'GET',
        headers: authHeader(false)
    };

    return fetch(Global.BASE_API_PATH + `Customers/GetAll/`, requestOptions)
        .then(handleResponse)
        .then(res => {
            debugger;
            return res;
        });
}


//Crude operations on customer:

async function save(obj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(false),
        body: JSON.stringify(obj)
    };

    return fetch(Global.BASE_API_PATH + `Customers/Save/`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
}


async function update(obj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(false),
        body: JSON.stringify(obj)
    };

    return fetch(Global.BASE_API_PATH + `Customers/Update/`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(false)
    };

    return fetch(Global.BASE_API_PATH + `Customers/GetById/${id}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
}
async function _delete(obj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(false),
        body: JSON.stringify(obj)
    };

    return fetch(Global.BASE_API_PATH + `Customers/Delete/`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
}
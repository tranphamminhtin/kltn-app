import domain from './domain'
const api = domain + '/user';

async function getListUser() {
    let response = await fetch(api);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function searchUser(email) {
    let response = await fetch(`${api}/users/${email}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

async function updateUser(value) {
    let response = await fetch(`${api}/users/${value.email}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.success;
}

async function changePassword(email, value) {
    let response = await fetch(`${api}/change-password/${email}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.success;
}

async function login(value) {
    let response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    let responseJson = await response.json();
    return responseJson;
}

async function loginWithGG(value) {
    let response = await fetch(`${api}/google`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    let responseJson = await response.json();
    return responseJson;
}

export { getListUser };
export { searchUser };
export { updateUser };
export { changePassword };
export { login };
export { loginWithGG };
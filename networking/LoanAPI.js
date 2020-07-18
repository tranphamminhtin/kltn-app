import domain from './domain'
const api = domain + '/loan-facilities';

async function getListLoan() {
    let response = await fetch(api);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function searchLoan(id) {
    let response = await fetch(`${api}/${id}`);
    let responseJson = await response.json();
    console.log(!responseJson.success);
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function createLoan(value) {
    let response = await fetch(api, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.success;
}

async function updateLoan(id, value) {
    let response = await fetch(`${api}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.success;
}

async function searchLoanByRoom(idRoom, idFacilities) {
    let response = await fetch(`${api}/search?facilities=${idFacilities}&room=${idRoom}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function searchLoanByManager(email, idFacilities) {
    let response = await fetch(`${api}/search?facilities=${idFacilities}&manager=${email}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function searchLoanByFacilities(idFacilities) {
    let response = await fetch(`${api}/search?facilities=${idFacilities}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

export { getListLoan };
export { searchLoan };
export { createLoan };
export { updateLoan };
export { searchLoanByRoom };
export { searchLoanByManager };
export { searchLoanByFacilities };
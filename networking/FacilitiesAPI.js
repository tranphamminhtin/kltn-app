import domain from './domain'
const api = domain + '/facilities';

async function getListFacilities() {
    let response = await fetch(api);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function searchFacilities(id) {
    let response = await fetch(`${api}/${id}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function updateFacilities(id, value) {
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

async function getFacilitiesByRoom(idRoom, state) {
    let response = await fetch(`${api}/by-room?room=${idRoom}&state=${state}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

async function getFacilitiesByManager(email, state) {
    let response = await fetch(`${api}/by-manager?manager=${email}&state=${state}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message);
    }
    return responseJson.message;
}

export { getListFacilities };
export { searchFacilities };
export { updateFacilities };
export { getFacilitiesByRoom };
export { getFacilitiesByManager };
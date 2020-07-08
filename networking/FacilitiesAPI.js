import domain from './domain'
const api = domain + '/facilities';

async function getListFacilities() {
    try {
        let response = await fetch(api);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message);
        }
        return responseJson.message;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function searchFacilities(id) {
    try {
        let response = await fetch(`${api}/${id}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message);
        }
        return responseJson.message;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function updateFacilities(id, value) {
    try {
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
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function getFacilitiesByRoom(idRoom, state) {
    try {
        let response = await fetch(`${api}/by-room?room=${idRoom}&state=${state}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message);
        }
        return responseJson.message;
    } catch (error) {
        console.log(error);
    }
}

async function getFacilitiesByManager(email, state) {
    try {
        let response = await fetch(`${api}/by-manager?manager=${email}&state=${state}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message);
        }
        return responseJson.message;
    } catch (error) {
        console.log(error);
    }
}

export { getListFacilities };
export { searchFacilities };
export { updateFacilities };
export { getFacilitiesByRoom };
export { getFacilitiesByManager };
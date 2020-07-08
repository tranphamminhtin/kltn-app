import domain from './domain'
const api = domain + '/loan-facilities';

async function getListLoan() {
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

async function searchLoan(id) {
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

async function createLoan(value) {
    try {
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
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function updateLoan(id, value) {
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

async function searchLoanByRoom(idRoom, idFacilities) {
    try {
        let response = await fetch(`${api}/search?facilities=${idFacilities}&room=${idRoom}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message);
        }
        return responseJson.message;
    } catch (error) {
        console.log(error);
    }
}

async function searchLoanByManager(email, idFacilities) {
    try {
        let response = await fetch(`${api}/search?facilities=${idFacilities}&manager=${email}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message);
        }
        return responseJson.message;
    } catch (error) {
        console.log(error);
    }
}

async function searchLoanByFacilities(idFacilities) {
    try {
        let response = await fetch(`${api}/search?facilities=${idFacilities}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message);
        }
        return responseJson.message;
    } catch (error) {
        console.log(error);
    }
}

export { getListLoan };
export { searchLoan };
export { createLoan };
export { updateLoan };
export { searchLoanByRoom };
export { searchLoanByManager };
export { searchLoanByFacilities };
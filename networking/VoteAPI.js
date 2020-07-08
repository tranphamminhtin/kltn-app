import domain from './domain'
const api = domain + '/vote';

async function searchVote(id) {
    try {
        let response = await fetch(`${api}/${id}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message)
        }
        return responseJson.message;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function createVote(value) {
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
            throw new Error(responseJson.message)
        }
        return responseJson.success;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function updateVote(id, value) {
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
            throw new Error(responseJson.message)
        }
        return responseJson.success;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function deleteVote(id) {
    try {
        let response = await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message)
        }
        return responseJson.success;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

export { searchVote };
export { createVote };
export { updateVote };
export { deleteVote };
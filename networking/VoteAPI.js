import domain from './domain'
const api = domain + '/vote';

async function createVote(value) {
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
}

async function updateVote(id, value) {
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
}

async function getVoteByIdLoanFa(idLoan) {
    let response = await fetch(`${api}/findByIdLoan/${idLoan}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

export { createVote };
export { updateVote };
export { getVoteByIdLoanFa };
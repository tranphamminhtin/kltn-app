import domain from './domain'
const api = domain + '/facilities-type';

async function getListType() {
    let response = await fetch(api);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

async function searchType(id) {
    let response = await fetch(`${api}/${id}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

export { getListType };
export { searchType };
import domain from './domain'
const api = domain + '/unit';

async function getListUnit() {
    let response = await fetch(api);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

async function searchUnit(id) {
    let response = await fetch(`${api}/${id}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

export { getListUnit };
export { searchUnit };
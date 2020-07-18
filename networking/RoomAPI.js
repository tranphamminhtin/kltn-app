import domain from './domain'
const api = domain + '/room';

async function getListRoom() {
    let response = await fetch(api);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

async function searchRoom(id) {
    let response = await fetch(`${api}/${id}`);
    let responseJson = await response.json();
    if (!responseJson.success) {
        throw new Error(responseJson.message)
    }
    return responseJson.message;
}

export { getListRoom };
export { searchRoom };
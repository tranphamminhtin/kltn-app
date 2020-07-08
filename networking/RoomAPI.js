import domain from './domain'
const api = domain + '/room';

async function getListRoom() {
    try {
        let response = await fetch(api);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message)
        }
        return responseJson.message;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function searchRoom(id) {
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

export { getListRoom };
export { searchRoom };
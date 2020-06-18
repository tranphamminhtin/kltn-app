import React, { Component } from 'react';
import { AppRegist, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

const api = 'http://localhost:3000/user';

async function getListUser() {
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

async function searchUser(email) {
    try {
        let response = await fetch(`${api}/${email}`);
        let responseJson = await response.json();
        if (!responseJson.success) {
            throw new Error(responseJson.message)
        }
        return responseJson.message;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function createUser(value) {
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

async function updateUser(value) {
    try {
        let response = await fetch(`${api}/${value.email}`, {
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

async function deleteUser(email) {
    try {
        let response = await fetch(`${api}/${email}`, {
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

async function changePassword(email, value) {
    try {
        let response = await fetch(`${api}/change-password/${email}`, {
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

async function login(value) {
    try {
        let response = await fetch(`${api}/login`, {
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
        return responseJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function loginWithGG(value) {
    try {
        let response = await fetch(`${api}/google`, {
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
        return responseJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

export { getListUser };
export { searchUser };
export { createUser };
export { updateUser };
export { deleteUser };
export { changePassword };
export { login };
export { loginWithGG };
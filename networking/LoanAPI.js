import React, { Component } from 'react';
import { AppRegist, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

const api = 'http://localhost:3000/loan-facilities';

async function getListLoan() {
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

async function searchLoan(id) {
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
            throw new Error(responseJson.message)
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
            throw new Error(responseJson.message)
        }
        return responseJson.success;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

async function deleteLoan(id) {
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

export { getListLoan};
export { searchLoan};
export { createLoan};
export { updateLoan};
export { deleteLoan};
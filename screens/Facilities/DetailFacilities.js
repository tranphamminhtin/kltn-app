import React, { Component } from 'react';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Input } from 'galio-framework';

import OptionButton from '../../components/OptionButton';

import tv from '../../assets/tv.jpg';

export default class DetailFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onUpdate = () => {

    }

    render() {
        const { facilities } = this.props.route.params;
        return (
            <ScrollView style={styles.container}>
                <Image source={tv} style={styles.imageFacilite} />
                <Text> {facilities.id} </Text>
                <Text style={styles.name}>
                    Local files and sets can be imported by dragging and dropping them into
                    the editor
                </Text>
                <Text style={styles.date}>06/06/2020</Text>
                <Text style={styles.description}>Type is here</Text>
                <Text style={styles.description}>Supplier is here</Text>
                <Text style={styles.description}>Note</Text>
                <Input placeholder="Note" style={styles.inputNote} />
                <Text style={styles.description}>Quantity</Text>
                <Input placeholder="Quantity" rounded type={'numeric'} />
                <OptionButton
                    icon="wrench"
                    label="Update"
                    backgroundColor='#0069d9'
                    colorLabel='white'
                    style={styles.buttonUpdate}
                    onPress={this.onUpdate}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        padding: 10,
    },
    name: {
        margin: 24,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageFacilite: {
        alignSelf: 'center',
        height: 200,
        resizeMode: 'stretch',
        width: '85%'
    },
    date: {
        fontSize: 15,
        color: '#a1a1a1',
        marginLeft: 'auto',
    },
    description: {
        marginBottom: 10,
        fontSize: 18,
    },
    inputNote: {
        height: 100,
        alignItems: 'flex-start',
        paddingTop: 10,
    },
    buttonUpdate: {
        borderRadius: 30,
        marginVertical: 20,
        width: '50%',
        alignSelf: 'center',
    }
})
import React, { Component } from 'react';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import { searchFacilities } from './../../networking/FacilitiesAPI';
import { searchType } from './../../networking/TypeAPI';
import domain from '../../networking/domain';

export default class DetailFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            detail: null,
            nameType: '',
        };
    }

    componentDidMount() {
        const { _id } = this.props.route.params;
        this.setState({ _id: _id }, () => {
            this.onGetDetaiFacilitiesFromServer();
        });
    }

    onGetDetaiFacilitiesFromServer = () => {
        const { _id } = this.state;
        searchFacilities(_id)
            .then(detail => {
                this.setState({ detail: detail }, () => {
                    this.onGetNameType(detail.type);
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    detail: null
                });
            })
    }

    onGetNameType = (id) => {
        searchType(id)
            .then(type => {
                this.setState({ nameType: type.name });
            })
            .catch(err => {
                console.log(err);
                this.setState({ nameType: '' });
            });
    }

    getImage = () => {
        const { detail } = this.state;
        if (detail?.image) {
            const srcImage = detail?.image.replace("http://localhost:3000", domain);
            return srcImage;
        }
        return '';
    }

    render() {
        const { detail, nameType } = this.state;
        const image = this.getImage();
        return (
            <ScrollView style={styles.container}>
                {image &&
                    <Image source={{ uri: image }} style={styles.imageFacilite} />
                }
                <Text style={styles.name}>{detail?.name}</Text>
                <Text style={styles.date}>{moment(detail?.date).format('DD/MM/YYYY')}</Text>
                <Text style={styles.description}>Loại: {nameType}</Text>
                <Text style={styles.description}>Nhà cung cấp: {detail?.supplier}</Text>
                {detail?.note &&
                    <Text style={styles.description}>Ghi chú: {detail?.note}</Text>
                }
                <Text style={styles.description}>Số lượng: {detail?.quantity}</Text>
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
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageFacilite: {
        marginBottom: 10,
        alignSelf: 'center',
        height: 200,
        resizeMode: 'stretch',
        width: '85%'
    },
    date: {
        fontSize: 17,
        color: '#a1a1a1',
        marginLeft: 'auto',
        marginBottom: 10
    },
    description: {
        marginBottom: 18,
        fontSize: 20,
    }
})
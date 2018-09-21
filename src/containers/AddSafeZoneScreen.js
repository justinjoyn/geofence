import React, {Component} from "react";
import {Button, Platform, ScrollView, StatusBar, StyleSheet, TextInput, View} from "react-native";
import {KeepAwake, Location, MapView, Permissions} from "expo";
import {SafeAreaView} from "react-navigation";
import {Colors} from "../constants/colors";

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.WHITE,
        padding: 10
    },
    card: {
        borderColor: Colors.GREY_LIGHT,
        borderRadius: 3,
        borderWidth: 1,
        padding: 10,
        marginTop: 10
    },
    inputText: {
        height: 60
    }
});

export default class AddSafeZoneScreen extends Component {
    static navigationOptions = {};

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            latitude: '',
            longitude: '',
            radius: '',
            mapLocation: null
        }
    }

    componentDidMount = async function () {

    };

    componentWillUnmount() {

    }

    componentDidUpdate() {
        console.log(this.state.mapLocation);
    }

    renderSafeZone() {

    }

    render() {
        return (
            <SafeAreaView style={styles.wrapper}>
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <KeepAwake/>
                <View style={{flexDirection: 'column', flex: 1}}>
                    <View style={styles.card}>
                        <TextInput style={styles.inputText}
                                   placeholder={'Latitude'}
                                   onChangeText={(latitude) => this.setState({latitude})}
                                   value={this.state.latitude.toString()}/>
                        <TextInput style={styles.inputText}
                                   placeholder={'Longitude'}
                                   onChangeText={(longitude) => this.setState({longitude})}
                                   value={this.state.longitude.toString()}/>
                        <TextInput style={styles.inputText}
                                   placeholder={'Radius'}
                                   onChangeText={(radius) => this.setState({radius})}
                                   value={this.state.radius.toString()}/>
                    </View>
                    <View style={[styles.card, {flex: 1, padding: 0}]}>
                        <MapView
                            showsMyLocationButton={true}
                            showsUserLocation={true}
                            style={{flex: 1}}
                            onPress={e => this.setState({mapLocation: e.nativeEvent.coordinate})}
                            initialRegion={{
                                latitude: 10,
                                longitude: 76,
                                latitudeDelta: 90,
                                longitudeDelta: 90,
                            }}>
                            {this.state.mapLocation ?
                                <MapView.Marker draggable
                                                coordinate={this.state.mapLocation}
                                                onDragEnd={(e) => this.setState({mapLocation: e.nativeEvent.coordinate})}/>
                                : null}
                        </MapView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

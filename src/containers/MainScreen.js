import React, {Component} from "react";
import {FlatList, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {KeepAwake, Location, Permissions} from "expo";
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
    heading: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 10
    },
    button: {
        borderColor: Colors.GREY_LIGHT,
        borderRadius: 3,
        borderWidth: 1,
        padding: 10
    }
});

export default class MainScreen extends Component {

    static navigationOptions = {};

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            safeZones: []
        }
    }

    componentDidMount = async function () {
        let locationPermission = await this.askLocationPermission();

        if (locationPermission) {
            this.trackLocation();
        }
    };

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentDidUpdate() {
        console.log(this.state.safeZones);
    }

    askLocationPermission = async function () {
        if (Platform.OS === 'android') {
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            return status === 'granted';
        } else {
            return true;
        }
    };

    trackLocation() {
        this.intervalId = setInterval(() => {
            this._getLocationAsync();
        }, 2000);
    }

    _getLocationAsync = async () => {
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            maximumAge: 1999
        });
        this.setState({location});
    };

    addSafeZone(location, radius) {
        let safeZones = this.state.safeZones;
        safeZones.push({
            id: safeZones.length + 1,
            coordinates: location,
            radius: radius,
        });
        this.setState({safeZones: safeZones});
    }

    _keyExtractor = (item, index) => item.id.toString();

    _renderSafeZone({item}) {
        return <View style={styles.card}>
            <Text>Latitude: {item.coordinates.latitude.toString()}</Text>
            <Text>Longitude: {item.coordinates.longitude.toString()}</Text>
            <Text>Radius: {item.radius.toString()}</Text>
            <View style={{marginTop: 10}}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ViewSafeZoneScreen', {safeZone: item})}
                    style={styles.button}>
                    <View><Text style={{textAlign: 'center'}}>View</Text></View>
                </TouchableOpacity>
            </View>
        </View>
    }

    render() {
        return (
            <SafeAreaView style={styles.wrapper}>
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <KeepAwake/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.card}>
                        <Text style={styles.heading}>Current Location</Text>
                        <Text>Latitude: {this.state.location ? this.state.location.coords.latitude.toString() : 'Waiting for GPS'}</Text>
                        <Text>Longitude: {this.state.location ? this.state.location.coords.longitude.toString() : 'Waiting for GPS'}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddSafeZoneScreen', {addSafeZone: this.addSafeZone.bind(this)})}
                            style={styles.button}>
                            <View><Text style={{textAlign: 'center'}}>Add Safe Zone</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.heading}>Safe Zones</Text>
                        <FlatList
                            style={{flex: 1}}
                            data={this.state.safeZones}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderSafeZone.bind(this)}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

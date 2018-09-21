import React, {Component} from "react";
import {Button, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
        padding: 10
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
            location: null
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
        // console.log(this.state.location);
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
                        <Text>Latitude: {this.state.location ? this.state.location.coords.latitude : 'Waiting for GPS'}</Text>
                        <Text>Longitude: {this.state.location ? this.state.location.coords.longitude : 'Waiting for GPS'}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddSafeZoneScreen')}
                            style={styles.button}>
                            <View><Text style={{textAlign: 'center'}}>Add Safe Zone</Text></View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

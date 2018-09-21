import React, {Component} from "react";
import {StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {KeepAwake, MapView} from "expo";
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
        height: 40
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

export default class ViewSafeZoneScreen extends Component {
    static navigationOptions = {};

    constructor(props) {
        super(props);
        this.safeZone = null;
        this.state = {
            radius: '',
            mapLocation: null
        }
    }

    componentDidMount() {
        if (this.safeZone) {
            this.setState({
                mapLocation: this.safeZone.coordinates,
                radius: this.safeZone.radius
            });
        }
    }

    renderSafeZone() {
        if (this.state.mapLocation && this.state.radius > 0) {
            return <MapView.Circle center={this.state.mapLocation}
                                   radius={parseFloat(this.state.radius) * 1000}
                                   strokeColor={'rgba(0,255,0,0.5)'}
                                   fillColor={'rgba(0,255,0,0.5)'}/>
        }
        return null;
    }

    render() {
        this.safeZone = this.props.navigation.getParam('safeZone', null);
        return (
            <SafeAreaView style={styles.wrapper}>
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <KeepAwake/>
                <View style={{flexDirection: 'column', flex: 1}}>
                    <View style={styles.card}>
                        <Text style={styles.heading}>Safe Zone</Text>
                        <Text>Latitude: {this.state.mapLocation ? this.state.mapLocation.latitude : 'Select location'}</Text>
                        <Text>Longitude: {this.state.mapLocation ? this.state.mapLocation.longitude : 'Select location'}</Text>
                        <Text>Radius: {this.state.radius ? this.state.radius : 'Select location'}</Text>
                    </View>
                    <View style={[styles.card, {flex: 1, padding: 0}]}>
                        <MapView
                            showsMyLocationButton={true}
                            showsUserLocation={true}
                            style={{flex: 1}}
                            onPress={e => this.setState({mapLocation: e.nativeEvent.coordinate})}
                            initialRegion={{
                                latitude: this.safeZone.coordinates.latitude,
                                longitude: this.safeZone.coordinates.longitude,
                                latitudeDelta: 5,
                                longitudeDelta: 5,
                            }}>
                            {this.state.mapLocation ?
                                <MapView.Marker coordinate={this.state.mapLocation}/>
                                : null}
                            {this.renderSafeZone()}
                        </MapView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

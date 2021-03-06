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

export default class AddSafeZoneScreen extends Component {
    static navigationOptions = {};

    constructor(props) {
        super(props);
        this.state = {
            radius: '',
            mapLocation: null
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
        const addSafeZone = this.props.navigation.getParam('addSafeZone', null);
        return (
            <SafeAreaView style={styles.wrapper}>
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <KeepAwake/>
                <View style={{flexDirection: 'column', flex: 1}}>
                    <View style={styles.card}>
                        <Text style={styles.heading}>Selected Location</Text>
                        <Text>Latitude: {this.state.mapLocation ? this.state.mapLocation.latitude : 'Select location'}</Text>
                        <Text>Longitude: {this.state.mapLocation ? this.state.mapLocation.longitude : 'Select location'}</Text>
                    </View>
                    <View style={[styles.card, {flexDirection: 'row'}]}>
                        <TextInput style={[styles.inputText, {flex: 1}]}
                                   placeholder={'Radius'}
                                   underlineColorAndroid={'transparent'}
                                   onChangeText={(radius) => this.setState({radius})}
                                   value={this.state.radius.toString()}/>
                        <TouchableOpacity
                            onPress={() => {
                                addSafeZone(this.state.mapLocation, this.state.radius);
                                this.props.navigation.goBack();
                            }}
                            style={styles.button}>
                            <View><Text style={{textAlign: 'center'}}>Done</Text></View>
                        </TouchableOpacity>
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
                            {this.renderSafeZone()}
                        </MapView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

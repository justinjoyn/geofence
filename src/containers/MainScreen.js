import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Platform, StatusBar, StyleSheet} from "react-native";
import {Permissions} from "expo";
import {ActionCreators} from "../actions/index";
import {SafeAreaView} from "react-navigation";
import {Colors} from "../constants/colors";

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.WHITE,
    },
});

class MainScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount = async function () {
        let locationPermission = await this.askLocationPermission();

        if (locationPermission) {

        }
    };

    askLocationPermission = async function () {
        if (Platform.OS === 'android') {
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            return status === 'granted';
        } else {
            return true;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.wrapper}>
                <StatusBar hidden/>

            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

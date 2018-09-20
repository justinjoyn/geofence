import React from 'react';
import {AppRegistry, YellowBox} from 'react-native';
import {connect, Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {createStackNavigator} from 'react-navigation';
import location from "./src/reducers/location"

//Screens
import MainScreen from "./src/containers/MainScreen";

//Main stack navigation
const MainStackNavigator = createStackNavigator({
    MainScreen: {screen: MainScreen}
});

class App extends React.Component {
    render() {
        return (
            <MainStackNavigator/>
        );
    }
}

// Apply middleware and log actions only in development mode
const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});
const appReducer = combineReducers({
    location: location
});

function configureStore(initialState) {
    // const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware, navigationMiddleware));
    const enhancer = compose(applyMiddleware(thunkMiddleware));
    return createStore(appReducer, initialState, enhancer);
}

const store = configureStore({});

class GeoFence extends React.Component {

    componentWillMount() {
        //Ignore unimportant warnings
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    }

    render() {
        return <Provider store={store}>
            <App/>
        </Provider>
    }
}

AppRegistry.registerComponent('GeoFence', () => GeoFence);
export default GeoFence;

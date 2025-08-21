import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './counterSlice';
import * as SplashScreen from "expo-splash-screen/build/index";
import {useEffect} from "react";


SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } finally {
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    })
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Text>Kan</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your task" style={styles.input}/>
                    <TouchableOpacity style={styles.button} onPress={() => {
                    }}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto"/>
            </View>
            <CounterScreen/>
        </Provider>
    );
}

export function CounterScreen() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    if (count > 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Count: {count}</Text>
                <TouchableOpacity style={styles.button1} onPress={() => dispatch(increment())}>
                    <Text style={styles.buttonText}>Increase</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => dispatch(decrement())}>
                    <Text style={styles.buttonText}>Decrease</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Count: {count}</Text>
                <TouchableOpacity style={styles.button1} onPress={() => dispatch(increment())}>
                    <Text style={styles.buttonText}>Increase Pro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => dispatch(decrement())}>
                    <Text style={styles.buttonText}>Decrease Pro</Text>
                </TouchableOpacity>
            </View>
        )
    }
    ;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        paddingHorizontal: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    input: {
        width: '80%',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 12,
        marginBottom: 10,
    },
    button: {
        marginVertical: 12,
        marginHorizontal: 10,
        width: '20%',
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        marginVertical: 12,
        marginHorizontal: 10,
        width: '50%',
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {fontSize: 30, marginBottom: 20}

});

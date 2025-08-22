// App.js
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

SplashScreen.preventAutoHideAsync().catch(() => {});

// ---------- Minimal Redux (JS) ----------
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => { state.value += 1; },
        decrement: (state) => { state.value -= 1; },
    },
});
const { increment, decrement } = counterSlice.actions;

const store = configureStore({
    reducer: { counter: counterSlice.reducer },
});

function CounterScreen() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Count: {count}</Text>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => dispatch(increment())}>
                <Text style={styles.buttonText}>{count > 0 ? 'Increase' : 'Increase Pro'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => dispatch(decrement())}>
                <Text style={styles.buttonText}>{count > 0 ? 'Decrease' : 'Decrease Pro'}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                // simulate startup work (API, fonts, storage, etc.)
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } finally {
                if (mounted) setAppIsReady(true);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) return null;

    return (
        <Provider store={store}>
            {/* Single native root view */}
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Kan</Text>
                    <View style={styles.inputRow}>
                        <TextInput placeholder="Enter your task" style={styles.input} />
                        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar style="auto" />
                </View>

                <CounterScreen />
            </View>
        </Provider>
    );
}

// ---------- Styles (JS) ----------
const styles = StyleSheet.create({
    container: {
        flex: 1, // important
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
    },
    inputRow: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    addButton: {
        marginLeft: 10,
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    buttonPrimary: {
        marginTop: 10,
        backgroundColor: '#10B981',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonSecondary: {
        marginTop: 10,
        backgroundColor: '#EF4444',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});

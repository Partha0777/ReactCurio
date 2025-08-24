// App.js (native-stack only, no gesture-handler)
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShadowVisible: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Counter" component={CounterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.center}>
            <Text style={styles.title}>Home</Text>
            <Button title="Go to Counter" onPress={() => navigation.navigate('Counter', { start: 1 })} />
        </SafeAreaView>
    );
}


function CounterScreen({ route, navigation }) {
    const start = route.params?.start ?? 0;
    const [count, setCount] = React.useState(start);

    return (
        <SafeAreaView style={styles.center}>
            <Text style={styles.title}>Counter: {count}</Text>
            <View style={styles.row}>
                <Button title="+1" onPress={() => setCount(c => c + 1)} />
                <View style={{ width: 12 }} />
                <Button title="-1" onPress={() => setCount(c => c - 1)} />
            </View>
            <View style={{ height: 12 }} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
    row: { flexDirection: 'row', alignItems: 'center' },
});

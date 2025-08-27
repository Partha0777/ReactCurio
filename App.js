import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
    SafeAreaView,
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    useWindowDimensions
} from 'react-native';
import {useEffect} from "react";


const sampleList = [
    {
        name: "A",
        age: "16"
    },
    {
        name: "B",
        age: "14"
    },
    {
        name: "C",
        age: "18"
    },
    {
        name: "D",
        age: "35"
    },
]

const Stack = createNativeStackNavigator();

export default function App() {
    return (<NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShadowVisible: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Counter" component={CounterScreen}/>
            <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        </Stack.Navigator>
    </NavigationContainer>);
}


function HomeScreen({navigation}) {
    return (<SafeAreaView edges={["top", "bottom"]}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.container}>
            <FlatList
                data={sampleList}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => {
                    return (
                        <Text style={styles.item}>{
                            item.name
                        }
                        </Text>
                    )
                }}
            />
        </View>
        <Button title="Go to Counter" onPress={() => navigation.navigate('Counter', {start: 1})}/>
    </SafeAreaView>);
}

function CounterScreen({route, navigation}) {
    const start = route.params?.start ?? 0;
    const [count, setCount] = React.useState(start);

    return (<SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
        <Text style={styles.title}>Counter: {count}</Text>
        <View style={styles.row}>
            <Button title="+1" onPress={() => setCount(c => c + 1)}/>
            <View style={{width: 12}}/>
            <Button title="-1" onPress={() => setCount(c => c - 1)}/>
        </View>
        <View style={{height: 12}}/>
        <Button title="Go back" onPress={() => navigation.goBack()}/>
    </SafeAreaView>);
}

function SplashScreen({navigation}) {
    const {width, height} = useWindowDimensions()


    useEffect(() => {
        const t = setTimeout(() => navigation.replace('Home'), 2000);
        return () => clearTimeout(t);
    }, [navigation]);


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
            <Image
                source={require('../ReactCurio/assets/splash-icon.png')}
                style={{width: width * 0.5, height: height * 0.5}}
                resizeMode="contain"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {flex: 1, backgroundColor: "#fff"},
    list: {flex: 1},
    center: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16},
    title: {fontSize: 22, fontWeight: '600', marginBottom: 12},
    row: {flexDirection: 'row', alignItems: 'center'},
});

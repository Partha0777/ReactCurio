import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {useEffect} from "react";


function SplashScreen({navigation}) {

    const {width, height} = useWindowDimensions()

    useEffect(() => {
        const t = setTimeout(() => navigation.replace('EcomHomeScreen'), 2000);
        return () => clearTimeout(t);
    }, [navigation]);



    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
            <Image
                source={require('../assets/splash-icon.png')}
                style={{width: width * 0.5, height: height * 0.5}}
                resizeMode="contain"
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {}
})

export default SplashScreen;
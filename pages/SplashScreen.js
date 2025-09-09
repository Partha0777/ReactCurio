import {View, Text, Button, StyleSheet, FlatList, Image, useWindowDimensions} from 'react-native';


function SplashScreen() {

    const {width, height} = useWindowDimensions()

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
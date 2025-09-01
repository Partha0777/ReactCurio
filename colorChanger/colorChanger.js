import {Button, Text, View} from "react-native";
import {useReducer} from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";


const reducer = (state,action) => {
    switch(action.color){
        case "red":
            return {...state, red: state.red + action.colorValue}
        case "green":
            return {...state, green: state.green + action.colorValue}
        case "blue":
            return {...state, blue: state.blue + action.colorValue}
    }
}

const ColorChanger = () => {
    const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
    const {red,green,blue} = state;
    return (
        <View style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
               alignItems: "center",
            }}>
            <View style={{height: 100, width: 100, backgroundColor: `rgb(${red}, ${green}, ${blue})`}}/>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <ColorChangerView
                    name="Red"
                    onMinus={() => dispatch({ color: "red", colorValue: -15 })}
                    onPlus={() => dispatch({ color: "red", colorValue: 15 })}
                />
            </View>
        </View>
    );
}

const ColorChangerView = ({name,onMinus,onPlus}) => {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <Button  title={"-"} onPress={() => onMinus()}/>
        <Text style={{textAlign: "center", fontSize: 20}}>{name}</Text>
        <Button title={"+"} onPress={() => onPlus()}/>
        </View>
    )
}

export default ColorChanger;
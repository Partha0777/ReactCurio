import {Button, Text, View} from "react-native";
import {useReducer} from "react";

const clamp255 = (n) => Math.max(0, Math.min(255, n));

const reducer = (state, action) => {
    switch (action.color) {
        case "red":
            return { ...state, red: clamp255(state.red + action.colorValue) };
        case "green":
            return { ...state, green: clamp255(state.green + action.colorValue) };
        case "blue":
            return { ...state, blue: clamp255(state.blue + action.colorValue) };
        default:
            // IMPORTANT: always return state by default to avoid "reducer returned undefined"
            return state;
    }
};

const ColorChanger = () => {
    const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
    const { red, green, blue } = state;

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 16, alignItems: "center" }}>
            <View
                style={{
                    height: 100,
                    width: 100,
                    backgroundColor: `rgb(${red}, ${green}, ${blue})`,
                    marginBottom: 16,
                }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <ColorChangerView
                    name="Red"
                    onMinus={() => dispatch({ color: "red", colorValue: -15 })}
                    onPlus={() => dispatch({ color: "red", colorValue: 15 })}
                />
                <ColorChangerView
                    name="Green"
                    onMinus={() => dispatch({ color: "green", colorValue: -15 })}
                    onPlus={() => dispatch({ color: "green", colorValue: 15 })}
                />
                <ColorChangerView
                    name="Blue"
                    onMinus={() => dispatch({ color: "blue", colorValue: -15 })}
                    onPlus={() => dispatch({ color: "blue", colorValue: 15 })}
                />
            </View>
            <Text style={{ marginTop: 10, fontSize: 16 }}>
                rgb({red}, {green}, {blue})
            </Text>
        </View>
    );
};


const ColorChangerView = ({ name, onMinus, onPlus }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 8 }}>
            <Button title="-" onPress={onMinus} />
            <Text style={{ textAlign: "center", fontSize: 20, marginHorizontal: 10 }}>{name}</Text>
            <Button title="+" onPress={onPlus} />
        </View>
    );
};

export default ColorChanger;
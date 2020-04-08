import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import ReactNative from 'react-native';


const TextInput = props => {
    const [isFocus, setFocus] = useState(false);
    const handleFocus = event => {
        setFocus(true);
        if(props.onFocus){
            props.onFocus(event);
        }
    }

    const handleBlur = event => {
        setFocus(false);
        if(props.onBlur){
            props.onBlur(event);
        }
    }

    const { onFocus, onBlur, ...otherProps } = props;
    return (
        <ReactNative.TextInput 
            placeholder="Buscar perro..."
            selectionColor="#428AF8"
            underlineColorAndroid={
                isFocus ? "#428AF8" : "#d3d3d3"
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.search}
            {...otherProps}
        />
    )
}

const styles = StyleSheet.create({
    search: {
        marginHorizontal: 8,
        height: 40,
        paddingVertical: 4,
        fontSize: 16
    }
});

export default TextInput;
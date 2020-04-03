import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Separator = props => (
    <View style={[
        styles.separator,
        {
            borderTopColor: props.color ? props.color : '#eaeaea'
        }
    ]} />
)

const styles = StyleSheet.create({
    separator: {
        borderTopWidth: 1,
    }
})

export default Separator
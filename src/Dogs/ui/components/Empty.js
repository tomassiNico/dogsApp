import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const Empty = props => (
    <View style={styles.container}>
        <Text>{props.text}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,

    }
})

export default Empty
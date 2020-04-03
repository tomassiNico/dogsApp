import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const DogsListLayout = props => (
    <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 8,
        fontWeight: 'bold'
    }
})

export default DogsListLayout;
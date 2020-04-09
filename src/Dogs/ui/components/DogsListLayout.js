import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const DogsListLayout = props => (
    <View style={styles.container}>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    }
})

export default DogsListLayout;
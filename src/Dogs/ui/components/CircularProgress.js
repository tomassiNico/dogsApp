import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgress = () => (
    <View style={styles.circularProgress}>
        <AnimatedCircularProgress
            size={120}
            width={15}
            fill={100}
            duration={800}
            tintColor="#00e0ff"
            backgroundColor="#3d5875" />
    </View>
);

const styles = StyleSheet.create({
    circularProgress: {
        flex: 1,
        alignItems: 'center',
        marginTop: '50%'
    }
});

export default CircularProgress;
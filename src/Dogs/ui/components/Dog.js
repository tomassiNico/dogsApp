import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const Dog = props => (
    <View style={styles.container}>
        <View style={styles.left}>
            <Image
                source={{uri: 'https://images.dog.ceo/breeds/basenji/n02110806_3974.jpg'}}
                style={styles.image}
            />
        </View>
        <View style={styles.right}>
            <Text style={styles.text}>{props.subBreed && `${props.subBreed} `}{props.breed}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    left: {
        paddingHorizontal: 8
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    text: {
        fontWeight: "bold",
        fontSize: 16
    },
    image: {
        width: 70,
        height: 60,
    }
})

export default Dog
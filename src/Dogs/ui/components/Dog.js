import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { DogsAPIListFactory } from '../../usecases/DogController';


const Dog = ({breed, subBreed}) => {
    const [image, setImage] = useState(null);
    var _isMounted = false;

    useEffect(() => {
        _isMounted =true;
        const getImage = async () => {
            try{
                const dogsController = DogsAPIListFactory.buildDogListController();
                const imageURI = await dogsController.getDogImage({ breed, subBreed});
                setImage(imageURI);
            }catch(err){
                console.log(err);
            }
        }

        if(_isMounted && !image){
            getImage();
        }

        return () => {
            _isMounted = false;
        }
    }, [])

    return (
        <View style={styles.container}>
            {image && (
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: image}}
                    style={styles.image}
                />
            </View>)
                }
            <View style={styles.textContainer}>
                <Text style={styles.text}>{subBreed && `${subBreed} `}{breed}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8
    },
    imageContainer: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 8,
        alignItems: 'center'
    },
    textContainer: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    text: {
        fontWeight: "bold",
        fontSize: 24,
        textTransform: "capitalize"
    },
    image: {
        width: 300,
        height: 200,
    }
})

export default Dog
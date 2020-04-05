import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { DogsAPIListFactory } from '../../usecases/DogController';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';


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
    }, [subBreed])

    return (
        <View style={styles.container}>
            <Image
                source={image ? {uri: image} :require('../../../assets/images/dogDummy.png')}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{subBreed && `${subBreed} `}{breed}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 1
        
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
        width: '100%',
        height: 160,
    }
})

export default Dog
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
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
            <ImageBackground
                source={image ? {uri: image} :require('../../../assets/images/dogDummy.png')}
                style={styles.image}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{subBreed && `${subBreed} `}{breed}</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 8,
        marginVertical: 8,
        elevation: 1,
        height: 160
        
    },
    textContainer: {
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'black',
        opacity: 0.6,
        height: '100%',
        justifyContent: 'center',
        color:'white'
    },
    text: {
        fontWeight: "bold",
        fontSize: 30,
        textTransform: "capitalize",
        color: 'white'
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default Dog
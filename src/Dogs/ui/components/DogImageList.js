import React, { useState, useEffect } from 'react';
import { DogsAPIListFactory } from '../../usecases/DogController';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import Layout from './DogsListLayout';
import Separator from './Separator';
import Empty from './Empty';


const DogImageList = ({ navigation, dog }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const fetchImages = async () => {
            const dogController = DogsAPIListFactory.buildDogListController();
            const data = await dogController.getDogImages(dog);
            setImages(data);
            setLoading(false);
        }

        fetchImages();
    },[dog]);

    const renderEmpty = () => (
        <Empty text={loading ? "Cargando..." : "No hay imagenes del perro"} />
    )

    return (
        <View style={{flex: 1, paddingBottom: 16}}>
            <Layout title={dog.breed}>
                <FlatList
                    data={images}
                    renderItem={({ item }) =>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: item}} style={styles.image} />
                        </View>
                    }
                    keyExtractor={({ item }, i) => i.toString()}
                    initialNumToRender={10}
                    ItemSeparatorComponent={Separator}
                    ListEmptyComponent={renderEmpty}
                />
            </Layout>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 400,
        marginHorizontal: 8,
        marginVertical: 16
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
})

export default DogImageList;
import React, { useState, useEffect, useContext } from 'react';
import { DogsAPIListFactory } from '../../usecases/DogController';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import Layout from './DogsListLayout';
import Separator from './Separator';
import Empty from './Empty';
import { DogDetailContext } from '../../contexts/DogDetailContext';
import CircularProgress from './CircularProgress';

const DogImageList = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const dog = useContext(DogDetailContext).dog;
    
    useEffect(()=>{
        const fetchImages = async () => {
            setLoading(true);
            const dogController = DogsAPIListFactory.buildDogListController();
            const data = await dogController.getDogImages(dog ? dog : { id: 3, breed: 'african', subBreed: null});
            setImages(data);
            setLoading(false);
        }
        fetchImages();
    },[dog]);

    const renderEmpty = () => loading ? (
        <CircularProgress />
    ) : (
        <Empty text="No hay imagenes del perro" />
    );

    return (
        <View style={{flex: 1, paddingBottom: 16}}>
            <Layout>
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
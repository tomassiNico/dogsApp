import React, { useState, useEffect } from 'react';
import { DogsAPIListFactory } from '../../usecases/ListDogs';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Layout from './DogsListLayout';
import Empty from './Empty';
import Separator from './Separator';
import Dog from './Dog';

const DogsList = () => {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const dogsController = DogsAPIListFactory.buildDogListController();
            const dogList = await dogsController.getDogList();
            setDogs(dogList);
        };

        fetchData();
    }, []);

    const renderEmpty = () => (
        <Empty text="No hay perros disponibles" />
    )

    const itemSeparator = () => (
        <Separator />
    )

    return (
        <View>
            <Layout title="Lista de perros">
                <FlatList
                    data={dogs}
                    ListEmptyComponent={renderEmpty}
                    ItemSeparatorComponent={itemSeparator}
                    renderItem={({ item : {id, breed, subBreed}}) => <Dog key={id} breed={breed} subBreed={subBreed} />}
                    keyExtractor={({ id }) => id.toString()}
                />
            </Layout>
        </View>
    )
}

export default DogsList;
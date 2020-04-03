import React, { useState, useEffect } from 'react';
import { DogsAPIListFactory } from '../../usecases/ListDogs';
import { View, FlatList, Text } from 'react-native';
import Layout from './DogsListLayout';
import Empty from './Empty';
import Separator from './Separator';

const DogItem = ({ breed, subBreed }) => (
    <Text>{subBreed} {breed}</Text>
);

const DogsList = () => {
    /* const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const dogsController = DogsAPIListFactory.buildDogListController();
            const dogList = await dogsController.getDogList();
            YellowBox.ignoreWarnings(['Warning: ...']);
            setDogs(dogList);
        };

        fetchData();
    }, []); */
    const dogs = [
        {
            id: 'bree',
            breed: 'dogo',
            subBreed: 'argentino'
        },
        {
            id: 'bre2',
            breed: 'Bulldog',
            subBreed: 'Frances'
        },
        {
            id: 'br2e2',
            breed: 'Bulldog',
            subBreed: 'Aleman'
        },
    ]

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
                    renderItem={({ item : {breed, subBreed}}) => <DogItem breed={breed} subBreed={subBreed} />}
                />
            </Layout>
        </View>
    )
}

export default DogsList;
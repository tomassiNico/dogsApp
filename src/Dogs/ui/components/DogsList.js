import React, { useState, useEffect, useRef } from 'react';
import { DogsAPIListFactory } from '../../usecases/DogController';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TextInput from './TextInput';
import Layout from './DogsListLayout';
import Empty from './Empty';
import Separator from './Separator';
import Dog from './Dog';

const DogsList = () => {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [textInput, onChangeInput] = useState('')
    const [showFloatingButton, setShowFloatingButtonn] = useState(false);
    const flatListRef = useRef();
    
    useEffect(() => {
        const fetchData = async () => {
            const dogsController = DogsAPIListFactory.buildDogListController();
            const dogList = await dogsController.getDogList();
            setDogs(dogList);
            setLoading(false);
        };

        fetchData();
    }, []);

    const renderEmpty = () => (
        <Empty text={loading ? "Cargando..." : "No hay perros disponibles"} />
    )

    const itemSeparator = () => (
        <Separator />
    )

    const toTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0});
    }

    const onScroll = (e) => {
        if(e.nativeEvent.contentOffset.y === 0){
            setShowFloatingButtonn(false);
        }else if(!showFloatingButton){
            setShowFloatingButtonn(true);
        }
    }

    const onChangeText = text => {
        onChangeInput(text);
        const dogsController = DogsAPIListFactory.buildDogListController();
        setDogs(dogsController.filterDogs(text));
    }

    return (
        <View style={{flex: 1, paddingBottom: 16}}>
            <Layout title="Lista de perros">
                <FlatList
                    ref={flatListRef}
                    onScroll={onScroll}
                    data={dogs}
                    ListEmptyComponent={renderEmpty}
                    ItemSeparatorComponent={itemSeparator}
                    renderItem={({ item : {id, breed, subBreed}}) => <Dog key={id} breed={breed} subBreed={subBreed} />}
                    keyExtractor={({ id }) => id.toString()}
                    initialNumToRender={10}
                    ListHeaderComponent={<TextInput onChangeText={onChangeText} value={textInput} />}
                />
                {showFloatingButton && (
                    <TouchableOpacity onPress={toTop} style={styles.floatinButton}>
                        <Text style={styles.arrow}>↑</Text>
                    </TouchableOpacity>
                )}
            </Layout>
        </View>
    )
}

const styles = StyleSheet.create({
    floatinButton: {
        position: 'absolute',
        backgroundColor: '#9eb93f',
        right: 20,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrow: {
        fontSize: 35,
        fontWeight: 'bold',
        top: -3,
        left: -0.5
    }
})

export default DogsList;
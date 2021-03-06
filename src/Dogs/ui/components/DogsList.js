import React, { useState, useEffect, useRef, useContext } from 'react';
import { DogsAPIListFactory } from '../../usecases/DogController';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import TextInput from './TextInput';
import Layout from './DogsListLayout';
import Empty from './Empty';
import Separator from './Separator';
import Dog from './Dog';
import { DogDetailContext } from '../../contexts/DogDetailContext';
import CircularProgress from './CircularProgress';



const DogsList = ({ navigation }) => {
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
        if(!dogs.length){
            fetchData();
        }
    }, []);

    const renderEmpty = () => loading ? (
        <CircularProgress />
    ) : (
        <Empty text="No hay perros disponibles" />
    );

    const itemSeparator = () => (
        <Separator />
    )

    const toTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0});
    }

    const onScroll = (e) => {
        // TODO: verificar esto ya que genera que se vuelvan a pedir las imagenes de los perros
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
        <View style={{flex: 1}}>
            <Layout>
                <FlatList
                    ref={flatListRef}
                    onScroll={onScroll}
                    data={dogs}
                    ListEmptyComponent={renderEmpty}
                    ItemSeparatorComponent={itemSeparator}
                    renderItem={({ item : {id, breed, subBreed}}) => <DogWithNavigation navigation={navigation} key={id} breed={breed} subBreed={subBreed} />}
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

const DogWithNavigation = ({navigation, id, breed, subBreed}) => {
    const contextValue = useContext(DogDetailContext);
    
    const onPressDog = (breed, subBreed) => {
        const dogsController = DogsAPIListFactory.buildDogListController();
        const dog = dogsController.findDog(breed, subBreed);
        contextValue.changeDog(dog);
        navigation.navigate('Detail', { title: `${dog.fullName()}`});
    }
    
    return (
        <TouchableOpacity onPress={() => onPressDog(breed, subBreed)}>
            <Dog key={id} breed={breed} subBreed={subBreed} />
        </TouchableOpacity>
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
        justifyContent: 'center',
        
    },
    arrow: {
        fontSize: 35,
        fontWeight: 'bold',
        top: -3,
        left: -0.5
    },
    circularProgress: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DogsList;
import React from 'react';

export const initDog = {
    id: 1,
    breed: 'african',
    subBreed: null
};

export const DogDetailContext = React.createContext({
    dog: initDog,
    changeDog: () => {}
});
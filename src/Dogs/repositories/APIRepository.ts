import Dog from '../entitties/Dog';
import Repository from './Repository';

export default class DogApiRepository extends Repository {
    getDogsList(): Promise<Array<Dog>> {
        return new Promise(async (res, rej) => {
            try { 
                let responseJson : any = await this.fetchData();
                let dogs : Array<Dog> = this.JSONtoDogs(responseJson);
                res(dogs);
            }catch(err){
                console.error(err);
                rej(err);
            }
        })
    }
    
    fetchData(): Promise<any> { 
        return fetch('https://dog.ceo/api/breeds/list/all')
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }
    
    JSONtoDogs(json : any) : Array<Dog> {
        let dogs : Array<Dog> = [];
        let id : any = 0;
        let jsonDogs : any = json.message;
        for(var attr in jsonDogs){
            id = id+1;
            let dog : Dog;
            let breed : Array<string> = jsonDogs[attr];
            if (breed.length > 0){
                breed.forEach((subBreed, index) => {
                    dog = new Dog(id, attr, subBreed);
                    dogs = dogs.concat(dog);
                    if(index+1 !== breed.length){
                        id = id+1;
                    }
                })
            }else{
                dog = new Dog(id, attr);
                dogs = dogs.concat(dog);
            }
        }

        return dogs
    }

}
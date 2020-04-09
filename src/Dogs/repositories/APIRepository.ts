import Dog from '../entities/Dog';
import Repository from './Repository';

export default class DogApiRepository extends Repository {
    BASEAPI : String = 'https://dog.ceo/api/';
    dogs : Array<Dog> = [];
    static instance : DogApiRepository;

    static getInstance(): DogApiRepository {
        if(!this.instance){
            this.instance = new DogApiRepository();
        }
        return this.instance
    }

    getDogImage(dog: Dog): Promise<String> {
        return new Promise( async (res, rej) => {
            try{
                let endpoinBreed = `${dog.breed}${dog.subBreed ? '/'+dog.subBreed : ''}`
                let responseJSON : any = await this.fetchData(`breed/${endpoinBreed}/images/random`);
                let image : String = responseJSON.message;
                res(image);
            }catch(err){
                console.error(err);
                rej(err);
            }
        });
    }
    
    getImages(dog: Dog) : Promise<Array<String>> {
        return new Promise(async (res, rej) => {
            try{
                let endpoinBreed = `${dog.breed}${dog.subBreed ? '/'+dog.subBreed : ''}`
                let responseJSON : any = await this.fetchData(`breed/${endpoinBreed}/images`);
                let images : Array<String> = responseJSON.message;
                res(images);
            }catch(err){
                console.error(err);
                rej(err);
            }
        })
    }

    getDogsList(): Promise<Array<Dog>> {
        return new Promise(async (res, rej) => {
            try {
                if(this.dogs.length < 1){
                    let responseJson : any = await this.fetchData('breeds/list/all');
                    const dogs = this.JSONtoDogs(responseJson);
                    this.dogs = dogs;
                }
                res(this.dogs);
            }catch(err){
                console.error(err);
                rej(err);
            }
        })
    }
    
    fetchData(endpoint): Promise<any> { 
        return fetch(this.BASEAPI+endpoint)
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
import Repository from "../repositories/Repository"
import DogApiRepository from "../repositories/APIRepository";
import Dog from "../entities/Dog";

class DogController {
    repository : Repository;
    dogList : Array<Dog> = [];

    setReposotory(repo : Repository){
        this.repository = repo;
    }

    async getDogList() : Promise<Array<Dog>> {
        try{
            let dogs : Array<Dog> = await this.repository.getDogsList();
            this.dogList = dogs;
            return dogs;
        }catch(err){
            return err
        }
    }

    async getDogImage(dog : Dog) : Promise<String> {
        try{
            let image : String = await this.repository.getDogImage(dog);
            return image;
        }catch(err){
            return err
        }
    }

    async getDogImages(dog : Dog) : Promise<Array<String>> {
        try{
            let dogsImages : Array<String> = await this.repository.getImages(dog);
            return dogsImages
            
        }catch(err){
            return err
        }
    }

    findDog(breed : string , subBreed : string) : Dog {
        let dog : Dog;
        dog = this.dogList.find(dog => (dog.breed === breed && dog.subBreed === subBreed));
        return dog
    }

    filterDogs(inputDog : string) : Array<Dog> {
        const filterDogs = this.dogList.filter(dog => (dog.fullName().indexOf(inputDog.toLowerCase()) > -1));
        return filterDogs;
    }
}

export class DogsAPIListFactory {
    static instance : DogController;

    static buildDogListController() : DogController {
        if(!this.instance){
            this.instance = new DogController();
            const repo : Repository = DogApiRepository.getInstance();
            this.instance.setReposotory(repo);
        }
        return this.instance;
    }
}
import Repository from "../repositories/Repository"
import DogApiRepository from "../repositories/APIRepository";
import Dog from "../entities/Dog";

class DogController {
    repository : Repository;
    dogList : Array<Dog>;

    setReposotory(repo : Repository){
        this.repository = repo;
    }

    async getDogList() : Promise<Array<Dog>> {
        try{
            let dogs : Array<Dog> = await this.repository.getDogsList();
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
}

export class DogsAPIListFactory {
    static buildDogListController() : DogController {
        const dogsList :  DogController = new DogController();
        const repo : DogApiRepository = new DogApiRepository();
        dogsList.setReposotory(repo);
        return dogsList;
    }
}
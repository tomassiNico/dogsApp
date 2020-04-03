import Repository from "../repositories/Repository"
import DogApiRepository from "../repositories/APIRepository";
import Dog from "../entitties/Dog";

class DogListController {
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
}

export class DogsAPIListFactory {
    static buildDogListController() : DogListController {
        const dogsList :  DogListController = new DogListController();
        const repo : DogApiRepository = new DogApiRepository();
        dogsList.setReposotory(repo);
        return dogsList;
    }
}
import Dog from '../entities/Dog'; 

export default abstract class Repository {
    protected constructor() {};

    abstract getDogsList() : Promise<Array<Dog>>;
    abstract getDogImage(dog : Dog) : Promise<String>;
} 
import Dog from '../entitties/Dog'; 

export default abstract class Repository {
    abstract getDogsList() : Promise<Array<Dog>>;
} 
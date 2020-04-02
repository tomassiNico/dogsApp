export default class Dog {
    id : String;
    breed : String;
    subBreed : String;
    constructor(id: string, breed : string, subBreed ?: string){
        this.id = id;
        this.breed = breed;
        this.subBreed = subBreed;
    }

    fullName() : String {
        return `${this.subBreed ? this.subBreed + ' ' : ''}${this.breed}`
    }
}
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
        let fullName = `${this.subBreed ? this.subBreed + ' ' : ''}${this.breed}`;
        fullName = fullName.toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');

        return fullName
    }
}
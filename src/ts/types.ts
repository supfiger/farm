export interface IMinMax {
  min: number;
  max: number;
  decimal?: number;
}

export interface IAnimalsInput {
  [key: string]: {
    [key: string]: IMinMax;
  };
}

interface IAnimal {
  name: string;
  age: number;
  gender: Gender;
  children?: Children;
}

export type AnimalChildren = IAnimal[];

export interface IAnimalProps {
  deathYear: IMinMax;
  pregnancyStartsFrom: IMinMax;
  pregnancyDuration: IMinMax;
  twins: IMinMax;
  givingBirth: IMinMax;
}

export interface IAnimalParent {
  age: number;
  name: number;
}

export type AnimalClass = IAnimalProps &
  IAnimal & {
    childIndex: number;
    type: string;
    parent?: object;
  };

interface ITwins {
  twins: IAnimal[];
}

export type Gender = "boy" | "girl";
type Children = IAnimal[] | ITwins;

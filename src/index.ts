import animals from "./ts/input";
import {
  randomNumberWithDecimalInRange,
  numberToArray,
  getGender,
} from "./ts/utils";
import { IAnimalProps, IAnimalParent, IAnimalsInput } from "./ts/types";

class Animal {
  readonly deathYear = this.setRandomValue("deathYear");
  readonly pregnancyStartsFrom = this.setRandomValue("pregnancyStartsFrom");
  readonly gender = getGender();
  public _age = this.createAge();

  constructor(
    readonly props: IAnimalProps,
    readonly kind: string,
    readonly parent: IAnimalParent,
    readonly childIndex: number,
    public treeDepthAmount: number
  ) {}

  get isParent(): boolean {
    return Boolean(this?.parent);
  }

  get canGiveBirth(): boolean {
    return Boolean(
      this.gender === "girl" &&
        this.treeDepthAmount > 0 &&
        this.age > this.setRandomValue("pregnancyDuration")
    );
  }

  createAge(): number {
    const decimal = 2;
    const min = 0;
    const max = this.isParent
      ? this.parent.age - this.pregnancyDuration
      : this.deathYear;

    return (this._age = randomNumberWithDecimalInRange({ min, max, decimal }));
  }

  get name(): string {
    const singularAnimal = this.kind.slice(0, -1);
    const postfix = `-${this.childIndex}`;
    const name = this.isParent ? this.parent.name : singularAnimal;

    return name + postfix;
  }

  get animalInfo(): IAnimalParent {
    const { age, name } = this;

    return { age, name };
  }

  get children() {
    return this.canGiveBirth
      ? new AnimalChildren({
          parent: this.animalInfo,
          props: this.props,
          kind: this.kind,
          childIndex: this.childIndex,
          treeDepthAmount: this.treeDepthAmount,
        }).create()
      : false;
  }

  get age(): number {
    return this._age;
  }

  set age(twinAge: number) {
    this._age = twinAge;
  }

  set pregnancyDuration(random: number) {
    this.pregnancyDuration = random;
  }

  setRandomValue(field: string, decimal = 2): number {
    return randomNumberWithDecimalInRange({
      min: this.props[field].min,
      max: this.props[field].max,
      decimal,
    });
  }

  downgradeTree(): void {
    this.treeDepthAmount -= 1;
  }

  create(twinsAge: number) {
    this.downgradeTree();
    this.age = twinsAge;

    const name = this.name;
    const age = this.age;
    const gender = this.gender;
    const children = this.children;

    return { name, age, gender, ...(children && { children }) };
  }
}

class AnimalChildren {
  constructor({ ...args }) {
    const { kind, props, treeDepthAmount, parent } = args;

    this.kind = kind;
    this.parent = parent || null;
    this.treeDepthAmount = treeDepthAmount;
    this.props = props;
  }

  get childrenArray() {
    const min = 0;
    const max = this.parent ? this.parent.givingBirth : 18;
    const randomChildrenAmount = randomNumberWithDecimalInRange({ min, max });
    const childrenArray = numberToArray(randomChildrenAmount);
    const isNotFirstGeneration = this.parent;
    const children = !isNotFirstGeneration
      ? this.createTwinsArray(childrenArray)
      : childrenArray;

    console.log("children:", children);

    return children;
  }

  areTwins(birth) {
    return Object.keys(birth).length;
  }

  createRandom(field, decimal = 0) {
    return randomNumberWithDecimalInRange({
      min: this.props[field].min,
      max: this.props[field].max,
      decimal,
    });
  }

  createTwinsArray(arr) {
    console.log("this:", this);
    return arr.map(() => {
      const randomTwinsAmount = this.parent ? this.createRandom("twins") : null;
      return numberToArray(randomTwinsAmount);
    });
  }

  createChild({ twinsAge, index }) {
    return new Animal({
      parent: this.parent,
      kind: this.kind,
      treeDepthAmount: this.treeDepthAmount,
      childIndex: index + 1,
      props: this.props,
    }).create(twinsAge);
  }

  createTwinsAge({ prev, index }) {
    return prev.length ? prev[index - 1].age : null;
  }

  createTwins(arr) {
    const children = arr.reduce((prev, _, index) => {
      const twinsAge = this.createTwinsAge({ prev, index });
      const child = this.createChild({ twinsAge, index });

      return [...prev, child];
    }, []);

    return { twins: children };
  }

  create() {
    return this.childrenArray.reduce((prev, curr, index) => {
      const birth = this.areTwins(curr)
        ? this.createTwins(curr)
        : this.createChild({ index });

      return [...prev, birth];
    }, []);
  }
}

class Farm {
  constructor(readonly animals: IAnimalsInput) {}

  generateAnimalTree(kind: string, props: object) {
    const treeDepthAmount = randomNumberWithDecimalInRange({ min: 2, max: 5 });
    return new AnimalChildren({ kind, props, treeDepthAmount }).create();
  }

  create() {
    return Object.entries(this.animals).reduce(
      (obj, [kind, props]) => ({
        ...obj,
        [kind]: this.generateAnimalTree(kind, props),
      }),
      {}
    );
  }
}

const farm1 = new Farm(animals).create();

console.log("---------------");
console.log("farm1:", farm1);

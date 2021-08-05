import animals from "./ts/input";
import { randomNumberWithDecimalInRange, numberToArray, generateGender } from "./ts/utils";
import { IAnimalProps, IAnimalParent, IAnimalsInput, AnimalChildren } from "./ts/types";

class Animal {
  readonly lifeDuration = this.generateRandomValue("lifeDuration");
  readonly pregnancyStartsFrom = this.generateRandomValue("pregnancyStartsFrom");
  readonly gender = generateGender();
  public _age = this.generateAge();

  constructor(
    readonly props: IAnimalProps,
    readonly parent: IAnimalParent,
    readonly kind: string,
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
        this.age > this.generateRandomValue("pregnancyDuration")
    );
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

  get children(): AnimalChildren {
    return this.canGiveBirth
      ? new Children({
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

  generateAge(): number {
    const decimal = 2;
    const min = 0;
    const max = this.isParent ? this.parent.age - this.pregnancyDuration : this.lifeDuration;

    return (this._age = randomNumberWithDecimalInRange({ min, max, decimal }));
  }

  generateRandomValue(field: string, decimal = 2): number {
    return randomNumberWithDecimalInRange({
      min: this.props[field as keyof IAnimalProps].min,
      max: this.props[field as keyof IAnimalProps].max,
      decimal,
    });
  }

  downgradeTree(): void {
    this.treeDepthAmount -= 1;
  }

  create(twinsAge: number) {
    this.downgradeTree();
    if (twinsAge) this.age = twinsAge;

    const name = this.name;
    const age = this.age;
    const gender = this.gender;
    const children = this.children;

    return { name, age, gender, ...(children && { children }) };
  }
}

class Children {
  constructor(
    readonly parent: IAnimalParent,
    readonly props: IAnimalProps,
    readonly isFirstGeneration: boolean,
    readonly kind: string,
    public treeDepthAmount: number
  ) {}

  generateChildrenArray() {
    const min = 0;
    const max = this.isFirstGeneration ? this.props.givingBirth : 18;
    const randomChildrenAmount = randomNumberWithDecimalInRange({ min, max });
    const childrenArray = numberToArray(randomChildrenAmount);
    const children = this.isFirstGeneration
      ? childrenArray
      : this.generateTwinsArray(childrenArray);

    return children;
  }

  areTwins(birth: []): boolean {
    return Boolean(Object.keys(birth).length);
  }

  generateRandomValue(field: string, decimal = 2): number {
    return randomNumberWithDecimalInRange({
      min: this.props[field as keyof IAnimalProps].min,
      max: this.props[field as keyof IAnimalProps].max,
      decimal,
    });
  }

  generateTwinsArray(arr: number[]): number[][] {
    return arr.map(() => {
      const randomTwinsAmount = this.generateRandomValue("twins");
      return numberToArray(randomTwinsAmount);
    });
  }

  getTwinsAge({ prev, index }) {
    return prev.length ? prev[index - 1].age : null;
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

  createTwins(arr) {
    const children = arr.reduce((prev, _, index) => {
      const twinsAge = this.getTwinsAge({ prev, index });
      const child = this.createChild({ twinsAge, index });

      return [...prev, child];
    }, []);

    return { twins: children };
  }

  create() {
    return this.generateChildrenArray().reduce((prev, curr, index) => {
      const birth = this.areTwins(curr) ? this.createTwins(curr) : this.createChild({ index });

      return [...prev, birth];
    }, []);
  }
}

class Farm {
  constructor(readonly animals: IAnimalsInput) {}

  generateAnimalTree(kind: string, props: object) {
    const treeDepthAmount = randomNumberWithDecimalInRange({ min: 2, max: 5 });
    return new Children({ kind, props, treeDepthAmount }).create();
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

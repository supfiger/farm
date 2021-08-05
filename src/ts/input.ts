import { IAnimalsInput } from "./types";

const animals = {
  Dogs: {
    lifeDuration: {
      min: 10,
      max: 13,
    },
    pregnancyStartsFrom: {
      min: 1.5,
      max: 1.83,
    },
    pregnancyDuration: {
      min: 0.15,
      max: 0.19,
    },
    givingBirth: {
      min: 0,
      max: 6,
    },
    twins: {
      min: 3,
      max: 8,
    },
  },
  // Cats: {
  //   pregnancy: {
  //     twins: {
  //       max: 4,
  //       ratio: 1000,
  //     },
  //     startsFrom: {
  //       min: 1.33,
  //       max: 1.49,
  //     },
  //     duration: {
  //       min: 0.68,
  //       max: 0.84,
  //     },
  //   },
  //   lifeDuration: {
  //     min: 18,
  //     max: 22,
  //   },
  // },
  // Cows: {
  //   pregnancy: {
  //     twins: {
  //       max: 2,
  //       ratio: 1000,
  //     },
  //     startsFrom: {
  //       min: 1.33,
  //       max: 1.49,
  //     },
  //     duration: {
  //       min: 0.68,
  //       max: 0.84,
  //     },
  //   },
  //   lifeDuration: {
  //     min: 18,
  //     max: 22,
  //   },
  // },
};

export default animals;

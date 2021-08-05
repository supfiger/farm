import { Gender, IMinMax } from "./types";

export const randomNumberWithDecimalInRange = ({
  min,
  max,
  decimal = 0,
}: IMinMax): number => {
  return +(Math.random() * (max - min + min)).toFixed(decimal);
};

export const numberToArray = (num: number): number[] => {
  return Array(num)
    .fill(num)
    .map((item, index) => index);
};

export const generateGender = (): Gender => {
  const genders: string[] = ["boy", "girl"];
  const random: number = randomNumberWithDecimalInRange({ min: 0, max: 1 });

  return genders[random] as Gender;
};

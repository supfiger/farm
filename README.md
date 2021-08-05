# Project name: Farm

## Requirements:

1. Create a farm based given types and props of animals
2. Names of animals should go in order, e.g: "Dog-1", "Dog-2", "Dog-3"
3. Names of animal children should go in order, based on the all tree, based on the parent name, e.g: "Dog-1-2-4-1", "Dog-1-2-4-2", "Dog-1-2-4-3"
4. There are two genders: "boy" and "girl"
5. Give a birth can animals only with a gender "girl"
6. Children must be younger than their parents
7. Twins should be the same age
8. If children are twins, show it (in a simple and understandable way)
9. Family tree depth should be unique for each animal type (e.g. "Dogs" will have 5 generations, "Cats" - 3, "Cows" - 6)
10. Animal cannot give a birth until it grew up to the age minimum age by field "pregnancyStartsFrom"
11. All animal props must be taken into account
12. You can choose output farm type up to you (objects or arrays), but it should be understandable
13. All number values should be generated randomly (family tree depth/age/amount of children, etc)
14. Empty fields should not be in an output
15. You should use numbers with two decimal where it needed (for generating age)
16. Animal should consist such fields: 1) name; 2) age; 3) gender; 4) children (if there is a possibility)
17. Farm should be able to be displayed in the console

Input:
\`
{
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
twins: {
min: 3,
max: 8,
},
givingBirth: 6,
},
}
`
Output example:
{
Dogs: [
{
name: "Dog-1",
age: 7.91,
gender: "girl",
children: [
{
twins: [
{ name: "Dog-1-2", age: 3.55, gender: "girl", children: {} },
{ name: "Dog-1-2", age: 3.55, gender: "boy" },
{ name: "Dog-1-3", age: 3.55, gender: "boy" },
],
},
{
twins: [
{ name: "Dog-1-4", age: 2.1, gender: "girl", children: {} },
{ name: "Dog-1-5", age: 2.1, gender: "boy" },
{ name: "Dog-1-6", age: 2.1, gender: "boy" },
],
},
{ name: "Dog-1-7", age: 0.4, gender: "girl" },
],
},
{
name: "Dog-2",
age: 4.87,
gender: "boy",
},
],
Cats: [],
Cows: [],
};

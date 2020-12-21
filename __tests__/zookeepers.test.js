const fs = require('fs');
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers');


jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Ralph", id: "9er" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Ralph");
    expect(zookeeper.id).toBe("9er");
});

test("filters zookeepers by query", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        }
    ];

    const updatedZookeepers = filterByQuery({ age: "28" }, startingZookeepers);
    
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds zookeeper by Id", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        }
    ];

    const result = findById("1", startingZookeepers);
    expect(result.name).toBe("Raksha");
});

test("validate the zookeeper's age", () => {
    const zookeeper = {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin"
    }

    const invalidZookeeper = {
        id: "3",
        name: "Benny",
        age: "twenty-four",
        favoriteAnimal: "baboons"
    }

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});
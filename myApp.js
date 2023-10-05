const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const janeDoe = new Person({
    name: 'Jane Doe',
    age: 26,
    favoriteFoods: ['Mac and Cheese', 'Garlic Bread', 'Ramen']
  });

  janeDoe.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.forEach((person) => {
    const newPerson = new Person({
      name: person.name,
      age: person.age,
      favoriteFoods: person.favoriteFoods,
    })
    newPerson.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    });
  });
};

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, personFound) {
    if(err) return console.error(err);
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId}, (err, personFound) => {
    if(err) return console.error(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId}, (err, personFound) => {
    if(err) return console.error(err);
    personFound.favoriteFoods = personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, data) => {
      if(err) return console.error(err);
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

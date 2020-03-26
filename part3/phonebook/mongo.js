const mongoose = require('mongoose');

const argNum = process.argv;

if (argNum.length < 3) {
  console.log('Please specify password...');
  console.log('Usage: node mongo.js password [name] [number]');
  process.exit(1);
}

if (argNum.length !== 5 && argNum.length !== 3) {
  console.log('Please put correct arguments...');
  console.log('Usage: node mongo.js password [name] [number]');
  process.exit(1);
}

const password = argNum[2];
const contactName = argNum[3];
const contactNumber = argNum[4];

const url =
`mongodb+srv://fullstack:${password}@first-project-k8eou.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true })
  .catch((error) => { console.log(error); });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', phonebookSchema);

if (contactName === undefined && contactNumber === undefined) {
  Contact.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const contact = new Contact({
    name: contactName,
    number: contactNumber,
  });

  contact.save().then((result) => {
    console.log(`added ${result.name} ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

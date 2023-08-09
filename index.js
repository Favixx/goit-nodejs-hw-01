const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
    try {
        switch (action) {
            case 'list':
                const contacts = await listContacts();
                console.table(contacts);
                break;

            case 'get':
                const contact = await getContactById(id);
                console.log(contact);
                break;

            case 'add':
                const newContact = await addContact(name, email, phone);
                console.log('New contact added:', newContact);
                break;

            case 'remove':
                const removedContact = await removeContact(id);
                console.log('Removed contact:', removedContact);
                break;

            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

invokeAction(argv);

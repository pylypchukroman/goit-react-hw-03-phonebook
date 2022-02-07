import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Filter from './Filter/Filter.jsx';
import ContactForm from './contactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'rosie simpson', number: '459-12-56' },
      { id: 'id-6', name: 'hermione kline', number: '443-89-12' },
      { id: 'id-7', name: 'eden clements', number: '645-17-79' },
      { id: 'id-8', name: 'annie copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    const checkedName = this.state.contacts.some(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );
    checkedName
      ? Notify.failure(`${name} is already in contacts.`)
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  getCurrentContacts = () => {
    const { filter, contacts } = this.state;
    const noRegisterRequest = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(noRegisterRequest)
    );
    return filteredContacts;
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  render() {
    const currentContactList = this.getCurrentContacts();
    const { filter } = this.state;
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} changeFilter={this.changeFilter} />
        <ContactList
          contacts={currentContactList}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;

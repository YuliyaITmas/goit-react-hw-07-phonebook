import React from 'react';
import { FiUserMinus } from 'react-icons/fi';

import { List, Item, Name, Number, Delete } from './ContactList.styled';

import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from '../../redux/contactsApi';
import Loader from 'components/Loader/Loader';
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const { data: contacts, isLoading, error } = useGetContactsQuery();

  const [deleteContacts, { isLoading: isDeletingContact }] =
    useDeleteContactMutation();

  const filter = useSelector(state => state.filter);


  let filteredContacts = contacts;

  if (filter && filter.trim() !== '') {
    const normalizedFilter = filter.toLowerCase().trim();
    console.log(normalizedFilter);
    filteredContacts = filteredContacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.phone.includes(normalizedFilter)
    );
  }

  const handleDelete = id => {
    deleteContacts(id);
  };

  return (
    <>
      {error && <h2>{error}</h2>}
      {isLoading && <Loader />}
      <List>
        {contacts &&
          filteredContacts.map(({ name, phone, id }) => {
            return (
              <Item key={id}>
                <Name>{name}:</Name>
                <div>
                  <Number>{phone}</Number>
                  <Delete
                    type="button"
                    onClick={() => handleDelete(id)}
                    aria-label="Delete contact"
                    disabled={isDeletingContact || isLoading}
                  >
                    {isDeletingContact ? (
                      <RotatingLines width="26" strokeColor="grey" />
                    ) : (
                      <FiUserMinus size={26} />
                    )}
                  </Delete>
                </div>
              </Item>
            );
          })}
      </List>
    </>
  );
};

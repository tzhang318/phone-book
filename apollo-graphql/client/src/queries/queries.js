import { gql } from '@apollo/client';

const PERSON = `
  name,
  phone,
  address {
    street,
    city
  }
  id
`;

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ${PERSON}
    }
  }
`;

export const FIND_PERSON_BY_NAME = gql`
  query findPersonByName($name: String!) {
    findPerson(name: $name) {
      ${PERSON}
    }
  }
`;

export const ADD_PERSON = gql`
  mutation addNewPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(
      name: $name
      phone: $phone
      street: $street
      city: $city
    ) {
      ${PERSON}
    }
  }
`;

export const UPDATE_PHONE = gql`
  mutation updatePhone($name: String! $phone: String!) {
    editPhone(name: $name phone: $phone) {
      ${PERSON}
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ${PERSON}
    }
  }
`;

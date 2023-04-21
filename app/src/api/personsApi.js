import axios from "axios";

const PERSONS_URL = '/persons';

export const getPersons = () =>
  axios.get(PERSONS_URL)
    .then(res => res.data)
    .catch(e=>{
      throw e;
    });

export const updatePerson = (person) =>
  axios.put(`${PERSONS_URL}/${person.id}`, person)
    .then(res => res.data)
    .catch(e=>{
      throw e;
    });

export const addPerson = (person) =>
  axios.post(PERSONS_URL, person)
    .then(res => res.data)
    .catch(e=>{
      throw e;
    });

export const deletePerson = id =>
  axios.delete(`${PERSONS_URL}/${id}`)
    .then(res => res.data)
    .catch(e=>{
      throw e;
    });

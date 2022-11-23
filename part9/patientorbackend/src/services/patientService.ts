import patientsData from '../../data/patients'
import { v4 as uuidv4 } from 'uuid';
import { PatientsNoSsn, Patients, NewPatient } from '../types'
; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const patients: Array<Patients> = patientsData;


const getPatients = () : Patients[] => {
  return patients
}

const getPatientsNoSssn = (): PatientsNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
      gender,
      occupation,
  }));
};


const findById = (id: string): Patients | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addPatient = ( entry: NewPatient ): Patients => {
  const newPatient = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSssn,
  addPatient,
  findById
}
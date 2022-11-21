import patientsData from '../../data/patients.json'

import { PatientsNoSsn, Patients } from '../types'

const patients: Array<Patients> = patientsData as Array<Patients>;


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


const addPatient = () => {
  return []
}

export default {
  getPatients,
  getPatientsNoSssn,
  addPatient
}
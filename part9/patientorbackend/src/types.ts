
export enum Gender {
    Male = 'male',
    Female = 'female'
}
export type PatientsNoSsn = Omit<Patients, 'ssn'>;

export type NewPatient = Omit<Patients, 'id'>;


export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;

}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string,
    gender: Gender;
    occupation: string;
}

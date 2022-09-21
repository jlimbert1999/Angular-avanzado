import { Hospital } from "./hospital.model"

interface _MedicoUser {
    _id: string
    nombre: string
    img: string
}

export class Medicos {
    constructor(
        public nombre: string,
        public hospital: Hospital,
        public _id?: string,
        public img?: string,
        public usuario?: _MedicoUser,
    ) {

    }
}
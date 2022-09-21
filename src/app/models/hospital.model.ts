interface Usuario {
    _id: string
    nombre: string
    img: string
}

export class Hospital {
    constructor(
        public nombre: string,
        public img: string,
        public usuario: Usuario,
        public _id?: string
    ) {

    }
}
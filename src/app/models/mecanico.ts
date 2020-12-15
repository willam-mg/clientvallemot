export class Mecanico {
    id: 0;
    nombre_completo: string;
    telefono: string;
    direccion: string;
    ci: string;
    email: string;
    password: string;
    especialidad: string;
    fecha_ingreso: string;
    fecha_salida: string;
    foto: string;

    constructor() {
        this.id = 0;
        this.nombre_completo = '';
        this.telefono = '';
        this.direccion = '';
        this.ci = '';
        this.email = '';
        this.password = '';
        this.especialidad = '';
        this.fecha_ingreso = '';
        this.fecha_salida = '';
        this.foto = null;
    }
}

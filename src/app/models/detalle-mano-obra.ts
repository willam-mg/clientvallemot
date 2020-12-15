export class DetalleManoObra {
    id: number;
    orden_id: number;
    descripcion: string;
    precio: number;
    fecha: string;
    constructor(){
        this.id = 0;
        this.orden_id = 0;
        this.descripcion = '';
        this.precio = 0;
        this.fecha = '';
    }
}

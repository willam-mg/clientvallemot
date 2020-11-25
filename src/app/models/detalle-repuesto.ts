import { Repuesto } from './repuesto';

export class DetalleRepuesto {
    id: any;
    orden_id: number;
    repuesto_id: number;
    precio: number;
    fecha: string;
    repuesto: Repuesto;
    constructor() {
        this.id = null;
        this.orden_id = null;
        this.repuesto_id = null;
        this.precio = null;
        this.fecha = null;
        this.repuesto = null;
    }
}

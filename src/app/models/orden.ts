import { DetalleManoObra } from './detalle-mano-obra';
import { DetalleRepuesto } from './detalle-repuesto';
import { EstadoVehiculo } from './estado-vehiculo';
import { Mecanico } from './mecanico';

export class Orden {
    id: number;
    propietario: string;
    telefono: string;
    encargado: string;
    telefono_encargado: string;
    fecha: string;
    vehiculo: string;
    placa: string;
    modelo: string;
    color: string;
    ano: string;
    tanque: string;
    solicitud: string;
    responsable: string;
    estado_vehiculo_otros: string;
    fecha_salida: string;
    km_actual: string;
    proximo_cambio: string;
    pago: string;
    detalle_pago: string;
    estado: number;
    foto: string;
    repuestos: Array<DetalleRepuesto>;
    manosobra: Array<DetalleManoObra>;
    estadoVehiculo: Array<EstadoVehiculo>;
    mecanico_id: number;
    mecanico: Mecanico;
    totalManoObra: number;
    totalRepuesto: number;

    constructor() {
        this.id = 0;
        this.propietario = '';
        this.telefono = '';
        this.encargado = '';
        this.telefono_encargado = '';
        this.fecha = '';
        this.vehiculo = '';
        this.placa = '';
        this.modelo = '';
        this.color = '';
        this.ano = '';
        this.tanque = '';
        this.solicitud = '';
        this.responsable = '';
        this.estado_vehiculo_otros = '';
        this.fecha_salida = '';
        this.km_actual = '';
        this.proximo_cambio = '';
        this.pago = '';
        this.detalle_pago = '';
        this.estado = 2;
        this.foto = '';
        this.repuestos = Array<DetalleRepuesto>();
        this.manosobra = Array<DetalleManoObra>();
        this.estadoVehiculo = Array<EstadoVehiculo>();
        this.mecanico_id = 0;
        this.mecanico = new Mecanico();
        this.totalManoObra = 0;
        this.totalRepuesto = 0;
    }
}

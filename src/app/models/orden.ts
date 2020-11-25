import { DetalleManoObra } from './detalle-mano-obra';
import { DetalleRepuesto } from './detalle-repuesto';
import { EstadoVehiculo } from './estado-vehiculo';

export class Orden {
    id: number;
    propietario: string;
    telefono: string;
    fecha: string;
    vehiculo: string;
    placa: string;
    modelo: string;
    color: string;
    ano: string;
    tanque: string;
    solicitud: string;

    tapa_ruedas: boolean;
    llanta_auxilio: boolean;
    gata_hidraulica: boolean;
    llave_cruz: boolean;
    pisos: boolean;
    limpia_parabrisas: boolean;
    tapa_tanque: boolean;
    herramientas: boolean;
    mangueras: boolean;
    espejos: boolean;
    tapa_cubos: boolean;
    antena: boolean;
    radio: boolean;
    focos: boolean;

    responsable: string;
    estado_vehiculo_otros: string;
    fecha_ingreso: string;
    fecha_salida: string;
    km_actual: string;
    proximo_cambio: string;
    pago: string;
    detalle_pago: string;
    estado: string;
    foto: string;
    repuestos: Array<DetalleRepuesto>;
    manosobra: Array<DetalleManoObra>;
    estadoVehiculo: Array<EstadoVehiculo>;

    constructor() {
        this.id = 0;
        this.tapa_ruedas = false;
        this.llanta_auxilio = false;
        this.gata_hidraulica = false;
        this.llave_cruz = false;
        this.pisos = false;
        this.limpia_parabrisas = false;
        this.tapa_tanque = false;
        this.herramientas = false;
        this.mangueras = false;
        this.espejos = false;
        this.tapa_cubos = false;
        this.antena = false;
        this.radio = false;
        this.focos = false;
    }
}

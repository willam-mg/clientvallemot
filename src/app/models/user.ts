export class User {
    id: number;
    nombre_completo: string;
    player_id: string;
    foto: string;
    email: string;
    type: number;
    password: string;
    password_confirmation: string;

    constructor(){
        this.id = 0;
        this.nombre_completo = '';
        this.player_id = '';
        this.foto = '';
        this.email = '';
        this.type = 0;
        this.password = '';
        this.password_confirmation = '';
    }
}

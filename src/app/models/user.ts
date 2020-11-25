export class User {
    id:any;
    nombre_completo:string;
    player_id:string;
    foto:any;
    email:string;
    type:number;
    password:string;
    password_confirmation:string;
    
    constructor(){
        this.id = null;
        this.password_confirmation = null;
    }
}

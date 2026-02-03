export interface Usuario {
    id: number;
    usuarios: string;
    created_at?: string;
    updated_at?: string;
}

export interface Departamento {
    id: number;
    departamento: string;
    provincia: string;
    distrito: string;
    prioridad: number | null;
    usuario_id: number;
    usuario?: Usuario;
    created_at?: string;
    updated_at?: string;
}

export interface Persona {
    id: number;
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    distrito_id: number;
    departamento?: Departamento;
    created_at?: string;
    updated_at?: string;
}

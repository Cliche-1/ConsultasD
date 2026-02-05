export interface Usuario {
    id: number;
    nombre_usuario: string;
    email?: string;
    activo: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Departamento {
    id: number;
    nombre: string;
    provincias?: Provincia[];
    created_at?: string;
    updated_at?: string;
}

export interface Provincia {
    id: number;
    nombre: string;
    departamento_id: number;
    departamento?: Departamento;
    distritos?: Distrito[];
    created_at?: string;
    updated_at?: string;
}

export interface Distrito {
    id: number;
    nombre: string;
    provincia_id: number;
    codigo_ubigeo?: string;
    prioridad: number;
    usuario_id?: number;
    provincia?: Provincia;
    usuario?: Usuario;
    created_at?: string;
    updated_at?: string;
}

export interface Persona {
    id: number;
    dni: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    distrito_id: number;
    distrito?: Distrito;
    created_at?: string;
    updated_at?: string;
}

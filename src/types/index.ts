//Types Fontanero
export type Fontanero = {
    id: string
    name: string
    phone: string
    bomba: string
    renglon: string
}

export type DraftFontanero = Omit<Fontanero, 'id'>

//Types Bomba
export type Bomba = {
    id: string
    name: string;
    direccion: string;
    bombeo: string;
    zonas: string[];
    nis: string;
}

export type DraftBomba = Omit<Bomba, 'id'>
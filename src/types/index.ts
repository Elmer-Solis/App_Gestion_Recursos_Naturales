//Types Fontanero
export type Fontanero = {
    id: string
    name: string
    phone: string
    bomba: string
}

export type DraftFontanero = Omit<Fontanero, 'id'>

//Types Bomba
export type Bomba = {
    id: string
    name: string;
    phone: string;
    bomba: string;
    zonas: string[];
}

export type DraftBomba = Omit<Bomba, 'id'>
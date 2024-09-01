
export type Fontanero = {
    id: string
    name: string
    phone: string
    bomba: string
}

export type DraftFontanero = Omit<Fontanero, 'id'>
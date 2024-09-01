
export type Fontanero = {
    id: string
    name: string
    bomba: string
}

export type DraftFontanero = Omit<Fontanero, 'id'>
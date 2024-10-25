export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      bombas: {
        Row: {
          capacidad_bombeo: string | null
          direccion: string | null
          id: number
          nombre_bomba: string
          zona_distribucion: string | null
        }
        Insert: {
          capacidad_bombeo?: string | null
          direccion?: string | null
          id?: number
          nombre_bomba: string
          zona_distribucion?: string | null
        }
        Update: {
          capacidad_bombeo?: string | null
          direccion?: string | null
          id?: number
          nombre_bomba?: string
          zona_distribucion?: string | null
        }
        Relationships: []
      }
      eventos_actividades: {
        Row: {
          fecha_fin: string
          fecha_inicio: string
          fontanero_id: number
          horas_extras: number | null
          id: number
          notas_actividad: string | null
          titulo_actividad: string
          zona_distribucion: string
        }
        Insert: {
          fecha_fin: string
          fecha_inicio: string
          fontanero_id: number
          horas_extras?: number | null
          id?: number
          notas_actividad?: string | null
          titulo_actividad: string
          zona_distribucion: string
        }
        Update: {
          fecha_fin?: string
          fecha_inicio?: string
          fontanero_id?: number
          horas_extras?: number | null
          id?: number
          notas_actividad?: string | null
          titulo_actividad?: string
          zona_distribucion?: string
        }
        Relationships: [
          {
            foreignKeyName: "eventos_actividades_fontanero_id_fkey"
            columns: ["fontanero_id"]
            isOneToOne: false
            referencedRelation: "fontaneros"
            referencedColumns: ["id"]
          },
        ]
      }
      fontaneros: {
        Row: {
          bomba_id: number | null
          id: number
          nombre: string
          telefono: string
        }
        Insert: {
          bomba_id?: number | null
          id?: number
          nombre: string
          telefono: string
        }
        Update: {
          bomba_id?: number | null
          id?: number
          nombre?: string
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "fontaneros_bomba_id_fkey"
            columns: ["bomba_id"]
            isOneToOne: false
            referencedRelation: "bombas"
            referencedColumns: ["id"]
          },
        ]
      }
      mantenimiento_bombas: {
        Row: {
          bomba_id: number
          costo: number | null
          fecha_finm: string
          fecha_iniciom: string
          id: number
          notas_mantenimiento: string | null
          tipo_mantenimiento: string
          titulo_mantenimiento: string
        }
        Insert: {
          bomba_id: number
          costo?: number | null
          fecha_finm: string
          fecha_iniciom: string
          id?: number
          notas_mantenimiento?: string | null
          tipo_mantenimiento: string
          titulo_mantenimiento: string
        }
        Update: {
          bomba_id?: number
          costo?: number | null
          fecha_finm?: string
          fecha_iniciom?: string
          id?: number
          notas_mantenimiento?: string | null
          tipo_mantenimiento?: string
          titulo_mantenimiento?: string
        }
        Relationships: [
          {
            foreignKeyName: "mantenimiento_bombas_bomba_id_fkey"
            columns: ["bomba_id"]
            isOneToOne: false
            referencedRelation: "bombas"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitud_trabajo: {
        Row: {
          bomba_distribucion_id: number | null
          fecha_ingreso: string | null
          fontanero_id: number | null
          id: number
          nombre_solicitante: string | null
          numero_expediente: number | null
          tarifa: string | null
        }
        Insert: {
          bomba_distribucion_id?: number | null
          fecha_ingreso?: string | null
          fontanero_id?: number | null
          id?: number
          nombre_solicitante?: string | null
          numero_expediente?: number | null
          tarifa?: string | null
        }
        Update: {
          bomba_distribucion_id?: number | null
          fecha_ingreso?: string | null
          fontanero_id?: number | null
          id?: number
          nombre_solicitante?: string | null
          numero_expediente?: number | null
          tarifa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_bomba_distribucion"
            columns: ["bomba_distribucion_id"]
            isOneToOne: false
            referencedRelation: "bombas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_fontanero"
            columns: ["fontanero_id"]
            isOneToOne: false
            referencedRelation: "fontaneros"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitudes_trabajo: {
        Row: {
          bomba_distribucion_id: number | null
          deposito_garantia: string | null
          direccion: string | null
          drenaje: string | null
          fecha_ingreso: string
          fecha_inspeccion: string | null
          fecha_instalacion: string | null
          fecha_recibo: string | null
          fontanero_id: number | null
          id: number
          levanto_adoquin: string | null
          monto: number | null
          monto_drenaje: number | null
          nombre_sindico_acompanio: string | null
          nombre_solicitante: string
          numero_expediente: number
          numero_medidor: string | null
          numero_orden_instalacion: number | null
          numero_recibo: number | null
          numero_recibo_drenaje: number | null
          numero_recibo_garantia: number | null
          numero_servicios: number | null
          observacion: string | null
          tarifa: string | null
          telefono: number | null
        }
        Insert: {
          bomba_distribucion_id?: number | null
          deposito_garantia?: string | null
          direccion?: string | null
          drenaje?: string | null
          fecha_ingreso: string
          fecha_inspeccion?: string | null
          fecha_instalacion?: string | null
          fecha_recibo?: string | null
          fontanero_id?: number | null
          id?: number
          levanto_adoquin?: string | null
          monto?: number | null
          monto_drenaje?: number | null
          nombre_sindico_acompanio?: string | null
          nombre_solicitante: string
          numero_expediente: number
          numero_medidor?: string | null
          numero_orden_instalacion?: number | null
          numero_recibo?: number | null
          numero_recibo_drenaje?: number | null
          numero_recibo_garantia?: number | null
          numero_servicios?: number | null
          observacion?: string | null
          tarifa?: string | null
          telefono?: number | null
        }
        Update: {
          bomba_distribucion_id?: number | null
          deposito_garantia?: string | null
          direccion?: string | null
          drenaje?: string | null
          fecha_ingreso?: string
          fecha_inspeccion?: string | null
          fecha_instalacion?: string | null
          fecha_recibo?: string | null
          fontanero_id?: number | null
          id?: number
          levanto_adoquin?: string | null
          monto?: number | null
          monto_drenaje?: number | null
          nombre_sindico_acompanio?: string | null
          nombre_solicitante?: string
          numero_expediente?: number
          numero_medidor?: string | null
          numero_orden_instalacion?: number | null
          numero_recibo?: number | null
          numero_recibo_drenaje?: number | null
          numero_recibo_garantia?: number | null
          numero_servicios?: number | null
          observacion?: string | null
          tarifa?: string | null
          telefono?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_bomba_distribucion"
            columns: ["bomba_distribucion_id"]
            isOneToOne: false
            referencedRelation: "bombas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_fontanero"
            columns: ["fontanero_id"]
            isOneToOne: false
            referencedRelation: "fontaneros"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string
          id: number
        }
        Insert: {
          email: string
          id?: number
        }
        Update: {
          email?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      horas_extras_por_mes: {
        Row: {
          fontanero: string | null
          mes: string | null
          total_horas_extras: number | null
        }
        Relationships: []
      }
      vista_mantenimiento_bombas: {
        Row: {
          fecha_finm: string | null
          fecha_iniciom: string | null
          nombre_bomba: string | null
          tipo_mantenimiento: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

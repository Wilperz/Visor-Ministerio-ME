export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      municipios: {
        Row: {
          id: string
          nombre_municipio: string
          calificacion: number
          determinante_social: number
          determinante_ambiental: number
          determinante_sectorial: number
          determinante_infraestructura: number
          zone: string
          department: string
          geom: unknown
          created_at: string
          id_grilla: number | null
        }
        Insert: {
          id?: string
          nombre_municipio: string
          calificacion: number
          determinante_social?: number
          determinante_ambiental?: number
          determinante_sectorial?: number
          determinante_infraestructura?: number
          zone?: string
          department?: string
          geom: unknown
          created_at?: string
          id_grilla?: number | null
        }
        Update: {
          id?: string
          nombre_municipio?: string
          calificacion?: number
          determinante_social?: number
          determinante_ambiental?: number
          determinante_sectorial?: number
          determinante_infraestructura?: number
          zone?: string
          department?: string
          geom?: unknown
          created_at?: string
          id_grilla?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
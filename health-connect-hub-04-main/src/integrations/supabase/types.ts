export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          ai_diagnosis: string | null
          appointment_date: string
          appointment_id: string
          created_at: string | null
          doctor_id: string
          initial_symptoms: string | null
          patient_id: string
          slot_id: string
          status: string | null
        }
        Insert: {
          ai_diagnosis?: string | null
          appointment_date: string
          appointment_id?: string
          created_at?: string | null
          doctor_id: string
          initial_symptoms?: string | null
          patient_id: string
          slot_id: string
          status?: string | null
        }
        Update: {
          ai_diagnosis?: string | null
          appointment_date?: string
          appointment_id?: string
          created_at?: string | null
          doctor_id?: string
          initial_symptoms?: string | null
          patient_id?: string
          slot_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointments_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["slot_id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          dept_id: string
          dept_name: string
          description: string | null
          location: string | null
        }
        Insert: {
          created_at?: string | null
          dept_id?: string
          dept_name: string
          description?: string | null
          location?: string | null
        }
        Update: {
          created_at?: string | null
          dept_id?: string
          dept_name?: string
          description?: string | null
          location?: string | null
        }
        Relationships: []
      }
      disease_symptoms: {
        Row: {
          disease_id: string
          symptom_id: string
        }
        Insert: {
          disease_id: string
          symptom_id: string
        }
        Update: {
          disease_id?: string
          symptom_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "disease_symptoms_disease_id_fkey"
            columns: ["disease_id"]
            isOneToOne: false
            referencedRelation: "diseases"
            referencedColumns: ["disease_id"]
          },
          {
            foreignKeyName: "disease_symptoms_symptom_id_fkey"
            columns: ["symptom_id"]
            isOneToOne: false
            referencedRelation: "symptoms"
            referencedColumns: ["symptom_id"]
          },
        ]
      }
      diseases: {
        Row: {
          created_at: string | null
          dept_id: string
          description: string | null
          disease_id: string
          disease_name: string
        }
        Insert: {
          created_at?: string | null
          dept_id: string
          description?: string | null
          disease_id?: string
          disease_name: string
        }
        Update: {
          created_at?: string | null
          dept_id?: string
          description?: string | null
          disease_id?: string
          disease_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "diseases_dept_id_fkey"
            columns: ["dept_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["dept_id"]
          },
        ]
      }
      doctor_specialties: {
        Row: {
          doctor_id: string
          specialty_id: string
        }
        Insert: {
          doctor_id: string
          specialty_id: string
        }
        Update: {
          doctor_id?: string
          specialty_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_specialties_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "doctor_specialties_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["specialty_id"]
          },
        ]
      }
      doctors: {
        Row: {
          available: boolean | null
          created_at: string | null
          degree: string | null
          dept_id: string
          doctor_id: string
          experience_years: number | null
          user_id: string
        }
        Insert: {
          available?: boolean | null
          created_at?: string | null
          degree?: string | null
          dept_id: string
          doctor_id?: string
          experience_years?: number | null
          user_id: string
        }
        Update: {
          available?: boolean | null
          created_at?: string | null
          degree?: string | null
          dept_id?: string
          doctor_id?: string
          experience_years?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_dept_id_fkey"
            columns: ["dept_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["dept_id"]
          },
          {
            foreignKeyName: "doctors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      medical_records: {
        Row: {
          appointment_id: string
          created_at: string | null
          diagnosis: string | null
          note: string | null
          prescription: string | null
          record_id: string
        }
        Insert: {
          appointment_id: string
          created_at?: string | null
          diagnosis?: string | null
          note?: string | null
          prescription?: string | null
          record_id?: string
        }
        Update: {
          appointment_id?: string
          created_at?: string | null
          diagnosis?: string | null
          note?: string | null
          prescription?: string | null
          record_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["appointment_id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          created_at: string | null
          dob: string | null
          gender: string | null
          medical_history: string | null
          patient_id: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          dob?: string | null
          gender?: string | null
          medical_history?: string | null
          patient_id?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          dob?: string | null
          gender?: string | null
          medical_history?: string | null
          patient_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      specialties: {
        Row: {
          created_at: string | null
          dept_id: string
          description: string | null
          specialty_id: string
          specialty_name: string
        }
        Insert: {
          created_at?: string | null
          dept_id: string
          description?: string | null
          specialty_id?: string
          specialty_name: string
        }
        Update: {
          created_at?: string | null
          dept_id?: string
          description?: string | null
          specialty_id?: string
          specialty_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "specialties_dept_id_fkey"
            columns: ["dept_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["dept_id"]
          },
        ]
      }
      symptoms: {
        Row: {
          created_at: string | null
          symptom_id: string
          symptom_name: string
        }
        Insert: {
          created_at?: string | null
          symptom_id?: string
          symptom_name: string
        }
        Update: {
          created_at?: string | null
          symptom_id?: string
          symptom_name?: string
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string | null
          end_time: string
          slot_id: string
          slot_name: string | null
          start_time: string
        }
        Insert: {
          created_at?: string | null
          end_time: string
          slot_id?: string
          slot_name?: string | null
          start_time: string
        }
        Update: {
          created_at?: string | null
          end_time?: string
          slot_id?: string
          slot_name?: string | null
          start_time?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          cccd: string
          created_at: string | null
          email: string
          full_name: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          cccd: string
          created_at?: string | null
          email: string
          full_name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          cccd?: string
          created_at?: string | null
          email?: string
          full_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "patient" | "doctor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["patient", "doctor", "admin"],
    },
  },
} as const

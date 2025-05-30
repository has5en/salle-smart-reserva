export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      classes: {
        Row: {
          created_at: string
          id: string
          name: string
          student_count: number
          unit: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          student_count?: number
          unit?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          student_count?: number
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          available_quantity: number
          category: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          name: string
          requires_clearance: boolean | null
          total_quantity: number
          updated_at: string
        }
        Insert: {
          available_quantity: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name: string
          requires_clearance?: boolean | null
          total_quantity: number
          updated_at?: string
        }
        Update: {
          available_quantity?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          requires_clearance?: boolean | null
          total_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      equipment_requests: {
        Row: {
          admin_approval_notes: string | null
          admin_approval_timestamp: string | null
          admin_approval_user_id: string | null
          admin_approval_user_name: string | null
          class_id: string | null
          class_name: string
          created_at: string
          date: string
          equipment_id: string | null
          equipment_name: string
          equipment_quantity: number
          id: string
          notes: string | null
          return_notes: string | null
          return_timestamp: string | null
          return_user_id: string | null
          return_user_name: string | null
          signature: string | null
          status: string
          supervisor_approval_notes: string | null
          supervisor_approval_timestamp: string | null
          supervisor_approval_user_id: string | null
          supervisor_approval_user_name: string | null
          updated_at: string
          user_id: string
          user_name: string
        }
        Insert: {
          admin_approval_notes?: string | null
          admin_approval_timestamp?: string | null
          admin_approval_user_id?: string | null
          admin_approval_user_name?: string | null
          class_id?: string | null
          class_name: string
          created_at?: string
          date: string
          equipment_id?: string | null
          equipment_name: string
          equipment_quantity?: number
          id?: string
          notes?: string | null
          return_notes?: string | null
          return_timestamp?: string | null
          return_user_id?: string | null
          return_user_name?: string | null
          signature?: string | null
          status?: string
          supervisor_approval_notes?: string | null
          supervisor_approval_timestamp?: string | null
          supervisor_approval_user_id?: string | null
          supervisor_approval_user_name?: string | null
          updated_at?: string
          user_id: string
          user_name: string
        }
        Update: {
          admin_approval_notes?: string | null
          admin_approval_timestamp?: string | null
          admin_approval_user_id?: string | null
          admin_approval_user_name?: string | null
          class_id?: string | null
          class_name?: string
          created_at?: string
          date?: string
          equipment_id?: string | null
          equipment_name?: string
          equipment_quantity?: number
          id?: string
          notes?: string | null
          return_notes?: string | null
          return_timestamp?: string | null
          return_user_id?: string | null
          return_user_name?: string | null
          signature?: string | null
          status?: string
          supervisor_approval_notes?: string | null
          supervisor_approval_timestamp?: string | null
          supervisor_approval_user_id?: string | null
          supervisor_approval_user_name?: string | null
          updated_at?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_requests_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_requests_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      printing_requests: {
        Row: {
          admin_approval_notes: string | null
          admin_approval_timestamp: string | null
          admin_approval_user_id: string | null
          admin_approval_user_name: string | null
          class_id: string | null
          class_name: string
          color_print: boolean | null
          copies: number
          created_at: string
          date: string
          document_name: string
          double_sided: boolean | null
          id: string
          notes: string | null
          page_count: number
          pdf_file_name: string | null
          signature: string | null
          status: string
          supervisor_approval_notes: string | null
          supervisor_approval_timestamp: string | null
          supervisor_approval_user_id: string | null
          supervisor_approval_user_name: string | null
          updated_at: string
          user_id: string
          user_name: string
        }
        Insert: {
          admin_approval_notes?: string | null
          admin_approval_timestamp?: string | null
          admin_approval_user_id?: string | null
          admin_approval_user_name?: string | null
          class_id?: string | null
          class_name: string
          color_print?: boolean | null
          copies?: number
          created_at?: string
          date: string
          document_name: string
          double_sided?: boolean | null
          id?: string
          notes?: string | null
          page_count?: number
          pdf_file_name?: string | null
          signature?: string | null
          status?: string
          supervisor_approval_notes?: string | null
          supervisor_approval_timestamp?: string | null
          supervisor_approval_user_id?: string | null
          supervisor_approval_user_name?: string | null
          updated_at?: string
          user_id: string
          user_name: string
        }
        Update: {
          admin_approval_notes?: string | null
          admin_approval_timestamp?: string | null
          admin_approval_user_id?: string | null
          admin_approval_user_name?: string | null
          class_id?: string | null
          class_name?: string
          color_print?: boolean | null
          copies?: number
          created_at?: string
          date?: string
          document_name?: string
          double_sided?: boolean | null
          id?: string
          notes?: string | null
          page_count?: number
          pdf_file_name?: string | null
          signature?: string | null
          status?: string
          supervisor_approval_notes?: string | null
          supervisor_approval_timestamp?: string | null
          supervisor_approval_user_id?: string | null
          supervisor_approval_user_name?: string | null
          updated_at?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "printing_requests_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          clearance_level: string | null
          created_at: string
          department: string | null
          full_name: string | null
          id: string
          rank: string | null
          role: Database["public"]["Enums"]["user_role"]
          unit: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          clearance_level?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id: string
          rank?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          unit?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          clearance_level?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id?: string
          rank?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          class_id: string | null
          class_name: string | null
          created_at: string
          end_time: string
          equipment_id: string | null
          equipment_quantity: number | null
          id: string
          participants: number | null
          purpose: string | null
          requires_commander_approval: boolean | null
          room_id: string | null
          start_time: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          class_id?: string | null
          class_name?: string | null
          created_at?: string
          end_time: string
          equipment_id?: string | null
          equipment_quantity?: number | null
          id?: string
          participants?: number | null
          purpose?: string | null
          requires_commander_approval?: boolean | null
          room_id?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          class_id?: string | null
          class_name?: string | null
          created_at?: string
          end_time?: string
          equipment_id?: string | null
          equipment_quantity?: number | null
          id?: string
          participants?: number | null
          purpose?: string | null
          requires_commander_approval?: boolean | null
          room_id?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_requests: {
        Row: {
          admin_approval_notes: string | null
          admin_approval_timestamp: string | null
          admin_approval_user_id: string | null
          admin_approval_user_name: string | null
          class_id: string | null
          class_name: string
          created_at: string
          date: string
          end_time: string
          id: string
          notes: string | null
          participants: number | null
          requires_commander_approval: boolean | null
          room_id: string | null
          room_name: string
          start_time: string
          status: string
          supervisor_approval_notes: string | null
          supervisor_approval_timestamp: string | null
          supervisor_approval_user_id: string | null
          supervisor_approval_user_name: string | null
          updated_at: string
          user_id: string
          user_name: string
        }
        Insert: {
          admin_approval_notes?: string | null
          admin_approval_timestamp?: string | null
          admin_approval_user_id?: string | null
          admin_approval_user_name?: string | null
          class_id?: string | null
          class_name: string
          created_at?: string
          date: string
          end_time: string
          id?: string
          notes?: string | null
          participants?: number | null
          requires_commander_approval?: boolean | null
          room_id?: string | null
          room_name: string
          start_time: string
          status?: string
          supervisor_approval_notes?: string | null
          supervisor_approval_timestamp?: string | null
          supervisor_approval_user_id?: string | null
          supervisor_approval_user_name?: string | null
          updated_at?: string
          user_id: string
          user_name: string
        }
        Update: {
          admin_approval_notes?: string | null
          admin_approval_timestamp?: string | null
          admin_approval_user_id?: string | null
          admin_approval_user_name?: string | null
          class_id?: string | null
          class_name?: string
          created_at?: string
          date?: string
          end_time?: string
          id?: string
          notes?: string | null
          participants?: number | null
          requires_commander_approval?: boolean | null
          room_id?: string | null
          room_name?: string
          start_time?: string
          status?: string
          supervisor_approval_notes?: string | null
          supervisor_approval_timestamp?: string | null
          supervisor_approval_user_id?: string | null
          supervisor_approval_user_name?: string | null
          updated_at?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_requests_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_requests_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          building: string | null
          capacity: number
          created_at: string
          description: string | null
          equipment: string[] | null
          floor: string | null
          id: string
          is_available: boolean | null
          name: string
          software: string[] | null
          type: Database["public"]["Enums"]["room_type"]
          updated_at: string
        }
        Insert: {
          building?: string | null
          capacity: number
          created_at?: string
          description?: string | null
          equipment?: string[] | null
          floor?: string | null
          id?: string
          is_available?: boolean | null
          name: string
          software?: string[] | null
          type: Database["public"]["Enums"]["room_type"]
          updated_at?: string
        }
        Update: {
          building?: string | null
          capacity?: number
          created_at?: string
          description?: string | null
          equipment?: string[] | null
          floor?: string | null
          id?: string
          is_available?: boolean | null
          name?: string
          software?: string[] | null
          type?: Database["public"]["Enums"]["room_type"]
          updated_at?: string
        }
        Relationships: []
      }
      teacher_classes: {
        Row: {
          class_id: string
          created_at: string
          id: string
          teacher_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          teacher_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      return_equipment: {
        Args: { equipment_id: string; quantity: number }
        Returns: undefined
      }
      update_request_status: {
        Args: {
          request_id: string
          request_type: string
          new_status: string
          approver_id: string
          approver_name: string
          approval_notes?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      request_status: "pending" | "approved" | "rejected" | "cancelled"
      room_type:
        | "classroom"
        | "training_room"
        | "weapons_room"
        | "tactical_room"
        | "computer_lab"
        | "science_lab"
        | "meeting_room"
      user_role: "admin" | "supervisor" | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      request_status: ["pending", "approved", "rejected", "cancelled"],
      room_type: [
        "classroom",
        "training_room",
        "weapons_room",
        "tactical_room",
        "computer_lab",
        "science_lab",
        "meeting_room",
      ],
      user_role: ["admin", "supervisor", "teacher"],
    },
  },
} as const

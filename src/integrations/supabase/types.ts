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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_bundles: {
        Row: {
          action_type: string
          anchored: boolean | null
          created_at: string | null
          evidence: Json
          hash: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          anchored?: boolean | null
          created_at?: string | null
          evidence?: Json
          hash?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          anchored?: boolean | null
          created_at?: string | null
          evidence?: Json
          hash?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_bundles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_live: boolean | null
          name: string
          owner_id: string | null
          subscribers: number | null
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          name: string
          owner_id?: string | null
          subscribers?: number | null
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          name?: string
          owner_id?: string | null
          subscribers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dekateotl_guardrails: {
        Row: {
          active: boolean | null
          id: string
          integrity: number | null
          last_check: string | null
          name: string
          policy: string
        }
        Insert: {
          active?: boolean | null
          id?: string
          integrity?: number | null
          last_check?: string | null
          name: string
          policy: string
        }
        Update: {
          active?: boolean | null
          id?: string
          integrity?: number | null
          last_check?: string | null
          name?: string
          policy?: string
        }
        Relationships: []
      }
      dmx4_events: {
        Row: {
          created_at: string | null
          id: string
          layer: string | null
          payload: Json
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          layer?: string | null
          payload?: Json
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          layer?: string | null
          payload?: Json
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmx4_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dreamspaces: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          likes: number | null
          name: string
          owner_id: string | null
          scene_data: Json | null
          template_id: string | null
          thumbnail_url: string | null
          updated_at: string | null
          visitors: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          likes?: number | null
          name: string
          owner_id?: string | null
          scene_data?: Json | null
          template_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          visitors?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          likes?: number | null
          name?: string
          owner_id?: string | null
          scene_data?: Json | null
          template_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          visitors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dreamspaces_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      eoct_logs: {
        Row: {
          created_at: string | null
          criteria: string
          details: Json | null
          id: string
          severity: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          criteria: string
          details?: Json | null
          id?: string
          severity?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          criteria?: string
          details?: Json | null
          id?: string
          severity?: string | null
          status?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_private: boolean | null
          members_count: number | null
          name: string
          owner_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          members_count?: number | null
          name: string
          owner_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          members_count?: number | null
          name?: string
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_cells: {
        Row: {
          api_endpoint: string | null
          created_at: string | null
          description: string | null
          id: string
          layer: string | null
          name: string
          status: string | null
          type: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          api_endpoint?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          layer?: string | null
          name: string
          status?: string | null
          type: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          api_endpoint?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          layer?: string | null
          name?: string
          status?: string | null
          type?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      media_content: {
        Row: {
          channel_id: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          is_live: boolean | null
          likes: number | null
          media_type: string | null
          media_url: string | null
          owner_id: string | null
          thumbnail_url: string | null
          title: string
          views: number | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          is_live?: boolean | null
          likes?: number | null
          media_type?: string | null
          media_url?: string | null
          owner_id?: string | null
          thumbnail_url?: string | null
          title: string
          views?: number | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          is_live?: boolean | null
          likes?: number | null
          media_type?: string | null
          media_url?: string | null
          owner_id?: string | null
          thumbnail_url?: string | null
          title?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_content_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_content_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics_latency: {
        Row: {
          id: string
          p50: number | null
          p90: number | null
          p99: number | null
          route: string | null
          service: string | null
          span_id: string | null
          ts: string
        }
        Insert: {
          id?: string
          p50?: number | null
          p90?: number | null
          p99?: number | null
          route?: string | null
          service?: string | null
          span_id?: string | null
          ts?: string
        }
        Update: {
          id?: string
          p50?: number | null
          p90?: number | null
          p99?: number | null
          route?: string | null
          service?: string | null
          span_id?: string | null
          ts?: string
        }
        Relationships: []
      }
      metrics_rps: {
        Row: {
          id: string
          route: string | null
          rps: number | null
          service: string | null
          ts: string
        }
        Insert: {
          id?: string
          route?: string | null
          rps?: number | null
          service?: string | null
          ts?: string
        }
        Update: {
          id?: string
          route?: string | null
          rps?: number | null
          service?: string | null
          ts?: string
        }
        Relationships: []
      }
      passkeys: {
        Row: {
          created_at: string | null
          credential_id: string
          id: string
          public_key: string
          sign_count: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credential_id: string
          id?: string
          public_key: string
          sign_count?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credential_id?: string
          id?: string
          public_key?: string
          sign_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "passkeys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip: unknown
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      trueque_listings: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          seller_id: string | null
          status: string | null
          title: string
          value_qs: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          seller_id?: string | null
          status?: string | null
          title: string
          value_qs?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          seller_id?: string | null
          status?: string | null
          title?: string
          value_qs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "trueque_listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          did: string | null
          display_name: string | null
          email: string
          id: string
          quantum_seeds: number | null
          tier: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          did?: string | null
          display_name?: string | null
          email: string
          id?: string
          quantum_seeds?: number | null
          tier?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          did?: string | null
          display_name?: string | null
          email?: string
          id?: string
          quantum_seeds?: number | null
          tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "moderator"
        | "user"
        | "celestial"
        | "guardian"
        | "architect"
        | "citizen"
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
      app_role: [
        "admin",
        "moderator",
        "user",
        "celestial",
        "guardian",
        "architect",
        "citizen",
      ],
    },
  },
} as const

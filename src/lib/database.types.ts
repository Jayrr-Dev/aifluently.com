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
      categories_table: {
        Row: {
          category_desc: string | null
          category_id: number
          category_name: string | null
        }
        Insert: {
          category_desc?: string | null
          category_id?: never
          category_name?: string | null
        }
        Update: {
          category_desc?: string | null
          category_id?: never
          category_name?: string | null
        }
        Relationships: []
      }
      daily_product_metrics: {
        Row: {
          count: number | null
          date_recorded: string | null
          metric_id: number
          metric_type: string | null
          product_id: number | null
        }
        Insert: {
          count?: number | null
          date_recorded?: string | null
          metric_id?: never
          metric_type?: string | null
          product_id?: number | null
        }
        Update: {
          count?: number | null
          date_recorded?: string | null
          metric_id?: never
          metric_type?: string | null
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_product_metrics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_table"
            referencedColumns: ["id"]
          }
        ]
      }
      product_category_junction: {
        Row: {
          category_id: number
          product_id: number
        }
        Insert: {
          category_id: number
          product_id: number
        }
        Update: {
          category_id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_category_junction_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_table"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "product_category_junction_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_table"
            referencedColumns: ["id"]
          }
        ]
      }
      product_table: {
        Row: {
          date_recorded: string | null
          id: number
          product_audio: string | null
          product_description: string | null
          product_logo: string | null
          product_logo_alt: string | null
          product_name: string | null
          product_pricing_model: string | null
          product_rating: number | null
          product_review_md: string | null
          product_screenshot: string | null
          product_screenshot_alt: string | null
          product_url: string | null
          product_video: string | null
        }
        Insert: {
          date_recorded?: string | null
          id?: never
          product_audio?: string | null
          product_description?: string | null
          product_logo?: string | null
          product_logo_alt?: string | null
          product_name?: string | null
          product_pricing_model?: string | null
          product_rating?: number | null
          product_review_md?: string | null
          product_screenshot?: string | null
          product_screenshot_alt?: string | null
          product_url?: string | null
          product_video?: string | null
        }
        Update: {
          date_recorded?: string | null
          id?: never
          product_audio?: string | null
          product_description?: string | null
          product_logo?: string | null
          product_logo_alt?: string | null
          product_name?: string | null
          product_pricing_model?: string | null
          product_rating?: number | null
          product_review_md?: string | null
          product_screenshot?: string | null
          product_screenshot_alt?: string | null
          product_url?: string | null
          product_video?: string | null
        }
        Relationships: []
      }
      product_tag_junction: {
        Row: {
          product_id: number
          tag_id: number
        }
        Insert: {
          product_id: number
          tag_id: number
        }
        Update: {
          product_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_tag_junction_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_table"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tag_junction_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag_table"
            referencedColumns: ["tag_id"]
          }
        ]
      }
      sub_product_table: {
        Row: {
          id: number
          main_product_id: number | null
          sub_product_description: string | null
          sub_product_name: string
          sub_product_price: number | null
          sub_product_rating: number | null
        }
        Insert: {
          id?: number
          main_product_id?: number | null
          sub_product_description?: string | null
          sub_product_name: string
          sub_product_price?: number | null
          sub_product_rating?: number | null
        }
        Update: {
          id?: number
          main_product_id?: number | null
          sub_product_description?: string | null
          sub_product_name?: string
          sub_product_price?: number | null
          sub_product_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_product_table_main_product_id_fkey"
            columns: ["main_product_id"]
            isOneToOne: false
            referencedRelation: "product_table"
            referencedColumns: ["id"]
          }
        ]
      }
      tag_table: {
        Row: {
          category_id: number | null
          tag_desc: string | null
          tag_id: number
          tag_name: string | null
        }
        Insert: {
          category_id?: number | null
          tag_desc?: string | null
          tag_id?: never
          tag_name?: string | null
        }
        Update: {
          category_id?: number | null
          tag_desc?: string | null
          tag_id?: never
          tag_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_table_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_table"
            referencedColumns: ["category_id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

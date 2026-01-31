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
      pastes: {
        Row: {
          id: string
          content: string
          created_at: string
          expires_at: string | null
          max_views: number | null
          view_count: number
        }
        Insert: {
          id: string
          content: string
          created_at?: string
          expires_at?: string | null
          max_views?: number | null
          view_count?: number
        }
        Update: {
          id?: string
          content?: string
          created_at?: string
          expires_at?: string | null
          max_views?: number | null
          view_count?: number
        }
      }
    }
  }
}

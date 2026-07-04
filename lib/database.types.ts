export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          password_hash: string | null
          role: "owner" | "admin" | "member" | "client"
          team: string | null
          initials: string
          color: string
          created_at: number
        }
        Insert: {
          id?: string
          email: string
          name: string
          password_hash?: string | null
          role?: "owner" | "admin" | "member" | "client"
          team?: string | null
          initials: string
          color?: string
          created_at?: number
        }
        Update: {
          id?: string
          email?: string
          name?: string
          password_hash?: string | null
          role?: "owner" | "admin" | "member" | "client"
          team?: string | null
          initials?: string
          color?: string
          created_at?: number
        }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          website: string | null
          phone: string | null
          budget: string | null
          message: string | null
          source: string
          status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost"
          score: number | null
          owner: string | null
          service: string
          intent: string
          created_at: number
          updated_at: number
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          website?: string | null
          phone?: string | null
          budget?: string | null
          message?: string | null
          source?: string
          status?: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost"
          score?: number | null
          owner?: string | null
          service?: string
          intent?: string
          created_at?: number
          updated_at?: number
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          website?: string | null
          phone?: string | null
          budget?: string | null
          message?: string | null
          source?: string
          status?: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost"
          score?: number | null
          owner?: string | null
          service?: string
          intent?: string
          created_at?: number
          updated_at?: number
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          name: string
          contact_name: string | null
          email: string
          phone: string | null
          tier: "core" | "growth" | "project"
          mrr: number | null
          status: "active" | "paused" | "churned"
          notes: string | null
          owner: string | null
          created_at: number
        }
        Insert: {
          id?: string
          name: string
          contact_name?: string | null
          email: string
          phone?: string | null
          tier?: "core" | "growth" | "project"
          mrr?: number | null
          status?: "active" | "paused" | "churned"
          notes?: string | null
          owner?: string | null
          created_at?: number
        }
        Update: {
          id?: string
          name?: string
          contact_name?: string | null
          email?: string
          phone?: string | null
          tier?: "core" | "growth" | "project"
          mrr?: number | null
          status?: "active" | "paused" | "churned"
          notes?: string | null
          owner?: string | null
          created_at?: number
        }
        Relationships: []
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          token: string
          expires_at: number
          created_at: number
        }
        Insert: {
          id?: string
          user_id: string
          token: string
          expires_at: number
          created_at?: number
        }
        Update: {
          id?: string
          user_id?: string
          token?: string
          expires_at?: number
          created_at?: number
        }
        Relationships: []
      }
      audit: {
        Row: {
          id: number
          actor: string | null
          action: string
          target: string | null
          meta: string | null
          created_at: number
        }
        Insert: {
          id?: never
          actor?: string | null
          action: string
          target?: string | null
          meta?: string | null
          created_at?: number
        }
        Update: {
          id?: never
          actor?: string | null
          action?: string
          target?: string | null
          meta?: string | null
          created_at?: number
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

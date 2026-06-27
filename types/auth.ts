/**
 * User shape (mirror of lib/db.ts → users table row, without secrets).
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member' | 'client';
  team?: string | null;
  initials: string;
  color: string;
}
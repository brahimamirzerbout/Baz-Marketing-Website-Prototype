-- BAZ Marketing Agency — Fix existing tables + RLS policies
-- Run this in the Supabase SQL Editor for project fgjxkexgopllieggucws
-- The users and sessions tables already exist (from marketing-hub) but are
-- missing BAZ-specific columns. This adds them + creates RLS policies.

-- ── Add missing columns to users table ──
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'member';
ALTER TABLE users ADD COLUMN IF NOT EXISTS team TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS initials TEXT NOT NULL DEFAULT 'BZ';
ALTER TABLE users ADD COLUMN IF NOT EXISTS color TEXT NOT NULL DEFAULT '#8a8a8a';

-- ── Add missing column to sessions table ──
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS id TEXT;

-- ── RLS Policies ──
-- Leads: public can INSERT (contact form), operators can read/write
CREATE POLICY "Public can submit leads" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Operators can read leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can update leads" ON leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Operators can delete leads" ON leads FOR DELETE TO authenticated USING (true);

-- Users: users can read profiles, operators can read all
CREATE POLICY "Users can read profiles" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO authenticated USING (true);

-- Customers
CREATE POLICY "Operators can read customers" ON customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can write customers" ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects
CREATE POLICY "Operators can read projects" ON projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can write projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Subscriptions
CREATE POLICY "Operators can read subscriptions" ON subscriptions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can write subscriptions" ON subscriptions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Invoices
CREATE POLICY "Operators can read invoices" ON invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can write invoices" ON invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Orgs
CREATE POLICY "Operators can read orgs" ON orgs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can write orgs" ON orgs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Feedback: public can submit, operators can read
CREATE POLICY "Public can submit feedback" ON feedback FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Operators can read feedback" ON feedback FOR SELECT TO authenticated USING (true);

-- Feedback requests
CREATE POLICY "Operators can manage feedback_requests" ON feedback_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- AI jobs
CREATE POLICY "Operators can manage ai_jobs" ON ai_jobs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Sessions
CREATE POLICY "Operators can manage sessions" ON sessions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Audit
CREATE POLICY "Operators can read audit" ON audit FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can insert audit" ON audit FOR INSERT TO authenticated WITH CHECK (true);
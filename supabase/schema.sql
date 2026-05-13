-- Create extension for UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES / EMPLOYEES (Admin & Staff)
-- Integrates with Supabase Auth (auth.users)
-- ==============================================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'dispatcher', 'staff')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. FLEET (Buses)
-- Tracks physical bus assets
-- ==============================================================================
CREATE TABLE public.buses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plate_number TEXT UNIQUE NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  capacity INTEGER NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'in_transit', 'maintenance', 'out_of_service')),
  last_maintenance_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. DRIVERS
-- Tracks driver profiles and telemetry
-- ==============================================================================
CREATE TABLE public.drivers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  contact_number TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'suspended', 'terminated')),
  performance_rating NUMERIC(3,2) DEFAULT 5.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. ROUTES
-- Network path records
-- ==============================================================================
CREATE TABLE public.routes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- e.g., 'R-1'
  name TEXT NOT NULL, -- e.g., 'Express Gamma'
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  distance_km NUMERIC(5,2) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. FARE MATRIX
-- Pricing intelligence for routes
-- ==============================================================================
CREATE TABLE public.fare_matrix (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE NOT NULL UNIQUE,
  base_fare NUMERIC(10,2) NOT NULL,
  per_km_rate NUMERIC(10,2) NOT NULL,
  student_discount_pct INTEGER DEFAULT 20,
  senior_discount_pct INTEGER DEFAULT 20,
  pwd_discount_pct INTEGER DEFAULT 20,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. SCHEDULES / MISSIONS
-- Core daily operations tying bus, driver, and route
-- ==============================================================================
CREATE TABLE public.schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  route_id UUID REFERENCES public.routes(id) NOT NULL,
  bus_id UUID REFERENCES public.buses(id),
  driver_id UUID REFERENCES public.drivers(id),
  departure_time TIMESTAMPTZ NOT NULL,
  estimated_arrival TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_transit', 'completed', 'cancelled', 'delayed')),
  actual_departure TIMESTAMPTZ,
  actual_arrival TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. PASSENGERS / CRM
-- Frequent transit profiles
-- ==============================================================================
CREATE TABLE public.passengers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pnr_code TEXT UNIQUE, -- Custom generated loyalty ID e.g., 'PNR-1001'
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  loyalty_status TEXT DEFAULT 'Standard' CHECK (loyalty_status IN ('Standard', 'Premium', 'Corporate')),
  total_rides INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 5.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. TICKETS / REV OPS
-- Financial transactions & seating
-- ==============================================================================
CREATE TABLE public.tickets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  transaction_ref TEXT UNIQUE NOT NULL, -- e.g., 'BK-9001'
  schedule_id UUID REFERENCES public.schedules(id) NOT NULL,
  passenger_id UUID REFERENCES public.passengers(id), -- Nullable for regular walk-ins
  seat_number TEXT,
  fare_category TEXT DEFAULT 'regular' CHECK (fare_category IN ('regular', 'student', 'senior', 'pwd')),
  amount_paid NUMERIC(10,2) NOT NULL,
  payment_method TEXT NOT NULL, -- e.g., 'GCASH', 'CREDIT_CARD', 'CASH'
  payment_status TEXT DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'failed')),
  issued_by UUID REFERENCES auth.users(id), -- Staff who issued the ticket, nullable if online purchase
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 9. INCIDENTS
-- Dispatch & Emergency logs
-- ==============================================================================
CREATE TABLE public.incidents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  schedule_id UUID REFERENCES public.schedules(id),
  route_id UUID REFERENCES public.routes(id),
  reported_by UUID REFERENCES auth.users(id),
  severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  delay_minutes INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'ignored')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- ==============================================================================
-- TRIGGER FUNCTION: Auto Update `updated_at` Timestamp
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Attach trigger to tables
CREATE TRIGGER update_buses_modtime BEFORE UPDATE ON public.buses FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_drivers_modtime BEFORE UPDATE ON public.drivers FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_routes_modtime BEFORE UPDATE ON public.routes FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_fare_matrix_modtime BEFORE UPDATE ON public.fare_matrix FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_schedules_modtime BEFORE UPDATE ON public.schedules FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- ==============================================================================
-- ENABLING RLS AND SECURING THE DATABASE
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fare_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

-- Allow full access to authenticated admins/staff.
-- In production, you would filter this tightly based on `profiles.role`.
CREATE POLICY "Allow authenticated access" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.buses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.drivers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.routes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.fare_matrix FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.schedules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.tickets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.passengers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON public.incidents FOR ALL USING (auth.role() = 'authenticated');

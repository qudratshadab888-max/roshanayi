-- Roshanayi Online Academy
-- Clean initial Supabase schema.
-- This migration creates only tables, primary keys, foreign keys, basic checks,
-- timestamps, and indexes. Authentication logic, RLS policies, triggers, and
-- seed data can be added in later migrations.

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (
    role in ('super_admin', 'manager', 'teacher', 'parent', 'student')
  ),
  full_name text,
  email text unique,
  username text unique,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.parents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  full_name text not null,
  email text not null,
  whatsapp_number text,
  country text,
  city text,
  timezone text,
  relationship_to_student text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  profile_id uuid unique references public.profiles(id) on delete set null,
  first_name text not null,
  last_name text not null,
  gender text,
  date_of_birth date,
  native_language text,
  current_level text,
  status text not null default 'active' check (
    status in ('active', 'inactive', 'suspended')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  display_name text,
  bio text,
  specialties text[],
  status text not null default 'active' check (
    status in ('active', 'inactive', 'suspended')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text,
  description text,
  language text,
  level text,
  monthly_price_usd numeric(10, 2) check (monthly_price_usd >= 0),
  status text not null default 'active' check (
    status in ('active', 'inactive', 'archived')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id),
  teacher_id uuid references public.teachers(id) on delete set null,
  name text not null,
  class_type text not null check (
    class_type in ('group', 'special', 'premium')
  ),
  max_students integer check (max_students > 0),
  status text not null default 'active' check (
    status in ('active', 'inactive', 'completed', 'cancelled')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  start_date date,
  end_date date,
  status text not null default 'trial' check (
    status in ('trial', 'active', 'pending_payment', 'suspended', 'completed', 'cancelled')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, class_id)
);

create table public.class_schedules (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  weekday integer not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  timezone text not null,
  meeting_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > start_time)
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  class_schedule_id uuid references public.class_schedules(id) on delete set null,
  attendance_date date not null,
  status text not null check (
    status in ('present', 'absent', 'late', 'excused')
  ),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (enrollment_id, attendance_date)
);

create table public.homework (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  teacher_id uuid references public.teachers(id) on delete set null,
  title text not null,
  description text,
  due_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.homework_submissions (
  id uuid primary key default gen_random_uuid(),
  homework_id uuid not null references public.homework(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  enrollment_id uuid references public.enrollments(id) on delete set null,
  submitted_at timestamptz,
  response_text text,
  attachment_url text,
  status text not null default 'submitted' check (
    status in ('submitted', 'late', 'reviewed')
  ),
  teacher_feedback text,
  grade text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (homework_id, student_id)
);

create table public.monthly_reports (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  enrollment_id uuid references public.enrollments(id) on delete set null,
  teacher_id uuid references public.teachers(id) on delete set null,
  report_month date not null,
  summary text,
  progress_notes text,
  attendance_notes text,
  homework_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, report_month)
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  parent_id uuid not null references public.parents(id),
  student_id uuid not null references public.students(id),
  enrollment_id uuid not null references public.enrollments(id),
  amount numeric(10, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  invoice_date date not null default current_date,
  due_date date not null,
  status text not null default 'pending' check (
    status in ('draft', 'pending', 'paid', 'overdue', 'cancelled')
  ),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id),
  parent_id uuid not null references public.parents(id),
  student_id uuid not null references public.students(id),
  enrollment_id uuid not null references public.enrollments(id),
  amount numeric(10, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  payment_method text not null check (
    payment_method in ('bank_transfer', 'wise', 'paypal', 'stripe', 'western_union', 'other')
  ),
  status text not null default 'pending' check (
    status in ('pending', 'received', 'failed', 'refunded')
  ),
  payment_date timestamptz,
  transaction_id text,
  received_by_profile_id uuid references public.profiles(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.parents(id) on delete cascade,
  student_id uuid references public.students(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  payment_id uuid references public.payments(id) on delete set null,
  type text not null,
  title text not null,
  message text not null,
  is_read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teacher_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  whatsapp_number text,
  country text,
  city text,
  timezone text,
  languages text[],
  subjects text[],
  experience_summary text,
  cv_url text,
  status text not null default 'pending' check (
    status in ('pending', 'reviewing', 'approved', 'rejected')
  ),
  reviewed_by_profile_id uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  teacher_id uuid references public.teachers(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

create index parents_profile_id_idx on public.parents (profile_id);

create index students_parent_id_idx on public.students (parent_id);
create index students_profile_id_idx on public.students (profile_id);

create index teachers_profile_id_idx on public.teachers (profile_id);

create index classes_course_id_idx on public.classes (course_id);
create index classes_teacher_id_idx on public.classes (teacher_id);

create index enrollments_student_id_idx on public.enrollments (student_id);
create index enrollments_class_id_idx on public.enrollments (class_id);
create index enrollments_status_idx on public.enrollments (status);

create index class_schedules_class_id_idx on public.class_schedules (class_id);

create index attendance_enrollment_id_idx on public.attendance (enrollment_id);
create index attendance_student_id_idx on public.attendance (student_id);
create index attendance_class_id_idx on public.attendance (class_id);

create index homework_class_id_idx on public.homework (class_id);
create index homework_teacher_id_idx on public.homework (teacher_id);

create index homework_submissions_homework_id_idx on public.homework_submissions (homework_id);
create index homework_submissions_student_id_idx on public.homework_submissions (student_id);

create index monthly_reports_student_id_idx on public.monthly_reports (student_id);
create index monthly_reports_enrollment_id_idx on public.monthly_reports (enrollment_id);

create index invoices_parent_id_idx on public.invoices (parent_id);
create index invoices_student_id_idx on public.invoices (student_id);
create index invoices_enrollment_id_idx on public.invoices (enrollment_id);
create index invoices_status_idx on public.invoices (status);

create index payments_invoice_id_idx on public.payments (invoice_id);
create index payments_parent_id_idx on public.payments (parent_id);
create index payments_student_id_idx on public.payments (student_id);
create index payments_enrollment_id_idx on public.payments (enrollment_id);
create index payments_status_idx on public.payments (status);

create index notifications_recipient_profile_id_idx on public.notifications (recipient_profile_id);
create index notifications_parent_id_idx on public.notifications (parent_id);
create index notifications_student_id_idx on public.notifications (student_id);
create index notifications_is_read_idx on public.notifications (is_read);

create index teacher_applications_email_idx on public.teacher_applications (email);
create index teacher_applications_status_idx on public.teacher_applications (status);

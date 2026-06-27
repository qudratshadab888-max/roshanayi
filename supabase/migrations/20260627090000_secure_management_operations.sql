begin;

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_academy_management()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('manager', 'super_admin'), false)
$$;

create or replace function public.current_parent_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.parents where profile_id = auth.uid()
$$;

create or replace function public.current_student_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.students where profile_id = auth.uid()
$$;

create or replace function public.current_teacher_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.teachers where profile_id = auth.uid()
$$;

create or replace function public.can_access_student(target_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_academy_management()
    or target_student_id = public.current_student_id()
    or exists (select 1 from public.students s where s.id = target_student_id and s.parent_id = public.current_parent_id())
    or exists (
      select 1 from public.enrollments e
      join public.classes c on c.id = e.class_id
      where e.student_id = target_student_id and c.teacher_id = public.current_teacher_id()
    )
$$;

create or replace function public.can_access_class(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_academy_management()
    or exists (select 1 from public.classes c where c.id = target_class_id and c.teacher_id = public.current_teacher_id())
    or exists (select 1 from public.enrollments e where e.class_id = target_class_id and e.student_id = public.current_student_id())
    or exists (
      select 1 from public.enrollments e
      join public.students s on s.id = e.student_id
      where e.class_id = target_class_id and s.parent_id = public.current_parent_id()
    )
$$;

revoke all on function public.current_profile_role() from public;
revoke all on function public.is_academy_management() from public;
revoke all on function public.current_parent_id() from public;
revoke all on function public.current_student_id() from public;
revoke all on function public.current_teacher_id() from public;
revoke all on function public.can_access_student(uuid) from public;
revoke all on function public.can_access_class(uuid) from public;
grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.is_academy_management() to authenticated;
grant execute on function public.current_parent_id() to authenticated;
grant execute on function public.current_student_id() to authenticated;
grant execute on function public.current_teacher_id() to authenticated;
grant execute on function public.can_access_student(uuid) to authenticated;
grant execute on function public.can_access_class(uuid) to authenticated;

create table if not exists public.student_follow_ups (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  reason text not null,
  due_date date,
  status text not null default 'not_contacted' check (
    status in ('not_contacted', 'contact_attempted', 'parent_responded', 'payment_promised', 'extended', 'suspended', 'resolved')
  ),
  manager_notes text,
  last_contact_date timestamptz,
  next_follow_up_date date,
  created_by_profile_id uuid not null references public.profiles(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_follow_up_history (
  id uuid primary key default gen_random_uuid(),
  follow_up_id uuid not null references public.student_follow_ups(id) on delete cascade,
  action text not null,
  note text,
  status text,
  created_by_profile_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create index if not exists student_follow_ups_student_id_idx on public.student_follow_ups(student_id);
create index if not exists student_follow_ups_status_idx on public.student_follow_ups(status);
create index if not exists student_follow_ups_due_date_idx on public.student_follow_ups(due_date);
create index if not exists student_follow_up_history_follow_up_id_idx on public.student_follow_up_history(follow_up_id);

alter table public.profiles enable row level security;
alter table public.parents enable row level security;
alter table public.students enable row level security;
alter table public.teachers enable row level security;
alter table public.courses enable row level security;
alter table public.classes enable row level security;
alter table public.enrollments enable row level security;
alter table public.class_schedules enable row level security;
alter table public.attendance enable row level security;
alter table public.homework enable row level security;
alter table public.homework_submissions enable row level security;
alter table public.monthly_reports enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.notifications enable row level security;
alter table public.student_follow_ups enable row level security;
alter table public.student_follow_up_history enable row level security;

drop policy if exists "profiles read own or management" on public.profiles;
create policy "profiles read own or management" on public.profiles
for select to authenticated using (id = auth.uid() or public.is_academy_management());
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
for update to authenticated using (id = auth.uid())
with check (id = auth.uid() and role = public.current_profile_role());
drop policy if exists "profiles super admin update" on public.profiles;
create policy "profiles super admin update" on public.profiles
for update to authenticated using (public.current_profile_role() = 'super_admin') with check (public.current_profile_role() = 'super_admin');
drop policy if exists "profiles manager operational update" on public.profiles;

drop policy if exists "parents management all" on public.parents;
create policy "parents management all" on public.parents for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "parents own read" on public.parents;
create policy "parents own read" on public.parents for select to authenticated
using (profile_id = auth.uid() or id = (select parent_id from public.students where profile_id = auth.uid()));
drop policy if exists "parents own update" on public.parents;
create policy "parents own update" on public.parents for update to authenticated
using (profile_id = auth.uid()) with check (profile_id = auth.uid());

drop policy if exists "students management all" on public.students;
drop policy if exists "students management read" on public.students;
create policy "students management read" on public.students for select to authenticated
using (public.is_academy_management());
drop policy if exists "students management insert" on public.students;
create policy "students management insert" on public.students for insert to authenticated
with check (public.is_academy_management());
drop policy if exists "students management update" on public.students;
create policy "students management update" on public.students for update to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "students super admin delete" on public.students;
create policy "students super admin delete" on public.students for delete to authenticated
using (public.current_profile_role() = 'super_admin');
drop policy if exists "students family read" on public.students;
create policy "students family read" on public.students for select to authenticated
using (profile_id = auth.uid() or parent_id = public.current_parent_id());
drop policy if exists "students teacher roster read" on public.students;
create policy "students teacher roster read" on public.students for select to authenticated
using (public.can_access_student(id));

drop policy if exists "teachers management all" on public.teachers;
create policy "teachers management all" on public.teachers for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "teachers authenticated read" on public.teachers;
create policy "teachers authenticated read" on public.teachers for select to authenticated using (true);
drop policy if exists "teachers own update" on public.teachers;
create policy "teachers own update" on public.teachers for update to authenticated
using (profile_id = auth.uid()) with check (profile_id = auth.uid());

drop policy if exists "courses authenticated read" on public.courses;
create policy "courses authenticated read" on public.courses for select to authenticated using (true);
drop policy if exists "courses management write" on public.courses;
create policy "courses management write" on public.courses for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());

drop policy if exists "classes management all" on public.classes;
create policy "classes management all" on public.classes for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "classes assigned access" on public.classes;
create policy "classes assigned access" on public.classes for select to authenticated using (
  public.can_access_class(id)
);

drop policy if exists "enrollments management all" on public.enrollments;
create policy "enrollments management all" on public.enrollments for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "enrollments linked read" on public.enrollments;
create policy "enrollments linked read" on public.enrollments for select to authenticated using (
  public.can_access_student(student_id)
);

drop policy if exists "schedules management all" on public.class_schedules;
create policy "schedules management all" on public.class_schedules for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "schedules linked read" on public.class_schedules;
create policy "schedules linked read" on public.class_schedules for select to authenticated using (
  public.can_access_class(class_id)
);

drop policy if exists "attendance management all" on public.attendance;
create policy "attendance management all" on public.attendance for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "attendance linked read" on public.attendance;
create policy "attendance linked read" on public.attendance for select to authenticated using (
  public.can_access_student(student_id)
);
drop policy if exists "attendance teacher write" on public.attendance;
create policy "attendance teacher write" on public.attendance for all to authenticated
using (exists (
  select 1 from public.classes c
  where c.id = attendance.class_id and c.teacher_id = public.current_teacher_id()
))
with check (exists (
  select 1 from public.classes c
  where c.id = attendance.class_id and c.teacher_id = public.current_teacher_id()
));

drop policy if exists "homework management all" on public.homework;
create policy "homework management all" on public.homework for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "homework linked read" on public.homework;
create policy "homework linked read" on public.homework for select to authenticated
using (public.can_access_class(class_id));
drop policy if exists "homework teacher write" on public.homework;
create policy "homework teacher write" on public.homework for all to authenticated
using (teacher_id = public.current_teacher_id()) with check (teacher_id = public.current_teacher_id());

drop policy if exists "submissions management all" on public.homework_submissions;
create policy "submissions management all" on public.homework_submissions for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "submissions linked read" on public.homework_submissions;
create policy "submissions linked read" on public.homework_submissions for select to authenticated
using (public.can_access_student(student_id));
drop policy if exists "submissions student write" on public.homework_submissions;
drop policy if exists "submissions student insert" on public.homework_submissions;
create policy "submissions student insert" on public.homework_submissions for insert to authenticated
with check (
  student_id = public.current_student_id()
  and status in ('submitted', 'late')
  and teacher_feedback is null
  and grade is null
);
drop policy if exists "submissions student update" on public.homework_submissions;
create policy "submissions student update" on public.homework_submissions for update to authenticated
using (student_id = public.current_student_id() and status in ('submitted', 'late'))
with check (
  student_id = public.current_student_id()
  and status in ('submitted', 'late')
  and teacher_feedback is null
  and grade is null
);
drop policy if exists "submissions teacher review" on public.homework_submissions;
create policy "submissions teacher review" on public.homework_submissions for update to authenticated
using (exists (
  select 1 from public.homework h join public.classes c on c.id = h.class_id
  where h.id = homework_submissions.homework_id and c.teacher_id = public.current_teacher_id()
))
with check (exists (
  select 1 from public.homework h join public.classes c on c.id = h.class_id
  where h.id = homework_submissions.homework_id and c.teacher_id = public.current_teacher_id()
));

drop policy if exists "reports management all" on public.monthly_reports;
create policy "reports management all" on public.monthly_reports for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "reports linked read" on public.monthly_reports;
create policy "reports linked read" on public.monthly_reports for select to authenticated using (
  public.can_access_student(student_id)
);
drop policy if exists "reports teacher write" on public.monthly_reports;
create policy "reports teacher write" on public.monthly_reports for all to authenticated
using (teacher_id = public.current_teacher_id()) with check (teacher_id = public.current_teacher_id());

drop policy if exists "invoices management all" on public.invoices;
create policy "invoices management all" on public.invoices for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "invoices family read" on public.invoices;
create policy "invoices family read" on public.invoices for select to authenticated
using (parent_id = public.current_parent_id() or student_id = public.current_student_id());

drop policy if exists "payments management all" on public.payments;
create policy "payments management all" on public.payments for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "payments family read" on public.payments;
create policy "payments family read" on public.payments for select to authenticated
using (parent_id = public.current_parent_id() or student_id = public.current_student_id());

drop policy if exists "notifications management all" on public.notifications;
create policy "notifications management all" on public.notifications for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "notifications recipient read" on public.notifications;
create policy "notifications recipient read" on public.notifications for select to authenticated
using (recipient_profile_id = auth.uid());
drop policy if exists "notifications recipient update" on public.notifications;
create policy "notifications recipient update" on public.notifications for update to authenticated
using (recipient_profile_id = auth.uid()) with check (recipient_profile_id = auth.uid());

drop policy if exists "follow ups management all" on public.student_follow_ups;
create policy "follow ups management all" on public.student_follow_ups for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());
drop policy if exists "follow up history management all" on public.student_follow_up_history;
create policy "follow up history management all" on public.student_follow_up_history for all to authenticated
using (public.is_academy_management()) with check (public.is_academy_management());

create or replace function public.delete_student_permanently(target_student_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.current_profile_role() <> 'super_admin' then
    raise exception 'Only a Super Admin can permanently delete a student.' using errcode = '42501';
  end if;

  delete from public.payments where student_id = target_student_id;
  delete from public.invoices where student_id = target_student_id;
  delete from public.students where id = target_student_id;
end;
$$;

revoke all on function public.delete_student_permanently(uuid) from public;
grant execute on function public.delete_student_permanently(uuid) to authenticated;

create or replace view public.management_student_directory
with (security_invoker = true)
as
select
  s.id,
  concat_ws(' ', s.first_name, s.last_name) as student_name,
  s.first_name,
  s.last_name,
  s.gender,
  s.date_of_birth,
  extract(year from age(current_date, s.date_of_birth))::integer as age,
  s.native_language,
  s.current_level,
  s.status as student_record_status,
  s.profile_id as student_profile_id,
  s.created_at as registration_date,
  s.updated_at as last_activity,
  case when s.profile_id is null then 'Parent-managed' else 'Separate student login' end as account_type,
  p.id as parent_id,
  p.profile_id as parent_profile_id,
  p.full_name as parent_name,
  p.email as parent_email,
  p.whatsapp_number as parent_whatsapp,
  p.relationship_to_student as parent_relationship,
  p.country,
  p.city,
  p.timezone,
  e.id as enrollment_id,
  e.status as enrollment_status,
  e.enrolled_at,
  e.start_date as enrollment_start_date,
  e.end_date as enrollment_end_date,
  c.id as class_id,
  c.name as class_name,
  c.class_type,
  c.teacher_id,
  t.display_name as teacher_name,
  crs.id as course_id,
  crs.title as course_name,
  sch.weekday,
  sch.start_time,
  sch.end_time,
  sch.timezone as schedule_timezone,
  sch.meeting_url,
  inv.id as invoice_id,
  inv.status as payment_status,
  inv.due_date as next_payment_due_date,
  greatest(current_date - inv.due_date, 0) as days_overdue,
  coalesce(att.total_records, 0)::integer as attendance_records,
  coalesce(att.attended_records, 0)::integer as attended_records,
  case when coalesce(att.total_records, 0) = 0 then 0
    else round((att.attended_records::numeric / att.total_records::numeric) * 100)::integer end as attendance_rate,
  coalesce(att.consecutive_absences, 0)::integer as consecutive_absences,
  coalesce(att.late_records, 0)::integer as late_records,
  fu.id as follow_up_id,
  fu.reason as follow_up_reason,
  fu.status as follow_up_status,
  fu.due_date as follow_up_due_date,
  fu.last_contact_date,
  fu.next_follow_up_date,
  case
    when s.status = 'suspended' or e.status = 'suspended' then 'Suspended'
    when inv.status = 'overdue' or (inv.status = 'pending' and inv.due_date < current_date - 2) then 'Payment Overdue'
    when e.status = 'pending_payment' or inv.status = 'pending' then 'Pending Payment'
    when e.status = 'trial' then 'Trial'
    when e.status = 'active' then 'Active'
    when e.status = 'completed' then 'Completed'
    when s.status = 'inactive' then 'Inactive'
    else initcap(s.status)
  end as student_status,
  case
    when e.status <> 'trial' then null
    when e.end_date = current_date then 'Trial Ends Today'
    when e.end_date < current_date then 'Trial Ended'
    else 'Active Trial'
  end as trial_status,
  array_remove(array[
    case when e.status = 'trial' and e.end_date < current_date then 'Trial ended but not paid' end,
    case when inv.status = 'overdue' or (inv.status = 'pending' and inv.due_date < current_date - 2) then 'Payment overdue for more than 2 days' end,
    case when coalesce(att.consecutive_absences, 0) >= 2 then 'Repeated absences' end,
    case when e.status = 'active' and coalesce(att.total_records, 0) = 0 then 'No attendance records for active enrollment' end,
    case when e.id is null or c.id is null then 'No assigned class' end,
    case when c.id is not null and c.teacher_id is null then 'No assigned teacher' end,
    case when p.email is null or p.whatsapp_number is null or trim(p.whatsapp_number) = '' then 'Incomplete parent/student account' end,
    case when e.status = 'active' and not exists (
      select 1 from public.monthly_reports mr
      where mr.student_id = s.id and date_trunc('month', mr.report_month) = date_trunc('month', current_date)
    ) then 'Monthly report not submitted' end,
    case when c.id is not null and (sch.meeting_url is null or trim(sch.meeting_url) = '') then 'Missing Meet or Zoom link' end
  ], null) as urgent_reasons
from public.students s
join public.parents p on p.id = s.parent_id
left join lateral (
  select e1.* from public.enrollments e1 where e1.student_id = s.id
  order by case when e1.status in ('trial', 'active', 'pending_payment', 'suspended') then 0 else 1 end, e1.created_at desc limit 1
) e on true
left join public.classes c on c.id = e.class_id
left join public.courses crs on crs.id = c.course_id
left join public.teachers t on t.id = c.teacher_id
left join lateral (
  select cs.* from public.class_schedules cs where cs.class_id = c.id order by cs.weekday, cs.start_time limit 1
) sch on true
left join lateral (
  select i.* from public.invoices i where i.student_id = s.id order by i.due_date desc, i.created_at desc limit 1
) inv on true
left join lateral (
  select
    count(*) as total_records,
    count(*) filter (where a.status in ('present', 'late')) as attended_records,
    count(*) filter (where a.status = 'late') as late_records,
    (
      select count(*)
      from (
        select
          a2.status,
          sum(case when a2.status <> 'absent' then 1 else 0 end)
            over (order by a2.attendance_date desc, a2.created_at desc) as non_absent_seen
        from public.attendance a2
        where a2.student_id = s.id
      ) recent
      where recent.status = 'absent' and recent.non_absent_seen = 0
    ) as consecutive_absences
  from public.attendance a where a.student_id = s.id
) att on true
left join lateral (
  select f.* from public.student_follow_ups f where f.student_id = s.id and f.status <> 'resolved'
  order by f.due_date nulls last, f.created_at desc limit 1
) fu on true
where public.is_academy_management();

revoke all on public.management_student_directory from public;
grant select on public.management_student_directory to authenticated;

commit;

# Management Operations Dashboard

## Routes

- `/management`: live academy overview and urgent actions.
- `/management/students`: searchable student workspace, filters, bulk actions, pagination, and CSV exports.
- `/management/students/:id`: student, family, academic, attendance, payment, notification, and follow-up record.

All routes use the `management` middleware. It validates the current Supabase Auth user with `auth.getUser()`, reads the role from `public.profiles`, and permits only `manager` and `super_admin`. Other authenticated roles are redirected to their own dashboard. Unauthenticated users are sent to login.

The Management navigation item is rendered only for an authenticated manager or super administrator. Management routes are not prerendered or included in the public sitemap.

## Data model

The dashboard reads existing operational tables:

- `profiles`, `parents`, `students`, and `teachers`
- `courses`, `classes`, `class_schedules`, and `enrollments`
- `attendance`, `homework`, `homework_submissions`, and `monthly_reports`
- `invoices`, `payments`, and `notifications`

Migration `20260627090000_secure_management_operations.sql` adds:

- `student_follow_ups`: current reason, due date, contact state, manager notes, and next action.
- `student_follow_up_history`: immutable manager action history for each follow-up.
- `management_student_directory`: a security-invoker operational view with joined student, family, class, teacher, trial, payment, attendance, and urgency fields.
- Role and relationship helper functions used by RLS.
- `delete_student_permanently(uuid)`: a transactional, super-admin-only database function that removes dependent financial rows before the student record.

The view returns rows only when `is_academy_management()` is true. Pagination, sorting, search, and filters are executed by PostgREST rather than loading the full directory in the browser.

## Operations

Managers and super administrators can edit student and parent details, assign a class or teacher, change class type, extend a trial, activate 30-day enrollment, extend access, suspend or reactivate access, remove a student from a class without deleting the profile, create an invoice, receive a payment, send a notification, and maintain follow-up history.

Bulk operations support class or teacher assignment, parent notifications, follow-up creation, suspension, reactivation, and selected-row export. Suspension requires confirmation and never deletes the student.

Permanent student deletion is shown only to a super administrator and is independently enforced by both the database function and the `students super admin delete` RLS policy. It does not delete a Supabase Auth identity from the browser.

CSV exports are generated in the browser from rows already allowed by RLS. They include student operations, payment status, attendance, and overdue views; passwords, access tokens, and private credentials are never queried or exported.

## Urgent rules

The overview flags records for expired trials without payment, invoices overdue by more than two days, repeated absences, missing class or teacher assignments, incomplete parent contact data, missing current-month reports, and classes without meeting links.

Attendance thresholds are centralized in `managementAttendanceConfig`:

- Repeated absence: 2 absences in the recent attendance window.
- Low attendance: below 70 percent.
- Repeated late arrival: 3 records.

## RLS model

RLS is enabled for all tables used by the dashboard. The migration enforces these boundaries:

- Managers and super administrators can perform academy operations.
- Only a super administrator can permanently delete a student or change protected profile roles.
- A manager cannot edit a super administrator role or promote any profile through the profile policies.
- Teachers can read assigned rosters and write attendance, homework, submissions feedback, and reports only for their assigned classes.
- Parents can read records linked to their own children.
- Students can read their own linked records and submit homework without writing teacher feedback or grades.
- Notification recipients can read and update only their own notifications.
- Follow-ups and their history are restricted to academy management.

Apply both the base schema migration and `20260627090000_secure_management_operations.sql` to the same Supabase project before testing the dashboard.

## Environment variables

No new environment variables are required. The frontend continues to use only:

```dotenv
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in Nuxt or any `NUXT_PUBLIC_*` variable.

## Manual test steps

1. Apply the migrations and create test profiles for super admin, manager, teacher, parent, and student.
2. Visit `/management` while signed out and verify redirect to login.
3. Sign in as teacher, parent, or student and verify `/management` redirects to the role dashboard and does not show the Management navigation item.
4. Sign in as manager and verify live overview counts, urgent rows, student search, advanced filters, quick filters, sorting, and pagination.
5. Open a student and edit parent/student fields, assign a class and teacher, extend trial/access, and verify changes persist after refresh.
6. Create an invoice, mark it paid, and verify the invoice, payment, and 30-day enrollment dates update.
7. Add and update a follow-up, then verify every transition appears in follow-up history.
8. Send parent and student notifications. Verify a missing linked profile produces a clear error and no partial notification.
9. Select multiple students and test notification, follow-up, assignment, suspension confirmation, reactivation, and CSV exports.
10. As manager, attempt a direct student delete and a profile role escalation through the Supabase client; verify RLS rejects both.
11. As super admin, permanently delete a disposable student and verify related rows cascade while the Auth identity remains untouched.
12. As teacher, parent, and student, query unrelated student, attendance, invoice, and follow-up records; verify RLS returns no unauthorized data.

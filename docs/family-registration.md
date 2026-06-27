# Supabase Family Registration

## Files changed

- `app/pages/register.vue`: hybrid parent/child form, stable UUIDs, validation, processing lock, success summary, and session-flow redirect.
- `app/composables/useSupabaseRegistration.ts`: `register-family` payload builder, Edge Function invocation, structured errors, response normalization, and session adoption.
- `app/pages/login.vue`: registration notices and role-based post-login routing UX.
- `app/composables/useRoleAuth.ts`: Supabase profile-to-role mapping and linked parent/student profile enforcement.
- `app/composables/useFamilyAccounts.ts`: non-secret parent/student profile cache. Passwords are never cached.
- `app/middleware/role-auth.global.ts`: protected dashboard/classroom routing for linked Supabase students and parents.
- `app/pages/dashboard/parent.vue`: all linked children, separate-login status, classroom links, and child record navigation.
- `app/pages/dashboard/student.vue`: no demo fallback; requires the logged-in student's linked `students.profile_id`.
- `app/pages/classrooms/[id].vue`: recognizes linked Supabase children in classroom access and student display data.
- `app/plugins/supabase.client.ts`, `nuxt.config.ts`, `server/utils/supabase.ts`, and `.env.example`: publishable Supabase client configuration.

## Environment variables

```dotenv
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

`NUXT_PUBLIC_SUPABASE_ANON_KEY` remains a compatibility fallback in `nuxt.config.ts`, but the publishable-key name is preferred.

Never add `SUPABASE_SERVICE_ROLE_KEY` to the Nuxt environment, `runtimeConfig.public`, or any `NUXT_PUBLIC_*` variable. If the Edge Function needs that secret, configure it only in the Supabase Edge Function environment.

## Registration payload

The frontend invokes `supabase.functions.invoke('register-family')` once per submission. Confirm-password fields are validated locally and are not sent.

```json
{
  "request_key": "family-request-uuid",
  "parent": {
    "full_name": "Parent Name",
    "email": "parent@example.com",
    "whatsapp_number": "+1 555 0100",
    "country": "Canada",
    "city": "Toronto",
    "timezone": "EST",
    "relationship_to_student": "Mother"
  },
  "parent_credentials": {
    "email": "parent@example.com",
    "password": "minimum-8-characters"
  },
  "children": [
    {
      "client_request_id": "stable-child-uuid",
      "first_name": "Amina",
      "last_name": "Rahimi",
      "gender": "Female",
      "date_of_birth": "2012-04-10",
      "age": 14,
      "native_language": "Dari",
      "current_level": "Beginner",
      "course_category": "Dari Language",
      "course_name": "Dari for Teens",
      "class_type": "Group Class ($30/month)",
      "schedule_preference": "Weekends",
      "create_separate_login": true,
      "student_credentials": {
        "email": "amina@example.com",
        "password": "minimum-8-characters"
      }
    }
  ]
}
```

For a parent-managed child, `create_separate_login` is `false` and `student_credentials` is `null`.

The same `request_key` and child `client_request_id` values remain in memory for every retry of that form submission. The Edge Function must enforce idempotency for `request_key` and `client_request_id`.

## Response contract

The response may be direct or wrapped in `data`/`result`. It should return `request_key`, parent data, `children` or `students` matched by `client_request_id`, a message, and `session_flow`:

- `authenticated`: include a Supabase session with `access_token` and `refresh_token`; the frontend opens `/dashboard/parent`.
- `login_required`: the frontend shows the success summary and opens `/login`.
- `email_confirmation_required`: the frontend asks the parent to confirm email and opens `/login`.

Structured failures may use `{ "error": { "code", "message", "field", "retryable" } }`. Known validation, duplicate-email, rate-limit, network, and server errors receive user-friendly messages.

## Manual test steps

1. Configure the two public variables above and deploy `register-family` in the same Supabase project.
2. Register one child under 13. Verify separate login defaults to No, then verify either option remains selectable.
3. Register one child age 13 or older. Verify separate login defaults to Yes and the recommendation appears.
4. Enable separate login. Verify student email and matching 8+ character passwords are required.
5. Add a second child and verify both children have different `client_request_id` values in the network request.
6. Simulate a retryable function failure, submit again, and verify `request_key` and every `client_request_id` are unchanged.
7. Double-click Submit and verify only one request is sent while the progress state is active.
8. Return a structured duplicate or validation error and verify the form shows a clear message without losing retry identity.
9. Complete registration with each session flow and verify the success summary lists separate-login status before redirect.
10. Sign in as parent and verify all linked children, classroom links, attendance, homework, reports, notifications, payment status, and separate-login labels.
11. Sign in as a linked student and verify only that student's data appears at `/dashboard/student`.
12. Use a student auth account without a matching `students.profile_id` and verify the Student Dashboard is not opened.
13. Sign in as teacher, manager, and super admin and verify redirects to their assigned dashboard paths.
14. Inspect localStorage/sessionStorage and application tables. Verify no parent or student password is present.

<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import type { TeacherApplicationFile, Weekday } from '~/types'

useSeoMeta({
  title: 'Apply as a Teacher',
  description: 'Apply to teach languages, Quran, Islamic Studies, or Afghan Culture at Roshanayi Online Academy.'
})

const { submitApplication } = useTeacherApplications()
const steps = ['Personal information', 'Teaching information', 'Availability', 'Public profile', 'Documents', 'Agreement']
const subjects = ['Dari', 'Pashto', 'English', 'Quran Reading', 'Tajweed', 'Islamic Studies', 'Afghan Culture']
const languages = ['Dari', 'Pashto', 'English', 'Urdu', 'Arabic']
const days: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const timeSlots = ['Morning (8 AM–12 PM)', 'Afternoon (12–5 PM)', 'Evening (5–9 PM)', 'Late evening (9–11 PM)']
const classTypes = ['Group Classes', 'Special Classes', 'Premium Language Classes']
const educationLevels = ['High School', 'Diploma', 'Bachelor’s Degree', 'Master’s Degree', 'Doctorate', 'Islamic / Madrasa Qualification', 'Other']
const currentStep = ref(0)
const notice = ref('')
const submittedId = ref('')

const form = reactive({
  fullName: '', email: '', whatsapp: '', country: '', city: '', timezone: '', gender: '',
  subjects: [] as string[], teachingLanguages: [] as string[], yearsExperience: 0, educationLevel: '', previousExperience: '', professionalBio: '',
  availableDays: [] as Weekday[], availableTimeSlots: [] as string[], preferredClassTypes: [] as string[],
  canTeachChildren: true, canTeachTeenagers: true, canTeachEnglishSpeakers: false,
  displayName: '', profilePhoto: null as TeacherApplicationFile | null, websiteBio: '', profileSubjects: [] as string[], profileLanguages: [] as string[],
  resume: null as TeacherApplicationFile | null, certificate: null as TeacherApplicationFile | null, idDocument: null as TeacherApplicationFile | null, introVideoUrl: '',
  informationConfirmed: false, contactConsent: false, publicationConsent: false
})

type FileField = 'profilePhoto' | 'resume' | 'certificate' | 'idDocument'

const setFile = (field: FileField, event: Event) => {
  if (!import.meta.client) return
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  form[field] = { name: file.name, type: file.type, size: file.size, url: URL.createObjectURL(file) }
}

const yesNo = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
]

const stepValid = () => {
  if (currentStep.value === 0) return Boolean(form.fullName && form.email && form.whatsapp && form.country && form.city && form.timezone && form.gender)
  if (currentStep.value === 1) return Boolean(form.subjects.length && form.teachingLanguages.length && form.educationLevel && form.previousExperience && form.professionalBio)
  if (currentStep.value === 2) return Boolean(form.availableDays.length && form.availableTimeSlots.length && form.preferredClassTypes.length)
  if (currentStep.value === 3) return Boolean(form.displayName && form.profilePhoto && form.websiteBio && form.profileSubjects.length && form.profileLanguages.length)
  if (currentStep.value === 4) return Boolean(form.resume)
  return form.informationConfirmed && form.contactConsent && form.publicationConsent
}

const nextStep = () => {
  if (!stepValid()) {
    notice.value = 'Please complete all required fields before continuing.'
    return
  }
  notice.value = ''
  currentStep.value = Math.min(currentStep.value + 1, steps.length - 1)
}

const previousStep = () => {
  notice.value = ''
  currentStep.value = Math.max(currentStep.value - 1, 0)
}

const submit = () => {
  if (!stepValid() || !form.resume) {
    notice.value = 'Please accept all agreements before submitting.'
    return
  }
  const application = submitApplication({
    ...form,
    subjects: [...form.subjects],
    teachingLanguages: [...form.teachingLanguages],
    availableDays: [...form.availableDays],
    availableTimeSlots: [...form.availableTimeSlots],
    preferredClassTypes: [...form.preferredClassTypes],
    profileSubjects: [...form.profileSubjects],
    profileLanguages: [...form.profileLanguages],
    resume: form.resume
  })
  submittedId.value = application.id
  notice.value = ''
}
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.register"
      eyebrow="Teacher recruitment"
      title="Teach with Roshanayi Academy"
      description="Share your knowledge with Afghan children and families around the world. Every application is reviewed carefully before an account or public profile is activated."
      height="compact"
    />

    <section class="section-padding bg-slate-50 dark:bg-slate-950">
      <div class="container-wide">
        <div v-if="submittedId" class="mx-auto max-w-3xl rounded-xl border border-emerald-200 bg-white p-8 text-center shadow-soft dark:border-emerald-900 dark:bg-slate-900">
          <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-black text-emerald-700">✓</span>
          <h1 class="mt-5 text-3xl font-black text-slate-950 dark:text-white">Application received</h1>
          <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">Thank you for applying. A Manager or Super Admin will review your information before any teacher access or public profile is created.</p>
          <p class="mt-5 rounded-md bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">Reference: {{ submittedId }} · Status: New</p>
          <BaseButton to="/" class="mt-6">Return home</BaseButton>
        </div>

        <div v-else class="grid gap-8 xl:grid-cols-[0.32fr_0.68fr]">
          <aside class="self-start rounded-xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 xl:sticky xl:top-28">
            <p class="eyebrow">Application progress</p>
            <ol class="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              <li v-for="(step, index) in steps" :key="step">
                <button type="button" :disabled="index > currentStep" :class="['flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-semibold', index === currentStep ? 'bg-brand-purple text-white' : index < currentStep ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200' : 'bg-slate-50 text-slate-400 dark:bg-slate-800']" @click="currentStep = index">
                  <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-black">{{ index < currentStep ? '✓' : index + 1 }}</span>
                  {{ step }}
                </button>
              </li>
            </ol>
            <div class="mt-5 rounded-md bg-purple-50 p-4 text-sm leading-6 text-slate-700 dark:bg-purple-950/40 dark:text-slate-200">
              Your contact details and documents are private and available only to authorized reviewers.
            </div>
          </aside>

          <form class="rounded-xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8" @submit.prevent="submit">
            <div class="border-b border-slate-200 pb-5 dark:border-slate-800">
              <p class="text-sm font-bold text-brand-purple dark:text-brand-gold">Step {{ currentStep + 1 }} of {{ steps.length }}</p>
              <h2 class="mt-2 text-3xl font-black text-slate-950 dark:text-white">{{ steps[currentStep] }}</h2>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Fields marked required must be completed before continuing.</p>
            </div>

            <div v-if="currentStep === 0" class="mt-6 grid gap-5 sm:grid-cols-2">
              <label class="sm:col-span-2"><span class="form-label">Full Name *</span><input v-model="form.fullName" required type="text" autocomplete="name" class="form-input"></label>
              <label><span class="form-label">Email Address *</span><input v-model="form.email" required type="email" autocomplete="email" class="form-input"></label>
              <label><span class="form-label">WhatsApp Number *</span><input v-model="form.whatsapp" required type="tel" autocomplete="tel" class="form-input"></label>
              <label><span class="form-label">Country *</span><input v-model="form.country" required type="text" autocomplete="country-name" class="form-input"></label>
              <label><span class="form-label">City *</span><input v-model="form.city" required type="text" autocomplete="address-level2" class="form-input"></label>
              <label><span class="form-label">Timezone *</span><input v-model="form.timezone" required type="text" placeholder="e.g. Europe/London or GMT" class="form-input"></label>
              <label><span class="form-label">Gender *</span><select v-model="form.gender" required class="form-input"><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></label>
            </div>

            <div v-else-if="currentStep === 1" class="mt-6 grid gap-6">
              <fieldset><legend class="form-label">Subjects you can teach *</legend><div class="option-grid"><label v-for="subject in subjects" :key="subject" class="option-card"><input v-model="form.subjects" type="checkbox" :value="subject">{{ subject }}</label></div></fieldset>
              <fieldset><legend class="form-label">Teaching Languages *</legend><div class="option-grid"><label v-for="language in languages" :key="language" class="option-card"><input v-model="form.teachingLanguages" type="checkbox" :value="language">{{ language }}</label></div></fieldset>
              <div class="grid gap-5 sm:grid-cols-2">
                <label><span class="form-label">Years of Teaching Experience *</span><input v-model.number="form.yearsExperience" required min="0" max="60" type="number" class="form-input"></label>
                <label><span class="form-label">Education Level *</span><select v-model="form.educationLevel" required class="form-input"><option value="" disabled>Select</option><option v-for="level in educationLevels" :key="level">{{ level }}</option></select></label>
              </div>
              <label><span class="form-label">Previous Teaching Experience *</span><textarea v-model="form.previousExperience" required rows="4" class="form-input" placeholder="Schools, online programs, age groups, responsibilities, and achievements"></textarea></label>
              <label><span class="form-label">Short Professional Bio *</span><textarea v-model="form.professionalBio" required rows="4" class="form-input" placeholder="Describe your teaching style, strengths, and professional goals"></textarea></label>
            </div>

            <div v-else-if="currentStep === 2" class="mt-6 grid gap-6">
              <fieldset><legend class="form-label">Available Days *</legend><div class="option-grid"><label v-for="day in days" :key="day" class="option-card"><input v-model="form.availableDays" type="checkbox" :value="day">{{ day }}</label></div></fieldset>
              <fieldset><legend class="form-label">Available Time Slots *</legend><div class="option-grid sm:grid-cols-2"><label v-for="slot in timeSlots" :key="slot" class="option-card"><input v-model="form.availableTimeSlots" type="checkbox" :value="slot">{{ slot }}</label></div></fieldset>
              <fieldset><legend class="form-label">Preferred Class Type *</legend><div class="option-grid sm:grid-cols-3"><label v-for="type in classTypes" :key="type" class="option-card"><input v-model="form.preferredClassTypes" type="checkbox" :value="type">{{ type }}</label></div></fieldset>
              <div class="grid gap-5 md:grid-cols-3">
                <fieldset v-for="question in [{ key: 'canTeachChildren', label: 'Can teach children?' }, { key: 'canTeachTeenagers', label: 'Can teach teenagers?' }, { key: 'canTeachEnglishSpeakers', label: 'Can teach English-speaking students?' }]" :key="question.key" class="rounded-md border border-slate-200 p-4 dark:border-slate-700">
                  <legend class="form-label">{{ question.label }}</legend>
                  <label v-for="answer in yesNo" :key="String(answer.value)" class="mr-4 inline-flex items-center gap-2 text-sm"><input v-model="form[question.key as keyof typeof form]" type="radio" :value="answer.value">{{ answer.label }}</label>
                </fieldset>
              </div>
            </div>

            <div v-else-if="currentStep === 3" class="mt-6 grid gap-6">
              <div class="rounded-md border border-purple-200 bg-purple-50 p-4 text-sm leading-6 text-purple-900 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-100">Only the information in this step, plus your experience, may appear publicly—and only after reviewer approval.</div>
              <label><span class="form-label">Display Name *</span><input v-model="form.displayName" required type="text" class="form-input"></label>
              <label><span class="form-label">Profile Photo Upload *</span><input required accept="image/png,image/jpeg,image/webp" type="file" class="form-input file:mr-3 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:font-semibold file:text-brand-purple" @change="setFile('profilePhoto', $event)"><span v-if="form.profilePhoto" class="mt-2 block text-xs text-emerald-600">Selected: {{ form.profilePhoto.name }}</span></label>
              <label><span class="form-label">Short Bio for Website *</span><textarea v-model="form.websiteBio" required rows="4" maxlength="700" class="form-input"></textarea></label>
              <fieldset><legend class="form-label">Subjects Displayed on Profile *</legend><div class="option-grid"><label v-for="subject in form.subjects" :key="subject" class="option-card"><input v-model="form.profileSubjects" type="checkbox" :value="subject">{{ subject }}</label></div></fieldset>
              <fieldset><legend class="form-label">Languages Displayed on Profile *</legend><div class="option-grid"><label v-for="language in form.teachingLanguages" :key="language" class="option-card"><input v-model="form.profileLanguages" type="checkbox" :value="language">{{ language }}</label></div></fieldset>
            </div>

            <div v-else-if="currentStep === 4" class="mt-6 grid gap-5">
              <label><span class="form-label">CV or Resume Upload *</span><input required accept=".pdf,.doc,.docx" type="file" class="form-input file:mr-3 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:font-semibold file:text-brand-purple" @change="setFile('resume', $event)"><span v-if="form.resume" class="file-selected">{{ form.resume.name }}</span></label>
              <label><span class="form-label">Certificate Upload (optional)</span><input accept=".pdf,.jpg,.jpeg,.png,.webp" type="file" class="form-input file:mr-3 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:font-semibold file:text-brand-purple" @change="setFile('certificate', $event)"><span v-if="form.certificate" class="file-selected">{{ form.certificate.name }}</span></label>
              <label><span class="form-label">ID Document (optional, private)</span><input accept=".pdf,.jpg,.jpeg,.png,.webp" type="file" class="form-input file:mr-3 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:font-semibold file:text-brand-purple" @change="setFile('idDocument', $event)"><span v-if="form.idDocument" class="file-selected">{{ form.idDocument.name }}</span></label>
              <label><span class="form-label">Intro Video Link (optional)</span><input v-model="form.introVideoUrl" type="url" placeholder="https://..." class="form-input"></label>
              <p class="rounded-md bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">Documents, identification, email, and phone number are restricted to Manager and Super Admin review.</p>
            </div>

            <div v-else class="mt-6 grid gap-4">
              <label class="agreement-card"><input v-model="form.informationConfirmed" required type="checkbox"><span><strong>I confirm that my information is correct.</strong><small>I have reviewed the application and provided accurate details.</small></span></label>
              <label class="agreement-card"><input v-model="form.contactConsent" required type="checkbox"><span><strong>I agree that Roshanayi Academy may contact me for verification.</strong><small>The academy may use my private contact details during review.</small></span></label>
              <label class="agreement-card"><input v-model="form.publicationConsent" required type="checkbox"><span><strong>I understand that my profile will only be published after approval.</strong><small>Submission does not create an active teacher account automatically.</small></span></label>
              <div class="rounded-md border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                After submission, your status begins as <strong>New</strong>. A reviewer may approve, reject, request more information, or place the application under review.
              </div>
            </div>

            <p v-if="notice" class="mt-5 rounded-md bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">{{ notice }}</p>
            <div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-between">
              <BaseButton v-if="currentStep" type="button" variant="outline" @click="previousStep">Back</BaseButton><span v-else />
              <BaseButton v-if="currentStep < steps.length - 1" type="button" @click="nextStep">Continue</BaseButton>
              <BaseButton v-else type="submit">Submit Teacher Application</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.form-label { @apply mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200; }
.form-input { @apply focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white; }
.option-grid { @apply mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3; }
.option-card { @apply flex min-h-12 items-center gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200; }
.option-card:has(input:checked) { @apply border-brand-purple bg-purple-50 text-brand-purple dark:border-brand-gold dark:bg-purple-950/40 dark:text-brand-gold; }
.file-selected { @apply mt-2 block text-xs font-semibold text-emerald-600 dark:text-emerald-300; }
.agreement-card { @apply flex items-start gap-3 rounded-md border border-slate-200 p-4 dark:border-slate-700; }
.agreement-card input { @apply mt-1; }
.agreement-card strong { @apply block text-sm text-slate-950 dark:text-white; }
.agreement-card small { @apply mt-1 block text-sm leading-6 text-slate-500 dark:text-slate-400; }
</style>

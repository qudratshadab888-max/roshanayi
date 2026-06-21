<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { generateReferralCode } from '~/data/management'

interface StudentRegistrationForm {
  id: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  age: number | null
  nativeLanguage: string
  currentLanguageLevel: string
  courseCategory: string
  courseName: string
  classType: string
  schedulePreference: string
}

const { t, tm } = useI18n()
const { courses, courseCategorySections } = useAcademyData()

useSeoMeta({
  title: () => t('seo.register.title'),
  description: () => t('seo.register.description')
})

const currentStep = ref(1)
const currentChildIndex = ref(0)
const isSubmitting = ref(false)
const submitted = ref(false)
const notice = ref('')
const generatedReferralCodes = ref<Array<{ name: string; code: string }>>([])

const parent = reactive({
  fullName: '',
  email: '',
  whatsappNumber: '',
  country: '',
  city: '',
  timezone: '',
  relationship: 'Father'
})

const createChild = (index: number): StudentRegistrationForm => ({
  id: `child-${index}`,
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  age: null,
  nativeLanguage: '',
  currentLanguageLevel: '',
  courseCategory: '',
  courseName: '',
  classType: 'Group Class ($30/month)',
  schedulePreference: 'Weekdays'
})

const children = ref<StudentRegistrationForm[]>([createChild(1)])

const agreement = reactive({
  trialPolicy: false,
  paymentPolicy: false,
  academyRules: false
})

const steps = computed(() => tm<string[]>('register.formSteps'))
const optionLabels = computed(() => tm<Record<string, string>>('register.optionLabels'))
const relationships = computed(() => [
  { value: 'Father', label: optionLabels.value.father },
  { value: 'Mother', label: optionLabels.value.mother },
  { value: 'Guardian', label: optionLabels.value.guardian }
])
const genders = computed(() => [
  { value: 'Female', label: optionLabels.value.female },
  { value: 'Male', label: optionLabels.value.male },
  { value: 'Prefer not to say', label: optionLabels.value.undisclosed }
])
const nativeLanguages = computed(() => [
  { value: 'Dari', label: optionLabels.value.dari },
  { value: 'Pashto', label: optionLabels.value.pashto },
  { value: 'English', label: optionLabels.value.english },
  { value: 'Urdu', label: optionLabels.value.urdu },
  { value: 'Arabic', label: optionLabels.value.arabic },
  { value: 'Other', label: optionLabels.value.other }
])
const languageLevels = computed(() => [
  { value: 'New beginner', label: optionLabels.value.newBeginner },
  { value: 'Understands but needs speaking practice', label: optionLabels.value.understands },
  { value: 'Beginner', label: optionLabels.value.beginner },
  { value: 'Intermediate', label: optionLabels.value.intermediate },
  { value: 'Advanced', label: optionLabels.value.advanced }
])
const classTypes = computed(() => [
  { value: 'Group Class ($30/month)', label: optionLabels.value.group },
  { value: 'Special Class ($100/month)', label: optionLabels.value.special },
  { value: 'Premium Language Program ($150/month)', label: optionLabels.value.premium }
])
const schedulePreferences = computed(() => [
  { value: 'Weekdays', label: optionLabels.value.weekdays },
  { value: 'Weekends', label: optionLabels.value.weekends },
  { value: 'Flexible', label: optionLabels.value.flexible }
])
const timezones = ['PST', 'MST', 'CST', 'EST', 'GMT', 'CET', 'AEST', 'Asia/Karachi', 'Flexible']

const getLanguageLevelLabel = (value: string) =>
  languageLevels.value.find((option) => option.value === value)?.label ?? value
const getClassTypeLabel = (value: string) =>
  classTypes.value.find((option) => option.value === value)?.label ?? value
const getSchedulePreferenceLabel = (value: string) =>
  schedulePreferences.value.find((option) => option.value === value)?.label ?? value

const currentChild = computed(() => children.value[currentChildIndex.value]!)
const courseCategories = computed(() => courseCategorySections.value.map((category) => category.title))
const courseOptionsForCurrentChild = computed(() =>
  courses.value.filter((course) => !currentChild.value.courseCategory || course.category === currentChild.value.courseCategory)
)

watch(
  () => currentChild.value.courseCategory,
  () => {
    if (!courseOptionsForCurrentChild.value.some((course) => course.title === currentChild.value.courseName)) {
      currentChild.value.courseName = courseOptionsForCurrentChild.value[0]?.title ?? ''
    }
  }
)

watch(
  () => currentChild.value.dateOfBirth,
  (dateOfBirth) => {
    if (!dateOfBirth) {
      return
    }

    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDelta = today.getMonth() - birthDate.getMonth()

    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1
    }

    currentChild.value.age = Number.isFinite(age) ? Math.max(age, 0) : currentChild.value.age
  }
)

const childFullName = (child: StudentRegistrationForm) =>
  [child.firstName, child.lastName].filter(Boolean).join(' ') || t('register.review.newChild')

const childIsComplete = (child: StudentRegistrationForm) =>
  Boolean(
    child.firstName &&
      child.lastName &&
      child.gender &&
      child.dateOfBirth &&
      child.age &&
      child.nativeLanguage &&
      child.currentLanguageLevel &&
      child.courseCategory &&
      child.courseName &&
      child.classType &&
      child.schedulePreference
  )

const validateCurrentStep = () => {
  if (
    currentStep.value === 1 &&
    (!parent.fullName ||
      !parent.email ||
      !parent.whatsappNumber ||
      !parent.country ||
      !parent.city ||
      !parent.timezone ||
      !parent.relationship)
  ) {
    notice.value = t('register.validation.parent')
    return false
  }

  if (
    currentStep.value === 2 &&
    (!currentChild.value.firstName ||
      !currentChild.value.lastName ||
      !currentChild.value.gender ||
      !currentChild.value.dateOfBirth ||
      !currentChild.value.age ||
      !currentChild.value.nativeLanguage ||
      !currentChild.value.currentLanguageLevel)
  ) {
    notice.value = t('register.validation.student')
    return false
  }

  if (
    currentStep.value === 3 &&
    (!currentChild.value.courseCategory ||
      !currentChild.value.courseName ||
      !currentChild.value.classType ||
      !currentChild.value.schedulePreference)
  ) {
    notice.value = t('register.validation.course')
    return false
  }

  if (currentStep.value === 4 && !children.value.every(childIsComplete)) {
    notice.value = t('register.validation.children')
    return false
  }

  return true
}

const goToStep = (step: number) => {
  currentStep.value = step
  notice.value = ''
}

const nextStep = () => {
  if (!validateCurrentStep()) {
    return
  }

  currentStep.value = Math.min(currentStep.value + 1, steps.value.length)
  notice.value = ''
}

const previousStep = () => {
  currentStep.value = Math.max(currentStep.value - 1, 1)
  notice.value = ''
}

const addAnotherChild = () => {
  children.value.push(createChild(children.value.length + 1))
  currentChildIndex.value = children.value.length - 1
  goToStep(2)
}

const editChild = (index: number) => {
  currentChildIndex.value = index
  goToStep(2)
}

const submitRegistration = async () => {
  if (!agreement.trialPolicy || !agreement.paymentPolicy || !agreement.academyRules) {
    notice.value = t('register.validation.policies')
    return
  }

  isSubmitting.value = true
  submitted.value = false
  notice.value = ''

  await new Promise((resolve) => globalThis.setTimeout(resolve, 700))

  generatedReferralCodes.value = children.value.map((child) => ({
    name: childFullName(child),
    code: generateReferralCode(childFullName(child))
  }))
  isSubmitting.value = false
  submitted.value = true
}
</script>

<template>
  <PageBackdrop :image="pageBackgrounds.register" class="section-padding">
    <div class="container-wide grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
      <div class="max-w-2xl">
        <p class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-gold backdrop-blur">
          {{ t('register.familyEyebrow') }}
        </p>
        <h1 class="mt-6 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
          {{ t('register.familyTitle') }}
        </h1>
        <p class="mt-5 text-lg leading-8 text-slate-200">
          {{ t('register.familyDescription') }}
        </p>

        <div class="mt-8 grid gap-3">
          <button
            v-for="(step, index) in steps"
            :key="step"
            type="button"
            :class="[
              'focus-ring grid grid-cols-[auto_1fr] items-center gap-3 rounded-lg border px-4 py-3 text-left transition',
              currentStep === index + 1
                ? 'border-brand-gold bg-white text-slate-950'
                : 'border-white/15 bg-white/10 text-slate-100 hover:border-brand-gold'
            ]"
            @click="goToStep(index + 1)"
          >
            <span
              :class="[
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-black',
                currentStep === index + 1 ? 'bg-brand-purple text-white' : 'bg-white/15 text-brand-gold'
              ]"
            >
              {{ index + 1 }}
            </span>
            <span class="font-bold">{{ step }}</span>
          </button>
        </div>
      </div>

      <form class="rounded-lg border border-slate-200 bg-white p-6 text-brand-ink shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" :aria-label="t('register.formAria')" @submit.prevent="submitRegistration">
        <div class="flex flex-col gap-3 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="eyebrow">{{ t('register.stepOf', { current: currentStep, total: steps.length }) }}</p>
            <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ steps[currentStep - 1] }}</h2>
          </div>
          <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold">
            {{ t('register.childProfiles', { count: children.length }) }}
          </span>
        </div>

        <div v-if="currentStep === 1" class="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="parent-name">{{ t('register.fields.parentFullName') }}</label>
            <input id="parent-name" v-model="parent.fullName" required type="text" autocomplete="name" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="register-email">{{ t('common.labels.email') }}</label>
            <input id="register-email" v-model="parent.email" required type="email" autocomplete="email" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="register-whatsapp">{{ t('common.labels.whatsappNumber') }}</label>
            <input id="register-whatsapp" v-model="parent.whatsappNumber" required type="tel" autocomplete="tel" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="country">{{ t('common.labels.country') }}</label>
            <input id="country" v-model="parent.country" required type="text" autocomplete="country-name" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="city">{{ t('register.fields.city') }}</label>
            <input id="city" v-model="parent.city" required type="text" autocomplete="address-level2" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="timezone">{{ t('register.fields.timezone') }}</label>
            <select id="timezone" v-model="parent.timezone" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option value="" disabled>{{ t('register.selections.timezone') }}</option>
              <option v-for="timezone in timezones" :key="timezone" :value="timezone">{{ timezone }}</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="relationship">{{ t('register.fields.relationship') }}</label>
            <select id="relationship" v-model="parent.relationship" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="relationship in relationships" :key="relationship.value" :value="relationship.value">{{ relationship.label }}</option>
            </select>
          </div>
        </div>

        <div v-else-if="currentStep === 2" class="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-first-name">{{ t('register.fields.firstName') }}</label>
            <input id="student-first-name" v-model="currentChild.firstName" required type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-last-name">{{ t('register.fields.lastName') }}</label>
            <input id="student-last-name" v-model="currentChild.lastName" required type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-gender">{{ t('register.fields.gender') }}</label>
            <select id="student-gender" v-model="currentChild.gender" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option value="" disabled>{{ t('register.selections.gender') }}</option>
              <option v-for="gender in genders" :key="gender.value" :value="gender.value">{{ gender.label }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-date-of-birth">{{ t('register.fields.dateOfBirth') }}</label>
            <input id="student-date-of-birth" v-model="currentChild.dateOfBirth" required type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-age">{{ t('register.fields.age') }}</label>
            <input id="student-age" v-model.number="currentChild.age" required min="3" max="18" type="number" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="native-language">{{ t('register.fields.nativeLanguage') }}</label>
            <select id="native-language" v-model="currentChild.nativeLanguage" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option value="" disabled>{{ t('register.selections.language') }}</option>
              <option v-for="language in nativeLanguages" :key="language.value" :value="language.value">{{ language.label }}</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="language-level">{{ t('register.fields.currentLevel') }}</label>
            <select id="language-level" v-model="currentChild.currentLanguageLevel" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option value="" disabled>{{ t('register.selections.level') }}</option>
              <option v-for="level in languageLevels" :key="level.value" :value="level.value">{{ level.label }}</option>
            </select>
          </div>
        </div>

        <div v-else-if="currentStep === 3" class="mt-6 grid gap-5">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="course-category">{{ t('register.fields.courseCategory') }}</label>
              <select id="course-category" v-model="currentChild.courseCategory" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                <option value="" disabled>{{ t('register.selections.category') }}</option>
                <option v-for="category in courseCategories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="course-name">{{ t('register.fields.courseName') }}</label>
              <select id="course-name" v-model="currentChild.courseName" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                <option value="" disabled>{{ t('register.selections.course') }}</option>
                <option v-for="course in courseOptionsForCurrentChild" :key="course.slug" :value="course.title">{{ course.title }}</option>
              </select>
            </div>
          </div>

          <fieldset class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <legend class="px-2 text-sm font-semibold text-slate-700 dark:text-slate-200">{{ t('register.fields.classType') }}</legend>
            <div class="grid gap-3 sm:grid-cols-3">
              <label
                v-for="type in classTypes"
                :key="type.value"
                :class="[
                  'focus-within:ring-2 focus-within:ring-brand-gold rounded-md border p-4 text-sm font-bold transition',
                  currentChild.classType === type.value
                    ? 'border-brand-purple bg-purple-50 text-brand-purple dark:border-brand-gold dark:bg-purple-950/40 dark:text-brand-gold'
                    : 'border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-200'
                ]"
              >
                <input v-model="currentChild.classType" class="sr-only" type="radio" :value="type.value">
                {{ type.label }}
              </label>
            </div>
          </fieldset>

          <fieldset class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <legend class="px-2 text-sm font-semibold text-slate-700 dark:text-slate-200">{{ t('register.fields.schedulePreference') }}</legend>
            <div class="grid gap-3 sm:grid-cols-3">
              <label
                v-for="preference in schedulePreferences"
                :key="preference.value"
                :class="[
                  'focus-within:ring-2 focus-within:ring-brand-gold rounded-md border p-4 text-sm font-bold transition',
                  currentChild.schedulePreference === preference.value
                    ? 'border-brand-purple bg-purple-50 text-brand-purple dark:border-brand-gold dark:bg-purple-950/40 dark:text-brand-gold'
                    : 'border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-200'
                ]"
              >
                <input v-model="currentChild.schedulePreference" class="sr-only" type="radio" :value="preference.value">
                {{ preference.label }}
              </label>
            </div>
          </fieldset>
        </div>

        <div v-else-if="currentStep === 4" class="mt-6 grid gap-4">
          <article
            v-for="(child, index) in children"
            :key="child.id"
            class="rounded-lg border border-slate-200 p-4 dark:border-slate-800"
          >
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 class="text-lg font-bold text-slate-950 dark:text-white">{{ childFullName(child) }}</h3>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ child.age || t('register.review.agePending') }} | {{ child.currentLanguageLevel ? getLanguageLevelLabel(child.currentLanguageLevel) : t('register.review.levelPending') }}</p>
                <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ child.courseName || t('register.review.coursePending') }}</p>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ getClassTypeLabel(child.classType) }} | {{ getSchedulePreferenceLabel(child.schedulePreference) }}</p>
              </div>
              <button type="button" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200" @click="editChild(index)">
                {{ t('register.review.edit') }}
              </button>
            </div>
          </article>

          <button type="button" class="focus-ring rounded-md border border-dashed border-brand-purple px-4 py-4 text-sm font-bold text-brand-purple dark:border-brand-gold dark:text-brand-gold" @click="addAnotherChild">
            {{ t('register.review.addChild') }}
          </button>
        </div>

        <div v-else class="mt-6 grid gap-4">
          <label class="flex gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <input v-model="agreement.trialPolicy" required type="checkbox" class="mt-1 h-4 w-4 rounded border-slate-300 text-brand-purple">
            <span>
              <span class="block font-bold text-slate-950 dark:text-white">{{ t('register.agreements.trialTitle') }}</span>
              <span class="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-300">{{ t('register.agreements.trialText') }}</span>
            </span>
          </label>
          <label class="flex gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <input v-model="agreement.paymentPolicy" required type="checkbox" class="mt-1 h-4 w-4 rounded border-slate-300 text-brand-purple">
            <span>
              <span class="block font-bold text-slate-950 dark:text-white">{{ t('register.agreements.paymentTitle') }}</span>
              <span class="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-300">{{ t('register.agreements.paymentText') }}</span>
            </span>
          </label>
          <label class="flex gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <input v-model="agreement.academyRules" required type="checkbox" class="mt-1 h-4 w-4 rounded border-slate-300 text-brand-purple">
            <span>
              <span class="block font-bold text-slate-950 dark:text-white">{{ t('register.agreements.rulesTitle') }}</span>
              <span class="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-300">{{ t('register.agreements.rulesText') }}</span>
            </span>
          </label>
        </div>

        <div class="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex gap-3">
            <BaseButton v-if="currentStep > 1" type="button" variant="outline" @click="previousStep">{{ t('register.actions.back') }}</BaseButton>
            <BaseButton v-if="currentStep < steps.length" type="button" @click="nextStep">{{ t('register.actions.continue') }}</BaseButton>
            <BaseButton v-else type="submit" :loading="isSubmitting">
              {{ isSubmitting ? t('register.actions.submitting') : t('register.submitIdle') }}
            </BaseButton>
          </div>
          <p v-if="notice" class="text-sm font-semibold text-rose-600 dark:text-rose-300" role="alert">{{ notice }}</p>
          <p v-else-if="submitted" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300" role="status" aria-live="polite">
            {{ t('register.success') }}
          </p>
        </div>

        <div v-if="submitted && generatedReferralCodes.length" class="mt-5 rounded-lg bg-purple-50 p-4 text-sm text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">
          <p class="font-bold">{{ t('register.actions.referralCodes') }}</p>
          <div class="mt-3 grid gap-2 sm:grid-cols-2">
            <p v-for="item in generatedReferralCodes" :key="item.code" class="rounded-md bg-white p-3 dark:bg-slate-900">
              {{ item.name }}: <strong>{{ item.code }}</strong>
            </p>
          </div>
        </div>
      </form>
    </div>
  </PageBackdrop>
</template>

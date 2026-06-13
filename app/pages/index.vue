<script setup lang="ts">
import type { FaqItem, Testimonial } from '~/types'

useSeoMeta({
  title: 'Dari, Pashto, Quran & English Classes',
  ogTitle: 'Roshanayi Academy | Trusted online classes for Afghan children',
  description:
    'Live online Dari, Pashto, Quran, Tajweed, Islamic Basics, English, and Afghan heritage classes for Afghan children worldwide with trial classes and parent progress reports.',
  ogDescription:
    'Register your child for live online classes with two trial classes before payment, safe communication, and parent progress tracking.'
})

const whatsappUrl =
  'https://wa.me/10000000000?text=Hello%20Roshanayi%20Academy%2C%20I%20want%20to%20ask%20about%20classes%20for%20my%20child.'

const heroStyle = {
  backgroundImage:
    "linear-gradient(90deg, rgba(15, 23, 42, 0.94) 0%, rgba(76, 29, 149, 0.82) 48%, rgba(15, 23, 42, 0.34) 100%), url('/images/hero-roshanayi-academy.png')"
}

const trustBadges = [
  'Two Trial Classes',
  'Parent Reports',
  'Safe Communication',
  'Qualified Teachers',
  'Flexible Time Zones'
]

const trustReasons = [
  {
    title: 'Two trial classes before payment',
    text: 'Families can see the teacher, schedule, and learning style before confirming enrollment.'
  },
  {
    title: 'Small group classes',
    text: 'Children receive attention, correction, and speaking time without feeling lost in a large class.'
  },
  {
    title: 'Progress tracking for parents',
    text: 'Parents can follow attendance, progress notes, next class details, and teacher feedback.'
  },
  {
    title: 'Teacher supervision by academy admin',
    text: 'Teachers work inside the academy system, with class activity and student progress reviewed.'
  },
  {
    title: 'Safe communication policy',
    text: 'Parent contact details and student records are handled carefully through academy channels.'
  },
  {
    title: 'Organized fee/payment system',
    text: 'Payments are tracked by Roshanayi Academy so families have clear confirmation and records.'
  }
]

const registrationSteps = [
  'Parent submits registration form',
  'Academy reviews student level and schedule',
  'Student joins two trial classes',
  'Parent confirms enrollment and payment',
  'Student continues with progress tracking'
]

const safetyRules = [
  'Teachers cannot collect fees directly',
  'Payments are tracked through the academy',
  'Parents receive payment confirmation',
  'Attendance is recorded',
  'Student progress is reviewed regularly'
]

const programs = [
  {
    title: 'Dari for Afghan Children',
    text: 'Reading, speaking, writing, and confidence for heritage learners.'
  },
  {
    title: 'Pashto for Afghan Children',
    text: 'Conversation, alphabet, family vocabulary, and cultural connection.'
  },
  {
    title: 'Quran Reading',
    text: 'Arabic letters, joining rules, vowels, and guided reading practice.'
  },
  {
    title: 'Tajweed',
    text: 'Makharij, pronunciation, madd, stopping rules, and careful correction.'
  },
  {
    title: 'Islamic Basics',
    text: 'Age-appropriate duas, manners, stories, and daily Islamic foundations.'
  },
  {
    title: 'English Classes',
    text: 'Practical reading, speaking, writing, and confidence for all levels.'
  },
  {
    title: 'Farsi/Dari for English Speakers',
    text: 'A bridge course for children who mainly speak English at home.'
  },
  {
    title: 'Afghan Culture & Heritage',
    text: 'Stories, values, geography, poetry, celebrations, and family identity.'
  }
]

const dashboardCards = [
  { title: 'Attendance', value: 'Present: 7 / 8', text: 'Parents can see attendance history and missed classes.' },
  { title: 'Payment status', value: 'June: Paid', text: 'Clear monthly fee status with academy confirmation.' },
  { title: 'Upcoming class', value: 'Thursday, 6:30 PM', text: 'Next lesson time and course details in one place.' },
  { title: 'Progress report', value: '72% progress', text: 'Simple progress notes help parents support practice.' },
  { title: 'Teacher notes', value: 'Practice reading aloud', text: 'Teachers share short, practical feedback after class.' }
]

const testimonials: Testimonial[] = [
  {
    name: 'Farzana Amini',
    location: 'California, United States',
    quote:
      'The two trial classes helped us feel comfortable before paying. My daughter now reads short Dari sentences and we receive clear progress notes.',
    result: 'Parent of a Dari student'
  },
  {
    name: 'Hamid Karimi',
    location: 'Ontario, Canada',
    quote:
      'I like that payments go through the academy, not directly to teachers. It feels organized and safer for parents living abroad.',
    result: 'Parent of a Quran Reading student'
  },
  {
    name: 'Zahra Noori',
    location: 'Melbourne, Australia',
    quote:
      'Roshanayi understands Afghan families outside Afghanistan. The time zones, teacher notes, and small classes make it easy for our children to continue.',
    result: 'Parent in the family program'
  }
]

const faqs: FaqItem[] = [
  {
    question: 'Do you offer trial classes?',
    answer:
      'Yes. New students can attend two trial classes before payment, so parents can review the teacher, class style, and schedule first.'
  },
  {
    question: 'How do parents pay?',
    answer:
      'Parents pay through the academy process after the trial period. Payment status and confirmation are tracked by Roshanayi Academy.'
  },
  {
    question: 'Can my child join from any country?',
    answer:
      'Yes. Classes are online and planned for families in North America, Europe, the UK, Australia, and other time zones.'
  },
  {
    question: 'Do you teach English too?',
    answer:
      'Yes. Roshanayi Academy offers English classes for different levels, alongside Dari, Pashto, Quran, Tajweed, and heritage programs.'
  },
  {
    question: 'Do you teach Farsi/Dari to English speakers?',
    answer:
      'Yes. We offer Farsi/Dari for English-speaking children and families who want a gentle bridge into Dari language learning.'
  },
  {
    question: 'How do parents track progress?',
    answer:
      'Parents can review attendance, payment status, upcoming classes, teacher notes, and progress reports in the academy system.'
  },
  {
    question: 'Are teachers allowed to take private payments?',
    answer:
      'No. Teachers cannot collect fees directly. Payments are handled and confirmed through Roshanayi Academy to keep records clear and safe.'
  }
]
</script>

<template>
  <div>
    <section class="relative isolate bg-slate-950 bg-cover bg-center text-white lg:bg-[center_right_35%]" :style="heroStyle">
      <div class="container-wide flex min-h-[680px] items-center py-16 sm:py-20">
        <div class="max-w-5xl">
          <p class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-gold backdrop-blur">
            Trusted online learning for Afghan families abroad
          </p>
          <h1 class="mt-6 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Dari, Pashto, Quran & English Classes for Afghan Children Worldwide
          </h1>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
            Live online classes with structured learning, parent progress reports, and two trial classes before payment.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton to="/register" variant="secondary" size="lg">Register Your Child</BaseButton>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="focus-ring inline-flex items-center justify-center rounded-md bg-white px-6 py-4 text-base font-semibold text-brand-purple transition hover:bg-brand-gold hover:text-slate-950"
            >
              Contact on WhatsApp
            </a>
          </div>

          <div class="mt-10 flex max-w-4xl flex-wrap gap-3">
            <span
              v-for="badge in trustBadges"
              :key="badge"
              class="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur"
            >
              {{ badge }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Why Parents Trust Roshanayi Academy"
          title="Clear rules, caring teachers, and visible progress for families."
          description="Parents abroad need more than a tutor. They need a safe, organized academy system that protects communication, payments, and student progress."
          align="center"
        />

        <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="(item, index) in trustReasons"
            :key="item.title"
            class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-purple text-lg font-black text-white dark:bg-brand-gold dark:text-slate-950">
              {{ index + 1 }}
            </div>
            <h3 class="mt-5 text-xl font-bold text-slate-950 dark:text-white">{{ item.title }}</h3>
            <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionHeading
          eyebrow="How Registration Works"
          title="A simple path from registration to regular classes."
          description="Parents know what happens next at every stage, from first form submission to ongoing progress tracking."
        />

        <ol class="grid gap-4">
          <li
            v-for="(step, index) in registrationSteps"
            :key="step"
            class="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[auto_1fr] sm:items-center"
          >
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple text-lg font-black text-white dark:bg-brand-gold dark:text-slate-950">
              {{ index + 1 }}
            </span>
            <span class="text-lg font-bold text-slate-950 dark:text-white">{{ step }}</span>
          </li>
        </ol>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p class="eyebrow">Safe Learning System</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Built to prevent payment confusion and keep learning accountable.
          </h2>
          <p class="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Roshanayi Academy keeps teacher communication, attendance, student records, and fee confirmation organized through the academy system.
          </p>
          <div class="mt-8 grid gap-3">
            <div
              v-for="rule in safetyRules"
              :key="rule"
              class="flex items-start gap-3 rounded-lg bg-purple-50 p-4 text-brand-purple dark:bg-purple-950/40 dark:text-purple-100"
            >
              <span class="mt-0.5 font-black text-brand-gold">-</span>
              <span class="font-semibold">{{ rule }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-soft dark:border-slate-800">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">Academy Control</p>
          <h3 class="mt-4 text-2xl font-bold">Payments stay with Roshanayi Academy.</h3>
          <p class="mt-4 leading-7 text-slate-200">
            Teachers are responsible for teaching and attendance. Payment confirmation, records, and parent support stay with the academy admin team.
          </p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <div class="rounded-md bg-white/10 p-4">
              <p class="text-2xl font-black text-brand-gold">2</p>
              <p class="mt-1 text-sm text-slate-200">trial classes before payment</p>
            </div>
            <div class="rounded-md bg-white/10 p-4">
              <p class="text-2xl font-black text-brand-gold">100%</p>
              <p class="mt-1 text-sm text-slate-200">academy payment tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Programs"
          title="Core classes for language, Quran, faith, English, and Afghan identity."
          description="Families can begin with one course, then add more subjects as the child grows in confidence."
          align="center"
        />

        <div class="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="program in programs"
            :key="program.title"
            class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">Roshanayi Program</p>
            <h3 class="mt-3 text-lg font-bold text-slate-950 dark:text-white">{{ program.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ program.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Parent Dashboard Preview"
          title="Parents can understand what is happening without chasing updates."
          description="The Phase 1 academy system is designed around simple parent visibility: class attendance, payment clarity, upcoming schedule, progress, and teacher notes."
        />

        <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div class="flex flex-col gap-3 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Sample child profile</p>
              <h3 class="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Amina, age 9</h3>
            </div>
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">Active</span>
          </div>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <article
              v-for="card in dashboardCards"
              :key="card.title"
              class="rounded-lg bg-slate-50 p-4 dark:bg-slate-800"
            >
              <p class="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{{ card.title }}</p>
              <p class="mt-2 font-bold text-brand-purple dark:text-brand-gold">{{ card.value }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Afghan parents abroad say about Roshanayi."
          description="These placeholder stories reflect the experience Roshanayi Academy is designed to provide: trust, structure, and steady progress."
          align="center"
        />

        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <TestimonialCard
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            :testimonial="testimonial"
          />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions from Afghan parents."
          description="Clear answers about trial classes, payment, countries, subjects, progress tracking, and teacher payment rules."
        />
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="bg-slate-950 py-16 text-white">
      <div class="container-wide grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">Ready to begin?</p>
          <h2 class="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Start with two trial classes before payment.</h2>
          <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
            Register your child today, or ask our team on WhatsApp about the right course, level, and time zone.
          </p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <BaseButton to="/register" variant="secondary" size="lg">Register Now</BaseButton>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="focus-ring inline-flex items-center justify-center rounded-md bg-white px-6 py-4 text-base font-semibold text-brand-purple transition hover:bg-brand-gold hover:text-slate-950"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

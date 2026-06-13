<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'light'
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
    loading: false
  }
)

const variantClasses = {
  primary:
    'bg-brand-purple text-white shadow-lift hover:bg-brand-purpleDark dark:bg-brand-gold dark:text-slate-950 dark:hover:bg-amber-300',
  secondary:
    'bg-brand-gold text-slate-950 hover:bg-amber-300 dark:bg-brand-purple dark:text-white dark:hover:bg-brand-purpleDark',
  outline:
    'border border-slate-300 bg-white text-slate-900 hover:border-brand-purple hover:text-brand-purple dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-brand-gold dark:hover:text-brand-gold',
  ghost:
    'text-slate-700 hover:bg-slate-100 hover:text-brand-purple dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-brand-gold',
  light:
    'bg-white text-brand-purple hover:bg-brand-gold hover:text-slate-950 dark:bg-slate-100 dark:text-brand-purpleDark dark:hover:bg-brand-gold'
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base'
}

const classes = computed(() =>
  [
    'focus-ring inline-flex items-center justify-center rounded-md font-semibold transition duration-200',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.block ? 'w-full' : '',
    props.disabled || props.loading ? 'cursor-not-allowed opacity-70' : ''
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :class="classes" :disabled="disabled || loading" :aria-busy="loading">
    <span v-if="loading" class="me-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
    <slot />
  </button>
</template>

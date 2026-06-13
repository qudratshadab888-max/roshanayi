import {
  defaultLocale,
  getMessage,
  isLocaleCode,
  localeOptions,
  type LocaleCode
} from '~/i18n/messages'

const storageKey = 'roshanayi-locale'

export const useI18n = () => {
  const locale = useState<LocaleCode>('locale', () => defaultLocale)

  const locales = localeOptions
  const localeMeta = computed(
    () => locales.find((item) => item.code === locale.value) ?? locales[0]
  )
  const isRtl = computed(() => localeMeta.value.dir === 'rtl')

  const setLocale = (value: string) => {
    if (!isLocaleCode(value)) {
      return
    }

    locale.value = value

    if (import.meta.client) {
      window.localStorage.setItem(storageKey, value)
    }
  }

  const t = (path: string, replacements: Record<string, string | number> = {}) => {
    const message = getMessage(locale.value, path)
    const text = typeof message === 'string' ? message : path

    return Object.entries(replacements).reduce(
      (value, [key, replacement]) => value.replaceAll(`{${key}}`, String(replacement)),
      text
    )
  }

  const tm = <T>(path: string) => getMessage(locale.value, path) as T

  onMounted(() => {
    const storedLocale = window.localStorage.getItem(storageKey)

    if (storedLocale && isLocaleCode(storedLocale)) {
      locale.value = storedLocale
    }
  })

  return {
    locale,
    locales,
    localeMeta,
    isRtl,
    setLocale,
    t,
    tm
  }
}

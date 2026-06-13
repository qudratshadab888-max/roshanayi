export const useDarkMode = () => {
  const isDark = useState('roshanayi-dark-mode', () => false)

  const applyTheme = (value: boolean) => {
    if (!import.meta.client) return

    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('roshanayi-theme', value ? 'dark' : 'light')
  }

  const initTheme = () => {
    if (!import.meta.client) return

    const savedTheme = localStorage.getItem('roshanayi-theme')
    isDark.value = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches

    applyTheme(isDark.value)
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  return {
    isDark,
    initTheme,
    toggleTheme
  }
}

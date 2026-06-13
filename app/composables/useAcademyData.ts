import { getCourseCategories, getCourses } from '~/data/courses'
import { getFaqs } from '~/data/faqs'
import { getTeachers } from '~/data/teachers'
import { getTestimonials } from '~/data/testimonials'

export const useAcademyData = () => {
  const { locale } = useI18n()

  const courses = computed(() => getCourses(locale.value))
  const courseCategories = computed(() => getCourseCategories(locale.value))
  const featuredCourses = computed(() => courses.value.filter((course) => course.featured))
  const teachers = computed(() => getTeachers(locale.value))
  const testimonials = computed(() => getTestimonials(locale.value))
  const faqs = computed(() => getFaqs(locale.value))

  return {
    courses,
    courseCategories,
    featuredCourses,
    teachers,
    testimonials,
    faqs
  }
}

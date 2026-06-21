import { canUserAccessClassroom, managementStudents } from '~/data/management'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return
  }

  const isDashboardRoute = to.path.startsWith('/dashboard')
  const isClassroomRoute = to.path.startsWith('/classrooms')

  if (!isDashboardRoute && !isClassroomRoute) {
    return
  }

  const { currentUser, dashboardPath, syncUser, canAccessPath } = useRoleAuth()

  syncUser()

  if (to.path === '/dashboard') {
    return navigateTo(currentUser.value ? dashboardPath.value : '/login')
  }

  if (!currentUser.value) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }

  if (isDashboardRoute && !canAccessPath(to.path)) {
    return navigateTo(dashboardPath.value)
  }

  if (isClassroomRoute && to.path !== '/classrooms') {
    const classroomId = String(to.params.id ?? '')
    const { classroomRecords, schedules } = useClassroomSystem()
    const sharedClassroom = classroomRecords.value.find((classroom) => classroom.id === classroomId)
    const sharedSchedule = schedules.value.find((schedule) => schedule.id === sharedClassroom?.scheduleId)
    const user = currentUser.value
    const hasSharedAccess = Boolean(
      user && sharedClassroom && sharedSchedule && (
        user.role === 'super-admin' ||
        user.role === 'manager' ||
        (user.role === 'teacher' && sharedClassroom.teacherId === user.profileId) ||
        (user.role === 'student' && Boolean(user.profileId && sharedSchedule.enrolledStudentIds.includes(user.profileId))) ||
        (user.role === 'parent' && managementStudents.some(
          (student) => student.parentId === user.profileId && sharedSchedule.enrolledStudentIds.includes(student.id)
        ))
      )
    )

    if (!user || (!hasSharedAccess && !canUserAccessClassroom(user, classroomId))) {
      return navigateTo(dashboardPath.value)
    }
  }
})

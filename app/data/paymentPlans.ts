import type { PaymentClassType } from '~/types'

export interface AcademyPaymentPlan {
  classType: PaymentClassType
  price: number
  currency: 'USD'
  capacity: string
  description: string
}

export const academyPaymentPlans: AcademyPaymentPlan[] = [
  {
    classType: 'Group Class',
    price: 30,
    currency: 'USD',
    capacity: 'Maximum 10 students',
    description: 'Live group learning with up to ten students.'
  },
  {
    classType: 'Special Class',
    price: 100,
    currency: 'USD',
    capacity: '1 or 2 students',
    description: 'Focused private or semi-private instruction.'
  },
  {
    classType: 'Premium Language Program',
    price: 150,
    currency: 'USD',
    capacity: 'Special class only',
    description: 'For English-speaking students learning Dari or Pashto.'
  }
]

export const paymentMethods = [
  'Bank Transfer',
  'Wise',
  'PayPal',
  'Stripe',
  'Western Union',
  'Other'
] as const

export const getPaymentPlan = (classType: PaymentClassType) =>
  academyPaymentPlans.find((plan) => plan.classType === classType) ?? academyPaymentPlans[0]!

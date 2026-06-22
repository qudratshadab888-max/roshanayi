export const usePaymentGateways = () => {
  const config = useRuntimeConfig()

  const gateways = computed(() => [
    {
      id: 'stripe' as const,
      label: 'Stripe',
      configured: Boolean(config.public.stripePublishableKey),
      checkoutEnabled: false,
      message: config.public.stripePublishableKey
        ? 'Publishable key detected. Server-side Payment Intent integration is still required.'
        : 'Placeholder only. Add NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY when implementation begins.'
    },
    {
      id: 'paypal' as const,
      label: 'PayPal',
      configured: Boolean(config.public.paypalClientId),
      checkoutEnabled: false,
      message: config.public.paypalClientId
        ? 'Client ID detected. Server-side order capture integration is still required.'
        : 'Manual PayPal recording only. Add NUXT_PUBLIC_PAYPAL_CLIENT_ID for future checkout.'
    }
  ])

  return { gateways }
}

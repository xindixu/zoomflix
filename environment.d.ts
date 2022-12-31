declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FIREBASE_CONFIG: string
      NEXT_PUBLIC_EMAILJS_KEY: string
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string
    }
  }
}

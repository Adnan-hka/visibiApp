const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

let scriptPromise = null

function ensureBrowser() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('reCAPTCHA is only available in the browser')
  }
}

function loadRecaptchaScript() {
  ensureBrowser()

  if (window.grecaptcha && window.grecaptcha.ready) {
    return new Promise((resolve) => {
      window.grecaptcha.ready(() => resolve(window.grecaptcha))
    })
  }

  if (scriptPromise) {
    return scriptPromise
  }

  if (!SITE_KEY) {
    throw new Error('Missing VITE_RECAPTCHA_SITE_KEY configuration')
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (!window.grecaptcha || !window.grecaptcha.ready) {
        scriptPromise = null
        reject(new Error('Failed to initialize reCAPTCHA'))
        return
      }
      window.grecaptcha.ready(() => resolve(window.grecaptcha))
    }
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('Failed to load reCAPTCHA script'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

export async function executeRecaptcha(action = 'submit') {
  if (!SITE_KEY) {
    throw new Error('Missing VITE_RECAPTCHA_SITE_KEY configuration')
  }

  const grecaptcha = await loadRecaptchaScript()
  return grecaptcha.execute(SITE_KEY, { action })
}

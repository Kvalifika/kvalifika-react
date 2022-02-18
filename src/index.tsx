import React, { useEffect } from 'react'
import axios from 'axios'
// import styles from './styles.module.css'

interface IOptions {
  livenessType?: number
  successCallbackUrl?: string
  errorCallbackUrl?: string
  lang?: string
  documentCaptureType?: number
  isIdCardSelected?: boolean
  isPassportSelected?: boolean
  isResidenceCardSelected?: boolean
  isDriverLicenseSelected?: boolean
  sessionFlow?: number
  isFirstPageShown?: boolean
  maxSessionLength?: number
  popup?: number
}
interface IKvalifika {
  appId: string
  domain: string
  environment: string
  options?: IOptions
}

export const Kvalifika = ({
  appId,
  domain,
  environment,
  options
}: IKvalifika) => {
  let BASE_URL = 'https://apidev.kvalifika.com'
  if (environment === 'staging') BASE_URL = 'https://apistaging.kvalifika.com'
  if (environment === 'production') BASE_URL = 'https://api.kvalifika.com'

  useEffect((): void => {
    window.addEventListener('message', async event => {
      // Checks if full process has been finished
      if (event.data.finished) {
        finishSession()
      }
    })
  })

  const finishSession = () => {
    const frame = document.getElementById('kvalifika-iframe-container')
    if (frame !== null) {
      frame.remove()
    }
  }

  const generateVerification = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/verification/generate`,
        method: 'POST',
        data: {
          appId,
          options
        },
        headers: {
          domain: domain
        }
      })

      const iframe = document.createElement('iframe')
      iframe.setAttribute('id', 'kvalifikaIframe')
      iframe.setAttribute('src', `${data.url}`)
      iframe.setAttribute('style', 'width: 100vw; height: 100vh')
      iframe.setAttribute('allow', 'camera')
      iframe.setAttribute('allowfullscreen', 'true')
      iframe.setAttribute('scrolling', 'yes')
      const container = document.querySelector('#kvalifika-iframe-container')
      if (container !== null) {
        container.appendChild(iframe)
      }
    } catch (error) {
      const container = document.querySelector('#kvalifika-iframe-container')
      if (container !== null) {
        container.innerHTML = `failed to generate verification, please provide correct properties, check console for errors`
      }
      console.error(error)
    }
  }

  useEffect(() => {
    generateVerification()
  }, [])

  return <div id='kvalifika-iframe-container' />
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';


const BASE_URL = 'https://apistaging.kvalifika.com/'

const KvalifikaReact = (props) => {

  const { appId, onComplete } = props

  // Event listener, listens each step is web flow. 
  // If full process has been finished, you can check here 
  // each step if finished liveness or document scanning
  useEffect(() => {
    window.addEventListener('message', async event => {   
      // Checks if full process liveness and document scanning has been finished
      if (event.data.finished) {
        const body = await checkSession(event.data.sessionId)
        nextAction(body)
      }
      
      // Checks if liveness step has been finished
      if (event.data.isLivenessFinished) {
      // Do something if liveness step has been finished
      }
      
      // Checks is document scanning step has been finsihed
      if (event.data.isDocumentFinished) {
        onComplete && onComplete(event.data)
     
        // event.data.documentType returns enum type 'ID' or 'PASSPORT'
      }

    })
  }, [])


  // Performs a session check from your backend with your production SECRET_KEY
  // See index.js file
  const checkSession = async (sessionId) => {
    const data = await axios({
      url: `${BASE_URL}check-session/${sessionId}`,
      method: 'GET',
      headers: {
        Authorization: appId,
      }
    })

    const body = await data.json()
    return JSON.parse(body)
  }

  // livenessStatus: 0/1/2. 0 = passed, 1 = undetermined, 2 = undetermined. 
  // 3D FaceMap came from a session where there was a live human being if and only if the livenessStatus is 0.
  // ..............................................
  // faceMatched is boolean if true face matched document
  // documentValid is boolean if true document is valid
  const nextAction = ({ details: { faceMatched, livenessStatus, documentValid } }) => {
    // Handle your results & remove frame, or you can do anything here
    if (faceMatched && !livenessStatus && documentValid) {
      const frame = document.getElementById('kvalifika-iframe-container')
      frame.remove()
      const p = document.createElement('p')
      p.innerHTML = 'success'
      document.body.appendChild(p)
    }
  }

  const generateVerification = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}verification/generate`,
        method: 'POST',
        data: { appId },
        headers: {
          Originn: 'https://staging.demo.kyc.ge',
        }
      })
  
      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'kvalifikaIframe');
      iframe.setAttribute('src',  `${data.url}&lang=en`);
      iframe.setAttribute('style', 'width: 100vw; height: 100vh');
      iframe.setAttribute('allow', 'camera');
      iframe.setAttribute('allowfullscreen', true);
      iframe.setAttribute('scrolling', 'yes');
      const container = document.querySelector('#kvalifika-iframe-container');
      container.appendChild(iframe);

    } catch(error) {
      console.error(error)
    }
  }
  generateVerification()

  return <div id='kvalifika-iframe-container'></div>
  
}


KvalifikaReact.propTypes = {
  // Required
  appId: PropTypes.string.isRequired,
  // Event handlers
  onComplete: PropTypes.func
}

export default KvalifikaReact
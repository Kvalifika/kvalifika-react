# kvalifika-react

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/kvalifika-react.svg)](https://www.npmjs.com/package/kvalifika-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install kvalifika-react

yarn add kvalifika-react
```

## Usage

```tsx
import React from 'react'

import { Kvalifika } from 'kvalifika-react'

const App = () => {
  return (
    <Kvalifika
      appId='appId'
      domain='domain'
      environment='environment'
      // options are optional, by default company settings will be used
      options={{
        livenessType: 0 || 1,
        successCallbackUrl: 'successCallbackUrl',
        errorCallbackUrl: 'errorCallbackUrl',
        lang: 'ge' || 'en' || 'ru' || 'sp',
        documentCaptureType: 1 || 2 || 3 || 4,
        isIdCardSelected: true || false,
        isPassportSelected: true || false,
        isResidenceCardSelected: true || false,
        isDriverLicenseSelected: true || false,
        sessionFlow: 0 || 1,
        isFirstPageShown: true || false,
        maxSessionLength: 'max length is not limited',
        popup: 0 || 1,
      }}
    />
  )
}
```

## License

MIT © [Kvalifika](https://github.com/Kvalifika)

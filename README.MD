# Kvalifika React SDK

This is library to use kvalifika sdk easily in react js

## Installation

    npm install kvalifika-react

## Usage

### Basic usage

```js
import KvalifikaReact from 'kvalifika-react';

const App = () => {

  // Fires when all processes ends
  handleComplete(event) {
    // get information about verification (event.data)
  }

  return (
    <div>
      <KvalifikaReact
        appId="your_app_id"
        onComplete={handleComplete}
      />
    </div>
  )
}
```

### Props

```js

props: {
  appId: String, // required
  onComplete: Function // optional
}

```



## Build
    npm run build

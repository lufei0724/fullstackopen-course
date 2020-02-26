import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import foo from './async'

const hello = name => {
	console.log(`hello ${name}`)
}

foo()

ReactDOM.render(<App />, document.getElementById('root'))

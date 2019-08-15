import React, { Component } from "react"
import Home from "./screens/Home/index.js"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchMinus, faSearchPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'

library.add(faTimes)
library.add(faCheck)
library.add(faSearchMinus)
library.add(faSearchPlus)

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

export default App
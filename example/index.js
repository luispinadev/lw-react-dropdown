import React from "react"
import { render } from "react-dom"

import DropdownInput from "../src/DropdownInput"
import "../src/DropdownInput/DropdownInput.styl"

if (module.hot) {
  module.hot.accept()
}
  
render(
  <div>
    <h1>Dropdown input example</h1>
    <DropdownInput options={ ["option 1","option 2","pop","poppity"] }>

    </DropdownInput>
  </div>,
  document.getElementById("root")
)


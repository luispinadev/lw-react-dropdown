import React from "react"
import { render } from "react-dom"

import DropdownInput from "../src/DropdownInput"
import "../src/DropdownInput/DropdownInput.styl"


if (module.hot) {
  module.hot.accept()
}

render(
  <div>
    <p>Example with options array prop</p>
    <DropdownInput options={ ["option 1","option 2","pop","poppity"] }/>
    <p>Example using child components as options</p>
    <DropdownInput>
      <div val="ananas-data-value" label="ananas">ananas <span>&spades;</span></div>
      <div val="avocado-data-data" label="avocado">avocado <span>&spades;</span></div>
      <div val="banana-data-value" label="banana">banana <span>&spades;</span></div>
    </DropdownInput>
  </div>,
  document.getElementById("root")
)


# README #

This is a light weight react dropdown/input component.
It does not use bootstrap's dropdown and is self contained.
A small css file (lib/styles.css or src/DropdownInput/DropdownInput.styl) is included as example accompanying styles.


### How do I get set up? ###

Use 'npm i --save lw-react-dropdown' to install module.
Check package.json's 'scripts' entry for several 'npm run [command]' options.
'lib/' folder contains code compiled to ES5, 'src/' folder contains original ES6 source.

### Usage ###
Example react component using lw-react-dropdown:

```js

import React from "react"
import DropdownInput from "lw-react-dropdown"

import "lw-react-dropdown/styles.css" // example css imported using webpack's loader

const ExampleContainer = () => (
  <div>
    <h1>Dropdown input example </h1>
    <DropdownInput options={ ["option 1","option 2","pop","poppity"] }/>
  </div>
)

export default ExampleContainer

```

Current component options (pass as props):

* **initVal**: optional - initial value for input field. default is empty string
* **filterOptions**: wether to filter options based on input field value
* **filterFunc** optional - default checks if val is part of option
* **optionsPosition**: position of the options dropdown list. 'bottom' and 'top' are supported
* **options**: list of options for the dropdown list
* **selectCallback**: function to be triggered when user selects an option. Default prints a message to console
* **inputChangeCallback**: default false
* **debounceMillisecs**: debounce time for the input callback function (if set)
* **classNames**: object containing css class names for each component.

### ToDo ###
- use component composition for options instead of array of strings so custom markup can be used in options list
- create proper example folder
- better example cases in readme


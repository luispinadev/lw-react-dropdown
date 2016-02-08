# README #

This is a light weight react dropdown/input component.
It does not use bootstrap's dropdown and is self contained.   
A small css file (lib/styles.css or src/DropdownInput/DropdownInput.styl) is included as example accompanying styles.

### How do I get set up? ###

Use 'npm i --save lw-react-dropdown' to install.   
'lib/' folder contains code compiled to ES5, 'src/' folder contains original ES6 source.

You may use 'npm run example' inside module dir to run a local server with the example. Check package.json's 'scripts' entry for other dev related scripts.

### Usage ###

Example react component using lw-react-dropdown, passing the options as a string array:   
```js
import React from "react"
import DropdownInput from "lw-react-dropdown"

import "lw-react-dropdown/styles.css" // example css imported using webpack's loader

const ExampleContainer = () => (
  <div>
    <p>Dropdown input example</p>
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
* **options**: list of options for the dropdown list (this is ignored if you pass the options as a child component)
* **selectCallback**: function to be triggered when user selects an option. Default prints a message to console
* **inputChangeCallback**: default false
* **debounceMillisecs**: debounce time for the input callback function (if set)
* **classNames**: object containing css class names for each part of the component.

This is the template for the default 'classNames' prop, matching the provided styles file:
```js
classNames: {
  container: "lw-react-dropdown-container",
  optionsContainer: "lw-react-dropdown-optionsContainer",
  bottom: "lw-react-dropdown-bottom",
  top: "lw-react-dropdown-top",
  input: "lw-react-dropdown-input",
  option: "lw-react-dropdown-option"
}
```
### Component composition ###
If you would like to use custom markup for the dropdown options or options composed as { value: 'option_val', label:'option string representation'}, you can pass the options list as a child component:

```js
import React from "react"
import DropdownInput from "lw-react-dropdown"

import "lw-react-dropdown/styles.css" // example css imported using webpack's loader

const ExampleContainer = () => (
  <div>
    <p>Dropdown input example, using custom markup for dropdown options list items.</p>

    <DropdownInput>
      <div val="ananas-data-val" label="ananas">Ananas <span>&spades;</span></div>
      <div val="avocado-data-val" label="avocado">Avocado <span>&spades;</span></div>
      <div val="banana-data-val" label="banana">Banana <span>&spades;</span></div>
    </DropdownInput>
  </div>
)

export default ExampleContainer
```
Each child component represents a dropdown option item. It must have 'label' and 'val' props. The label is used as argument in the filter function ('filterFunc' prop), val is used as argument for the option select callback ('selectCallback' prop).
### ToDo ###

- add some more test cases
- cleaner css class names interface
- improve doc


# README #

This is a light weight react dropdown/input component.
It does not use bootstrap's dropdown and is self contained.
The options


### How do I get set up? ###

- npm i --save lw-react-dropdown

### Usage ###

Current component options (pass as props):

* **initVal**: optional - initial value for input field. default is empty string
* **filterOptions**: wether to filter options based on input field value
* **filterFunc** optional - default checks if val is part of option
* **optionsPosition**: position of the options dropdown list. 'bottom' and 'top' are supported
* **options**: list of options for the dropdown list
* **selectCallback**: function to be triggered when user selects an option. Default prints a message to console
* **inputChangeCallback**: default false
* **debounceMillisecs**: debounce time for the input callback function (if set)

future options:
* **css animations**: add css animations for smooth dropdown collapse/expand
* **options position**: add extra options 'left', 'right', 'auto'(based on distance to window edge?)

ToDo:
* add test cases
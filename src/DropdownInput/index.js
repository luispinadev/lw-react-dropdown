import React, { Children, Component, PropTypes } from "react"
import debounce from "debounce"

class DropdownInput extends Component {

  // 
  // Component setup
  // 

  static propTypes = {
    initVal: PropTypes.string,
    debounceMillisecs: PropTypes.number,
    skipBlurTimeout: PropTypes.number,
    classNames: PropTypes.object,

    useFilter: PropTypes.bool,
    filterFunc: PropTypes.func.isRequired,
    
    optionsPosition: PropTypes.string,
    optionsLimit: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.string),

    selectCallback: PropTypes.func.isRequired,
    inputChangeCallback: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ])
  };

  static defaultProps = {
    initVal: "",
    debounceMillisecs: 300,
    skipBlurTimeout: 1,
    classNames: {
      container: "lw-react-dropdown-container",
      optionsContainer: "lw-react-dropdown-optionsContainer",
      bottom: "lw-react-dropdown-bottom",
      top: "lw-react-dropdown-top",
      input: "lw-react-dropdown-input",
      option: "lw-react-dropdown-option"
    },

    useFilter: true,
    filterFunc: (opt, val) => (val && val.length > 0) ?  opt.indexOf(val) === 0 : true,
    
    optionsPosition: "bottom",
    optionsLimit: 0, // 0 == show all
    options: [],
    
    selectCallback: val => console.log(`Select triggered for ${val}`),
    inputChangeCallback: false//val => console.log(`input callback triggered for ${val}`)
  };

  constructor(props) {
    super(props);

    this.state = {
      val: props.initVal,
      showOptions: false
    };
    this._skipBlur = false
    if(props.inputChangeCallback)
      this._debInputCallback = debounce( (val) => this.props.inputChangeCallback(val), props.debounceMillisecs)
  }

  // 
  // Actions
  //

  _onSelectOption(val, label){
    if(val.length > 0)
      this.props.selectCallback(val)
    this.setState({ val: label, showOptions: false })
  }
  
  _onInputChange(e){
    const value = e.target.value
    this.setState({val: value, showOptions: true},
      () => this.props.inputChangeCallback !== false && 
        this._debInputCallback(this.state.val)
    )
  }

  _onInputKeyPress(keyCode, val){ // add cases for arrow nav, enter and esc
    const actions = {
      13: () => this._onSelectOption(val, val),  // Enter
      27: () => this.setState({ showOptions: false }), // Esc
      40: () => this.setState(
          { showOptions: true },
          ()=> this.optionsList.firstChild.focus()
        ) // Downarrow
      }
    if(actions.hasOwnProperty(keyCode)){
      this._preventBlur()
      actions[keyCode]()
    }
  }

  _onOptionKeypress(keyCode, val, label, optIndex){
    const actions = {
      13: () => this._onSelectOption(val, label),  //Enter
      27: () => this.setState({ showOptions: false }), // Esc
      40: () => this._focusNextOption(optIndex), // DownArrow
      38: () => this._focusPrevOption(optIndex) // UpArrow
    }
    if(actions.hasOwnProperty(keyCode)){
      this._preventBlur()
      actions[keyCode]()
    }
  }

  // 
  // Display logic
  // 

  _showDropdown (){
    if(!this.state.showOptions)
      this.setState({ showOptions: true })
  }

  _blurDropdown (){
    if(!this._skipBlur && this.state.showOptions)
      this.setState({ showOptions: false })
  }

  _focusNextOption(){
    const activeEl = document.activeElement
    if(activeEl.parentNode === this.optionsList)
      activeEl.nextSibling ? activeEl.nextSibling.focus()
        : activeEl.parentElement.firstChild.focus()    
  }

  _focusPrevOption(){
    const activeEl = document.activeElement
    if(activeEl.parentNode === this.optionsList)
      activeEl.previousSibling ? activeEl.previousSibling.focus()
        : this.inputComponent.focus()    
  }

  _preventBlur(){
    this._skipBlur = true
    setTimeout( () => this._skipBlur = false , this.props.skipBlurTimeout )
  }

  // 
  // Render methods
  // 

  render() {
    const { classNames, optionsPosition } = this.props
    const { val, showOptions } = this.state
    
    const displayedOptions = this._buildOptionsList()

    return (
      <div
        ref={ r => this.mainContainer = r }
        className={classNames.container}
      >
        <input type="text"
          ref={ r => this.inputComponent = r }
          className={classNames.input}
          value={ val }
          onChange={ e => this._onInputChange(e) }
          onClick={ e => this._showDropdown(e) }
          onBlur={ e => this._blurDropdown(e) }
          onKeyDown={ e => this._onInputKeyPress(e.keyCode, val) }
        />
        <div
          ref={ r => this.optionsList = r }
          className={`${classNames.optionsContainer} ${classNames[optionsPosition]}`}
          style={ showOptions && displayedOptions.length > 0 ? {} : { display: "none" } } 
        >
          { displayedOptions }
        </div>
      </div>
    )
  }

  _buildOptionsList(){
    const { children, useFilter, options, optionsLimit, filterFunc } = this.props
    const currentVal = this.state.val
    let optionsList
    const itemProps = (val, i, label, classNames = "") => ({
            key: i,
            tabIndex: i,
            label: label,
            className:  `${classNames} ${this.props.classNames.option}`,
            onBlur:  e => this._blurDropdown(e),
            onMouseDown:  () => this._preventBlur(),
            onClick:  () => this._onSelectOption(val, label),
            onKeyDown:  e => this._onOptionKeypress(e.keyCode, val, label, i)
          })

    // build component list with new props
    Children.count(children) > 0 ?
      optionsList = 
        Children.toArray(children)
                .map( (el, i) => React.cloneElement(
                  el,
                  itemProps(el.props.val, i, el.props.label, el.props.className))
                )
      :
      optionsList = options.map( (el, i) => (<div val={el} { ...itemProps(el, i, el) } >{ el }</div>) )

    //apply filter  
    if(useFilter) optionsList = optionsList.filter( el => filterFunc(el.props.label, currentVal) )

    return optionsLimit > 0 ? optionsList.slice(0, optionsLimit) : optionsList
  }

}

export default DropdownInput

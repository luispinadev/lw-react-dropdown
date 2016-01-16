import React, { Component, PropTypes } from "react"
import styles from "./DropdownInput.css"
import debounce from "debounce"

class DropdownInput extends Component {

  // 
  // Component setup
  // 

  static propTypes = {
    initVal: PropTypes.string,
    debounceMillisecs: PropTypes.number,
    skipBlurTimeout: PropTypes.number,

    useFilter: PropTypes.bool,
    filterFunc: PropTypes.func.isRequired,
    
    optionsPosition: PropTypes.string,
    optionsLimit: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,

    selectCallback: PropTypes.func.isRequired,
    inputChangeCallback: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ])

  };

  static defaultProps = {
    initVal: "",
    
    debounceMillisecs: 300,
    skipBlurTimeout: 1,
    
    useFilter: true,
    filterFunc: (options, val) => (val && val.length > 0) ? options.filter( opt => opt.indexOf(val) > -1) : options,
    
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

  _onSelectOption(val){
    if(val.length > 0)
      this.props.selectCallback(val)
    this.setState({ val: val, showOptions: false })
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
      13: v => this._onSelectOption(v),  // Enter
      27: () => this.setState({ showOptions: false }), // Esc
      40: () => this.setState(
          { showOptions: true },
          ()=> this.optionsList.firstChild.focus()
        ) // Downarrow
      }
    if(actions.hasOwnProperty(keyCode)){
      this._preventBlur()
      actions[keyCode](val)
    }
  }

  _onOptionKeypress(keyCode, val, optIndex){
    const actions = {
      13: (v, i) => this._onSelectOption(v),  //Enter
      27: () => this.setState({ showOptions: false }), // Esc
      40: (i) => this._focusNextOption(i), // DownArrow
      38: (i) => this._focusPrevOption(i) // UpArrow
    }
    if(actions.hasOwnProperty(keyCode)){
      this._preventBlur()
      actions[keyCode](val, optIndex)
    }
  }

  // 
  // Display logic
  // 

  _getOptions(){
    const { useFilter, options, optionsLimit, filterFunc } = this.props
    const val = this.state.val
    let retList = useFilter ?
      filterFunc(options, val) : 
      options
    return optionsLimit > 0 ? retList.slice(0, optionsLimit) : retList
  }

  _showDropdown (e){
    if(!this.state.showOptions)
      this.setState({ showOptions: true })
  }

  _blurDropdown (e){
    if(!this._skipBlur && this.state.showOptions)
      this.setState({ showOptions: false })
  }

  _focusNextOption(optionIndex){
    const activeEl = document.activeElement
    if(activeEl.parentNode === this.optionsList)
      activeEl.nextSibling ? activeEl.nextSibling.focus()
        : activeEl.parentElement.firstChild.focus()    
  }

  _focusPrevOption(optionIndex){
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
    const { options, optionsPosition } = this.props
    const { val, showOptions } = this.state
    const displayedOptions = this._getOptions()
    const optionsDisplay = showOptions && displayedOptions.length > 0 ? {} : { display: "none" }

    return (
      <div
        ref={ r => this.mainContainer = r }
        className={ styles.container }
      >
        <input type="text"
          ref={ r => this.inputComponent = r }
          className={ styles.input }
          value={ val }
          onChange={ e => this._onInputChange(e) }
          onClick={ e => this._showDropdown(e) }
          onBlur={ e => this._blurDropdown(e) }
          onKeyDown={ e => this._onInputKeyPress(e.keyCode, val) }
        />
        <div
          ref={ r => this.optionsList = r }
          className={`${styles.optionsContainer} ${styles[optionsPosition]}`}
          style={ optionsDisplay } 
        >
          { displayedOptions.map( (opt, i) => this._buildOptionElement(opt, i) ) }
        </div>
      </div>
    )
  }

  _buildOptionElement (option, index){
    return (
    <div key={index}
      className={ styles.option }
      tabIndex={index}
      onBlur={ e => this._blurDropdown(e) }
      onMouseDown={ () => this._preventBlur() }
      onClick={ () => this._onSelectOption(option) } 
      onKeyDown={ e => this._onOptionKeypress(e.keyCode, option, index) }
    >
      <span>{option}</span>
    </div>)
  }
}

export default DropdownInput

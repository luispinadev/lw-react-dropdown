import React from "react"
import ReactDOM from "react-dom"
import TestUtils from "react-addons-test-utils"
import { expect } from "chai"
import DropdownInput from "../DropdownInput"


// Structural tests / value sync
describe("lw-dropdown-structure", function(){

  // beforeEach("render component with default props", function() {
  //   component = TestUtils.renderIntoDocument(<DropdownInput { ...testSetup[0] }/>)
  // });
  afterEach("cleanup DOM", function() {
    document.body.innerHTML = ""
  });


  describe("default-render", function(){
    it("the dropdown should render with default props", function(){

      const component = TestUtils.renderIntoDocument(<DropdownInput/>)

      expect(component).to.exist
      expect(TestUtils.isCompositeComponent(component)).to.be.true

      // ADD CHECK REFS SETUP

    })
  })

  describe("input-val", function(){
    it("the input value should match state val atribute", function(){

      const component = TestUtils.renderIntoDocument(<DropdownInput initVal="test str"/>)
      let DOMval = ReactDOM.findDOMNode(component).getElementsByTagName("input")[0].value

      expect(DOMval).to.equal(component.state.val)

    })
  })

  describe("input-val-changes", function(){
    it("the input value should match state val atribute when input changes", function(){
      
      const component = TestUtils.renderIntoDocument(<DropdownInput initVal="test str"/>)
      TestUtils.Simulate.change(TestUtils.findRenderedDOMComponentWithTag(component, "input"), { target: { value: "a"} })
      let DOMval = ReactDOM.findDOMNode(component).getElementsByTagName("input")[0].value

      expect(DOMval).to.equal(component.state.val)
    })
  })

  describe("option-click", function(){
    it("the state val atribute should match clicked option", function(){

      const component = TestUtils.renderIntoDocument(<DropdownInput 
        options={ ["alfa", "beta"] } />)
      TestUtils.Simulate.click(component.optionsList.children[1])
      let DOMval = ReactDOM.findDOMNode(component).getElementsByTagName("input")[0].value

      expect(DOMval).to.equal("beta")
    })
  })

})

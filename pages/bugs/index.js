import React from 'react'

export default function Bugs() {
  return (
    <div style={{margin: "0 20px"}}>
      <h2>1. There is an error/warning in the console every time calculate is clicked</h2>
      <h3>Steps to Reproduce</h3>
      <ul>
        <li>1. open dev tools console</li>
        <li>2. enter any number in first number field</li>
        <li>3. enter any number in second number field</li>
        <li>4. choose any operator</li>
        <li>5. click calculate</li>
      </ul>
      <h3>What should happen?</h3>
      <p>No errors/warnings should appear in the console.</p> 
      <hr />

      <h2>2. an error is thrown when the reset button is clicked.</h2>
      <h3>Steps to Reproduce</h3>
      <ul>
        <li>1. open dev tools console</li>
        <li>2. enter any number in first number field</li>
        <li>3. enter any number in second number field</li>
        <li>4. choose any operator</li>
        <li>5. click calculate</li>
        <li>6. click reset</li>
      </ul>
      <h3>What should happen?</h3>
      <p>Reset should empty all inputs and remove calculations list.</p>
      <hr />

      <h2>3. calculator is not working after reset</h2>
      <h3>Steps to Reproduce</h3>
      <ul>
        <li>1. enter any number in first number field</li>
        <li>2. enter any number in second number field</li>
        <li>3. choose any operator</li>
        <li>4. click calculate</li>
        <li>5. click reset</li>
        <li>4. try to calculate something again without changing the operator</li>
      </ul>
      <h3>What should happen?</h3>
      <p>The operator should be reset to &quot;Op&quot; when the reset button is clicked.</p>
      <hr />
    </div>
  )
}

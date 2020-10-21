import React, { useEffect } from 'react';
import './Stepper.scss';

export const Stepper = (props) => {
  const {stepsArr, currentStep, steps, setSteps, skipped} = props;
  
  const createUI = () => {
    const array = [];
    stepsArr.map((step, index) => {
      const stateObj = {};
      stateObj.description = step;
      stateObj.completed = false;
      index === 0 ? stateObj.active = true : stateObj.active = false;
      stateObj.selected = index === 0 ? true : false;
      array.push(stateObj);
      return null;
    }); 
    setSteps(array);
  }
  // componentDidMount
  useEffect( createUI, [])
  
  // componentDidUpdate
  useEffect(()=> {
    if(currentStep !== 0){
      const currentState = updateState();
      setSteps(currentState)
    };
    if(currentStep === 0){
      createUI();
    }
  }, [currentStep])


  const updateState = () => {
    let newSteps = [...steps];
    let stepCounter = 0;

    while(stepCounter < newSteps.length){
      if (stepCounter === currentStep){
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          active: true,
          selected: true,
          completed: false
        }
      }
      // Past step
      else if (stepCounter < currentStep) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          active: false,
          selected: true,
          completed: true
        };
      }
      // Future step
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          active: false,
          selected: false,
          completed: false
        };
      };
      stepCounter++
    }

    if(skipped.length > 0){
      skipped.map((skipped) => {
        newSteps[skipped] = {
          ...newSteps[skipped],
          active: false,
          selected: false,
          completed: false
        }
        return null;
      })
    }

    return newSteps;
  }


  const stepJSX = steps.map((step, index) => {
    return(
        <div className="step-wrapper" key={index}>
          <div className={`step-number 
          ${step.selected ? "step-number-selected" : "step-number-disabled"}`}>
            { step.completed ? <span>&#10003;</span> : index + 1} 
          </div>
          <div className={`step-description ${ step.active && "step-description-active"}`}>{step.description}</div>
          {index !== steps.length-1 && 
            <div className={`divider-line divider-line-${steps.length}`}></div>
          }
        </div>
      )}
    )
    return <div className="stepper-wrapper-horizontal">{stepJSX}</div>
}
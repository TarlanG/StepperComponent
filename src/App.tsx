import React, { useState } from 'react';
import './App.scss';
import {Stepper} from './Components/Stepper/Stepper';
function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState([]);
  const [skipped, setSkip] = useState<number[]>([]);

  const handleClick = (clicktype: string | null) => {
    if( currentStep <= stepsArray.length){
      if ( currentStep !== 0){
        // previous
        if(clicktype === "prev"){
          // reset
          if(stepsArray.length === currentStep){
            setCurrentStep(0);
          }
          else setCurrentStep(currentStep-1);
        }
      }
        if(clicktype === "skip"){
          setSkip([...skipped,currentStep]);
          setCurrentStep(currentStep+1)
      }
      if(clicktype === "next") setCurrentStep(currentStep+1);
    }
  }

  
  const stepsArray = [
    // default description
    "Add personal info",
    "Add payment details",
    "Complete registration",
    "Registration complete"
  ];
  
  return (
    <>
      <div className="stepper-container-horizontal">
        <Stepper 
                stepsArr={stepsArray} 
                currentStep={currentStep} 
                steps={steps} 
                setSteps={setSteps}
                skipped={skipped}
                />
        <div className="buttons-container">
          <button onClick={() => handleClick("prev")}>
            {stepsArray.length >= currentStep+1 ? "Previous" : "Reset"}
          </button>
          <button onClick={() => 
           stepsArray.length >= currentStep+1 ? handleClick("skip") : null}
             >Skip</button>
          <button onClick={() => handleClick("next")}>{ stepsArray.length <= currentStep+1 ? "Finish" : "Next"}</button>
        </div>
      </div>  
    </>
  );
}

export default App;

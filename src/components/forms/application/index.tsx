"use client";

import { useState } from "react";

import ContactInfoForm from "@/components/forms/application/contact-info";
import PersonalInfoForm from "@/components/forms/application/personal-info";
import ResidentialInfoForm from "@/components/forms/application/residential-info";

import { formSteps } from "@/lib/constants";

import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";


export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const progress = (currentStep / formSteps.length) * 100;

  const currentStepData = formSteps.find((step) => step.id === currentStep);

  const handleNext = () => {
    if (currentStep < formSteps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };
  

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">
          {isComplete ? "All Done!" : currentStepData?.title}
        </h2>
        <span className="text-sm text-muted-foreground">
          All fields are required
        </span>
        {!isComplete && <Progress value={progress} className="h-2" />}
      </div>

      <div>
        {isComplete ? (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary p-4">
                <Check className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Registration Complete!</h3>
            <p className="text-muted-foreground">
              Thank you for completing the registration process.
            </p>
            {/* <Confetti /> */}
          </div>
        ) : (
          <div key={currentStep} className="my-5">
            {currentStep === 1 && (
              <PersonalInfoForm onNextAction={handleNext} />
            )}
            {currentStep === 2 && <ContactInfoForm onNextAction={handleNext} />}
            {currentStep === 3 && (
              <ResidentialInfoForm onNextAction={handleNext} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

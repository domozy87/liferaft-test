import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
import {
  Button,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper
} from '@material-ui/core';

import { FormikStepProps } from '../../types/FormStep';

const StyleGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
`;

const FormikStepper: React.FC<FormikConfig<FormikValues>> = ({
  children,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState<number>(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState<boolean>(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep(s => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <StyleGrid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(s => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </StyleGrid>
        </Form>
      )}
    </Formik>
  );
};

export default FormikStepper;

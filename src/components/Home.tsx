import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper
} from '@material-ui/core';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
// import * as Yup from "yup";

// Material UI Controls
import { TextField, SelectChangeEvent, Button as MUIButton } from '@mui/material';

// Axios
import axios from 'axios';

// Components
import Country from './Country';
import State from './State';
import Province from './Province';
import Color from './Color';
import Thumb from './Thumb';

// Types or Enum
import { ColorFoodVariant } from '../types/colorFood';

const StyleFormikStepContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  max-width: var(--maxWidth);
  padding: 20px 20px;
  margin: 0 auto;
`;

const StyleBox = styled(Box)`
  padding: 12px;
  min-width: 300px;
`;

const StyleGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
`;

const StyleMessage = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const StyleInputFile = styled.input`
  height: 20px;
  min-width: 300px;
`;

// ToDo - apply validation
// const StepOneSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email")
//     .required("Email is required"),
//   country: Yup.string().required("Country is required"),
//   color: Yup.string().required("Color is required")
// });

const Home: React.FC = () => {
  // States
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [customState, setCustomState] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [food, setFood] = useState<ColorFoodVariant>(ColorFoodVariant.none);
  const [customFood, setCustomFood] = useState<string>('');
  const [isFoodVisible, setFoodVisibility] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const isUSA = country === 'US' ? true : false;
  const isCanada = country === 'CA' ? true : false;
  const isNotAmerica = !isUSA && !isCanada && country !== '' ? true : false;
  const hasFood = food !== ColorFoodVariant.none ? true : false;
  const hasCustomFood = hasFood && customFood !== '' ? true : false;

  const handleFileChange = (e: any) => {
    setImagePath(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (color === 'red') {
      setFood(ColorFoodVariant.red);
    } else if (color === 'yellow') {
      setFood(ColorFoodVariant.yellow);
    } else if (color === 'blue') {
      setFood(ColorFoodVariant.blue);
    } else {
      setFood(ColorFoodVariant.none);
      setFoodVisibility(false);
    }
  }, [color, setFood]);

  const sleep = (time: number) => new Promise(acc => setTimeout(acc, time));

  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            name: '',
            email: '',
            country: '',
            state: '',
            province: '',
            custom_state: '',
            color: '',
            food: '',
            file: null
          }}
          onSubmit={async values => {
            await sleep(2000);
            // I'm using states instead of values because I have some issues with Material UI and Multi Steps Formik
            const data = {
              name,
              email,
              country,
              state,
              province,
              color,
              customFood,
              imagePath
            };
            console.log(data);

            // Submit
            const res = await axios.post('https://enzmlk42rnco.x.pipedream.net/', data);

            if (res.data.success === true) {
                alert('Your order has been successfully submitted!');
            }
            else {
                alert('Your order has been failed!');
            }
          }}
        >
          <FormikStep label="Step 1">
            <StyleFormikStepContent>
              <StyleBox>
                <TextField
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </StyleBox>
              <StyleBox>
                <TextField
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </StyleBox>

              <StyleBox>
                <Country
                  id="country"
                  name="country"
                  labelId="country-label"
                  value={country}
                  label="Country"
                  onChange={(e: SelectChangeEvent) =>
                    setCountry(e.target.value)
                  }
                />
              </StyleBox>

              {isUSA && (
                <StyleBox>
                  <State
                    id="state"
                    name="state"
                    labelId="state-label"
                    label="US State"
                    value={state}
                    onChange={(e: SelectChangeEvent) =>
                      setState(e.target.value)
                    }
                  />
                </StyleBox>
              )}

              {isCanada && (
                <StyleBox>
                  <Province
                    id="province"
                    name="province"
                    label="Province"
                    labelId="province-label"
                    value={province}
                    onChange={(e: SelectChangeEvent) =>
                      setProvince(e.target.value)
                    }
                  />
                </StyleBox>
              )}

              {isNotAmerica && (
                <StyleBox>
                  <TextField
                    name="custom_state"
                    label="State"
                    placeholder="Enter your state"
                    variant="outlined"
                    value={customState}
                    fullWidth
                    onChange={(e: any) => setCustomState(e.target.value)}
                  />
                </StyleBox>
              )}

              <StyleBox>
                <Color
                  id="color"
                  name="color"
                  labelId="color-label"
                  label="Favorite Color"
                  onChange={(e: SelectChangeEvent) => setColor(e.target.value)}
                />
              </StyleBox>
            </StyleFormikStepContent>
          </FormikStep>
          <FormikStep label="Step 2">
            {hasFood && (
              <StyleFormikStepContent>
                <StyleBox>
                  <StyleMessage>Do you want to order </StyleMessage>
                  <StyleMessage>
                    <MUIButton
                      variant="text"
                      onClick={(e: any) => {
                        setFoodVisibility(true);
                        e.preventDefault();
                      }}
                    >
                      {food}
                    </MUIButton>
                  </StyleMessage>
                  {isFoodVisible && (
                    <StyleBox>
                      <TextField
                        name="food"
                        label="Food Name"
                        placeholder="Enter Food"
                        value={customFood}
                        onChange={(e: any) => setCustomFood(e.target.value)}
                      />
                    </StyleBox>
                  )}
                </StyleBox>
              </StyleFormikStepContent>
            )}
          </FormikStep>

          <FormikStep label="Step 3">
            {hasCustomFood && (
              <StyleFormikStepContent>
                <StyleBox>
                  <StyleInputFile
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                  />
                </StyleBox>
                {imagePath && imagePreview && (
                  <StyleBox>
                    <Thumb file={imagePreview} />
                  </StyleBox>
                )}
              </StyleFormikStepContent>
            )}
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
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
}

export default Home;

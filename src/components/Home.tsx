import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
} from "@material-ui/core";
import { Formik, Field, Form, FormikConfig, FormikValues } from "formik";
import * as Yup from "yup";

// Components
import Country from "./Country";
import State from "./State";
import Province from "./Province";

// Types or Enum
import { ColorFoodVariant } from "../types/colorFood";

// const Wrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const StyleForm = styled(Form)`
//   display: flex;
//   align-items: flex-start;
//   justify-content: flex-start;
//   flex-direction: column;
// `;

const ImagePreview = styled.img`
  width: 200px;
`;

const StepOneSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  //   country: Yup.string().required("Country is required"),
  color: Yup.string().required("Color is required")
});

const Home: React.FC = () => {
  // States
  const [country, setCountry] = useState<string>("");
  const [customState, setCustomState] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [food, setFood] = useState<ColorFoodVariant>(ColorFoodVariant.none);
  const [customFood, setCustomFood] = useState<string>("");
  const [isFoodVisible, setFoodVisibility] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const isUSA = country === "US" ? true : false;
  const isCanada = country === "CA" ? true : false;
  const isNotAmerica = !isUSA && !isCanada && country !== "" ? true : false;
  const hasFood = food !== ColorFoodVariant.none ? true : false;
  const hasCustomFood = hasFood && customFood !== "" ? true : false;

  const handleFileChange = (e: any) => {
    setImagePath(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (color === "red") {
      setFood(ColorFoodVariant.red);
    } else if (color === "yellow") {
      setFood(ColorFoodVariant.yellow);
    } else if (color === "blue") {
      setFood(ColorFoodVariant.blue);
    } else {
      setFood(ColorFoodVariant.none);
      setFoodVisibility(false);
    }
  }, [color, setFood]);

  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            name: "",
            email: "",
            country: "",
            state: "",
            province: "",
            custom_state: "",
            color: "",
            food: "",
            file: null
          }}
          onSubmit={async values => {
            console.log("values", values);
          }}
        >
          <FormikStep label="Step 1">
            <Box>
              <label htmlFor="name">Name:</label>
              <Field
                id="name"
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            </Box>
            <Box>
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </Box>

            <Box>
              <label htmlFor="country">Country:</label>
              <Field
                as="select"
                id="country"
                name="country"
                value={country}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCountry(e.target.value)
                }
              >
                <Country />
              </Field>
            </Box>

            {isUSA && (
              <Box>
                <label htmlFor="state">USA State:</label>
                <Field as="select" name="state" label="US State">
                  <State />
                </Field>
              </Box>
            )}

            {isCanada && (
              <Box>
                <label htmlFor="province">Canada Province:</label>
                <Field as="select" name="province" label="Canada Province">
                  <Province />
                </Field>
              </Box>
            )}

            {isNotAmerica && (
              <Box>
                <label htmlFor="custom_state">Customer State</label>
                <Field
                  id="custom_state"
                  name="custom_state"
                  value={customState}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCustomState(e.target.value)
                  }
                  placeholder="Enter your State"
                />
              </Box>
            )}

            <Box>
              <label htmlFor="color">Favorite Color:</label>
              <Field
                as="select"
                name="color"
                value={color}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setColor(e.target.value)
                }
              >
                <option value="">Select your favorite color</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="blue">Blue</option>
              </Field>
            </Box>
          </FormikStep>
          <FormikStep label="Step 2">
            {hasFood && (
              <Box>
                <span>Do you want to order </span>
                <span>
                  <button
                    onClick={(e: any) => {
                      setFoodVisibility(true);
                      e.preventDefault();
                    }}
                  >
                    {food}
                  </button>
                </span>
                {isFoodVisible && (
                  <Box>
                    <label htmlFor="food">Food Name:</label>
                    <Field
                      id="food"
                      name="food"
                      placeholder="Enter your food"
                      value={customFood}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCustomFood(e.target.value)
                      }
                    />
                  </Box>
                )}
              </Box>
            )}
          </FormikStep>
          <FormikStep label="Step 3">
            {hasCustomFood && (
              <>
                <Box>
                  <label htmlFor="food">Upload Image:</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Box>
                {imagePath && imagePreview && (
                  <Box>
                    <ImagePreview
                      src={imagePreview}
                      id="preview-image"
                      alt="Food Preview"
                    />
                  </Box>
                )}
              </>
            )}
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
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

          <Grid container spacing={2}>
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
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default Home;

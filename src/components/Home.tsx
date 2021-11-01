import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Box, Card, CardContent } from '@material-ui/core';
// import * as Yup from "yup";

// Material UI Controls
import {
  TextField,
  SelectChangeEvent,
  Button as MUIButton
} from '@mui/material';

// Axios
import axios from 'axios';

// Components
import FormikStepper from './FormStepper/FormikStepper';
import FormikStep from './FormStepper/FormikStep';
import Country from './Country';
import State from './State';
import Province from './Province';
import Color from './Color';
import Thumb from './Thumb';
import Alert from './Alert';

// Constants
import { FAKE_ENDPOINT } from '../constants/Endpoint';

// Types or Enum
import { ColorFoodVariant } from '../types/colorFood';
import { AlertType } from '../types/Alert';

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
  // Message State
  const [alertVisibility, setAlertVisibility] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>(AlertType.ERROR);
  const [alertMessage, setAlertMessage] = useState<string>('');

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
        {alertVisibility && <Alert type={alertType} message={alertMessage} />}
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
          onSubmit={async () => {
            await sleep(500);
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
            
            const dataString = data;
            dataString.imagePath = imagePreview;

            // Submit
            const res = await axios.post(FAKE_ENDPOINT, data);

            if (res.data.success === true) {
              const message = `Your order has been successfully submitted! \n${JSON.stringify(data)}`;

              setAlertType(AlertType.SUCCESS);
              setAlertMessage(message);
              setAlertVisibility(true);
            } else {
              const message = 'Your order has been failed!';

              setAlertType(AlertType.SUCCESS);
              setAlertMessage(message);
              setAlertVisibility(true);
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

export default Home;

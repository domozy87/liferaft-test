import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type ColorT = {
  id: string;
  name: string;
  label: string;
  labelId: string;
  value?: string;
  onChange?: (e: SelectChangeEvent) => void;
};

const Color: React.FC<ColorT> = props => {
  const { id, label, labelId, value, onChange, name } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        defaultValue=""
      >
        <MenuItem value="">
          <em>Select Color</em>
        </MenuItem>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="yellow">Yellow</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Color;

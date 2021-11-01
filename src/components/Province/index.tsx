// HTML Canada province list: https://www.freeformatter.com/canada-province-list-html-select.html
import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type ProvinceT = {
  id: string;
  name: string;
  label: string;
  labelId: string;
  value?: string;
  onChange?: (e: SelectChangeEvent) => void;
};

const Province: React.FC<ProvinceT> = props => {
  const { id, name, label, labelId, value, onChange } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        label={label}
        name={name}
        defaultValue=""
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">
          <em>Select Province</em>
        </MenuItem>
        <MenuItem value="AB">Alberta</MenuItem>
        <MenuItem value="BC">British Columbia</MenuItem>
        <MenuItem value="MB">Manitoba</MenuItem>
        <MenuItem value="NB">New Brunswick</MenuItem>
        <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
        <MenuItem value="NS">Nova Scotia</MenuItem>
        <MenuItem value="ON">Ontario</MenuItem>
        <MenuItem value="PE">Prince Edward Island</MenuItem>
        <MenuItem value="QC">Quebec</MenuItem>
        <MenuItem value="SK">Saskatchewan</MenuItem>
        <MenuItem value="NT">Northwest Territories</MenuItem>
        <MenuItem value="NU">Nunavut</MenuItem>
        <MenuItem value="YT">Yukon</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Province;

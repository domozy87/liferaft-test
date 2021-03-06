// HTML Country list: https://www.freeformatter.com/iso-country-list-html-select.html
import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type CountryT = {
  id: string;
  name: string;
  label: string;
  labelId: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
};

const Country: React.FC<CountryT> = props => {
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
          <em>Select Country</em>
        </MenuItem>
        <MenuItem value="CA">Canada</MenuItem>
        <MenuItem value="US">United State of America</MenuItem>
        <MenuItem value="OT">Other</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Country;

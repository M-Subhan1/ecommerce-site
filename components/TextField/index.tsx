import React from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

const TextFieldWrapper = ({ name, ...otherProps }: any) => {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: "true",
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <TextField {...configTextfield} fullWidth />;
};

export default TextFieldWrapper;

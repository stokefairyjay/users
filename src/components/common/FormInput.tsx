import React from "react";

const FormInput = (props: {
  type: string;
  name: string;
  label: string;
  onChange: any;
  placeholder: string;
  value: string;
  error: string;
}) => {
  let wrapperClass: string = "form-group";
  if (props.error && props.error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <input
          type={props.type}
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {props.error && <div className="alert alert-danger">{props.error}</div>}
      </div>
    </div>
  );
};

export default FormInput;

import React, { ChangeEvent } from "react";

const TextArea = (props: {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value: string;
  error: string;
}) => {
  let wrapperClass: string = "form-group";
  if (props.error?.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <textarea
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {props.error && (
          <div className="alert alert-danger mt-1 p-1">{props.error}</div>
        )}
      </div>
    </div>
  );
};

export default TextArea;

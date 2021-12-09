import React, {useState} from "react";

function Form(props) {
  const [values, setValues] = useState(props.fields.initialValues);

  const handleChange = (event) => {
    setValues({
      [event.target.name]: event.target.value,
    });
  };

  const handleBlur = (event) => {
    if (!event.target.value) event.target.classList.add("field-error");
    else event.target.classList.remove("field-error");
  };

  const Input = props.fieldComponent || "input";
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(values);
        }}
      >
        {props.fields.inputs.map((input) => (
          <Input
            {...input}
            onChange={handleChange}
            onBlur={handleBlur}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            value={
              Object.entries(values).find(
                (field) => field[0] === input.name
              )[1]
            }
            required={input.required}
            key={input.name}
          />
        ))}
        {props.children}
      </form>
    </>
  );
}

export default Form;

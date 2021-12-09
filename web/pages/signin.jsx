import React from "react";
import Link from "next/link";
import styles from "../styles/pages/auth.module.scss";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";

function Signin(_props) {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className={styles.auth}>
        <div className={styles.auth_wrap}>
          <h1>Signin</h1>
          <Form
            onSubmit={handleSubmit}
            fieldComponent={Input}
            fields={{
              initialValues: {email: "", otp: ""},
              inputs: [
                {
                  name: "email",
                  type: "email",
                  placeholder: "Email",
                  required: true,
                },
                {
                  name: "otp",
                  type: "number",
                  placeholder: "Otp",
                  required: true,
                },
              ],
            }}
          >
            <Button type="submit"> Sign In </Button>
          </Form>
          <p>
            Don&apos;t have an account? <Link href="/register"> Register </Link>
          </p>
          <p>
            Forgot Password?{" "}
            <Link href="/reset-password"> Reset Password </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signin;

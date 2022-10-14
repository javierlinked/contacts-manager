/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextArea, Form, Label } from "semantic-ui-react";

import { BACKEND_URL } from "../constants";

export default function Create() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const postData = () => {
    axios
      .post(BACKEND_URL, {
        phone,
        email,
        address,
      })
      .then(() => {
        navigate("/list");
      });
  };
  return (
    <fieldset>
      <Form>
        <Form.Field>
          <Label>
            Phone
            <input placeholder="Phone" />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            Email
            <input placeholder="Email" />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            Address
            <TextArea placeholder="Address" style={{ minHeight: 100 }} />
          </Label>
        </Form.Field>
        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </fieldset>
  );
}

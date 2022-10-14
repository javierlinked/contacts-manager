import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label, TextArea } from "semantic-ui-react";

import { BACKEND_URL } from "../constants";

export default function Edit() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const id1 = localStorage.getItem("id") || "";
    const phone1 = localStorage.getItem("phone") || "";
    const email1 = localStorage.getItem("email") || "";
    const address1 = localStorage.getItem("address") || "";

    setId(id1);
    setPhone(phone1);
    setEmail(email1);
    setAddress(address1);
  }, []);

  const updateData = () => {
    axios
      .put(`${BACKEND_URL}/${id}`, {
        id,
        email,
        address,
      })
      .then(() => {
        navigate("/list");
      });
  };
  return (
    <div>
      <h1>Contact {id}</h1>
      <Form className="edit-form">
        <Form.Field>
          <Label>
            phone
            <Input
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            email
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            address
            <TextArea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Label>
        </Form.Field>

        <Button type="submit" onClick={updateData}>
          📑
        </Button>
      </Form>
    </div>
  );
}

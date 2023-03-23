import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Button, Form, Input, Label, TextArea } from "semantic-ui-react";

import { CONTACTS_URL } from "../constants";

export default function Edit() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id") || "");
    setPhone(localStorage.getItem("phone") || "");
    setEmail(localStorage.getItem("email") || "");
    setAddress(localStorage.getItem("address") || "");
  }, []);

  const updateData = () => {
    axios
      .put(`${CONTACTS_URL}/${id}`, {
        id,
        phone,
        email,
        address,
      })
      .then(() => {
        router.push("/list");
      });
  };
  return (
    <div id="Edit">
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

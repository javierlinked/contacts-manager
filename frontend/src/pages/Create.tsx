import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/router'
import { Button, TextArea, Form, Label } from "semantic-ui-react";

import { CONTACTS_URL } from "../constants";

export default function Create() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const postData = () => {
    axios
      .post(CONTACTS_URL, {
        phone,
        email,
        address,
      })
      .then(() => {
        router.push("/list");
      });
  };
  return (
    <div id="create">
      <fieldset>
        <Form>
          <Form.Field>
            <Label>
              Phone
              <input
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              Email
              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              Address
              <TextArea
                placeholder="Address"
                style={{ minHeight: 100 }}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Label>
          </Form.Field>
          <Button onClick={postData} type="submit">
            Submit
          </Button>
        </Form>
      </fieldset>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "semantic-ui-react";

import { LOGIN_URL } from "../constants";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get(`${LOGIN_URL}/isFirstLogin`).then((response) => {
      setData(response.data);

      // eslint-disable-next-line no-console
      console.log(response.data);
    });
  }, []);

  const doLogin = () => {
    axios.post(LOGIN_URL, { token: password }).then(() => {
      navigate("/list");
    });
  };

  const label = `Welcome to simple secure contact manager. Please enter a
  password for your ${data ? "new " : ""}contact data file.`;

  return (
    <fieldset>
      <Form>
        <Form.Field>
          <Label>
            {label}
            <Input
              placeholder="password"
              type="password"
              icon="lock"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
        </Form.Field>
        <Button>Close</Button>
        <Button onClick={doLogin}>OK</Button>
      </Form>
    </fieldset>
  );
}

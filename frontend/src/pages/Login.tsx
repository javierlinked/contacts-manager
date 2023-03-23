import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Button, Form, Input, Label } from "semantic-ui-react";

import { LOGIN_URL } from "../constants";

export default function Login() {
  const router = useRouter();
  const [firstLogin, setFirstLogin] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get(`${LOGIN_URL}/isFirstLogin`).then((response) => {
      setFirstLogin(response.data);
    });
  }, []);
  const label = `Welcome to simple secure contact manager. Please enter a
  password for your ${firstLogin ? "new " : ""}contact data file.`;
  const doLogin = async () => {
    const res = await axios.post(LOGIN_URL, { token: password });
    if (res.data === true) {
      router.push("/list");
    } else {
      router.push("/login");
    }
  };

  return (
    <div id="login">
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
    </div>
  );
}

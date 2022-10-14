import { Button, Form, Label } from "semantic-ui-react";

export default function Login() {
  const doLogin = () => {};
  return (
    <fieldset>
      <Form>
        <Form.Field>
          <Label>
            Email
            <input placeholder="Email" />
          </Label>
        </Form.Field>

        <Button onClick={doLogin} type="submit">
          Submit
        </Button>
      </Form>
    </fieldset>
  );
}

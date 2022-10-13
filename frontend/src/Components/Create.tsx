import { Button, TextArea, Form, Label } from "semantic-ui-react";

export default function Create() {
  return (
    <fieldset draggable="true" translate="yes">
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
            <TextArea placeholder="Address" style={{ minHeight: 100 }} />{" "}
          </Label>
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </fieldset>
  );
}

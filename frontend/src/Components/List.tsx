import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";

import { BACKEND_URL } from "../constants";
import type { Contact } from "../types";

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(BACKEND_URL).then((response) => {
      setData(response.data);
    });
  }, []);

  const setLocalData = (contact: Contact) => {
    const { id, phone, email, address } = contact;
    localStorage.setItem("id", id.toString());
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
  };

  const getData = () => {
    axios.get(BACKEND_URL).then((c) => {
      setData(c.data);
    });
  };

  const onDelete = (id: string) => {
    axios.delete(`${BACKEND_URL}/${id}`).then(() => {
      getData();
    });
  };

  return (
    <div>
      <div>
        <Link to="/create">
          <Button> New contact </Button>
        </Link>
      </div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            data.map((contact: Contact) => (
              <Table.Row key={contact.id}>
                <Table.Cell>Contact {contact.id}</Table.Cell>
                <Table.Cell>{contact.phone}</Table.Cell>
                <Table.Cell>{contact.email}</Table.Cell>
                <Table.Cell>
                  <pre>{contact.address}</pre>
                </Table.Cell>
                <Table.Cell>
                  <Link to="/Edit">
                    <Button onClick={() => setLocalData(contact)}> ✍ </Button>
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <Button onClick={() => onDelete(contact.id)}> 🗑 </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

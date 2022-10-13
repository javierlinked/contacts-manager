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
    const { id, email, address } = contact;
    localStorage.setItem("id", id.toString());
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
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            data.map((contact: Contact) => (
              <Table.Row key={contact.id}>
                <Table.Cell>{contact.email}</Table.Cell>
                <Table.Cell>{contact.address}</Table.Cell>

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

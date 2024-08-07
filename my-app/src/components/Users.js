import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";


function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('online')

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          console.log("result: ", result);
          setData(result);
          localStorage.setItem('users', JSON.stringify(result))
        });
      })
      .catch((err) => {
        let collection = localStorage.getItem('users')
        setData(JSON.parse(collection))
        setMode('offline')
      });
  }, []);


  return (
    <div className="my-8">
      <div>
       {
         mode === 'offline' ? <div class="alert alert-warning" role="alert">
         No internet connection
       </div> : null
       }
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>sr.no.</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>E-mail</th>
            <th>Address</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address.street}</td>
              <td>{item.website}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;

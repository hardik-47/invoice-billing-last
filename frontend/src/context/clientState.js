import clientsContext from "./clientContext";
import axios from 'axios';
import React, { useState } from 'react';

const ClientState = (props) => {
  const [clientsList, setclientList] = useState([]);

  const getClient = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clients', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      setclientList(res.data);
    } catch (error) {
      console.error('Getting clients failed:', error.response?.data || error.message);
    }
  };

  const addClient = async (name, email, phone, address) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/clients',
        {
          name,
          email,
          phone,
          address
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      // Use functional update to avoid stale state issues
      setclientList(prev => prev.concat(res.data));
      console.log('Client added successfully:', res.data);
    } catch (error) {
      console.error('Addition failed:', error.response?.data || error.message);
    }
  };

  const delClient = async (id) => {

    try {

      const res = axios.delete(`http://localhost:5000/api/clients/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
    } catch (error) {
      console.error('deletion failed:', error.response?.data || error.message);
    }

    // console.log(res.data);

    const newlst= clientsList.filter(client=>{ return client.id!==id});
    setclientList(newlst);
  }

  const editClient = async (id,name, email, phone, address) => {

    try {

      const res = axios.put(`http://localhost:5000/api/clients/${id}`,{

          name,
          email,
          phone,
          address

      },{
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      
    } catch (error) {
      console.error('Updation failed:', error.response?.data || error.message);
    }

    let newClients= JSON.parse(JSON.stringify(clientsList));

    for(let i=0;i<clientsList.length;i++){

      const ele= newClients[i];
      if (ele._id===id) {
        newClients[i].name= name;
        newClients[i].email= email;
        newClients[i].phone= phone;
        newClients[i].address= address;
        break;
      }
    }


    setclientList(newClients);

  }

  return (
    <clientsContext.Provider value={{ clientsList, setclientList, getClient, addClient,delClient,editClient }}>
      {props.children}
    </clientsContext.Provider>
  );
};

export default ClientState;

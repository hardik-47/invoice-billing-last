import React, { useContext, useEffect, useState } from 'react';
import '../styles/Clients.css';
import clientsContext from '../context/clientContext';
import { useNavigate } from 'react-router-dom';

function Clients() {
  const context = useContext(clientsContext);
  const { clientsList, getClient, addClient,delClient } = context;
  const navigate = useNavigate();

  const [clients, setClients] = useState({ name: '', email: '', phone: '', address: '' });

  const onChange = (e) => {
    setClients({ ...clients, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    addClient(clients.name, clients.email, clients.phone, clients.address);
    setClients({ name: '', email: '', phone: '', address: '' });

    // Close modal after submit
    const modalEl = document.getElementById('addClientModal');
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getClient();
    } else {
      navigate('/login');
    }
  }, []);

  

  return (
    <div className="clients container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Clients</h1>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addClientModal"
        >
          + Add Client
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" id="addClientModal" tabIndex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="clientName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="clientName" value={clients.name} onChange={onChange} name="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientEmail" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="clientEmail" name="email" value={clients.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientPhone" className="form-label">Phone Number</label>
                  <input type="text" className="form-control" id="clientPhone" name="phone" value={clients.phone} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientAddress" className="form-label">Address</label>
                  <input type="text" className="form-control" id="clientAddress" name="address" value={clients.address} onChange={onChange} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save Client</button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Clients Table */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientsList.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.address}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger" onClick={()=>delClient(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;

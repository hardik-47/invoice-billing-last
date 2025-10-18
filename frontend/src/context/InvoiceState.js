import axios from 'axios';
import React, { useState } from 'react';
import invoiceContext from './invoiceContext';


const InvoiceState = (props) => {

    const [invoiceList, setInvoiceList] = useState([]);

    const addinvoice = async (invoiceData) => {

        try {
            const res = await axios.post('http://localhost:5000/api/invoices',
                invoiceData,
             {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            setInvoiceList(prev => [...prev, res.data]);
        } catch (error) {
            console.error('adding invoices failed:', error.response?.data || error.message);
        }

    }

    const getinvoice=async ()=>{

        try {
            const res= await axios.get('http://localhost:5000/api/invoices',{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            setInvoiceList(res.data);
        } catch (error) {
            console.error('Getting invoices failed:', error.response?.data || error.message);
        }

    }

    const delinvoice=(id)=>{

        try {

            const res = axios.delete(`http://localhost:5000/api/invoices/${id}`, {
              headers: {
                Authorization: localStorage.getItem('token')
              }
            })
          } catch (error) {
            console.error('deletion failed:', error.response?.data || error.message);
          }
      
          // console.log(res.data);
      
          const newlst= invoiceList.filter(invoice=>{ return invoice.id!==id});
          setInvoiceList(newlst);


    }


    return (
        <invoiceContext.Provider value={{invoiceList,setInvoiceList,addinvoice,getinvoice,delinvoice}}>
            {props.children}
        </invoiceContext.Provider>
    )
};

export default InvoiceState;
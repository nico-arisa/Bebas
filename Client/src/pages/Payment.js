import React from 'react'
import CardPayment from '../components/Payment'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import item from "../components/mapping";



function Payment() {
  const {id} = useParams()
  const Bebas = item?.bawah.find((tour) => tour.id === id)
  const [puantiti, setPuantiti] = useState(1)
  
  return (
    
    <div>
        <CardPayment />
        <div className='container col-md-10 d-flex justify-content-end'>
        <Link to={`/payment-waiting/${puantiti}/${Bebas?.price}`}>
            <button className="btn btn-warning mt-5 mb-3 px-5 text-white" type="button">Pay</button></Link>
            </div>
    </div>
  )
}

export default Payment
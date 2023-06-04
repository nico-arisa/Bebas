import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import detail from '../components/assets/image/detail.png'
import detail1 from '../components/assets/image/detail-1.png'
import detail2 from '../components/assets/image/detail-2.png'
import hotel from '../components/assets/image/hotel.png'
import plane from '../components/assets/image/plane.png'
import meal from '../components/assets/image/meal.png'
import time from '../components/assets/image/time.png'
import calendar from '../components/assets/image/calendar.png'
import minus from '../components/assets/image/Minus.png'
import plus from '../components/assets/image/Plus.png'
import {useState, useEffect} from 'react'
import { Await, Link } from "react-router-dom";
import mapping from '../components/mapping'
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';





import { Button } from "bootstrap";
import item from "../components/mapping";

// import detail3 from '../components/assets/image/detail-3.png'
// import Images from '../components/image';

function DetailTour() {



    let navigate = useNavigate();
    let {id} = useParams();

    let {data: trip} = useQuery('tripDetailCache', async () => {
        const response = await API.get(`/trip/` + id);
        return response.data.data;
    });

    // const handleBuy = useMutation(async (e) => {
    //     try {
    //         e.preventDefault();

    //         const config = {
    //             headers: {
    //                 'content-type' : 'application/json',
    //             },
    //         };
    //         const data = {
    //             trip_id: trip.id,
    //             country_id: trip.country_id,
    //             price: trip.price,
    //         };
    //         const body = JSON.stringify(data);

    //         const response = await API.post('/transaction', body, config);
    //         navigate('/profile');
    //     } catch (error) {}
    // });






    // const {id} = useParams()
    // const Bebas = item.bawah.find((tour) => tour.id === id)
    const [puantiti, setPuantiti] = useState(1)
    // const [price, setPrice] = useState(Bebas.price)

    const handleIncrement = () => {
        setPuantiti(puantiti + 1)
    }

    const handleDecrement = () => {
        if (puantiti > 1){
            setPuantiti(puantiti - 1)
        }
    }




    

    return (
        <div className="detailtour p-5" style={{backgroundColor:'#E5E5E5', textAlign:'start' }}>
        <div class="container" >
            <div>
                <h1>
                {trip?.title}
                </h1>
                <h6>
                {trip?.place}
                </h6>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-10">
                    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" align="center">
                        <div class="carousel-inner">
                            <div class="carousel-item active"> <img src={trip?.image}  class="rounded" /> </div>
                            <div class="carousel-item"> <img src={detail1} class="rounded" /> </div>
                            <div class="carousel-item"> <img src={detail2} class="rounded" /> </div>
                        </div>
                        <ol class="carousel-indicators list-inline">
                            <li class="list-inline-item active"> <a id="carousel-selector-0" class="selected" data-bs-slide-to="0" data-bs-target="#myCarousel"> <img src={trip?.image} class="img-fluid rounded" /> </a> </li>
                            <li class="list-inline-item"> <a id="carousel-selector-1" data-bs-slide-to="1" data-bs-target="#myCarousel"> <img src={detail1} class="img-fluid rounded" /> </a> </li>
                            <li class="list-inline-item"> <a id="carousel-selector-2" data-bs-slide-to="2" data-bs-target="#myCarousel"> <img src={detail2} class="img-fluid rounded" /> </a> </li>
                        </ol>
                    </div>
                </div>
            </div>
            <h5>
                Information Trip
            </h5>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{padding:'10px'}}>
                    Acomodation
                    <p>
                       <img src={hotel} ></img> {trip?.acomodation}
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Transportation
                    <p>
                    <img src={plane} ></img> {trip?.transportation}
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Eat
                    <p>
                    <img src={meal} ></img> {trip?.eat}
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Duration
                    <p>
                    <img src={time} ></img>   {trip?.day} Day {trip?.night} Night
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Date Trip
                    <p>
                    <img src={calendar} ></img> {trip?.dateTrip}
                    </p>
                </div>
            </div>
            <h5>
                Description
            </h5>
            <p>
            {trip?.description}
            </p>
            <div className="flex-row justify-content-between fs-3" style={{display:'flex'}}>
                    <div className="text-warning"> IDR. {trip?.price} <span className="text-black">/ Person</span>  </div> 
                    <div>
                    <img src={minus} onClick={handleDecrement} className="me-3"></img> 
                    {puantiti} 
                    <img src={plus} onClick={handleIncrement} className="ms-3"></img>
                    </div>
            </div>
            <div className="flex-row justify-content-between fs-3" style={{display:'flex'}}>
                    <div> Total :  </div> 
                    <div className="text-warning"> IDR. {(trip?.price * puantiti).toLocaleString()} </div>
            </div>
            <div className="d-flex justify-content-end pt-4">
                <Link to={`/payment/${puantiti}/${trip?.price}`}> <button className="btn btn-warning text-white" type="submit"> BOOK NOW</button></Link>
            </div>
        </div>
  </div>
    );
  }

export default DetailTour
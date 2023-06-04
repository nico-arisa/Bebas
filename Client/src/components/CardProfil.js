import React from 'react'
import CardPayment from './Payment'
import { Container } from 'react-bootstrap'
import prof from './assets/image/Avatar.png'
import names from './assets/image/name.png'
import office from './assets/image/local_post_office.png'
import phone from './assets/image/local_phone.png'
import place from './assets/image/place.png'


function CardProfil() {
  return (
    <div style={{backgroundColor:'#E5E5E5'}}  className='pt-5'>
    <div style={{backgroundColor:'#E5E5E5'}}>
        <Container className='bg-white d-flex justify-content-between p-3 container bg-light border col-md-8'>
            <div>
                <div style={{textAlign:'start'}}>
                <h1>
                    Personal Info
                </h1>
                </div>
                <div style={{textAlign:'start'}}>
                    <div className='p-3'>
                        <img src={names} className='pe-3'></img> Radif Ganteng
                    </div>
                    <div className='p-3'>
                    <img src={office} className='pe-3'></img>radifgans@gmail.com
                    </div>
                    <div className='p-3'>
                    <img src={phone} className='pe-3'></img>0812-8623-8911
                    </div>
                    <div className='p-3'>
                    <img src={place} className='pe-3'></img>Perumahan Permata Bintaro Residence C-3
                    </div>
                </div>
            </div>
            <div className='col-md-5'>
                <img src={prof} className='w-100'>
                </img>
                <button type="button" className="btn btn-warning w-100  mt-3 text-white">Change Photo Profile</button>
            </div>
        </Container>
    </div> 
    </div>
  )
}

export default CardProfil
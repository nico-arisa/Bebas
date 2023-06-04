import React from 'react'
import {Button, Form} from 'react-bootstrap';


function Content() {
  return (
    <div>
        <div className='conten'>
        <h1 style={{paddingTop:"5%", fontWeight:"bold"}}>
            EXPLORE
        </h1>
        <h1>your amazing city together</h1>
        <p style={{paddingTop:"7%"}}>Find great places to holiday</p>
        <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{borderRadius:"0.375rem 0rem 0rem 0.375rem"}}
                  />
                  <Button style={{marginRight: "9%", borderRadius:"0rem 0.375rem 0.375rem 0rem", color:"white"}}  variant="warning">Search</Button>
                </Form>
        </div>
    </div>
  )
}

export default Content
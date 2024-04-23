import React, {useRef} from 'react';
import './searchbar.css';
import {Col, Form, FormGroup} from "reactstrap";

const SearchBar = () => {


const locationRef = useRef('')
const distanceRef = useRef(0)
const maxGroupSizeRef = useRef(0)


const searchHandler = () =>
{
    const location = locationRef.current.value
    const distance = locationRef.current.value
    const maxGroupSize = locationRef.current.value

    if(location==='' || distance==='' ||maxGroupSize==='')
    {
        return alert('All fields are required!')
    }

}

  return <Col lg='12'>
    <div className="search_bar">
        <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                    <h6>Địa điểm</h6>
                    <input type="text" placeholder='Bạn muốn đi đâu?' ref={locationRef} />
                </div>
            </FormGroup>
            <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                <span><i className="ri-map-pin-time-line"></i></span>
                <div>
                    <h6>Khoảng cách</h6>
                    <input type="number" placeholder='Tính theo k/m' ref={distanceRef} />
                </div>
            </FormGroup>
            <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                <span><i className="ri-group-line"></i></span>
                <div>
                    <h6>Số người</h6>
                    <input type="number" placeholder='0' ref={maxGroupSizeRef} />
                </div>
            </FormGroup>

            <span className="search_icon" type='submit' onClick={searchHandler}>
                <i className="ri-search-line"></i>
            </span>    
        </Form>
    </div>
  </Col>
}

export default SearchBar
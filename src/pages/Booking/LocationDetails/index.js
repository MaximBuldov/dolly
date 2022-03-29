import React from 'react';
import {Input, Typography} from "antd";
import {FaMapMarkerAlt} from "react-icons/all";
import Checkbox from "./Checkbox";

import './style.scss';
import {Pagination} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {setLocationDetails} from "../../../redux/actions/cart";

const {Title} = Typography;

const LocationDetails = () => {
    const dispatch = useDispatch()
    const cart = useSelector(({cart}) => cart.items[cart.currentApp])
    const arrayAddresses = [cart.from, cart.to]
    const onUnitChange = (i, event) => {
        let value = event.target.value ? event.target.value : event.target.checked;
        dispatch(setLocationDetails(event.target.name, value, i))
    }

    const locationDetails = arrayAddresses.map((item, i) => {
        const dir = i === 0 ? 'from' : 'to'
        return (
        <div key={item.address} className="single-address">
            <div className="single-address__title">
                <Title level={4}><FaMapMarkerAlt /> {item.address}</Title>
            </div>
            <div className="single-address__unit">
                <Input
                    placeholder={"Unit or apartment number"}
                    onChange={(event) => onUnitChange(dir, event)}
                    name="unit"
                    value={cart[dir].unit}
                />
            </div>
            <div className="single-address__checkbox-list">
                <Checkbox
                    info="In the unlikely case of damage we won’t be able to process a claim on hardwood floors unless they are indicated here."
                    stairs={true}
                    checkboxHandler={onUnitChange}
                    dir={dir}
                    name="stairs"
                    cart={cart}
                >Helper(s) needs to use stairs</Checkbox>
                <Checkbox
                    checkboxHandler={onUnitChange}
                    dir={dir}
                    name="elevator"
                    cart={cart}
                >Helper(s) can use elevator</Checkbox>
                <Checkbox
                    checkboxHandler={onUnitChange}
                    dir={dir}
                    name="hardwood"
                    cart={cart}
                >Has hardwood floors</Checkbox>
                <Input.TextArea
                    placeholder={"Parking and building info"}
                    onChange={(event) => onUnitChange(dir, event)}
                    name="note"
                    value={cart[dir].note }
                />
            </div>
        </div>
    )
    })
    return (
        <div className={"location-details"}>
            <Title style={{textAlign: 'center'}}>Location Details</Title>
            <div className="location-list">
                {locationDetails}
            </div>
            <Pagination next="/item-list" progress="30" required={false}/>
        </div>

    );
};

export default LocationDetails;
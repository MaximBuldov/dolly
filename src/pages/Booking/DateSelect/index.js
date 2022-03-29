import React from 'react';
import {Calendar, Typography, Select} from "antd";
import moment from "moment";
import './style.scss';
import {Pagination} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../../redux/actions/cart";

const { Option } = Select;

const timeRange = (start, end) => {
    const availableTime = [];
    let i = start;
    while (i < end) {
        availableTime.push(i)
        i++
    }
    return availableTime;
}
const {start, end} = {
    start: 8,
    end: 18
};

const DateSelect = () => {
    const dispatch = useDispatch();
    const cart = useSelector(({cart}) => cart.items[cart.currentApp])

    const workTime = timeRange(start, end);

    const opt = (array) => array.map(item => (
        <Option key={item} value={item}>{item}:00</Option>
    ));


    const disabledDate = (current) => {
        return moment(current).format() === moment(cart.date).format() || current < moment().endOf('day')
    }

    const onChange = (label, value) => {
        dispatch(addToCart(label, value))
    }
    return (
        <div className="date-selected">
            <Typography.Title>Select a Date & Time </Typography.Title>
            <Calendar
                disabledDate={disabledDate}
                fullscreen={false}
                onChange={(value) => onChange('date', value)}
                value={moment(cart.date)}
            />
            <div className="date-selected__time">
                <Typography.Title level={5}>We can start any time between</Typography.Title>
                <div className="date-selected__time-box">
                    <Select
                        placeholder="Start time"
                        style={{ width: 120 }}
                        onChange={value => onChange('startTime', value)}
                        value={cart.startTime && cart.startTime}
                    >
                        {opt(workTime)}
                    </Select>
                    <span className="date-selected__time-box-span">and</span>
                    <Select
                        placeholder="End time"
                        style={{ width: 120 }}
                        onChange={value => onChange('endTime', value)}
                        value={cart.endTime && cart.endTime}
                    >
                        {opt(workTime)}
                    </Select>
                </div>
            </div>
            <Pagination next="/paymethod" progress="70" required={!cart.date || !cart.startTime || !cart.endTime}/>
        </div>
    );
};

export default DateSelect;

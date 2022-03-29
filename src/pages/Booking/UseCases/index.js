import React from 'react';
import {Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";

import './style.scss';
import {Pagination} from "../../index";
import {addToCart} from "../../../redux/actions/cart";

const {Title} = Typography;



const UseCases = () => {
    const dispatch = useDispatch();
    const { cart: {currentApp, items}, priceList } = useSelector(state => state)
    const curCart = items[currentApp]
    const movingTypes = priceList.items.filter(item => item.moon_price_cat.includes(38))
    const onClick = (value) => {
        dispatch(addToCart('movingType', value))
    }

    const createMovingType = movingTypes.map(item => (
            <div
                key={item.id}
                className={classNames(
                    "moving-type__single",
                    {'active': curCart.movingType === item.id})}
                onClick={() => onClick(item.id)}
            >
                <div className="moving-type__icon">
                    <img src={item?.acf?.icon} alt={item.title.rendered}/>
                </div>
                <div className="moving-type__content">
                    <div className="moving-type__title">{item.title.rendered}</div>
                    <div className="moving-type__description" dangerouslySetInnerHTML={{__html: item?.content.rendered}}/>
                </div>
            </div>
        ))


    return (
        <div className="moving-type">
            <Title>Select a Moving Type</Title>
            <div className="moving-type__list">
                {createMovingType}
            </div>
            <Pagination next="/location" progress="10" required={!curCart.movingType} />
        </div>
    );
};

export default UseCases;
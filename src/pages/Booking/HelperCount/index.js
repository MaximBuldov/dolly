import React from 'react';
import {Typography} from "antd";
import '../UseCases/style.scss';
import {Pagination} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../../redux/actions/cart";
import classNames from "classnames";

const {Title} = Typography;

const HelperCount = () => {
    const dispatch = useDispatch();
    const cart = useSelector(({cart}) => cart.items[cart.currentApp])
    const movers = useSelector(({priceList}) => priceList.items.filter(item => item.moon_price_cat.includes(42)))
    const vehicle = useSelector(({priceList}) => priceList.items.filter(item => item.moon_price_cat.includes(43)))

    const onClick = (label, value) => {
        dispatch(addToCart(label, value))
    }


    const createList = (array, label) => array.map(item => (
        <div
            key={item.id}
            className={classNames(
                "moving-type__single",
                {'active': cart[label] === item.id})}
            onClick={() => onClick(label, item.id)}
        >
            <div className="moving-type__icon">
                <img src={item.acf.icon} alt={item.title.rendered}/>
            </div>
            <div className="moving-type__content">
                <div className="moving-type__title">{item.title.rendered}</div>
                <div className="moving-type__description" dangerouslySetInnerHTML={{__html: item?.content.rendered}}/>
            </div>
        </div>
    ))


    return (
        <div className="moving-type">
            <Title level={3}>How many Helpers would you like?</Title>
            <div className="moving-type__list">
                {createList(movers, 'movers')}
            </div>
            <br />
            <Title level={3}>What size vehicle do you prefer?</Title>
            <div className="moving-type__list">
                {createList(vehicle, 'vehicle')}
            </div>
            <Pagination next="/date-select" progress="60" required={false} />
        </div>
    );
};

export default HelperCount;
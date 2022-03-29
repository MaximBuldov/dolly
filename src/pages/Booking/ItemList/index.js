import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeItemInCart, deleteItemInCart, setItemID} from "../../../redux/actions/cart";

import {Button, Typography} from "antd";
import {Link} from "react-router-dom";
import {Pagination} from "../../index";

import './style.scss';



const ItemList = () => {
    const dispatch = useDispatch()
    let stuffInCart = useSelector(({cart}) => cart.items[cart.currentApp].stuff);
    stuffInCart = stuffInCart ? stuffInCart.items : []
    const onAddItem = () => {
        dispatch(setItemID(stuffInCart.length))
    }
    const onChangeClick = (id) => {
        dispatch(changeItemInCart(id))
    }
    const onDeleteClick = (id) => {
        dispatch(deleteItemInCart(id))
    }
    let total = 0;
    stuffInCart.length > 0 && stuffInCart.forEach(el => total = Number(total) + Number(el.count));
    const addedStuff = stuffInCart.map((item, index) => (
        <div key={`${item.name}_${item.count}`} className="single-stuff">
            <div className="single-stuff-number">{item.count}</div>
            <div className="single-stuff-name">{item.name}</div>
            <div className="single-stuff-box">
                <div className="single-stuff-button">
                    <Link onClick={() => onChangeClick(index)} to='/item-detail'>Edit</Link>
                </div>
                <div onClick={() => onDeleteClick(index)}
                     className="single-stuff-button"
                >Delete</div>
            </div>
        </div>
    ))
    return (
        <div className="item-list">
            <Typography.Title>Add Items</Typography.Title>
            <div className="items-box">
                <div className="items-box__header">
                    <div className="items-box__count">{total ? total : 0}</div>
                    <div className="items-box__title">Total items</div>
                </div>
                <div className="items-box__list">
                    {stuffInCart.length > 0
                    ? <div>{addedStuff}</div>
                    : <div className={"items-box__list__empty"}>Add items you need moved one at a time.</div>
                    }
                </div>
            </div>
            <Button
                size="large"
                type="primary"
                danger block>
                <Link onClick={onAddItem} to="/item-detail">Add items</Link>
            </Button>
            <Pagination next="/helper-count" progress="50" required={stuffInCart.length <= 0}/>
        </div>
    );
};

export default ItemList;
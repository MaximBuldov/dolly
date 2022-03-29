import React, {useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Typography, Button, Card, Space} from 'antd';
import {CodeSandboxOutlined} from "@ant-design/icons";
import './style.scss';
import {useDispatch, useSelector} from "react-redux";
import {changeDraftInCart, deleteDraftFromCart, setApplicationID} from "../../redux/actions/cart";
import {AiTwotoneDelete, AiTwotoneEdit, IoIosImages} from "react-icons/all";
import {loadPrice} from "../../redux/actions/priceList";
import axios from "axios";

const {Title, Paragraph} = Typography;


const Started = () => {
    const dispatch = useDispatch();
    const {cart: {items}, priceList} = useSelector((state) => state);

    const createAppID = () => {
        dispatch(setApplicationID(items.length > 0 ? (items[items.length - 1].id + 1) : 1))
    }
    const deleteDraft = (key) => {
        dispatch(deleteDraftFromCart(key))
    }
    const onChangeDraft = (key) => {
        dispatch(changeDraftInCart(key))
    }

    const fetchPrice = useCallback(async () => {
        try {
            const fetched = await axios({
                url: 'https://admin.buldov.com/wp-json/wp/v2/moon_price',
                method: 'GET',
                params: {
                    _fields: 'acf,title,moon_price_cat,content,id',
                    per_page: 100
                }
            })
            dispatch(loadPrice(fetched.data));
        } catch (e) {
            console.log(e)
        }
    }, [dispatch])

    useEffect(() => {
        fetchPrice()
    }, [fetchPrice])
    const draftApp = items.length > 0 ? items.map(item => (
        <Card
            key={item.id}
            cover={
                <div className="draft__image">
                    {item?.stuff?.items[0]?.images ? <img alt="draft" src={item.stuff.items[0].images[0]} /> : <IoIosImages/>}
                    <span className="draft__badge">Draft</span>
                </div>
            }
            className="draft__card"
            actions={[
                <AiTwotoneDelete onClick={() => deleteDraft(item.id)} key="delete"/>,
                <Link to="/usecases" onClick={() => onChangeDraft(item.id)}>
                    <AiTwotoneEdit key="edit" />
                </Link>
            ]}
        >
            <p>Moving type: {priceList.items.find(el => el.id === item.movingType)?.title.rendered}</p>
        </Card>
    )) : '';

    return (
        <div className="started">
            <Space direction="vertical" size="large">
                <Title>Start</Title>
                {!draftApp && (
                    <>
                        <CodeSandboxOutlined className="started__box-icon"/>
                        <div className="started__text">
                            <Title level={4}>Book a Move</Title>
                            <Paragraph>Get help moving just about anything, whenever you need it</Paragraph>
                        </div>
                    </>
                )
                }
                <Button className="started__button" size="large" type="primary">
                    <Link onClick={createAppID} to="/usecases">Get started</Link>
                </Button>
                {draftApp && (
                    <div className="draft__wrapper">
                        {draftApp}
                    </div>
                )}
            </Space>
        </div>
    );
};

export default Started;
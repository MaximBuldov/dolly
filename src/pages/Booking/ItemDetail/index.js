import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Alert, AutoComplete, Button, Checkbox, Space, Typography, Upload, Input, Modal} from "antd";
import {deleteItemImage, deleteItemInCart, setItemDetails, setItemImages} from "../../../redux/actions/cart";
import {Counter} from "../../../components";
import hash from "object-hash"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject  } from "firebase/storage";

import './style.scss';
import {IoImageOutline} from "react-icons/all";


const ItemDetail = () => {
    const dispatch = useDispatch();
    const storage = getStorage();
    const cart = useSelector(({cart}) => cart.items[cart.currentApp].stuff)
    const priceList = useSelector(({priceList}) => priceList.items)
    const [previewImage, setPreviewImage] = useState({visible: false, url: null});
    const options = priceList.filter(item => item.moon_price_cat.includes(41))
    .map(item => ({
        value: item.title.rendered,
        key: item.id
    }))
    const onChange = (label, value) => {
        dispatch(setItemDetails(label, value))
    };
    const customUpload = async ({ onError, onSuccess, file, onProgress }) => {
        const imageName = hash(file)
        const storageRef = ref(storage, imageName);
        console.log(storageRef)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress({ percent: progress })
            },
            (error) => {
                onError(error.message, error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onSuccess(uploadTask.snapshot)
                    dispatch(setItemImages(downloadURL))
                });
            }
        );


    };

    const onRemoveFile = (file) => {
        dispatch(deleteItemImage(file.url))
    }
    const onPreviewFile = (file) => {
        setPreviewImage({visible: true, url: file.url})
    }

    const deleteHandler = () => {
        dispatch(deleteItemInCart(cart.items[cart.currentItem]))
    }

    return (
        <div className="item-detail">
            <Space size="middle" direction="vertical" style={{width:'100%'}}>
                <Typography.Title>Add an Item</Typography.Title>
                <AutoComplete
                    style={{width: "100%"}}
                    options={options}
                    placeholder="Enter an item"
                    size="large"
                    onChange={(value) => onChange('name', value)}
                    value={cart.items[cart.currentItem].name}
                />
                <div className="item-detail__count">
                    <span>How many?</span>
                    <Counter value={cart.items[cart.currentItem].count} onChange={(value) => onChange('count', value)}/>
                </div>
                <Alert
                    message="This item includes bed frame, mattress, and box spring. Dolly Helpers do not have plastic wrap or mattress covers. You are responsible for protecting your items before the Helper arrives."
                    type="error"
                />
                <div className="item-detail__breakdown">
                    <div className="item-detail__breakdown-checkbox">
                        <Checkbox
                            checked={cart.items[cart.currentItem].breakdown}
                            onChange={(event) => onChange('breakdown', event.target.checked)}
                        >Requires Breakdown to Move</Checkbox>
                    </div>
                    <div className="item-detail__breakdown-message">
                        This is something that needs to be broken down and then reassembled after moving. If there are any special tools required, please add in the Optional Details below.
                    </div>
                </div>
                <div className="item-detail__photo">
                    <Upload
                        listType="picture-card"
                        multiple
                        defaultFileList={cart.items[cart.currentItem]?.images && cart.items[cart.currentItem].images.map(el => ({
                            url: el,
                            uid: el,
                            name: el,
                        }))}
                        customRequest = {customUpload}
                        onRemove={onRemoveFile}
                        onPreview={onPreviewFile}
                    >
                        <div><IoImageOutline/><div>Add a photo</div></div>
                    </Upload>
                    <Modal
                        visible={previewImage.visible}
                        footer={null}
                        onCancel={() => setPreviewImage({visible: false, url: null})}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage.url} />
                    </Modal>
                </div>
                <div className="item-detail__note">
                    <p><b>Add details about this item (dimensions, weight, etc)</b></p>
                    <Input.TextArea
                        onChange={(event) => onChange('details', event.target.value)}
                        value={cart.items[cart.currentItem].details}
                        placeholder="Example: 2' x 3' x 5' and bulky; needs two people to carry"
                        rows="3"
                    />
                </div>
                <Space>
                    <Button size="large" type="primary" onClick={deleteHandler} danger>
                        <Link to="/item-list">Delete item</Link>
                    </Button>
                    <Button size="large" type="primary" disabled={!(cart.items[cart.currentItem].name && cart.items[cart.currentItem].count > 0)}>
                        <Link to="/item-list">Add item</Link>
                    </Button>
                </Space>
            </Space>
        </div>
    );
};

export default ItemDetail;
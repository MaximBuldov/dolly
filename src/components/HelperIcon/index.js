import React from 'react';
import {Modal} from "antd";
import {BsFillInfoCircleFill} from "react-icons/all";

const HelperIcon = ({title = ''}, text = '') => {

    const showInfoWindow = (title, text) => {
        Modal.info({
            title: title,
            content: (
                <div>
                    <p>{text}</p>
                </div>
            ),
            onOk() {},
        });
    }

    return (
        <BsFillInfoCircleFill onClick={showInfoWindow(title, text)} />
    );
};

export default HelperIcon;

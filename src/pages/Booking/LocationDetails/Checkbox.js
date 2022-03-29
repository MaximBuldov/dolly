import React from 'react';
import {Checkbox as AntCheckBox, Input, Modal} from "antd";
import {FcInfo} from "react-icons/all";


const Checkbox = ({children, info, stairs, checkboxHandler, dir, name, cart}) => {

    const showModal = () => {
        Modal.info({
            content: (
                <div>
                    <p>{info}</p>
                </div>
            ),
            onOk() {},
        });
    };

    const onChange = (event) => {
        checkboxHandler(dir, event)
    }

    return (
        <div className={"single-checkbox"}>
            <AntCheckBox
                name={name}
                onChange={onChange}
                checked={cart[dir] && cart[dir][name]}
            >{children}</AntCheckBox>
            {info && <FcInfo onClick={showModal}/>}
            {stairs && cart[dir].stairs && (
                <div className={"flightsOfStairs"}>
                    Flights of stairs
                    <Input
                        onChange={onChange}
                        name="stairsCount"
                        value={cart[dir] && cart[dir].stairsCount}
                        style={{display:'inline-block', width:'60px', marginLeft:'10px'}}
                        placeholder="0"
                        type="number"
                    />
                </div>
            )}
        </div>
    );
};

export default Checkbox;
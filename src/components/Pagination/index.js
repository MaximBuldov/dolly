import React from 'react';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import {Button} from "antd";
import {Link, useHistory} from "react-router-dom";

const Pagination = ({next, progress, required = true}) => {

    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    return (
        <div className="pagination">
            <div className="pagination__progress-line">
                <div className="pagination__progress" style={{width: progress + '%'}}/>
            </div>
            <div className="pagination__buttons">
                <Button onClick={() => goBack()} size="large"><CaretLeftOutlined /> Back</Button>
                <Button size="large" type="primary" disabled={required}>
                    <Link to={next}>Continue <CaretRightOutlined /></Link>
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
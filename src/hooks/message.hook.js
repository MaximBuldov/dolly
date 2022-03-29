import {useCallback} from "react";
import {message} from "antd";

export const useMessage = () => {
    return useCallback((text, type) => {
        if (text) {
            message[type](text);
        }

    }, [])
}
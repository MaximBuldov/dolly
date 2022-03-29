import {useDispatch, useSelector} from "react-redux";
import {setUserData, setUserLoading} from "../redux/actions/user";
import axios from "axios";
import {message, notification} from "antd";


export const useAuth = () => {
    const {isLoading} = useSelector(({user}) => user)
    const dispatch = useDispatch();

    const login = async (data) => {
        try {
            const response = await axios({
                url: 'https://admin.buldov.com/wp-json/jwt-auth/v1/token',
                method: 'POST',
                data
            })
            localStorage.setItem('token', response.data.token)
            dispatch(setUserData(true, response.data))
        } catch (e) {
            const regex = /(<([^>]+)>)/ig;
            notification.error({
                message: 'Error',
                description: e.response?.data?.message.replace(regex, '')
            })
        }
    }

    const checkAuth = async () => {
        dispatch(setUserLoading(true))
        try {
            await axios({
                url: 'https://admin.buldov.com/wp-json/jwt-auth/v1/token/validate',
                method: 'POST',
            })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setUserLoading(false))
        }
    }

    return {login, checkAuth, isLoading}

}
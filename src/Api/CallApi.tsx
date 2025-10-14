import axios from 'axios';
import { message } from 'antd';

const baseURL = process.env.REACT_APP_DB_URL || '';

export const callData = async ({
    url,
    method = 'GET',
    data = null,
    headers = {},
}: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    headers?: any;
}) => {
    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });

    const wrapResponse = (response: any) => ({
        status: response.status,
        data: response.data,
        headers: response.headers,
        statusText: response.statusText,
        config: response.config,
        request: response.request,
    });

    try {
        const response = await instance.request({ url, method, data });
        return wrapResponse(response);
    } catch (error: any) {
        const status = error.response?.status;

        switch (status) {
            case 400:
                message.error('Yêu cầu không hợp lệ.');
                break;

            case 401:
                message.error('Chưa xác thực. Vui lòng đăng nhập.');
                break;

            case 403:
                message.error('Bạn không có quyền truy cập.');
                break;

            case 404:
                message.error('Không tìm thấy tài nguyên.');
                break;

            case 422:
                message.error(error.response?.data?.message || 'Lỗi xác thực.');
                break;

            case 500:
                message.error('Lỗi server. Vui lòng thử lại sau.');
                break;

            default:
                message.error(error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
                break;
        }

        return Promise.reject({
            status,
            message: error.response?.data?.message || 'Có lỗi xảy ra.',
            data: error.response?.data,
        });
    }
};

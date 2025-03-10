import * as React from 'react';
import { loadingAtom } from '../states/global';
import { useAtom } from "jotai";
// import { useNavigate } from 'react-router-dom';
import { snackBarAtom } from '../states/global';


interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error_code?: number;
}

interface FetchActions<T> {
    get: () => Promise<ApiResponse<T>>;
    post: (body: T) => Promise<ApiResponse<T>>;
}

function useFetchActions<T = unknown>(url: string): FetchActions<T> {
    const [, setLoading] = useAtom(loadingAtom);
    const [, setSnackBar] = useAtom(snackBarAtom);


    // const navigate = useNavigate();
    const fetchHandle = async (method: string, body?: T): Promise<ApiResponse<T>> => {
        setLoading(true)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null,
            });

            const data: ApiResponse<T> = await res.json();

            if (res.status === 200) {
                if (!data.success) {
                    setSnackBar({ open: true, message: data.message || 'Request failed', severity: 'error' });
                }
                setSnackBar({ open: true, message: '操作成功', severity: 'success' });
                return data;
            } else if (res.status === 401) {
                setSnackBar({ open: true, message: 'Unauthorized', severity: 'error' });
                // navigate('/login');
                return { success: false, message: 'Unauthorized' };
            } else {
                setSnackBar({ open: true, message: data.message || 'Request failed', severity: 'error' });
                return { success: false, message: data.message || 'Request failed' };
            }
        } catch (error) {
            setSnackBar({ open: true, message: (error as Error).message || 'Network error', severity: 'error' });
            return { success: false, message: (error as Error).message || 'Network error' };
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }


    return ({
        get: () => fetchHandle("GET"),
        post: (body: T) => fetchHandle("POST", body)
    })
}

export default useFetchActions

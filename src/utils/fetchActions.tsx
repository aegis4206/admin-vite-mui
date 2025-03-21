// import * as React from 'react';
import { loadingAtom } from '../states/global';
import { useAtom } from "jotai";
// import { useNavigate } from 'react-router-dom';
import { snackBarAtom } from '../states/global';
import { ApiResponse, FetchActionsType } from '../types/fetch';


function useFetchActions<T = unknown>(url: string): FetchActionsType<T> {
    const [, setLoading] = useAtom(loadingAtom);
    const [, setSnackBar] = useAtom(snackBarAtom);


    // const navigate = useNavigate();
    const fetchHandle = async (method: string, param?: Record<string, string>, body?: T): Promise<ApiResponse<T>> => {
        try {
            setLoading(true)
            const controller = new AbortController();
            setTimeout(() => {
                controller.abort();
            }, 1000);
            let paramUrl = "";
            switch (method) {
                case "GET":
                    if (param) {
                        if (param.id) {
                            paramUrl = `/${param.id}`;
                        } else {
                            const searchParams = new URLSearchParams(param);
                            paramUrl = `?${searchParams.toString()}`;
                        }
                    }
                    break;
                case "PUT":
                case "DELETE":
                    if (body) {
                        paramUrl = `/${(body as unknown as Record<string, unknown>).id}`;
                    }
                    break
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}${paramUrl}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null,
                signal: controller.signal
            });

            const data: ApiResponse<T> = await res.json();

            if (res.status === 200) {
                if (!data.success) {
                    setSnackBar({ open: true, message: data.message || 'Request failed', severity: 'error' });
                } else {
                    // setSnackBar({ open: true, message: data.message || '操作成功', severity: 'success' });
                }

                // 排除object的情況 將object轉為array
                if (!Array.isArray(data.data)) {
                    const tempData = [];
                    tempData.push(data.data as T);
                    return { ...data, data: tempData };
                };
                return data;
            }
            // else if (res.status === 401) {
            //     setSnackBar({ open: true, message: 'Unauthorized', severity: 'error' });
            //     // navigate('/login');
            //     return { success: false, message: 'Unauthorized' };
            // } else if (res.status === 422) {
            //     setSnackBar({ open: true, message: data.message || 'failedValidation', severity: 'error' });
            //     // navigate('/login');
            //     return { success: false, message: 'failedValidation' };
            // } 
            else {
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
        get: (param?: Record<string, string>) => fetchHandle("GET", param),
        post: (body: T) => fetchHandle("POST", undefined, body),
        put: (body: T) => fetchHandle("PUT", undefined, body),
        delete: (body: T) => fetchHandle("DELETE", undefined, body),
    })
}

export default useFetchActions

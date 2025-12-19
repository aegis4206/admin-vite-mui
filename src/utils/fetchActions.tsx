// import * as React from 'react';
import { fetchCountAtom, loadingAtom } from '../states/global';
import { useAtom } from "jotai";
import { useNavigate } from 'react-router-dom';
import { snackBarAtom } from '../states/global';
import { ApiResponse, FetchActionsType } from '../types/fetch';


function useFetchActions<T = unknown>(url: string): FetchActionsType<T> {
    const [, setLoading] = useAtom(loadingAtom);
    const [, setSnackBar] = useAtom(snackBarAtom);
    const [, setFetchCount] = useAtom(fetchCountAtom);


    const navigate = useNavigate();
    const fetchHandle = async (method: string, param?: Record<string, string>, body?: T, SpecificUrl?: string): Promise<ApiResponse<T>> => {
        const controller = new AbortController();

        try {
            setLoading(true)
            setFetchCount(prev => prev + 1);
            const isFormData = body instanceof FormData;

            setTimeout(() => {
                controller.abort();
            }, 30000);
            let paramUrl = SpecificUrl ?? "";
            switch (method) {
                case "GET":
                    if (param) {
                        if (param.id) {
                            paramUrl = `/${param.id}`;
                        } else {
                            const searchParams = new URLSearchParams(param);
                            paramUrl = Object.keys(param).length > 0 ? `?${searchParams.toString()}` : "";
                        }
                    }
                    break;
                case "PUT":
                case "DELETE":
                    if (body) {
                        paramUrl = isFormData ? `/${body.get("id")}` : `/${(body as unknown as Record<string, unknown>).id}`;
                    }
                    break
            }
            if (url === "") {
                paramUrl = `${SpecificUrl}`;
            }

            if (method === "PUT" && isFormData) {
                body.append('_method', "put");
            }

            const loginInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}');

            const headers: Record<string, string> = {
                'Authorization': `Bearer ${loginInfo.token || ''}`,
            };
            if (!isFormData) {
                headers['Content-Type'] = 'application/json';
            }
            headers['Accept'] = 'application/json';

            const payload = {
                method: (method === "PUT" && isFormData) ? "POST" : method,
                headers,
                body: isFormData ? body : JSON.stringify(body),
                signal: controller.signal
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}${paramUrl}`, payload);

            const data: ApiResponse<T> = await res.json();
            if (res.status === 200) {
                if (!data.success) {
                    setSnackBar({ open: true, message: data.message || 'Request failed', severity: 'error' });
                } else {
                    // setSnackBar({ open: true, message: data.message || '操作成功', severity: 'success' });
                }

                // 排除object的情況 將object轉為array
                // if (!Array.isArray(data.data)) {
                //     const tempData = [];
                //     tempData.push(data.data as T);
                //     return { ...data, data: tempData };
                // };

                if (method !== "GET" && data.success) {
                    setSnackBar({ open: true, message: '操作成功', severity: 'success' });
                }

                return data;
            }
            else if (res.status === 401) {
                setSnackBar({ open: true, message: data.message || 'Unauthorized', severity: 'error' });
                navigate('/login');
                return { success: false, message: 'Unauthorized' };
            }
            // else if (res.status === 422) {
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
                setFetchCount(prev => {
                    if (prev <= 1) {
                        setLoading(false);
                        return 0;
                    }
                    return prev - 1
                });
            }, 500);
        }
    }


    return ({
        get: (param?: Record<string, string> | string) => fetchHandle("GET", url === "" ? undefined : param as Record<string, string>, undefined, param as string),
        post: (body: T, forSpecificUrl?: string) => fetchHandle("POST", undefined, body, forSpecificUrl),
        put: (body: T, forSpecificUrl?: string) => fetchHandle("PUT", undefined, body, forSpecificUrl),
        delete: (body: T, forSpecificUrl?: string) => fetchHandle("DELETE", undefined, body, forSpecificUrl),
    })
}

export default useFetchActions

import useFetchActions from './fetchActions';

export const useFetch = <T=unknown>() => useFetchActions<T>("");

export const useAuthUser = <T=unknown>() => useFetchActions<T>("auth/users");
export const useAuthLogin = <T=unknown>() => useFetchActions<T>("auth/login");
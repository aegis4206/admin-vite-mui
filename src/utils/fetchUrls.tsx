import useFetchActions from './fetchActions';

export const useFetch = <T=unknown>() => useFetchActions<T>("");

export const useAuthLogin = <T=unknown>() => useFetchActions<T>("auth/login");
export const useAuthUser = <T=unknown>() => useFetchActions<T>("auth/users");
export const useAuthUpdateMe = <T=unknown>() => useFetchActions<T>("auth/updateMe");
export const useAuthRoles = <T=unknown>() => useFetchActions<T>("auth/roles");
export const useAuthPermissions = <T=unknown>() => useFetchActions<T>("auth/permissions");

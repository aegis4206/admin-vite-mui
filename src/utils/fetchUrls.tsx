import useFetchActions from './fetchActions';

export const useFetch = <T=unknown>() => useFetchActions<T>("");

export const useTest = <T=unknown>() => useFetchActions<T>("test");


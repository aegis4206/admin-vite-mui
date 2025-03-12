import useFetchActions from './fetchActions';

export const useTest = <T=unknown>() => useFetchActions<T>("test");

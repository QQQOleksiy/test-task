import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import type {AppDispatch, RootState} from '../redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<AppDispatch>()

export {
    useAppDispatch,
    useAppSelector
}
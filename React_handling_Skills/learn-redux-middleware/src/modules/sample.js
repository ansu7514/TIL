import { handleActions } from "redux-actions";
import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';

// 액션 타입을 선언한다.
// 한 요청당 세 개를 만들어야 한다.

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCESS = 'sample/GET_POST_SUCESS';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCESS = 'sample/GET_USERS_SUCESS';

// thunk 함수를 생성한다.
// thunk 함수 내부에서는 시작할 때, 성공할 때, 실패했을 때 다른 액션을 디스패치한다.

export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// 초기 상태를 선언한다.
// 요청의 로딩 중 상태는 loading이라는 객체를 관리한다.

const initialState = {
    post: null,
    users: null
};

const sample = handleActions(
    {
        [GET_POST_SUCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCESS]: (state, action) => ({
            ...state,
            users: action.payload
        }),
    },
    initialState
);

export default sample;
/*
    action 객체를 만드는 액션 생성 함수들을 선언한다. (action creators)
    여기에서 () => ({})은 function() { return {} }와 동일한 의미이다.
*/

import * as types from './ActionTyoes';

export const increment = () => ({
    type: types.INCREMENT
});

export const decrement = () => ({
    type: types.DECREMENT
});

// 다른 액션 생성자들과 달리 파라미터를 가지고 있음
export const setColor = (color) => ({
    type: types.SET_COLOR,
    color
});
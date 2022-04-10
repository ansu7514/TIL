const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREATE';

export const increase = () => ({ type: INCREASE });
export const deincrease = () => ({ type: DECREASE });
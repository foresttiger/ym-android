import *as types from '../constants/customerTypes';

const initialState = {
  status: '',
}

export default function customerDo(state=initialState, action) {
  switch (action.type) {
    case types.ADDCUSTOMER:
      return {
        ...state,
        status: '添加成功',
      }
      break;
    case types.DELCUSTOMER:
      return {
        ...state,
        status: '删除成功',
      }
      break;
    default:
    	console.log(state);
      return state;
  }
}

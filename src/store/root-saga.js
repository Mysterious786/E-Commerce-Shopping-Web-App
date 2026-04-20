//It will encapsulate all of the different saga
import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';
import { ordersSagas } from './orders/orders.saga';

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas), call(ordersSagas)]);
}

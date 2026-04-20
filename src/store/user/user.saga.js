import {takeLatest,put,all,call} from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.type';
import { signInSuccess,signInFailed, signUpSuccess, signUpFailed, signOutSuccess,signOutFailed} from './user.action';
import { 
  getCurrentUser, 
  signInWithEmail, 
  signUpWithEmail, 
  signOut, 
  createUserProfile,
  getUserProfile,
  onAuthStateChange
} from '../../utils/supabase/supabase.client';

//Now once we have the userAuth object we will fetch their profile from Supabase

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
      if (!userAuth) return;
      
      const { data: userProfile, error } = yield call(getUserProfile, userAuth.id);
      
      if (error) {
        // User profile doesn't exist, create it
        if (additionalDetails?.displayName) {
          yield call(
            createUserProfile,
            userAuth.id,
            additionalDetails.displayName,
            userAuth.email
          );
        }
      }
      
      yield put(signInSuccess({ 
        id: userAuth.id, 
        email: userAuth.email,
        displayName: userProfile?.display_name || additionalDetails?.displayName,
      }));
    } catch (error) {
      yield put(signInFailed(error));
    }
  }
  
  export function* handleEmailSignIn({ payload: { email, password } }) {
    try {
      const { data, error } = yield call(signInWithEmail, email, password);
      
      if (error) {
        throw error;
      }
      
      yield call(getSnapshotFromUserAuth, data.user);
    } catch (error) {
      yield put(signInFailed(error));
    }
  }
  
  export function* isUserAuthenticated() {
    try {
      const userAuth = yield call(getCurrentUser);
      if (!userAuth) return;
      yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
      yield put(signInFailed(error));
    }
  }
  
  export function* handleSignUp({ payload: { email, password, displayName } }) {
    try {
      const { data, error } = yield call(signUpWithEmail, email, password);
      
      if (error) {
        throw error;
      }
      
      yield put(signUpSuccess(data.user, { displayName }));
    } catch (error) {
      yield put(signUpFailed(error));
    }
  }
  
  export function* handleSignOut() {
    try {
      const { error } = yield call(signOut);
      if (error) {
        throw error;
      }
      yield put(signOutSuccess());
    } catch (error) {
      yield put(signOutFailed(error));
    }
  }
  
  export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
  }
  
  export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
  }
  
  export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, handleEmailSignIn);
  }
  
  export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, handleSignUp);
  }
  
  export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
  }
  
  export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, handleSignOut);
  }
  
  export function* userSagas() {
    yield all([
      call(onCheckUserSession),
      call(onEmailSignInStart),
      call(onSignUpStart),
      call(onSignUpSuccess),
      call(onSignOutStart),
    ]);
  }

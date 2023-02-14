// --------------- TOURS-------------///
const BASE_URL = 'http://localhost:8000/api/v1/';

export const TOUR_URL = BASE_URL + 'tours/id';

// ---------- auth------------------
export const LOGIN_URL = BASE_URL + 'users/login';
export const LOGOUT_URL = BASE_URL + 'users/logout';
export const FORGOT_PASSWORD_URL = BASE_URL + 'users/forgotPassword';
export const RESET_PASSWORD_URL = BASE_URL + 'users/resetPassword/';
export const SIGN_UP_URL = BASE_URL + 'users/signup';
export const UPDATE_MY_PROFILE = BASE_URL + 'users/updateMe';
export const UPDATE_PASSWORD = BASE_URL + 'users/updateMypassword';
// -------------checkout-----------------------
export const CHECKOUT_URL = BASE_URL + 'booking/checkout-session';
export const CREATE_BOOKING_CHECKOUT = BASE_URL + 'booking/create-booking';
export const GET_BOOKING = BASE_URL + 'booking/';
// -----------profile---------------
export const MY_PROFILE_EDIT_URL = BASE_URL + 'users/me';
// ---------- images paths--------------
export const TOURS_PATH = '../../../../assets/img/tour-images/';
export const USERS_PATH = '../../../../assets/img/users/';
export const HEROES_PATH = '../../../../assets/img/heroes/';

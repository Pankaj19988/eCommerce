const BASE_URL = process.env.REACT_APP_NODE_BASE_URL;

export const PRODUCT = {
  ONE: BASE_URL + "api/product/",
  ALL: BASE_URL + "api/product/all",
  BY_CATEGORY: BASE_URL + "api/products/category/",
};

export const USER = {
  GET: BASE_URL + "api/user/getuser",
  GET_OTP: BASE_URL + "api/user/get_otp",
};

export const AUTH = {
  SIGN_IN: BASE_URL + "api/user/singin",
  // SING_UP: BASE_URL +"api/user/creat",
  SINGUP_SEND_OTP: BASE_URL + "api/user/singup_otp",
  SINGUP_OTP_VERIFY:BASE_URL + "api/user/otp/verify",
  // : BASE_URL +"api/userredairect/singupotp",
  FORGOT_PASS: BASE_URL + "api/user/forgotpassword",
  CHANGE_PASS: BASE_URL +"api/user/setpassword",
  
};

export const CART = {
    USER_ADD_CART_ITEM : BASE_URL +"api/cart/add",
    USER_CART: BASE_URL +"api/product/user_cart",
    DELETE_USER_CART: BASE_URL +"api/cart/delete/",
    UPDATE_CART_QUANTITY : BASE_URL +"api/cart/update",
    UPDATE_CART_SIZE : BASE_URL +"api/cart/update"
}

export const ORDER = {
    CREATE_ORDER : BASE_URL +"api/order/creat_order/", 
    GET_ORDER : BASE_URL +"api/order/user_ordered_items"
}

export const IP = {
  GET_LOCATION_DETAIL:"https://ipapi.co/json/"
}

export const CASHFREE = {
  ORDER_CREATE: BASE_URL + "api/cashfree/creatorder",
  PAYMENT_STATUS_BY_ID: BASE_URL + "api/cashfree/get_payment_status/"
}

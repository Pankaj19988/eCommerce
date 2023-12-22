import axios from "axios";
import { toast } from "react-toastify";
import { AUTH, PRODUCT, USER, CART, ORDER, IP, CASHFREE } from "./endPoints";




const token = localStorage.getItem("user");
const userToken = JSON.parse(localStorage.getItem("user"));

export const getAllProduct = async (page,perPage,query,priceKey) => {
  try {
      const res = await axios.get(PRODUCT.ALL+`?page=${page || ""}&perPage=${perPage || ""}&query=${query || ""}&priceKey=${priceKey||''}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getOneProductById = async (productId) =>{
  try {
    const res = await axios.post(`${PRODUCT.ONE}${productId}`)
    return res;
  } catch (error) {
    console.log(error)
  }
}

export const getProductByCategory = async (categoryName) =>{
  try {
    const res = await axios.get(`${PRODUCT.BY_CATEGORY}${categoryName}`)
    return res;
  } catch (error) {
    console.log(error)
  }
}

// USER API Section //

export const getUser = async () => {
  try {
    if (token) {
      const header = {
        "auth-token": userToken,
      };
      const res = await axios.post(USER.GET, null, {
        headers: header,
      });
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const submiteSingInForm = async (mobilenumber, password) => {
  try {
    const res = await axios.post(AUTH.SIGN_IN, {
      mobile: mobilenumber,
      password: password,
    });
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      return res;
    } else {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

// export const submiteSingUpForm = async (singUpForm) =>{
//   try {
//     const res = await axios.post(AUTH.SING_UP,singUpForm)
//     return res;
//   } catch (error) {
//     return error
//   }
// }



export const singUpUserSendOtp = async (singUpForm) => {
  try {
    const res = await axios.post(AUTH.SINGUP_SEND_OTP, singUpForm);
    return res;
  } catch (error) {
    throw error;
  }
};

export const singUpOtpVerify = async (data) => {
  try {
    const res = await axios.post(AUTH.SINGUP_OTP_VERIFY, {...data});
    return res;
  } catch (error) {
    throw error;
  }
};

// export const sendSingUpOTP = async (singUpForm) =>{
//   try {
//     const res = await axios.post(AUTH.SINGUP_SEND_OTP,singUpForm)
//     return res;
//   } catch (error) {
//     return error
//   }
// }

export const userLocationData = () => {
  try {
    const res = axios.get(IP.GET_LOCATION_DETAIL)
    return res
  } catch (error) {
    return error
  }
};

// Password realated API Section //

export const forgotPassGetOtp = async (mobilenumber) => {
  try {
    const res = await axios.post(AUTH.FORGOT_PASS, {
      mobile: mobilenumber,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const setNewPassword = async (secretKey, newpassword) => {
  try {
    const res = await axios.put(
      AUTH.CHANGE_PASS,
      { password: newpassword, secretKey:secretKey},
    );
    return res;
  } catch (error) {
    throw error;
  }
};

// Cart API Section //

export const addToCartOneItem = async (cart_item) => {
  try {
    if (token) {
      const header = {
        "auth-token": userToken,
      };
      const res = await axios.post(
        CART.USER_ADD_CART_ITEM,
        {
          productId: cart_item.productId,
          quantity: cart_item.quantity,
          size: cart_item.size,
        },
        {
          headers: header,
        }
      );
      toast.success("Cart will be added");
      return res;
    }
  } catch (error) {}
};

export const getCartData = async () => {
  try {
    if (token) {
      const header = {
        "auth-token": userToken,
      };
      const res = await axios.post(CART.USER_CART, null, {
        headers: header,
      });
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const res = await axios.delete(`${CART.DELETE_USER_CART}${cartItemId}`);
    toast.error("Cart 1 Item Deleted", { autoClose: 300 });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCartQuantity = async (quantity, cartobjectid) => {
  try {
    if (token) {
      const header = { "auth-token": userToken };
      const res = await axios.put(
        CART.UPDATE_CART_QUANTITY,
        { quantity: quantity, cartobjectid: cartobjectid },
        { headers: header }
      );
      toast.info(`Your Updated Quantity : ${quantity}`);
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const updateCartSize = async (size, cartobjectid) => {
  try {
    if (token) {
      const header = {
        "auth-token": userToken,
      };
      const res = await axios.put(
        CART.UPDATE_CART_SIZE,
        {
          size: size,
          cartobjectid: cartobjectid,
        },
        { headers: header }
      );
      toast.info(`Your Updated Size : ${size}`);
      return res;
    }
  } catch (error) {
    throw error;
  }
};

// Order API Section //

export const creatOrder = async (order_id) => {
  try {
    const header = {
      "auth-token": userToken,
    };
    const res = await axios.post(`${ORDER.CREATE_ORDER}${order_id}`,null,{ headers: header });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getOrderData = async () => {
  try {
    if (token) {
      const header = {
        "auth-token": userToken,
      };
      const res = await axios.post(ORDER.GET_ORDER, null, { headers: header });
      return res;
    }
  } catch (error) {
    throw error;
  }
};

// Cashfree API Section //
export const cashfreeCreatOrder = async (order_detail)=>{
  try {
    const header = {
      "auth-token": userToken,
    };
    const res = await axios.post(
      CASHFREE.ORDER_CREATE,
      {
        products: order_detail.products,
        address: order_detail.address,
        amount: order_detail.amount,
        cart:order_detail.cart
      },
      { headers: header }
    );
    return res;
  } catch (error) {
    throw error;
  }
}

export const paymentStatusByOrderId = async (order_id)=>{
  try {
    const res = await axios.get(`${CASHFREE.PAYMENT_STATUS_BY_ID}${order_id}`);
    return res;
  } catch (error) {
    throw error;
  }
}
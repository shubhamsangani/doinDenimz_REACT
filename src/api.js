import Axios from "axios";

// ----------------------------------------------------------------
// Base URL Server
const baseURL = "https://tailorapi.broaderai.com";
// const baseURL = "http://103.10.234.158:8000";
// const baseURL = "http://127.0.0.1:8000";
// ----------------------------------------------------------------

// ====================== Authentication Apis ======================
// Variables path
const registerUser = "/userLoginApis/registerUser";
const emailVerification = "/userLoginApis/emailVerificationUser";
const otpVerification = "/userLoginApis/emailVerificationCompletion";
const loginUser = "/userLoginApis/loginUser";
const getUserID = "/userLoginApis/getuserID";
const logoutUser = "/userLoginApis/logoutUser";
// const generateToken = "/userLoginApis/generateToken/";
// const verifyToken = "/userLoginApis/verifyToken/";
// const refreshToken = "/userLoginApis/refreshToken/";
const forgetPasswordInit = "/userLoginApis/forgetPasswordUser";
const forgetPasswordUserChanged = "/userLoginApis/forgetPasswordUserChanged";


// Export Function 
export const registerUserAPI = () => `${baseURL}${registerUser}`;
export const emailVerificationAPI = () => `${baseURL}${emailVerification}`;
export const otpVerificationAPI = () => `${baseURL}${otpVerification}`;
export const getUserIDAPI = () => `${baseURL}${getUserID}`;
export const loginUserAPI = () => `${baseURL}${loginUser}`;
export const logoutUserAPI = () => `${baseURL}${logoutUser}`;
// export const generateTokenAPI = () => `${baseURL}${generateToken}`;
// export const verifyTokenAPI = () => `${baseURL}${verifyToken}`;
// export const refreshTokenAPI = () => `${baseURL}${refreshToken}`;
export const forgetPasswordInitAPI = () => `${baseURL}${forgetPasswordInit}`;
export const forgetPasswordUserChangedAPI = () => `${baseURL}${forgetPasswordUserChanged}`;

// ----------------------------------------------------------------


// ====================== Custom Jeans Apis ======================
// Variables path
const fitOption = "/fitApis/fitactionGet";
const lengthOption = "/lengthApis/lengthactionGet";
const cuffOption = "/productApis/cuffsGet";
const flyOption = "/flyApis/flyGet";
const frontPocketOption = "/pocketApis/frontpocketGet";
const backPocketOption = "/pocketApis/backpocketGet";
const finishingOption = "/productApis/finishingGet";
const fabricsOption = "/productApis/fabricsGet";
const monogramOption = "/productApis/monogramGet";
const threadOption = "/threadApis/threadGet";
const buttonOption = "/buttonApis/buttonGet";
const brandbackpatchOption = "/productApis/brandbackpatchGet";

// Export Function
export const fitOptionAPI = () => `${baseURL}${fitOption}`;
export const lengthOptionAPI = () => `${baseURL}${lengthOption}`;
export const cuffOptionAPI = () => `${baseURL}${cuffOption}`;
export const flyOptionAPI = () => `${baseURL}${flyOption}`;
export const frontPocketOptionAPI = () => `${baseURL}${frontPocketOption}`;
export const backPocketOptionAPI = () => `${baseURL}${backPocketOption}`;
export const finishingOptionAPI = () => `${baseURL}${finishingOption}`;
export const fabricsOptionAPI = () => `${baseURL}${fabricsOption}`;
export const monogramOptionAPI = () => `${baseURL}${monogramOption}`;
export const threadOptionAPI = () => `${baseURL}${threadOption}`;
export const buttonOptionAPI = () => `${baseURL}${buttonOption}`;
export const brandbackpatchOptionAPI = () => `${baseURL}${brandbackpatchOption}`;

// ----------------------------------------------------------------


// ====================== Men Filter Apis ======================
// Variables path
const productColor = "/productApis/productcolorGet";
const productSize = "/productApis/productsizeGet";
const performanceFeature = "/productApis/productperformancefeatureGet";
const productOccassion = "/productApis/productoccassionGet";

// Export Function 
export const productColorAPI = () => `${baseURL}${productColor}`;
export const productSizeAPI = () => `${baseURL}${productSize}`;
export const performanceFeatureAPI = () => `${baseURL}${performanceFeature}`;
export const productOccassionAPI = () => `${baseURL}${productOccassion}`;

// ----------------------------------------------------------------


// ====================== Men Product Apis ======================
// Variables path
const productGetAll = "/productApis/productdetailsGetAll";
const productGet = "/productApis/productdetailsGet";
const addToFavorite = "/productApis/productfavoriteRegister";
const getSizeofProduct = "/productApis/productdetailssizeGetproduct";

// Export Function 
export const productGetAllAPI = () => `${baseURL}${productGetAll}`;
export const productGetAPI = () => `${baseURL}${productGet}`;
export const addToFavoriteAPI = () => `${baseURL}${addToFavorite}`;
export const getSizeofProductAPI = () => `${baseURL}${getSizeofProduct}`;

// ----------------------------------------------------------------

// ====================== Cart Apis ======================
// Variables path
// const addToCart = "/orderApis/productcartRegister";
// const getCart = "/orderApis/productcartGetUser";
// const deleteCartItem = "/orderApis/productcartDelete";
// const updateCartItem = "/orderApis/productcartUpdate";

//TempAPI
const addToCart = "/orderApis/productcarttempRegister";
const getCart = "/orderApis/productcarttempGetUser";
const deleteCartItem = "/orderApis/productcarttempDelete";
const deleteCartAllItem = "/orderApis/productcarttempuseridDelete";
const updateCartItem = "/orderApis/productcarttempUpdate";
const cartRegister = "/orderApis/cartRegister"; //for address update when buying order

// Export Function 
export const addToCartAPI = () => `${baseURL}${addToCart}`;
export const getCartAPI = () => `${baseURL}${getCart}`;
export const deleteCartItemAPI = () => `${baseURL}${deleteCartItem}`;
export const deleteCartAllItemAPI = () => `${baseURL}${deleteCartAllItem}`;
export const updateCartItemAPI = () => `${baseURL}${updateCartItem}`;
export const cartRegisterAPI = () => `${baseURL}${cartRegister}`;

// export const addToCartAPI = () => `${localURL}${addToCart}`;
// export const getCartAPI = () => `${localURL}${getCart}`;
// export const deleteCartItemAPI = () => `${localURL}${deleteCartItem}`;
// export const deleteCartAllItemAPI = () => `${localURL}${deleteCartAllItem}`;
// export const updateCartItemAPI = () => `${localURL}${updateCartItem}`;

// ----------------------------------------------------------------


// ====================== Contact Us Apis ======================
// Variables path
const contactUs = "/userLoginApis/contactusRegister";

// Export Function
export const contactUsAPI = () => `${baseURL}${contactUs}`;


// ----------------------------------------------------------------
// ====================== Checkout Apis ======================
// Variables path
const checkout = "/create-checkout-session";

// Export Function
export const checkoutAPI = () => `${baseURL}${checkout}`;

// ----------------------------------------------------------------


// ====================== promocode Apis ======================
// Variables path
const promocode = "/orderApis/promocodeGetall";

// Export Function
export const promocodeAPI = () => `${baseURL}${promocode}`;

// ----------------------------------------------------------------

// ====================== pincode Apis ======================
// Variables path
const pincode = "/categoryApis/pincodeget";

// Export Function
export const pincodeAPI = () => `${baseURL}${pincode}`;

// ----------------------------------------------------------------


// ====================== Profile Apis ======================
// Variables path
const personalDetails = "/userLoginApis/ViewUserProfile";
const changePasswordUser = "/userLoginApis/changePasswordUser";
const editProfile = "/userLoginApis/UsersideEditProfile";
const addressRegister = "/userLoginApis/addressRegister";
const addressGetAll = "/userLoginApis/addressGetAll";
const addressDelete = "/userLoginApis/addressDelete";
const addressUpdate = "/userLoginApis/addressUpdate";
const defaultAddress = "/userLoginApis/addressUpdateaction";
const defaultAddressGet = "/userLoginApis/addressGetAction";
const measurmentRegister = "/measurmentprofileApis/measurmentprofileRegister";
const measurmentUpdate = "/measurmentprofileApis/measurmentprofileUpdate";
const measurmentGetAll = "/measurmentprofileApis/measurmentprofileGetUserAll";
const measurmentDelete = "/measurmentprofileApis/measurmentprofileDelete";
const favoriteGetAll = "/productApis/productfavoriteGet";
const favoriteDelete = "/productApis/productfavoriteDelete";
const orderHistory = "/orderApis/productcartGetUser";
const orderAddress = "/orderApis/cartGet";
const orderCartHistory = "/orderApis/cartGetuser";

// Export Function
export const personalDetailsAPI = () => `${baseURL}${personalDetails}`;
export const changePasswordUserAPI = () => `${baseURL}${changePasswordUser}`;
export const editProfileAPI = () => `${baseURL}${editProfile}`;
export const addressRegisterAPI = () => `${baseURL}${addressRegister}`;
export const addressGetAllAPI = () => `${baseURL}${addressGetAll}`;
export const addressDeleteAPI = () => `${baseURL}${addressDelete}`;
export const addressUpdateAPI = () => `${baseURL}${addressUpdate}`;
export const defaultAddressAPI = () => `${baseURL}${defaultAddress}`;
export const defaultAddressGetAPI = () => `${baseURL}${defaultAddressGet}`;
export const measurmentRegisterAPI = () => `${baseURL}${measurmentRegister}`;
export const measurmentUpdateAPI = () => `${baseURL}${measurmentUpdate}`;
export const measurmentGetAllAPI = () => `${baseURL}${measurmentGetAll}`;
export const measurmentDeleteAPI = () => `${baseURL}${measurmentDelete}`;
export const favoriteGetAllAPI = () => `${baseURL}${favoriteGetAll}`;
export const favoriteDeleteAPI = () => `${baseURL}${favoriteDelete}`;
export const orderHistoryAPI = () => `${baseURL}${orderHistory}`;
export const orderAddressAPI = () => `${baseURL}${orderAddress}`;
export const orderCartHistoryAPI = () => `${baseURL}${orderCartHistory}`;

// ----------------------------------------------------------------




// ----------------------------------------------------------------
// FetchAPI function

export const FetchAPI = async (apiLink, fetchType, sentData) => {
  const res = await Axios({
    url: apiLink,
    method: fetchType,
    data: sentData,
  })
    .then((response) => response)
    .catch((err) => err.response);

  const data = await res?.data;

  return { res, data };
};

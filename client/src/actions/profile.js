// import axios from "axios";
// import { setAlert } from "./alert";

// import { GET_PROFILE, PROFILE_ERROR } from "../actions/profile";

// // Get current users profile
// export const getCurrentProfile = () => async dispatch => {
//   try {
//     const res = await axios.get("/reports/me/");

//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// // Get profile by ID
// export const getProfileByPNumber = p_number => async dispatch => {
//   try {
//     const res = await axios.get(`/reports/user/${p_number}`);

//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

import { axiosGet } from "@/utils/api";
import { getTopRank, getFpointByUser } from "./action";

const initialState = {
  topRank: [],
  userPoint: [],
};

export const topRank = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TOPRANK":
      return {
        ...state,
        topRank: action.payload,
      };
    case "GET_FPOINT_USER":
      return {
        ...state,
        userPoint: action.payload,
      };
    default:
      return state;
  }
};

export const getTopRankDataThunkAction = () => async (dispatch, getState) => {
  try {
    const urls = ["api/UserFPoint/getallclient"];

    const [topRank] = await Promise.all(urls.map((url) => axiosGet(url)));

    await dispatch(getTopRank(topRank));
  } catch (error) {
    console.log(error);
  }
};

export const getFpointByUserData = (props) => async (dispatch, getState) => {
  // console.log("props", props);
  const { userId } = props;
  const userPoint = await axiosGet(
    `api/UserFPoint/getsinglebyuserid/${userId}`,
    dispatch
  );
  // console.log(gift);
  if (typeof userPoint !== "undefined") {
    dispatch(getFpointByUser(userPoint));
  } else {
    console.log("get fpoint failed");
  }
};

import { axiosGet } from "@/utils/api";
import {
  getUserGift,
  getUserGiftHistory,
  getFriends,
  getUserDetail,
  getActivitiesHistory,
  getGivePointsHistory,
  getSpinsHistory,
} from "./action";

const initialState = {
  userGift: [],
  userGiftHistory: [],
  friends: [],
  userDetail: [],
  activitiesHistory: [],
  givePointsHistory: [],
  spinsHistory: [],
};

export const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_GIFT":
      return {
        ...state,
        userGift: action.payload,
      };
    case "GET_USER_GIFT":
      return {
        ...state,
        userGiftHistory: action.payload,
      };
    case "GET_FRIENDS":
      return {
        ...state,
        friends: action.payload,
      };
    case "GET_USER_DETAIL":
      return {
        ...state,
        userDetail: action.payload,
      };
    case "GET_ACTIVITY_HISTORY":
      return {
        ...state,
        activitiesHistory: action.payload,
      };
    case "GET_GIVE_POINTS_HISTORY":
      return {
        ...state,
        givePointsHistory: action.payload,
      };
    case "GET_SPINS_HISTORY":
      return {
        ...state,
        spinsHistory: action.payload,
      };

    default:
      return state;
  }
};

export const getUserGiftData = (props) => async (dispatch, getState) => {
  // console.log("props", props);
  const { userId } = props;
  const gift = await axiosGet(
    `UserGift/getallclientbyuserid/${userId}`,
    dispatch
  );
  const userDetail = await axiosGet(`appUser/detail/${userId}`, dispatch);
  // console.log(gift);
  if (typeof gift !== "undefined") {
    dispatch(getUserGift(gift));
    dispatch(getUserDetail(userDetail));
  } else {
    console.log("cc");
  }
};

export const getUserGiftHistoryData = (props) => async (dispatch, getState) => {
  // console.log("props", props);
  const { userId } = props;
  const gift = await axiosGet(
    `UserGiftSpin/getalladminbyuserid/${userId}`,
    dispatch
  );
  // console.log(gift);
  if (typeof gift !== "undefined") {
    dispatch(getUserGiftHistory(gift));
  } else {
    console.log("cc");
  }
};

export const sendPoint = (id) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const url = "appUser/sendactiveemail";
    const data = {
      Id: id,
    };
    const response = await axiosPost(url, data, dispatch);
    response ? await dispatch(getUserMission(response)) : null;
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
  }
};

export const getFriendsData = (props) => async (dispatch, getState) => {
  // console.log("props", props);
  const { userId } = props;
  const friends = await axiosGet(
    `UserFriend/getallclientbyuserid/${userId}`,
    dispatch
  );
  console.log(friends);
  if (typeof friends !== "undefined") {
    dispatch(getFriends(friends));
  } else {
    console.log("cc");
  }
};

export const getActivitiesHistoryData =
  (props) => async (dispatch, getState) => {
    // console.log("props", props);
    const { userId } = props;
    const activities = await axiosGet(
      `UserCampaign/getallclientbyuserid/${userId}`,
      dispatch
    );
    if (typeof activities !== "undefined") {
      dispatch(getActivitiesHistory(activities));
    } else {
      console.log("cc");
    }
  };

export const getGivePointsHistorysData =
  (props) => async (dispatch, getState) => {
    // console.log("props", props);
    const { userId } = props;
    const givePoints = await axiosGet(
      `UserSendFPoint/getallclientbyuserid/${userId}`,
      dispatch
    );
    if (typeof givePoints !== "undefined") {
      dispatch(getGivePointsHistory(givePoints));
    } else {
      console.log("cc");
    }
  };

export const getSpinsHistorysData = (props) => async (dispatch, getState) => {
  console.log("props", props);
  const { userId } = props;
  const gift = await axiosGet(
    `UserGiftSpin/getallclientbyuserid/${userId}`,
    dispatch
  );
  console.log(gift);
  if (typeof gift !== "undefined") {
    dispatch(getSpinsHistory(gift));
  } else {
    console.log("cc");
  }
};

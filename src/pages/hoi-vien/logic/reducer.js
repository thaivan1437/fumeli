import { axiosGet } from "@/utils/api";
import {
  getUserGift,
  getUserGiftHistory,
  getFriends,
  getUserDetail,
  getActivitiesHistory,
  getGivePointsHistory,
  getSpinsHistory,
  getDataUser,
  getAllUser,
  getAllFriendByUserId,
} from "./action";

const initialState = {
  userGift: [],
  userGiftHistory: [],
  friends: [],
  userDetail: [],
  activitiesHistory: [],
  givePointsHistory: [],
  spinsHistory: [],
  userData: [],
  allUser: [],
  userFriend: [],
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

    case "GET_DATAUSER":
      return {
        ...state,
        userData: action.payload,
      };
    case "GET_ALLUSER":
      return {
        ...state,
        allUser: action.payload,
      };
    case "GET_ALLUSERFRIEND":
      return {
        ...state,
        userFriend: action.payload,
      };
    default:
      return state;
  }
};

export const getUserGiftData = (props) => async (dispatch, getState) => {
  // console.log("props", props);
  const { userId } = props;
  const gift = await axiosGet(
    `api/UserGift/getallclientbyuserid/${userId}`,
    dispatch
  );
  const userDetail = await axiosGet(`api/appUser/detail/${userId}`, dispatch);
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
    `api/UserGiftSpin/getalladminbyuserid/${userId}`,
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
    const url = "api/appUser/sendactiveemail";
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
    `api/UserFriend/getallclientbyuserid/${userId}`,
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
      `api/UserCampaign/getallclientbyuserid/${userId}`,
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
      `api/UserSendFPoint/getallclientbyuserid/${userId}`,
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
    `api/UserGiftSpin/getallclientbyuserid/${userId}`,
    dispatch
  );
  console.log(gift);
  if (typeof gift !== "undefined") {
    dispatch(getSpinsHistory(gift));
  } else {
    console.log("cc");
  }
};

const USER_DETAIL_API_ENDPOINT = "appUser/detail/";

let data = [];
if (typeof window !== "undefined") {
  const userData = localStorage.getItem("user");
  if (userData) {
    data = JSON.parse(userData);
  }
}

export const getAllDataThunkAction = () => async (dispatch, getState) => {
  try {
    const [userDataResponse, allUserResponse, userFriendResponse] =
      await Promise.all([
        axiosGet(`api/${USER_DETAIL_API_ENDPOINT}${data.userid}`, dispatch),
        axiosGet("api/appUser/getallclientbyuserrole?role=user", dispatch),
        axiosGet(`api/UserFriend/getallclientbyuserid/${data.userid}`, dispatch),
      ]);

    await dispatch(getDataUser(userDataResponse));
    await dispatch(getAllUser(allUserResponse));
    await dispatch(getAllFriendByUserId(userFriendResponse));
  } catch (error) {
    console.log(error);
  }
};

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/UserSlices";
import BadanHukumReducer from "../slices/badan-hukum/BadanHukumSlices";
import korporatReducer from "../slices/pengamanan-korporat/KorporatSlices";
import GlobalSlices from "../global/GlobalSlices";
import AuthSlices from "../global/AuthSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    badanHukum: BadanHukumReducer,
    korporat: korporatReducer,
    global: GlobalSlices,
    auth: AuthSlices,
  },
});

export default store;

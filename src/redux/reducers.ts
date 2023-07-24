import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import authReducer from "@redux/slices/auth";

const rootReducer = combineReducers({ counter, auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

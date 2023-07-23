import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({ counter, authReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

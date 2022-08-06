import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";

import sitesReducer from "./Sites/reducer";
import dashboardReducer from "../modules/Dashboard/store/reducer";
import gameReducer from "../modules/Games/Game/store/reducer";
import noteReducer from "../modules/Games/Note/store/reducer";
import toolReducer from "../modules/Tools/store/reducer";

import iceBreakerReducer from "../modules/IceBreaker/store/reducer";
import filterReducer from "./filter/reducer";
import ratingReducer from "../modules/Games/Reviews/store/reducer";
import miscellaneousReducer from "./Miscellaneous/reducer";
import footerReducer from "./Footer/reducer";

export default combineReducers({
  auth: authReducer,
  Dashboard: dashboardReducer,
  IceBreaker: iceBreakerReducer,
  Filter: filterReducer,
  Game: gameReducer,
  Note: noteReducer,
  Rating: ratingReducer,
  site: sitesReducer,
  Tool: toolReducer,
  Miscellaneous: miscellaneousReducer,
  footer: footerReducer,
});

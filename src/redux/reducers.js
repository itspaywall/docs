import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

function markdownReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_MARKDOWN_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    markdown: markdownReducer,
});

export default rootReducer;

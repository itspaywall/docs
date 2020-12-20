/*
 * Copyright 2017-2020 Samuel Rowe, Joel E. Rego
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

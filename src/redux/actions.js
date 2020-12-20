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

import * as ActionTypes from "./actionTypes";
import axios from "axios";

function handleError(dispatch, error, message) {
    /* By default, if an instance of the Error class is printed, a lot of information is hidden.
     * Therefore, we convert it to a regular object and then print it.
     */
    console.log(JSON.parse(JSON.stringify(error)));
    console.log(message);
}

export function fetchMarkdown(url) {
    return async (dispatch) => {
        try {
            const response = await axios.get(url);
            dispatch(fetchMarkdownComplete(response.data));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch markdown file!");
        }
    };
}

export function fetchMarkdownComplete(markdown) {
    return {
        type: ActionTypes.FETCH_MARKDOWN_COMPLETE,
        payload: markdown,
    };
}

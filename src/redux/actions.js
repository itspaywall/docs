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

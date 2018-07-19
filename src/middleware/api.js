import { normalize, schema } from "normalizr";
import { camelizeKeys } from "humps";

const API_ROOT = `${process.env.REACT_APP_API_HOST}/3/projects/1/`;

class FetchException {
    constructor(value) {
        this.value = value;
        this.message = "Fetch error occurs: ";
    }

    toString() {
        return this.message + JSON.stringify(this.value);
    }
}

const callApi = async (endpoint, schema) => {
    const fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

    const response = await fetch(fullUrl);
    const json = await response.json();

    if (!response.ok) {
        throw new FetchException(json);
    }

    const camelizedJson = camelizeKeys(json);
    const normalizedData = normalize(camelizedJson, schema);

    return Object.assign({}, normalizedData);
};

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const queueSchema = new schema.Entity("queues",{},{idAttribute: queue => queue.name });

const queuesSchema = { queues: new schema.Array(queueSchema) };

// Schemas for API responses.
export const Schemas = {
    QUEUE_ARRAY: queuesSchema
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = "Call API";

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === "undefined") {
        return next(action);
    }

    let { endpoint } = callAPI;
    const { schema, types } = callAPI;

    if (typeof endpoint === "function") {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== "string") {
        throw new Error("Specify a string endpoint URL.");
    }
    if (!schema) {
        throw new Error("Specify one of the exported Schemas.");
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("Expected an array of three action types.");
    }
    if (!types.every(type => typeof type === "string")) {
        throw new Error("Expected action types to be strings.");
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    try {
        const response = await callApi(endpoint, schema);

        return next(
            actionWith({
                response,
                type: successType
            })
        );
    } catch (error) {
        return next(
            actionWith({
                type: failureType,
                error: error.message || "Something bad happened"
            })
        );
    }
};

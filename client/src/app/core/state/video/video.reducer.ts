import {
    createEntityAdapter,
    EntityAdapter,
    EntityState
} from "@ngrx/entity";
import { Video } from "../../domain/video.model";
import {
    VideoActions,
    VideoActionTypes
} from "./video.action";

/**
 * Interface to the part of the Store containing VideoState
 * and other information related to VideoData.
 */
export interface VideoState extends EntityState<Video> {
    selectedVideoId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Video> = createEntityAdapter<Video>();

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: VideoState = adapter.getInitialState({
    // additional entity state properties
    selectedVideoId: null
});

export function videoReducer(state = initialState, action: VideoActions): VideoState {
    switch (action.type) {
        case VideoActionTypes.Select: {
            return Object.assign({}, state, { selectedVideoId: action.payload });
        }

        case VideoActionTypes.GetVideosSuccess: {
            return adapter.addAll(action.payload, state);
        }

        case VideoActionTypes.Add: {
            return adapter.addOne(action.payload, state);
        }

        case VideoActionTypes.Update: {
            return adapter.upsertOne(action.payload, state);
        }

        case VideoActionTypes.Delete: {
            return adapter.removeOne(action.payload.id, state);
        }

        default:
            return state;
    }
}

export const getSelectedVideoId = (state: VideoState) => state.selectedVideoId;

// Entity selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of video ids
export const selectVideoIds = selectIds;

// select the dictionary of video entities
export const selectVideoEntities = selectEntities;

// select the array of videos
export const selectAllVideo = selectAll;

// select the total video count
export const selectVideoTotal = selectTotal;

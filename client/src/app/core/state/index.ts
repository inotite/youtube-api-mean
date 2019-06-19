import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from "@ngrx/store";
import { defaultBeer } from "../domain/beer.model";
import { defaultVideo } from "../domain/video.model";
import { defaultUser } from "../domain/user.model";
import * as fromAuth from "./auth/auth.reducer";
import * as fromBeer from "./beer/beer.reducer";
import * as fromVideo from "./video/video.reducer";
import * as fromUser from "./user/user.reducer";

export interface AppState {
    auth: fromAuth.AuthState;
    beer: fromBeer.BeerState;
    video: fromVideo.VideoState;
    user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    beer: fromBeer.beerReducer,
    video: fromVideo.videoReducer,
    user: fromUser.userReducer,
};

// -------------------------------------------------------------------
// AUTH SELECTORS
// -------------------------------------------------------------------
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>("auth");

export const getToken = createSelector(
    selectAuthState,
    fromAuth.getToken
);

export const getIsLoggedIn = createSelector(
    selectAuthState,
    fromAuth.getIsLoggedIn
);

export const getError = createSelector(
    selectAuthState,
    fromAuth.getError
);

export const getPending = createSelector(
    selectAuthState,
    fromAuth.getPending
);

// -------------------------------------------------------------------
// BEER SELECTORS
// -------------------------------------------------------------------
export const selectBeerState = createFeatureSelector<fromBeer.BeerState>("beer");

export const selectBeerIds = createSelector(
    selectBeerState,
    fromBeer.selectBeerIds
);
export const selectBeerEntities = createSelector(
    selectBeerState,
    fromBeer.selectBeerEntities
);
export const selectAllBeer = createSelector(
    selectBeerState,
    fromBeer.selectAllBeer
);
export const selectCurrentBeerId = createSelector(
    selectBeerState,
    fromBeer.getSelectedBeerId
);

export const selectCurrentBeer = createSelector(
    selectBeerEntities,
    selectCurrentBeerId,
    (beerEntities, beerId) => {
        return beerId ? beerEntities[ beerId ] : defaultBeer;
    }
);
// -------------------------------------------------------------------
// VIDEO SELECTORS
// -------------------------------------------------------------------
export const selectVideoState = createFeatureSelector<fromVideo.VideoState>("video");

export const selectVideoIds = createSelector(
    selectVideoState,
    fromVideo.selectVideoIds
);
export const selectVideoEntities = createSelector(
    selectVideoState,
    fromVideo.selectVideoEntities
);
export const selectAllVideo = createSelector(
    selectVideoState,
    fromVideo.selectAllVideo
);
export const selectCurrentVideoId = createSelector(
    selectVideoState,
    fromVideo.getSelectedVideoId
);

export const selectCurrentVideo = createSelector(
    selectVideoEntities,
    selectCurrentVideoId,
    (videoEntities, videoId) => {
        return videoId ? videoEntities[ videoId ] : defaultVideo;
    }
);
// -------------------------------------------------------------------
// USER SELECTORS
// -------------------------------------------------------------------
export const selectUserState = createFeatureSelector<fromUser.UserState>("user");

export const selectUserIds = createSelector(
    selectUserState,
    fromUser.selectUserIds
);
export const selectUserEntities = createSelector(
    selectUserState,
    fromUser.selectUserEntities
);
export const selectAllUser = createSelector(
    selectUserState,
    fromUser.selectAllUser
);
export const selectCurrentUserId = createSelector(
    selectUserState,
    fromUser.getSelectedUserId
);

export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => {
        return userId ? userEntities[ userId ] : defaultUser;
    }
);
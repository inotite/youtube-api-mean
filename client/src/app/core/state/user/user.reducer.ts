import {
    createEntityAdapter,
    EntityAdapter,
    EntityState
} from "@ngrx/entity";
import { User } from "../../domain/user.model";
import {
    UserActions,
    UserActionTypes
} from "./user.action";

/**
 * Interface to the part of the Store containing UserState
 * and other information related to UserData.
 */
export interface UserState extends EntityState<User> {
    selectedUserId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user._id,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: UserState = adapter.getInitialState({
    // additional entity state properties
    selectedUserId: null
});

export function userReducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.Select: {
            console.log("reducer: ", action.payload);
            return Object.assign({}, state, { selectedUserId: action.payload });
        }

        case UserActionTypes.GetUsersSuccess: {
            return adapter.addAll(action.payload, state);
        }

        // case UserActionTypes.Add: {
        //     // return adapter.addOne(action.payload, state);
        // }

        case UserActionTypes.SelectCurrentUser: {
            return {
              ...state,
              selectedUserId: action.payload
            };
          }

        case UserActionTypes.SelectSuccess: {
            return adapter.addOne(action.payload, state);
        }

        // case UserActionTypes.Update: {
        //     // return adapter.upsertOne(action.payload, state);
        // }

        case UserActionTypes.UpdateSuccess: {
            return adapter.upsertOne(action.payload, state);
        }

        case UserActionTypes.DeleteSuccess: {
            return adapter.removeOne(action.payload, state);
        }

        default:
            return state;
    }
}

export const getSelectedUserId = (state: UserState) => state.selectedUserId;

// Entity selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUser = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;

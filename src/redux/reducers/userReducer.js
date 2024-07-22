import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
	name: 'userRedux',
	initialState: {
		user_data: null,
		lat : null,
		long : null,
	},
	reducers: {
		storeUserData: (state, action) => {
			state.user_data = action.payload
		},
		storeCurrentLocation: (state, action) => {
			console.log("Action : ",action)
			state.lat = action.payload.lat
			state.long = action.payload.long
		}
	}
})

// Action creators are generated for each case reducer function
export const { storeUserData , storeCurrentLocation} = userReducer.actions

export const user_data = (state) => state.userRedux.user_data

export default userReducer.reducer
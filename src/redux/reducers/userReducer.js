import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
	name: 'userRedux',
	initialState: {
		user_data: null,
		profile_data : null
	},
	reducers: {
		storeUserData: (state, action) => {
			state.user_data = action.payload
		},
		setProfileData: (state, action) => {
			state.profile_data = action.payload
		},
	}
})

// Action creators are generated for each case reducer function
export const { storeUserData ,setProfileData} = userReducer.actions

export const user_data = (state) => state.userRedux.user_data

export default userReducer.reducer
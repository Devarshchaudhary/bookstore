import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false, role: "user" },
    reducers: {
        login(state) {
            state.isLoggedIn = true; // This should work correctly
        },
        logout(state) {
            state.isLoggedIn = false; // This should work correctly
        },
        changeRole(state, action) {
            const role = action.payload; // This should work correctly
            state.role = role; // This should work correctly
        },
    },
});

// Exporting actions and reducer
export const authActions = authSlice.actions;
export default authSlice.reducer;
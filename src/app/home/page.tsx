"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

 // Ensure this is the very first line

export default function HomePage() {
    const auth = useSelector((state: RootState) => state.auth.isLoggedIn)
    return (
        <>
            <h1>Home page {auth ? "logged in" : "Not Logged"}</h1>
        </>
    );
}
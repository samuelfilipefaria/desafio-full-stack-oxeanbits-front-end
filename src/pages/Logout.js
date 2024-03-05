import { useEffect } from "react"

export const Logout = () => {
  useEffect(() => {
    localStorage.setItem("user_token", "");
    window.location.href = "/login";
  }, [])
}

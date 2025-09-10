import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../lib";

export function useLogoutUser() {
    return useMutation({
        mutationFn: ({ token }) => {
            return logoutUser(token)
        },
    })
}
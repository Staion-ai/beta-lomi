import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../lib"

export function useRegisterUser() {
    return useMutation({
        mutationFn: (userData) => registerUser(userData)
    })
}
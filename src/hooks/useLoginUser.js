import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../lib"

export function useLoginUser() {
    return useMutation({
        mutationFn: (credentials) => loginUser(credentials)
    })
}
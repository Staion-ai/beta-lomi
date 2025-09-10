import { useMutation } from "@tanstack/react-query";
import { createUserTemplate } from "../lib";

export function useCreateTemplate() {
    return useMutation({
        mutationFn: ({ templateData, token }) => createUserTemplate(templateData, token)
    })
}
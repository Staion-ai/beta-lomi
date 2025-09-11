import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserTemplate } from "../lib";

export function useCreateTemplate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ templateData, token }) => createUserTemplate(templateData, token),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['user-templates']);
        }
    })
}
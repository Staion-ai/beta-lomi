import { useQuery } from "@tanstack/react-query";

export function useCheckNameProject() {
    return useQuery({
        queryKey: ['check-name-project'],
        queryFn: (name_project, user_id) => checkProjectNameExists(name_project, user_id),
        enabled: false,
        retry: false,
        refetchOnWindowFocus: false,
    })
}
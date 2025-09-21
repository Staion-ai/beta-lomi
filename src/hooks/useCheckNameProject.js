import { useQuery } from "@tanstack/react-query";
import { checkProjectNameExists } from "../lib";

export function useCheckNameProject(projectName, userId, enabled = true) {
    return useQuery({
        queryKey: ['check-name-project', projectName, userId],
        queryFn: () => checkProjectNameExists(projectName, userId),
        enabled: enabled && !!projectName && !!userId && projectName.trim().length >= 2,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutos
    })
}
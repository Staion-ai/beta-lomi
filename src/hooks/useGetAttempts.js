import { useQuery } from "@tanstack/react-query";
import { getUserAttempts } from "../lib";

export function useGetAttempts(user_id) {
    return useQuery({
        queryKey: ['user-attempts'],
        queryFn: () => getUserAttempts(user_id),
        enabled: !!user_id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    })
}
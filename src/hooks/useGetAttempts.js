import { useQuery } from "@tanstack/react-query";
import { getUserAttempts } from "../lib";

export function useGetAttempts(user_id) {
    return useQuery({
        queryKey: ['user-attempts'],
        queryFn: () => getUserAttempts(user_id),
        enabled: !!user_id,
    })
}
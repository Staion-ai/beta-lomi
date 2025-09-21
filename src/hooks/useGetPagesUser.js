import { useQuery } from "@tanstack/react-query";
import { getPagesUser } from "../lib";

export function usePagesUser(user_id, open) {
    return useQuery({
        queryKey: ['pages-user', user_id],
        queryFn: async () => getPagesUser(user_id),
        enabled: !!user_id && open,
    })
}
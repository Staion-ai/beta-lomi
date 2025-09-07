import { useMutation } from "@tanstack/react-query";
import { createImagesUrl } from "../../../../lib";

export function useCreateImagesUrl() {
    return useMutation({
        mutationFn: async (image_files) => await createImagesUrl(image_files)
    })
}
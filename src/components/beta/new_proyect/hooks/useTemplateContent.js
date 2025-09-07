import { useMutation } from "@tanstack/react-query";
import { templateContent } from "../../../../lib";

export function useTemplateContent() {
    return useMutation({
        mutationFn: (template_data) => templateContent(template_data)
    })
}
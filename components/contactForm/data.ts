import { directus } from "@/lib/services";

export async function sendContact(data: any) {
  return await directus().post<any>("/items/contacts", {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// import { DirectusCollections } from "../directus-collections";
// import { directus } from "./index";
//
// export async function getProjectTags(
//   ids: DirectusCollections["project"]["tag"]
// ) {
//   if (!ids) return [];
//
//   type Tag = {
//     project_tags_tag_id: {
//       tag: string;
//     };
//   };
//
//   const tags = await directus.get<Tag[]>(
//     `/items/project_project_tags?fields=project_tags_tag_id.tag&filter[id][_in]=${ids.join(
//       ","
//     )}&limit=100`
//   );
//
//   return tags && tags.length
//     ? tags.map((tag) => tag.project_tags_tag_id.tag)
//     : [];
// }
//
// export async function getProject(projectID: string) {
//   const project = await directus.get<DirectusCollections["project"]>(
//     `/items/project/${projectID}`
//   );
//
//   // get tag names from IDs
//   const tag = project?.tag && (await getProjectTags(project.tag));
//
//   return { ...project, tag };
// }

export {};

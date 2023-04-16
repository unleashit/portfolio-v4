import { directus } from '@/lib/services';
import { Project } from '../../../directus';
import { getProjects } from '../../data';

type Tag = {
  project_tags_tag_id: {
    tag: string;
  };
};

type Data<T> = {
  data: T;
};

async function getProjectTags(ids: number[]) {
  const tags = (
    await directus().get<Data<Tag[]>>(
      `/items/project_project_tags?fields=project_tags_tag_id.tag&filter[id][_in]=${ids.join(
        ','
      )}`
    )
  ).data;

  return tags && !!tags.length
    ? tags.map((tag) => tag.project_tags_tag_id.tag)
    : [];
}

// export async function getProjectById(projectID: string) {
//   const project = (
//     await directus().get<Data<Project>>(`/items/project/${projectID}`)
//   ).data;
//
//   // get tag names from IDs
//   // generated types are wrong for project.tag, so need to cast...
//   const tags = await getProjectTags(project.tag as number[]);
//
//   return { ...project, tags };
// }

export async function getProjectBySlug(
  slug: string
): Promise<Project & { tags: string[] }> {
  const projects = await getProjects();
  const foundProject = projects.find((p) => p.slug === slug);

  if (!foundProject) throw new Error(`No project found with slug '${slug}'`);

  // all fields + file meta for images
  const fields = '*,image_main.*,image_mobile.*';

  const project = (
    await directus().get<Data<Project>>(
      `/items/project/${foundProject.project_id}?fields=${fields}`
    )
  ).data;

  // get tag names from IDs
  // generated types are wrong for project.tag, so need to cast...
  const tags = await getProjectTags(project.tag as number[]);
  delete project.tag;

  return { ...project, tags };
}

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

export async function getProjectById(projectID: string) {
  const project = (
    await directus().get<Data<Project>>(`/items/project/${projectID}`)
  ).data;

  // get tag names from IDs
  // generated types are wrong for project.tag, so need to cast...
  const tags = await getProjectTags(project.tag as number[]);

  return { ...project, tags };
}

export async function getProjectBySlug(
  slug: string
): Promise<Project & { tags: string[] }> {
  const projects = await getProjects();
  const foundProject = projects.find((p) => p.slug === slug);

  if (!foundProject) throw new Error(`No project found with slug '${slug}'`);

  const project = (
    await directus().get<Data<Project>>(
      `/items/project/${foundProject.project_id}`
    )
  ).data;

  // get tag names from IDs
  // generated types are wrong for project.tag, so need to cast...
  const tags = await getProjectTags(project.tag as number[]);
  delete project.tag;

  return { ...project, tags };
}

// ex response
// const json = {
//   data: {
//     project_id: "b141dd40-77ae-4b86-8284-58f95d26ae80",
//     sort: 1,
//     date_created: "2022-11-19T08:59:46.808Z",
//     title: "Tatteasy",
//     link: "http://dev.tatteasy.com",
//     slug: "tatteasy",
//     image_logo: "2520ecdf-4408-462a-bb47-b5719ad440f1",
//     date_updated: "2022-11-21T02:27:05.336Z",
//     description:
//       "<p>Tatteasy is a small startup in the temporary tattoo space. I developed (full stack) and designed from scratch an app that allows users to build, save and/or purchase their own high resolution tattoos or choose from a library. Custom shopping cart with Stripe integration, user account for saved tattoos, profile and orders. Admin panel lists pending orders and performs batch printing of tattoos for the orders.</p>",
//     image_mobile: "bd5d0440-a964-4aeb-b67d-9bd31686d310",
//     image_main: "71bd6967-9043-4929-83a6-612e2a6ba9bb",
//     decription_short: "React Ecommerce and Tattoo Builder App",
//     tag: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//   },
// };

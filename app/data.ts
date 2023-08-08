import { Navigation, Project, Skills } from '@/services/types/directus';
import { directus } from '@/lib/services';
import { BlockWithMeta, Data } from '@/services/types/directus.data';

export async function getNavigation() {
  const fields = 'id,title,link,sort';

  return (
    await directus().get<Data<Navigation[]>>(
      `/items/navigation?fields=${fields}`,
    )
  ).data;
}

export async function getHomeBlocks() {
  const fields = 'id,title,content,image,image.id,image.width,image.height';

  return (
    await directus().get<Data<BlockWithMeta[]>>(
      `/items/blocks?fields=${fields}`,
    )
  ).data;
}

export async function getProjects() {
  const fields =
    'project_id,date_created,title,decription_short,image_logo,slug,sort,image_logo.id,image_logo.width,image_logo.height';

  return (
    await directus().get<Data<Project[]>>(`/items/project?fields=${fields}`)
  ).data;
}

export async function getSkills() {
  const fields = 'sort,id,title';

  return (
    await directus().get<Data<Skills[]>>(`/items/skills?fields=${fields}`)
  ).data;
}

export async function sendContact<T>(data: T) {
  return await directus().post<T>('/items/contacts', {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default async function getHomeData() {
  const [homeBlocks, projects, skills] = await Promise.all([
    getHomeBlocks(),
    getProjects(),
    getSkills(),
    getNavigation(),
  ]);

  return {
    getNavigation,
    homeBlocks,
    projects,
    skills,
  };
}

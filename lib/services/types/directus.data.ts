import { Blocks, DirectusFiles, Project } from '@/services/types/directus';

export type Data<T> = {
  data: T;
};

export type ProjectWithMeta = Omit<Project, 'image_main' | 'image_mobile'> & {
  image_main: DirectusFiles;
  image_mobile: DirectusFiles;
};

export type BlockWithMeta = Omit<Blocks, 'image'> & {
  image: DirectusFiles;
};

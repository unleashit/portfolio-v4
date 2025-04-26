import path from 'path';

export const ASSETS_URL = process.env.NEXT_PUBLIC_ASSETS_URL || '/';
export const JG_LOGO = 'bd9a9b8d-84d1-467a-b1f8-ae646f50fb94';
export const PLACEHOLDER_IMG = `${ASSETS_URL}/60a6e4be-47d3-4529-902f-50b61d0ecab5/placeholder.svg`;
export const META_DEFAULT_TITLE =
  'Front End / Full Stack Engineer in Portland, OR specializing in React, Typescript, Javascript, Node.Js and more';
export const META_DEFAULT_DESC =
  'Full Stack Engineer in Portland focused on React, Node.Js, Typescript, Javascript, Frontend, Backend, Devops, AWS, Serverless';
export const STATIC_MEDIA_PATH = path.join(process.cwd(), 'public/assets');

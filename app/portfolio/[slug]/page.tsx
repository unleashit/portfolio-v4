import { getProjects } from "../../data";
import { getProjectBySlug } from "./data";
type PageProps = { params: { slug: string } };

async function PortfolioDetail({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  return (
    <div>
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default PortfolioDetail;

export const dynamicParams = false;

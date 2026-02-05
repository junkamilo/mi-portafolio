import ExperienceDetail from "@/src/components/experience-detail/page";


type Props = {
    params: Promise<{ slug: string }>;
};

// Esta función es opcional, pero buena para SEO (título de la pestaña)
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    return {
    title: `Experiencia | ${slug}`,
  };
}

export default async function ExperiencePage({ params }: Props) {
    await params;
    return <ExperienceDetail />;
}
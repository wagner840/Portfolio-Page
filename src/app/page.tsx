'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github } from 'lucide-react';
import { EmoToggleButton, useEmoMode } from '@/components/emo-toggle-button';

interface Project {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
}

async function getGitHubRepos(): Promise<Project[]> {
  const res = await fetch('https://api.github.com/users/wagner840/repos', {
    next: { revalidate: 3600 } // Revalidate data every hour
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch repositories');
  }

  const repos = await res.json();

  return repos.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    fork: repo.fork,
  }));
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const { isEmoMode } = useEmoMode();

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getGitHubRepos();
        setProjects(data);
      } catch (error) {
        console.error(error);
        setFetchError(true);
      }
    }

    loadProjects();
  }, []);

  const excludedNames = [
    'wagner840',
    'Wagner-portfolio',
    'stable-diffusion-webui',
    'GeminiBotWagner840',
    'Eva-Flutter-A.I',
  ];

  const filteredProjects = projects.filter(
    (project) => !excludedNames.includes(project.name)
  );

  const containerClass = `container mx-auto py-10 ${isEmoMode ? 'emo-mode-active' : ''}`;

  return (
    <div className={containerClass}>
      {/* About Me Section */}
      <section id="about" className="mb-16">
        <Card className="bg-background shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center">
            <Avatar className="w-20 h-20 mr-4">
              <AvatarImage src="https://picsum.photos/200/200" alt="Wagner Guilherme" />
              <AvatarFallback>WG</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-semibold tracking-tight">Wagner Guilherme</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <CardDescription className="text-muted-foreground">
              Desenvolvedor FullStack e entusiasta de Inteligência Artificial. Explorando novas tecnologias e criando soluções inovadoras.
            </CardDescription>
            <div className="mt-4 flex gap-4">
              <Button variant="secondary" asChild>
                <a href="https://github.com/wagner840" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <EmoToggleButton />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2 className="text-3xl font-semibold tracking-tight mb-8">Meus Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetchError ? (
             <p className="text-red-500">Could not load projects. Please try again later.</p>
          ) : (
            filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="relative bg-gradient-to-br from-card to-background shadow-xl rounded-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-primary hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:will-change-transform"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold tracking-tight">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                  <CardDescription className="text-muted-foreground">
                    {project.description || 'Sem descrição disponível.'}
                  </CardDescription>
                  <div className="mt-4">
                    <Button asChild>
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Github className="mr-2 h-4 w-4" />
                        Ver no GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
           {/* Mensagem se nenhum projeto for exibido após o filtro */}
           {filteredProjects.length === 0 && !fetchError && (
            <p className="text-muted-foreground">Nenhum projeto para exibir após o filtro.</p>
           )}
        </div>
      </section>
    </div>
  );
}
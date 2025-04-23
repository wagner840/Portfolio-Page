'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Package } from 'lucide-react';
import { EmoToggleButton, useEmoMode } from '@/components/emo-toggle-button';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
} from "react-icons/si";
import { FaGem } from "react-icons/fa"; // Icon for Gemini
import { TbRobot } from "react-icons/tb"; // Generic robot icon for Claude/GPT

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

  const technologies = [
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'React', icon: SiReact },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Shadcn UI', icon: Package },//Using Package icon for Shadcn since there isn't one available
    { name: 'Gemini', icon: FaGem }, // Add Gemini icon
    { name: 'Claude 3.5', icon: TbRobot }, // Add Claude icon
    { name: 'GPT', icon: TbRobot }, // Add GPT icon
    // Add more technologies and their icons here
  ];

  // Carousel logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 1; // Smaller scroll amount for smoother animation
  const transitionDuration = 20; // Reduced duration for smoother, faster transition

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        let newPosition = scrollPosition + scrollAmount;

        if (newPosition > maxScroll) {
          newPosition = 0; // Reset to the beginning
        }

        setScrollPosition(newPosition);
        scrollRef.current.scrollTo({
          left: newPosition,
          behavior: 'smooth',
        });
      }
    }, transitionDuration);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [scrollPosition]);


  return (
    <>
      <div className={containerClass}>
        {/* About Me Section */}
        <section id="about" className="mb-16">
          <Card className={`bg-background shadow-lg rounded-lg overflow-hidden ${isEmoMode ? 'emo-mode-active border-red-500' : ''}`}>
            <CardHeader className="flex flex-row items-center">
              <Avatar className="w-20 h-20 mr-4">
                <AvatarImage src="https://picsum.photos/200/200" alt="Wagner Guilherme" />
                <AvatarFallback>WG</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-semibold tracking-tight">{`Wagner Guilherme`}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <CardDescription className="text-muted-foreground">
                Desenvolvedor FullStack e entusiasta de Inteligência Artificial. Explorando novas tecnologias e criando soluções inovadoras.
              </CardDescription>
              <div className="mt-4 flex gap-4">
                <Button variant="secondary" asChild className={`${isEmoMode ? 'emo-mode-active' : ''}`}>
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
                  className={`relative bg-gradient-to-br from-card to-background shadow-xl rounded-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-primary hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:will-change-transform ${isEmoMode ? 'emo-mode-active border-red-500' : ''}`}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold tracking-tight">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <CardDescription className="text-muted-foreground">
                      {project.description || 'Sem descrição disponível.'}
                    </CardDescription>
                    <div className="mt-4">
                      <Button asChild className={`${isEmoMode ? 'emo-mode-active' : ''}`}>
                        <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <Github className="mr-2 h-4 w-4" />
                          Ver no GitHub
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            {/* Mensagem se nenhum projeto for exibido após o filtro */}
            {filteredProjects.length === 0 && !fetchError && (
              <p className="text-muted-foreground">Nenhum projeto para exibir após o filtro.</p>
            )}
          </div>
        </section>
      </div>

      {/* Technologies Carousel */}
      {!isEmoMode && (
        <section id="technologies" className="py-8 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight mb-4 text-center">Tecnologias Utilizadas</h2>
            <div className="overflow-hidden relative">
              <div
                ref={scrollRef}
                className="flex items-center space-x-4 p-4 transition-transform duration-2000" // Increased duration for smoother transition
              >
                {technologies.map((tech, index) => (
                  <div key={index} className="flex flex-col items-center justify-center w-32 shrink-0">
                    {tech.icon ? (
                      <tech.icon className="h-16 w-16 object-contain mb-2" />
                    ) : (
                      <Package className="h-16 w-16 object-contain mb-2" /> // Fallback icon
                    )}
                    <p className="text-sm text-muted-foreground">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}


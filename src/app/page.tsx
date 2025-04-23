import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
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
            <div className="mt-4">
              <Button variant="secondary" asChild>
                <a href="https://github.com/wagner-prog" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2 className="text-3xl font-semibold tracking-tight mb-8">Projetos de IA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card 1 */}
          <Card className="bg-background shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-tight">Projeto Exemplo 1</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <CardDescription className="text-muted-foreground">
                Descrição breve do projeto e suas funcionalidades.
              </CardDescription>
              <div className="mt-4">
                <Button>Ver Projeto</Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Card 2 */}
          <Card className="bg-background shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-tight">Projeto Exemplo 2</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <CardDescription className="text-muted-foreground">
                Descrição breve do projeto e suas funcionalidades.
              </CardDescription>
              <div className="mt-4">
                <Button>Ver Projeto</Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Card 3 */}
          <Card className="bg-background shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-tight">Projeto Exemplo 3</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <CardDescription className="text-muted-foreground">
                Descrição breve do projeto e suas funcionalidades.
              </CardDescription>
              <div className="mt-4">
                <Button>Ver Projeto</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

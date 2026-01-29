import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Star, 
  Play,
  BookOpen,
  Award,
  Filter
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  instructorName: string;
  price: number;
  isFree: boolean;
  category: string;
  level: string;
  durationHours: number;
  enrolledCount: number;
  rating: number;
  status: 'published' | 'draft';
}

interface Enrollment {
  courseId: string;
  courseTitle: string;
  progress: number;
  thumbnailUrl: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Fundamentos de DreamSpaces XR',
    description: 'Aprende a crear espacios virtuales inmersivos desde cero',
    thumbnailUrl: '/src/assets/dreamspace-hero.jpg',
    instructorName: 'Isabella IA',
    price: 0,
    isFree: true,
    category: 'XR/VR',
    level: 'Principiante',
    durationHours: 8,
    enrolledCount: 1234,
    rating: 4.9,
    status: 'published'
  },
  {
    id: '2',
    title: 'KAOS Audio: Diseño Sonoro Sensorial',
    description: 'Domina las técnicas de audio espacial para experiencias inmersivas',
    thumbnailUrl: '/src/assets/kaos-audio-hero.jpg',
    instructorName: 'KAOS Lab',
    price: 150,
    isFree: false,
    category: 'Audio',
    level: 'Intermedio',
    durationHours: 12,
    enrolledCount: 567,
    rating: 4.7,
    status: 'published'
  },
  {
    id: '3',
    title: 'Gobernanza Digital con Dekateotl',
    description: 'Comprende los principios de gobernanza ética y blockchain',
    thumbnailUrl: '/src/assets/korima-codex.jpg',
    instructorName: 'Consejo TAMV',
    price: 200,
    isFree: false,
    category: 'Gobernanza',
    level: 'Avanzado',
    durationHours: 16,
    enrolledCount: 234,
    rating: 4.8,
    status: 'published'
  }
];

const mockEnrollments: Enrollment[] = [
  {
    courseId: '1',
    courseTitle: 'Fundamentos de DreamSpaces XR',
    progress: 65,
    thumbnailUrl: '/src/assets/dreamspace-hero.jpg'
  }
];

export function UniversitySection() {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'principiante': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'intermedio': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'avanzado': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Universidad TAMV
        </h1>
        <p className="text-muted-foreground">
          Cursos, certificaciones y formación continua con evidencia en BookPI
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <GlassCard className="text-center p-4">
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">{mockCourses.length}</div>
          <div className="text-sm text-muted-foreground">Cursos</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">2.1K</div>
          <div className="text-sm text-muted-foreground">Estudiantes</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Award className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">458</div>
          <div className="text-sm text-muted-foreground">Certificados</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <GraduationCap className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">24</div>
          <div className="text-sm text-muted-foreground">Instructores</div>
        </GlassCard>
      </motion.div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList>
          <TabsTrigger value="catalog">Catálogo</TabsTrigger>
          <TabsTrigger value="enrolled">Mis Cursos</TabsTrigger>
          <TabsTrigger value="certificates">Certificados</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtrar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <GlassCard className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-40">
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                      {course.isFree && <Badge className="bg-emerald-500/20 text-emerald-400">Gratis</Badge>}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <Badge variant="outline" className="w-fit mb-2">{course.category}</Badge>
                    <h3 className="font-orbitron font-bold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.durationHours}h
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.enrolledCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        {course.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-orbitron font-bold text-lg">
                        {course.isFree ? 'Gratis' : `${course.price} QS`}
                      </span>
                      <Button size="sm" className="gap-2">
                        <Play className="w-4 h-4" />
                        Inscribirse
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled">
          {mockEnrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockEnrollments.map((enrollment) => (
                <GlassCard key={enrollment.courseId} className="flex gap-4">
                  <img 
                    src={enrollment.thumbnailUrl} 
                    alt={enrollment.courseTitle}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{enrollment.courseTitle}</h3>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progreso</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} />
                    </div>
                    <Button size="sm" className="gap-2">
                      <Play className="w-4 h-4" />
                      Continuar
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-orbitron text-lg font-bold mb-2">No tienes cursos activos</h3>
              <p className="text-muted-foreground mb-4">Explora el catálogo y comienza a aprender</p>
              <Button>Ver Catálogo</Button>
            </GlassCard>
          )}
        </TabsContent>

        <TabsContent value="certificates">
          <GlassCard className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-orbitron text-lg font-bold mb-2">Tus certificados aparecerán aquí</h3>
            <p className="text-muted-foreground">Completa cursos para obtener certificados verificables en BookPI</p>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

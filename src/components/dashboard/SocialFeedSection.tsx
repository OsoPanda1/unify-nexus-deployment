import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Image, 
  Video, 
  Music, 
  Send,
  MoreHorizontal,
  Bookmark
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    tier: string;
  };
  content: string;
  mediaUrls: string[];
  mediaTypes: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  isLiked: boolean;
  isSaved: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: { name: 'Isabella Villaseñor', avatar: '/src/assets/isabella-avatar.jpg', tier: 'celestial' },
    content: 'Bienvenidos al nuevo ecosistema TAMV MD-X4. La evolución civilizatoria comienza aquí. 🌟',
    mediaUrls: ['/src/assets/hero-tamv.jpg'],
    mediaTypes: ['image'],
    likesCount: 1247,
    commentsCount: 89,
    sharesCount: 234,
    createdAt: '2h',
    isLiked: true,
    isSaved: false
  },
  {
    id: '2',
    author: { name: 'KAOS Audio Lab', avatar: '', tier: 'creator' },
    content: 'Nuevo preset de audio sensorial disponible: "Obsidian Dreams". Experimenta la inmersión total en tu próximo DreamSpace.',
    mediaUrls: ['/src/assets/kaos-audio-hero.jpg'],
    mediaTypes: ['image'],
    likesCount: 532,
    commentsCount: 45,
    sharesCount: 78,
    createdAt: '5h',
    isLiked: false,
    isSaved: true
  },
  {
    id: '3',
    author: { name: 'Trueque Colectivo', avatar: '', tier: 'gremial' },
    content: 'El mercado de trueque alcanza nuevos récords. Más de 500 intercambios completados esta semana. La economía justa es posible.',
    mediaUrls: [],
    mediaTypes: [],
    likesCount: 189,
    commentsCount: 23,
    sharesCount: 12,
    createdAt: '1d',
    isLiked: false,
    isSaved: false
  }
];

export function SocialFeedSection() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1 }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'celestial': return 'text-purple-400';
      case 'creator': return 'text-cyan-400';
      case 'gremial': return 'text-amber-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Muro Social
        </h1>
        <p className="text-muted-foreground">
          Publicaciones, fotos, videos y música de la comunidad TAMV
        </p>
      </motion.div>

      {/* Composer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard glow="cyan">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/src/assets/isabella-avatar.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="¿Qué está pasando en tu universo?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="bg-background/50 border-border/50 resize-none min-h-[80px]"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Image className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Music className="w-5 h-5" />
                  </Button>
                </div>
                <Button className="gap-2" disabled={!newPost.trim()}>
                  <Send className="w-4 h-4" />
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <GlassCard>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author.name}</span>
                      <span className={`text-xs font-jetbrains ${getTierColor(post.author.tier)}`}>
                        {post.author.tier.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.createdAt}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <p className="mb-4">{post.content}</p>

              {/* Media */}
              {post.mediaUrls.length > 0 && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={post.mediaUrls[0]} 
                    alt="Post media" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-2 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likesCount}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.commentsCount}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Share2 className="w-5 h-5" />
                    <span>{post.sharesCount}</span>
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={post.isSaved ? 'text-primary' : 'text-muted-foreground'}
                  onClick={() => handleSave(post.id)}
                >
                  <Bookmark className={`w-5 h-5 ${post.isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

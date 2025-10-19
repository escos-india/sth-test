'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw as convertToRawDraft } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface Post {
  id: number;
  title: string;
  createdAt: string;
  status: string;
  content: string;
}

export function CommunityPostSection() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'My First Post', createdAt: '2023-10-27', status: 'Published', content: '<p>This is the <strong>first post</strong>.</p>' },
    { id: 2, title: 'A Day in the Life', createdAt: '2023-10-26', status: 'Draft', content: '<p>Content about a <em>day in life</em>.</p>' },
  ]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (editingPost && typeof window !== 'undefined') {
      const blocksFromHtml = htmlToDraft(editingPost.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [editingPost]);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setTags('Next.js, Tailwind, Tech');
  };

  const handleDelete = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleSave = () => {
    if (title.trim() === '') return;

    const content = draftToHtml(convertToRawDraft(editorState.getCurrentContent()));

    const newOrUpdatedPost = {
      title,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Draft',
      content,
    };

    if (editingPost) {
      setPosts(posts.map(post => (post.id === editingPost.id ? { ...post, ...newOrUpdatedPost } : post)));
    } else {
      setPosts([...posts, { ...newOrUpdatedPost, id: posts.length + 1 }]);
    }

    resetForm();
  };

  const resetForm = useCallback(() => {
    setEditingPost(null);
    setTitle('');
    setTags('');
    setEditorState(EditorState.createEmpty());
  }, []);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 md:grid-cols-3"
    >
      <div className="md:col-span-2">
        <Card className="bg-card/80 backdrop-blur-sm border border-border/20 shadow-lg">
          <CardHeader>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <CardTitle className="text-2xl font-bold text-foreground">{editingPost ? 'Edit Post' : 'Create a New Post'}</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                <Input
                  placeholder="Post Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="text-2xl font-bold bg-background/50 border-border/30 h-12 transition-all focus:bg-background focus:border-primary"
                />
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-background/50 border border-border/30 rounded-lg editor-container"
            >
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
                <Input
                  placeholder="Add tags (e.g., Next.js, Web Dev, Sthapati)"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  className="bg-background/50 border-border/30 h-11 transition-all focus:bg-background focus:border-primary"
                />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }} className="flex justify-end gap-3">
              <Button variant="outline" onClick={resetForm} className="transition-all hover:bg-muted/80">
                {editingPost ? 'Cancel' : 'Clear'}
              </Button>
              <Button onClick={handleSave} className="transition-all bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg">
                {editingPost ? 'Save Changes' : 'Publish Post'}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
      <div className="h-full">
        <Card className="bg-card/80 backdrop-blur-sm border border-border/20 shadow-lg h-full">
          <CardHeader>
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.7 }}>
                <CardTitle className="text-xl font-bold text-foreground">Your Previous Posts</CardTitle>
             </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground/80">Title</TableHead>
                      <TableHead className="text-foreground/80">Date</TableHead>
                      <TableHead className="text-foreground/80">Status</TableHead>
                      <TableHead className="text-right text-foreground/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map(post => (
                      <motion.tr 
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * post.id }}
                      >
                        <TableCell className="font-medium text-foreground">{post.title}</TableCell>
                        <TableCell className="text-muted-foreground">{post.createdAt}</TableCell>
                        <TableCell><Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>{post.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(post)} className="transition-all text-primary hover:text-primary/80">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 transition-all" onClick={() => handleDelete(post.id)}>Delete</Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
            </motion.div>
          </CardContent>
        </Card>
      </div>
       <style jsx global>{`
            .wrapper-class {
                background: #1a1a1a;
                border-radius: 0.5rem;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            .toolbar-class {
                border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            }
            .editor-class {
                color: #fafafa;
                min-height: 250px;
                padding: 1rem;
            }
        `}</style>
    </motion.div>
  );
}

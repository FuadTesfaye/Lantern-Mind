import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/posts')({
  component: AdminPosts,
})

function AdminPosts() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['admin-posts-pending'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'Pending')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const updatePostStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: 'Approved' | 'Rejected' }) => {
      const { error } = await supabase
        .from('posts')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      return { id, status };
    },
    onSuccess: (data) => {
      toast.success(`Post ${data.status.toLowerCase()} successfully.`);
      queryClient.invalidateQueries({ queryKey: ['admin-posts-pending'] });
    },
    onError: (error) => {
      toast.error(`Error updating post: ${error.message}`);
    }
  });

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Post Approvals</h2>
      </div>

      <div className="grid gap-4">
        {isLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <p>Loading pending posts...</p>
            </CardContent>
          </Card>
        )}
        
        {error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-32 text-destructive">
              <p>Error loading posts. Did you run the SQL schema?</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && posts?.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <p>No pending posts for approval.</p>
            </CardContent>
          </Card>
        )}

        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>Submitted by {post.author_name} on {new Date(post.created_at).toLocaleDateString()}</CardDescription>
                </div>
                <Badge variant="secondary">{post.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">"{post.excerpt}"</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                className="text-destructive hover:bg-destructive/10"
                onClick={() => updatePostStatus.mutate({ id: post.id, status: 'Rejected' })}
                disabled={updatePostStatus.isPending}
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => updatePostStatus.mutate({ id: post.id, status: 'Approved' })}
                disabled={updatePostStatus.isPending}
              >
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

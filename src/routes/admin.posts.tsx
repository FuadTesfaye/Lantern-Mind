import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/posts")({
  component: AdminPosts,
});

function AdminPosts() {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [actionType, setActionType] = useState<"Approve" | "Reject" | null>(null);
  const [reason, setReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-posts-pending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_posts")
        .select("*")
        .eq("status", "Pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updatePostStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "Approved" | "Rejected" }) => {
      const updateData: any = { status };
      if (status === "Approved") {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase.from("community_posts").update(updateData).eq("id", id);

      if (error) throw error;
      return { id, status };
    },
    onSuccess: (data) => {
      toast.success(`Post ${data.status.toLowerCase()} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["admin-posts-pending"] });
      setIsDialogOpen(false);
      setReason("");
    },
    onError: (error) => {
      toast.error(`Error updating post: ${error.message}`);
    },
  });

  const handleActionClick = (post: any, type: "Approve" | "Reject") => {
    setSelectedPost(post);
    setActionType(type);
    setIsDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (selectedPost && actionType) {
      updatePostStatus.mutate({
        id: selectedPost.id,
        status: actionType === "Approve" ? "Approved" : "Rejected",
      });
    }
  };

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
                  <CardDescription>
                    Submitted by {post.author} on {new Date(post.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{post.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80 mb-4">{post.body}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => handleActionClick(post, "Reject")}
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => handleActionClick(post, "Approve")}
              >
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === "Approve" ? "Approve Post" : "Reject Post"}</DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionType?.toLowerCase()} the post titled "
              {selectedPost?.title}"?
            </DialogDescription>
          </DialogHeader>

          {actionType === "Reject" && (
            <div className="py-4">
              <label className="text-sm font-medium mb-2 block">
                Reason for Rejection (Optional)
              </label>
              <Textarea
                placeholder="E.g., Violates community guidelines on identifying information."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={updatePostStatus.isPending}
            >
              Cancel
            </Button>
            <Button
              variant={actionType === "Reject" ? "destructive" : "default"}
              onClick={handleConfirmAction}
              disabled={updatePostStatus.isPending}
            >
              {updatePostStatus.isPending ? "Processing..." : `Confirm ${actionType}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Wifi, WifiOff } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCommunitySocket } from "@/hooks/use-community-socket";
import { formatRelativeDate } from "@/lib/community/types";

export const Route = createFileRoute("/admin/posts")({
  component: AdminPosts,
});

function AdminPosts() {
  const { pending, status, send, lastError } = useCommunitySocket();

  const approve = (postId: string) => {
    send({ type: "approve_post", postId });
    toast.success("Post published to Voices");
  };

  const reject = (postId: string) => {
    send({ type: "reject_post", postId });
    toast.message("Submission declined");
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-bold tracking-tight">Post Approvals</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {status === "open" ? (
            <>
              <Wifi className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
              Live queue
            </>
          ) : (
            <>
              <WifiOff className="h-3.5 w-3.5" aria-hidden />
              {status === "connecting" ? "Connecting…" : "Reconnecting…"}
            </>
          )}
        </div>
      </div>

      <p className="max-w-2xl text-sm text-muted-foreground">
        Submissions from Community → Post please land here over WebSocket. Approve to
        publish on Voices; discussion opens on the live post.
      </p>

      {lastError ? (
        <p className="text-sm text-destructive" role="alert">
          {lastError}
        </p>
      ) : null}

      <div className="grid gap-4">
        {pending.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    From {post.author} · {formatRelativeDate(post.createdAt)}
                  </CardDescription>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {post.body}
              </p>
              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10"
                disabled={status !== "open"}
                onClick={() => reject(post.id)}
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={status !== "open"}
                onClick={() => approve(post.id)}
              >
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </CardFooter>
          </Card>
        ))}
        {status === "open" && pending.length === 0 ? (
          <Card>
            <CardContent className="flex h-32 flex-col items-center justify-center text-muted-foreground">
              <p>No pending posts for approval.</p>
            </CardContent>
          </Card>
        ) : null}
        {status !== "open" && pending.length === 0 ? (
          <Card>
            <CardContent className="flex h-32 flex-col items-center justify-center text-muted-foreground">
              <p>Connecting to the live queue…</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

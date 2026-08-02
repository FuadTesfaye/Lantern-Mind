import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from 'lucide-react'

export const Route = createFileRoute('/admin/posts')({
  component: AdminPosts,
})

const mockPendingPosts = [
  {
    id: "p1",
    author: "Amina K.",
    title: "Navigating Anxiety in the Workplace",
    excerpt: "It can be difficult to manage stress when deadlines are looming. Here are some strategies I use to stay grounded...",
    date: "Aug 2, 2026",
    status: "Pending",
  },
  {
    id: "p2",
    author: "Yusuf M.",
    title: "The Importance of Community Support",
    excerpt: "We often underestimate how much a simple conversation can help someone going through a tough time.",
    date: "Aug 1, 2026",
    status: "Pending",
  },
];

function AdminPosts() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Post Approvals</h2>
      </div>

      <div className="grid gap-4">
        {mockPendingPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>Submitted by {post.author} on {post.date}</CardDescription>
                </div>
                <Badge variant="secondary">{post.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">"{post.excerpt}"</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </CardFooter>
          </Card>
        ))}
        {mockPendingPosts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <p>No pending posts for approval.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

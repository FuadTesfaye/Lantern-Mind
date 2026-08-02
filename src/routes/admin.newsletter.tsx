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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/newsletter")({
  component: AdminNewsletter,
});

function AdminNewsletter() {
  const { data: subscriberCount, isLoading } = useQuery({
    queryKey: ["admin-subscriber-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("subscribers")
        .select("*", { count: "exact", head: true })
        .eq("status", "Subscribed");

      if (error) throw error;
      return count || 0;
    },
  });

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Newsletter</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Compose Newsletter</CardTitle>
            <CardDescription>
              Write and send an email to all your subscribers. We recommend using Resend for
              delivery.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Weekly Mental Health Tips" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your newsletter content here..."
                className="min-h-[300px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save as Draft</Button>
            <Button>
              <Send className="mr-2 h-4 w-4" /> Send Newsletter
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscriber Stats</CardTitle>
            <CardDescription>Current audience metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
              <p className="text-3xl font-bold">
                {isLoading ? "..." : subscriberCount !== undefined ? subscriberCount : "Error"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Open Rate</p>
              <p className="text-3xl font-bold">--%</p>
              <p className="text-xs text-muted-foreground mt-1">Requires Mailer integration</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Sent</p>
              <p className="text-xl font-medium">Never</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4" role="alert">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <AlertCircle className="h-10 w-10 text-destructive mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            The page you are looking for does not exist or has been moved.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 active:scale-[0.97] transition-all duration-200"
          >
            <Home size={16} /> Back to Home
          </a>
        </CardContent>
      </Card>
    </main>
  );
}

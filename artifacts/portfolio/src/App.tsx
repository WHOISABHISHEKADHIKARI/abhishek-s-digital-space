import { Router as WouterRouter, Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/error-boundary";
import Portfolio from "@/pages/portfolio";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const sectionPaths = ["/about", "/experience", "/work", "/volunteering", "/certifications", "/news", "/recommendations", "/blog", "/contact"];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/" component={Portfolio} />
              {sectionPaths.map((p) => (
                <Route key={p} path={p} component={Portfolio} />
              ))}
              <Route component={NotFound} />
            </Switch>
          </WouterRouter>
          <Toaster />
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

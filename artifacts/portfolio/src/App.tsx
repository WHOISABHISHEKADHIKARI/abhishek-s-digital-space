import { Router as WouterRouter, Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/error-boundary";
import Portfolio from "@/pages/portfolio";
import AITrainerNepal from "@/pages/ai-trainer-nepal";
import AboutPage from "@/pages/about";
import CorporateAITraining from "@/pages/corporate-ai-training";
import ExperiencePage from "@/pages/experience";
import WorkPage from "@/pages/work";
import VolunteeringPage from "@/pages/volunteering";
import CertificationsPage from "@/pages/certifications";
import NewsPage from "@/pages/news";
import RecommendationsPage from "@/pages/recommendations";
import BlogPage from "@/pages/blog";
import ContactPage from "@/pages/contact";
import OpenSourcePage from "@/pages/open-source";
import SMETrainingPage from "@/pages/sme-training";
import HRTrainingPage from "@/pages/hr-training";
import TeacherTrainingPage from "@/pages/teacher-training";
import AgenticSkillsWorkshopPage from "@/pages/agentic-skills-workshop";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/" component={Portfolio} />
              <Route path="/ai-trainer-nepal" component={AITrainerNepal} />
              <Route path="/about" component={AboutPage} />
              <Route path="/ai-training" component={CorporateAITraining} />
              <Route path="/experience" component={ExperiencePage} />
              <Route path="/work" component={WorkPage} />
              <Route path="/volunteering" component={VolunteeringPage} />
              <Route path="/certifications" component={CertificationsPage} />
              <Route path="/news" component={NewsPage} />
              <Route path="/recommendations" component={RecommendationsPage} />
              <Route path="/blog" component={BlogPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/open-source" component={OpenSourcePage} />
              <Route path="/ai-training-sme-operations" component={SMETrainingPage} />
              <Route path="/ai-training-hr-nepal" component={HRTrainingPage} />
              <Route path="/ai-training-teachers-nepal" component={TeacherTrainingPage} />
              <Route path="/agentic-ai-skills-workshop" component={AgenticSkillsWorkshopPage} />
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
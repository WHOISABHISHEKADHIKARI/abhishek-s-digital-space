import { useState, type FormEvent } from "react";
import { Linkedin, Mail, MapPin, Send } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";

const TITLE = "Contact | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "Book an AI training workshop, discuss prompt engineering, or collaborate on agritech. Contact Abhishek Adhikari via email, LinkedIn, or the contact form.";

const FORM_ENDPOINT = "https://formspree.io/f/xrebreqr";

interface FormState {
  name: string;
  organization: string;
  email: string;
  audience: string;
  timing: string;
  format: string;
  message: string;
  _gotcha: string;
}

const EMPTY: FormState = {
  name: "",
  organization: "",
  email: "",
  audience: "",
  timing: "",
  format: "",
  message: "",
  _gotcha: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/contact",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": `${SITE_URL}/contact#contactpage`,
          url: `${SITE_URL}/contact`,
          name: TITLE,
          description: DESCRIPTION,
          about: personRef(),
        },
        {
          "@type": "ContactPoint",
          email: "abhishekadhikari1254@gmail.com",
          contactType: "professional",
          availableLanguage: ["English", "Nepali", "Hindi"],
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    },
  });

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form._gotcha) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          organization: form.organization,
          email: form.email,
          audience: form.audience,
          timing: form.timing,
          format: form.format,
          message: form.message,
        }),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setSent(true);
      setForm(EMPTY);
    } catch {
      setError("Something went wrong. Please email abhishekadhikari1254@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary/40";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Booking an AI training workshop, planning a corporate session, or collaborating on agritech and community work — share a few details and I will reply with next steps."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Tell me about your organization, audience and goals. The more context you share, the more specific the
              proposal can be.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-primary" />
                <span>Hetauda, Bagmati, Nepal</span>
              </div>
              <a href="mailto:abhishekadhikari1254@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary">
                <Mail size={17} className="shrink-0" /> abhishekadhikari1254@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/whoisabhishek/" target="_blank" rel="me noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary">
                <Linkedin size={17} className="shrink-0" /> LinkedIn
              </a>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Prefer a specific page?</p>
              <ul className="mt-3 space-y-2">
                <li><a href="/ai-training" className="hover:text-foreground">Corporate AI training →</a></li>
                <li><a href="/ai-trainer-nepal/" className="hover:text-foreground">AI Trainer in Nepal profile →</a></li>
                <li><a href="/open-source" className="hover:text-foreground">Open-source contributions →</a></li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" aria-describedby={error ? "form-error" : undefined}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Name <span className="text-destructive">*</span>
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="organization" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Organization
                </label>
                <input id="organization" name="organization" type="text" autoComplete="organization" value={form.organization} onChange={(e) => update("organization", e.target.value)} className={inputClass} placeholder="Company, school or team" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="you@example.com" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="audience" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Audience / team size
                </label>
                <input id="audience" name="audience" type="text" value={form.audience} onChange={(e) => update("audience", e.target.value)} className={inputClass} placeholder="e.g. 25 teachers, HR team" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="format" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Preferred format
                </label>
                <select id="format" name="format" value={form.format} onChange={(e) => update("format", e.target.value)} className={inputClass}>
                  <option value="">Select…</option>
                  <option value="On-site (Nepal)">On-site (Nepal)</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="timing" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Preferred timing
              </label>
              <input id="timing" name="timing" type="text" value={form.timing} onChange={(e) => update("timing", e.target.value)} className={inputClass} placeholder="e.g. March, weekday mornings" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Goals and context <span className="text-destructive">*</span>
              </label>
              <textarea id="message" name="message" required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${inputClass} resize-none`} placeholder="What do you want participants to be able to do after the session?" />
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={form._gotcha} onChange={(e) => update("_gotcha", e.target.value)} />
            </div>

            <div aria-live="polite">
              {error && (
                <p id="form-error" role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              {sent && (
                <p role="status" className="text-sm font-medium text-primary">
                  Thank you. Your message has been sent — I will reply as soon as I can.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {sending ? "Sending…" : sent ? "Message sent" : <><Send size={16} /> Send message</>}
            </button>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Your name and email are used only to respond to this enquiry. They are not added to any mailing list or
              shared with third parties.
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

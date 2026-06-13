import React, { useState, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Trash2, Save, CheckCircle, AlertCircle, ImageOff, Loader2 } from "lucide-react";

const SECTIONS = ["about", "experience", "projects", "volunteering", "blog", "news"] as const;
type Section = (typeof SECTIONS)[number];

const SECTION_LABELS: Record<Section, string> = {
  about: "About / Profile Photo",
  experience: "Experience – Logos",
  projects: "Projects – Screenshots",
  volunteering: "Volunteering – Photos",
  blog: "Blog – Covers",
  news: "News & Recognition",
};

const API = "/api";

type MediaFile = {
  filename: string;
  url: string;
  alt: string;
  caption: string;
};

type MediaMap = Record<Section, MediaFile[]>;

function useMedia() {
  return useQuery<MediaMap>({
    queryKey: ["media"],
    queryFn: async () => {
      const res = await fetch(`${API}/media`);
      if (!res.ok) throw new Error("Failed to load media");
      return res.json();
    },
  });
}

function ImageCard({ section, file }: { section: Section; file: MediaFile }) {
  const qc = useQueryClient();
  const [alt, setAlt] = useState(file.alt);
  const [caption, setCaption] = useState(file.caption);
  const [saved, setSaved] = useState(false);

  const saveMeta = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/media/metadata/${section}/${encodeURIComponent(file.filename)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt, caption }),
      });
      if (!res.ok) throw new Error("Save failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["media"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/media/${section}/${encodeURIComponent(file.filename)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["media"] });
    },
  });

  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
      <div className="relative w-full h-44 bg-zinc-100 flex items-center justify-center">
        <img
          src={file.url}
          alt={alt || file.filename}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (fb) fb.style.display = "flex";
          }}
        />
        <div className="hidden w-full h-full items-center justify-center flex-col gap-2 text-zinc-400">
          <ImageOff size={28} />
          <span className="text-xs">{file.filename}</span>
        </div>
        <button
          onClick={() => {
            if (confirm(`Delete "${file.filename}"?`)) deleteMutation.mutate();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 hover:bg-red-50 hover:text-red-600 transition-colors border border-zinc-200 shadow-sm"
          title="Delete"
        >
          {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      </div>
      <div className="p-3 space-y-2 bg-zinc-50">
        <p className="text-xs font-mono text-zinc-500 truncate">{file.filename}</p>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide">Alt Text</label>
          <input
            type="text"
            value={alt}
            onChange={(e) => { setAlt(e.target.value); setSaved(false); }}
            placeholder="Describe the image…"
            className="w-full text-sm px-3 py-1.5 rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/40"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => { setCaption(e.target.value); setSaved(false); }}
            placeholder="Short caption shown on card…"
            className="w-full text-sm px-3 py-1.5 rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/40"
          />
        </div>
        <button
          onClick={() => saveMeta.mutate()}
          disabled={saveMeta.isPending}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-colors bg-green-700 text-white hover:bg-green-800 disabled:opacity-60"
        >
          {saveMeta.isPending ? (
            <><Loader2 size={13} className="animate-spin" /> Saving…</>
          ) : saved ? (
            <><CheckCircle size={13} /> Saved!</>
          ) : (
            <><Save size={13} /> Save</>
          )}
        </button>
        {saveMeta.isError && (
          <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> Save failed</p>
        )}
      </div>
    </div>
  );
}

function UploadZone({ section }: { section: Section }) {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch(`${API}/media/upload/${section}`, { method: "POST", body: fd });
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Upload failed" }));
          throw new Error(body.error ?? "Upload failed");
        }
      }
      qc.invalidateQueries({ queryKey: ["media"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }, [section, qc]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); doUpload(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer border-2 border-dashed rounded-xl h-44 flex flex-col items-center justify-center gap-3 transition-colors ${
        dragging ? "border-green-600 bg-green-50" : "border-zinc-300 hover:border-green-500 hover:bg-zinc-50"
      }`}
    >
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => doUpload(e.target.files)} />
      {uploading ? (
        <><Loader2 size={28} className="text-green-600 animate-spin" /><p className="text-sm text-zinc-500">Uploading…</p></>
      ) : (
        <>
          <Upload size={28} className="text-zinc-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-600">Click or drag & drop</p>
            <p className="text-xs text-zinc-400 mt-0.5">JPG, PNG, WebP — up to 10 MB</p>
          </div>
        </>
      )}
      {error && <p className="text-xs text-red-500 px-4 text-center">{error}</p>}
    </div>
  );
}

export default function Admin() {
  const [activeSection, setActiveSection] = useState<Section>("about");
  const { data, isLoading, isError } = useMedia();

  const files = data?.[activeSection] ?? [];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-base text-green-800">AA.</span>
            <span className="text-zinc-400">/</span>
            <span className="text-sm font-semibold text-zinc-700">Media Manager</span>
          </div>
          <a href="/" className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors">← Back to portfolio</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === s
                  ? "bg-green-800 text-white shadow-sm"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-green-600 hover:text-green-800"
              }`}
            >
              {SECTION_LABELS[s]}
              {data?.[s]?.length ? (
                <span className={`ml-1.5 text-xs ${activeSection === s ? "text-green-200" : "text-zinc-400"}`}>
                  {data[s].length}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-zinc-800">{SECTION_LABELS[activeSection]}</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Upload photos here. After uploading, set <code className="bg-zinc-100 px-1 rounded">imageUrl</code> in{" "}
            <code className="bg-zinc-100 px-1 rounded">abhishek_profile.json</code> to{" "}
            <code className="bg-zinc-100 px-1 rounded">/sections/{activeSection}/filename.jpg</code>
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-zinc-500 py-12 justify-center">
            <Loader2 size={20} className="animate-spin" /> Loading…
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-2 text-red-500 py-12 justify-center">
            <AlertCircle size={20} /> Could not connect to media API. Make sure the API server is running.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Upload card — always first */}
            <UploadZone section={activeSection} />

            {/* Existing images */}
            {files.map((file) => (
              <ImageCard key={file.filename} section={activeSection} file={file} />
            ))}

            {files.length === 0 && (
              <div className="sm:col-span-1 md:col-span-2 flex items-center justify-center h-44 rounded-xl border border-zinc-200 bg-white text-zinc-400 text-sm">
                No images yet — upload one to get started.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

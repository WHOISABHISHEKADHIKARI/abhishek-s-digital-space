import { Router, type IRouter } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router: IRouter = Router();

const SECTIONS = ["about", "experience", "projects", "volunteering", "blog", "news"];
const PUBLIC_ROOT = path.resolve("artifacts/portfolio/public/sections");

function getSectionDir(section: string) {
  return path.join(PUBLIC_ROOT, section);
}

function getMetaPath(section: string) {
  return path.join(getSectionDir(section), "metadata.json");
}

function readMeta(section: string): Record<string, { alt: string; caption: string }> {
  const p = getMetaPath(section);
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return {};
  }
}

function writeMeta(section: string, data: Record<string, { alt: string; caption: string }>) {
  fs.writeFileSync(getMetaPath(section), JSON.stringify(data, null, 2));
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const section = String(req.params.section ?? "");
    if (!SECTIONS.includes(section)) {
      return cb(new Error("Invalid section"), "");
    }
    const dir = getSectionDir(section);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.get("/media", (_req, res) => {
  const result: Record<string, { filename: string; url: string; alt: string; caption: string }[]> = {};
  for (const section of SECTIONS) {
    const dir = getSectionDir(section);
    const meta = readMeta(section);
    let files: string[] = [];
    if (fs.existsSync(dir)) {
      files = fs.readdirSync(dir).filter((f) => {
        const ext = f.toLowerCase();
        return ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".png") || ext.endsWith(".webp") || ext.endsWith(".gif");
      });
    }
    result[section] = files.map((filename) => ({
      filename,
      url: `/sections/${section}/${filename}`,
      alt: meta[filename]?.alt ?? "",
      caption: meta[filename]?.caption ?? "",
    }));
  }
  res.json(result);
});

router.post("/media/upload/:section", (req, res) => {
  const section = req.params.section;
  if (!SECTIONS.includes(section)) {
    res.status(400).json({ error: "Invalid section" });
    return;
  }
  upload.single("file")(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    res.json({ ok: true, filename: req.file.filename, url: `/sections/${section}/${req.file.filename}` });
  });
});

router.put("/media/metadata/:section/:filename", (req, res) => {
  const { section, filename } = req.params;
  if (!SECTIONS.includes(section)) {
    res.status(400).json({ error: "Invalid section" });
    return;
  }
  const { alt = "", caption = "" } = req.body as { alt?: string; caption?: string };
  const meta = readMeta(section);
  meta[filename] = { alt, caption };
  writeMeta(section, meta);
  res.json({ ok: true });
});

router.delete("/media/:section/:filename", (req, res) => {
  const { section, filename } = req.params;
  if (!SECTIONS.includes(section)) {
    res.status(400).json({ error: "Invalid section" });
    return;
  }
  const filePath = path.join(getSectionDir(section), filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  const meta = readMeta(section);
  delete meta[filename];
  writeMeta(section, meta);
  res.json({ ok: true });
});

export default router;

#!/usr/bin/env python3
# Fresh, correct public/sitemap.xml (single xmlns:image) + AI-citation image index in llms.txt.
import os, re, sys
import xml.etree.ElementTree as ET

R = os.path.expanduser("~") + "/abhishek-s-digital-space"
P = os.path.join(R, "artifacts/portfolio")
PUB = os.path.join(P, "public")
SM = os.path.join(PUB, "sitemap.xml")
LL = os.path.join(PUB, "llms.txt")
SITE = "https://abhishekadhikari.com"
GEO = "Hetauda, Bagmati Province, Nepal"
LIC = "https://creativecommons.org/licenses/by/4.0/"

def cap_of(fn):
    base = os.path.splitext(fn)[0]
    k = base.replace("abhishek-adhikari--", "").replace("abhishek-adhikari-", "")
    words = [w for w in k.split("-") if w]
    return (" ".join(w.capitalize() for w in words)) if words else "Abhishek Adhikari AI Training session, Nepal"

# ---------- gather gallery images from disk ----------
items = []  # (rel, caption)
for sec in ("volunteering", "media", "news"):
    d = os.path.join(PUB, "sections", sec, "images")
    if not os.path.isdir(d):
        continue
    for fn in sorted(os.listdir(d)):
        if not re.search(r"\.(jpe?g|webp|png)$", fn, re.I):
            continue
        rel = "/sections/%s/images/%s" % (sec, fn)
        items.append((rel, cap_of(fn)))

print("gallery images:", len(items))

# ---------- build sitemap (hand-built, exact) ----------
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
NSI = "http://www.google.com/schemas/sitemap-image/1.1"

def esc(t):
    return (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
             .replace('"', "&quot;"))

out = []
out.append('<?xml version="1.0" encoding="UTF-8"?>')
out.append('<urlset xmlns="%s" xmlns:image="%s">' % (NS, NSI))

def page(loc, lastmod, prio, imgs):
    out.append("  <url>")
    out.append("    <loc>%s</loc>" % esc(loc))
    out.append("    <lastmod>%s</lastmod>" % lastmod)
    out.append("    <changefreq>weekly</changefreq>")
    out.append("    <priority>%s</priority>" % prio)
    for rel, cap in imgs:
        full = SITE + rel.lstrip("/")
        out.append("    <image:image>")
        out.append("      <image:loc>%s</image:loc>" % esc(full))
        out.append("      <image:title>%s</image:title>" % esc(cap))
        out.append("      <image:caption>Abhishek Adhikari AI Trainer in Nepal — %s</image:caption>" % esc(cap))
        out.append("      <image:geo_location>%s</image:geo_location>" % esc(GEO))
        out.append("      <image:license>%s</image:license>" % esc(LIC))
        out.append("    </image:image>")
    out.append("  </url>")

home = [x for x in items]
page(SITE + "/", "2026-09-16", "1.0", home)
for sec in ("volunteering", "media", "news"):
    si = [x for x in items if x[0].find("/%s/" % sec) > 0]
    if si:
        page(SITE + "/#" + sec, "2026-09-16", "0.8", si)

out.append("</urlset>")
open(SM, "w", encoding="utf-8").write("\n".join(out) + "\n")

# ---------- llms.txt: AI-citation image index (idempotent) ----------
MARK = "## AI-Citation Image Index"
ll = open(LL, encoding="utf-8").read() if os.path.isfile(LL) else ""
if MARK not in ll:
    rows = ["", MARK, "License: CC BY 4.0 (%s). Cite: Abhishek Adhikari, AI Trainer Nepal (%s)." % (LIC, SITE),
            "Region: %s. Cite by slug + URL for AI attribution." % GEO, ""]
    for rel, cap in items:
        slug = os.path.splitext(rel.rsplit("/", 1)[-1])[0]
        rows.append("- slug=%s | caption=%s | URL=%s%s | geo=%s | license=%s" % (
            slug, cap, SITE, rel.lstrip("/"), GEO, LIC))
    open(LL, "w", encoding="utf-8").write(ll.rstrip() + "\n" + "\n".join(rows) + "\n")

# ---------- verify ----------
x = open(SM, encoding="utf-8").read()
ET.fromstring(x)  # raises if malformed
n_img = x.count("<image:loc>")
n_title = x.count("<image:title>")
n_cap = x.count("<image:caption>")
n_geo = x.count("<image:geo_location>")
n_lic = x.count("<image:license>")
print("XML valid: True | url blocks:", x.count("<url>") - x.count("</url>") < 0 or x.count("<url>"), "| image:loc:", n_img)
print("title/cap/geo/lic:", n_title, n_cap, n_geo, n_lic)
# every image:loc must point to a real file
locs = re.findall(r"<image:loc>([^<]+)</image:loc>", x)
dang = [l for l in locs if not os.path.isfile(os.path.join(PUB, l.replace(SITE, "").lstrip("/")))]
print("image locs on disk:", len(locs) - len(dang), "/", len(locs), "| dangling:", len(dang))
ll2 = open(LL, encoding="utf-8").read()
print("llms.txt AI index:", "AI-Citation Image Index" in ll2, "| index lines:", ll2.count("slug="))

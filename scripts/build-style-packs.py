import json
import shutil
from pathlib import Path

lib_dir = Path(r"C:\Users\vmani\Documents\ChatGPT\AI editor model\style-packs\library")
out_img_dir = Path(r"public\assets\style-packs")
out_img_dir.mkdir(parents=True, exist_ok=True)

packs = []

for p in sorted(lib_dir.iterdir()):
    if not p.is_dir():
        continue
    tmpl_path = p / "template.json"
    guide_path = p / "guide.md"
    poster_path = p / "poster.jpg"
    
    if not tmpl_path.exists():
        continue
        
    try:
        tmpl = json.loads(tmpl_path.read_text(encoding="utf-8"))
    except Exception as e:
        continue
        
    guide_text = ""
    if guide_path.exists():
        guide_text = guide_path.read_text(encoding="utf-8")
        
    # Copy poster
    poster_filename = f"{p.name}.jpg"
    target_poster = out_img_dir / poster_filename
    if poster_path.exists():
        shutil.copy2(poster_path, target_poster)
        poster_url = f"/assets/style-packs/{poster_filename}"
    else:
        poster_url = "/assets/editor-guide/preview-0.jpg"
        
    # Extract agent prompt from guide.md
    prompt_text = ""
    if "## Prompt for an AI editing agent" in guide_text:
        prompt_text = guide_text.split("## Prompt for an AI editing agent")[-1].strip()
        if "## Notes on the motion" in prompt_text:
            prompt_text = prompt_text.split("## Notes on the motion")[0].strip()
    elif "## Prompt" in guide_text:
        prompt_text = guide_text.split("## Prompt")[-1].strip()
        if "##" in prompt_text:
            prompt_text = prompt_text.split("##")[0].strip()
            
    pack_name = tmpl.get("name", p.name.replace("-", " ").title())
    if not prompt_text:
        prompt_text = (
            f"Create a vertical 1080x1920 Instagram Reel from my footage using the {pack_name} style pack. "
            f"Apply the visual hierarchy, color palette, and paced transition beats."
        )

    # Determine collection category
    collection = tmpl.get("collection")
    if not collection:
        # Determine from folder or name
        if p.name in [
            "yellow-design-nodes", "notebook-faceoff", "waterfront-reset",
            "cafe-focus-journal", "handheld-card-reveal", "dashboard-cutaway",
            "postcard-pop", "layered-keyword-story"
        ]:
            collection = "pins"
        elif p.name in [
            "chrome-launch", "paper-cut-manifesto", "night-route",
            "split-decision", "signal-grid", "pulse-score"
        ]:
            collection = "motion"
        else:
            collection = "creator"

    accent = tmpl.get("accent")
    if not accent and "palette" in tmpl and isinstance(tmpl["palette"], dict):
        accent = tmpl["palette"].get("accent", "#10B981")
    if not accent:
        accent = "#10B981"

    packs.append({
        "id": p.name,
        "name": pack_name,
        "collection": collection,
        "description": tmpl.get("description", ""),
        "referenceBeats": tmpl.get("referenceBeats", tmpl.get("reference", "")),
        "accent": accent,
        "palette": tmpl.get("palette", {}),
        "posterUrl": poster_url,
        "prompt": prompt_text,
    })

print(f"Processed {len(packs)} packs.")

ts_content = f"""export interface StylePackItem {{
  id: string;
  name: string;
  collection: 'pins' | 'motion' | 'creator';
  description: string;
  referenceBeats: string;
  accent: string;
  palette: Record<string, string>;
  posterUrl: string;
  prompt: string;
}}

export const STYLE_PACKS: StylePackItem[] = {json.dumps(packs, indent=2)};
"""

target_ts = Path("lib/style-packs-data.ts")
target_ts.write_text(ts_content, encoding="utf-8")
print(f"Generated {target_ts}")


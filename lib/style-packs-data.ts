export interface StylePackItem {
  id: string;
  name: string;
  collection: 'pins' | 'motion' | 'creator' | 'remix' | string;
  description: string;
  referenceBeats: string;
  accent: string;
  palette: Record<string, string>;
  posterUrl: string;
  prompt: string;
}

export const STYLE_PACKS: StylePackItem[] = [
  {
    "id": "amber-to-ice",
    "name": "Amber to Ice",
    "collection": "remix",
    "description": "A warm journal opening, a matched color comparison, and a cool outdoor finish.",
    "referenceBeats": "",
    "accent": "#FFD097",
    "palette": {
      "ink": "#23303D",
      "paper": "#FFF1E2",
      "accent": "#FFD097",
      "secondary": "#92CAE4"
    },
    "posterUrl": "/assets/style-packs/amber-to-ice.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nOpen with a warm impression, then show how temperature changes the very same frame before moving to the cool setting.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main, choice, outside."
  },
  {
    "id": "before-the-click",
    "name": "Before the Click",
    "collection": "remix",
    "description": "A late caption demonstration, animated comparison, and synchronized payoff.",
    "referenceBeats": "",
    "accent": "#BDE6FF",
    "palette": {
      "ink": "#17283A",
      "paper": "#F0F7F4",
      "accent": "#BDE6FF",
      "secondary": "#B8CCEF"
    },
    "posterUrl": "/assets/style-packs/before-the-click.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nKeep the before and after equally legible. Place the visual cue on the beat in the closing shot.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses procedural graphics and animation with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "blind-grade-reveal",
    "name": "Blind Grade Reveal",
    "collection": "creator",
    "description": "One identical frame, two unlabeled grades, a voting beat, and a reveal.",
    "referenceBeats": "",
    "accent": "#C2EB8C",
    "palette": {
      "ink": "#101B22",
      "paper": "#EDF4F2",
      "accent": "#C2EB8C",
      "secondary": "#7DA9BB"
    },
    "posterUrl": "/assets/style-packs/blind-grade-reveal.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nStart with identical source framing and neutral A/B labels. Hold before revealing the grade names. Keep the two panels the same size. Let viewers decide rather than inventing a winner.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nMarques Brownlee.\n\nThe editable scenes specify the hook, development, and payoff.\n\n- [Blind smartphone camera test](https://www.youtube.com/watch?v=VRoTOE3FqT0)\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "cafe-focus-journal",
    "name": "Caf\u00e9 Focus Journal",
    "collection": "pins",
    "description": "Warm lamp-lit storytelling with tiny serif notes, a condensed title, and an off-white journal insert.",
    "referenceBeats": "The caf\u00e9 clip keeps a continuous warm portrait while short serif captions move around the frame and a bold timer title takes over. The morning-brief Pin adds paper and screen inserts around the presenter.",
    "accent": "#F4C491",
    "palette": {
      "ink": "#30231C",
      "paper": "#FFF4DF",
      "accent": "#F4C491",
      "secondary": "#BC7960"
    },
    "posterUrl": "/assets/style-packs/cafe-focus-journal.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nKeep the presenter in warm light. Use one small note per beat, a restrained title on the first turn, and a paper insert only for the useful steps.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nAttached downloaded-file (6).mp4 and the Atelier-style morning brief Pin.\n\nThe caf\u00e9 clip keeps a continuous warm portrait while short serif captions move around the frame and a bold timer title takes over. The morning-brief Pin adds paper and screen inserts around the presenter.\n\n- [Morning brief edit](https://www.pinterest.com/pin/823173638186425090/)\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main."
  },
  {
    "id": "caption-timing-lab",
    "name": "Caption Timing Lab",
    "collection": "creator",
    "description": "A concrete question followed by the same spoken cue with a delayed and a synced caption.",
    "referenceBeats": "",
    "accent": "#FFD36C",
    "palette": {
      "ink": "#101C2C",
      "paper": "#F3F5E9",
      "accent": "#FFD36C",
      "secondary": "#80BFE0"
    },
    "posterUrl": "/assets/style-packs/caption-timing-lab.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nOpen on a specific why-question. Replay the same cue twice and move only the caption. The waveform is an illustrative diagram and the speech is placed at 0.08s in both demo scenes.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nCleo Abram.\n\nThe editable scenes specify the hook, development, and payoff.\n\n- [CERN explainer](https://www.youtube.com/watch?v=bCmwCkNY85g)\n\nThe preview uses procedural graphics and animation with synthetic narration. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "card-to-camera",
    "name": "Card to Camera",
    "collection": "remix",
    "description": "A green bulletin sign gives way to a sunlit presenter and returns as an end card.",
    "referenceBeats": "",
    "accent": "#FFE473",
    "palette": {
      "ink": "#1C3A34",
      "paper": "#FBF1D7",
      "accent": "#FFE473",
      "secondary": "#368471"
    },
    "posterUrl": "/assets/style-packs/card-to-camera.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nUse the physical card to announce the idea, let the host explain it, then bring the same prop back for the takeaway.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main, host."
  },
  {
    "id": "choose-your-hook",
    "name": "Choose Your Hook",
    "collection": "remix",
    "description": "A layered talking-head question leads to a notebook choice, then a fair side-by-side visual ending.",
    "referenceBeats": "",
    "accent": "#FFBC73",
    "palette": {
      "ink": "#302739",
      "paper": "#FFF0DB",
      "accent": "#FFBC73",
      "secondary": "#80C2C8"
    },
    "posterUrl": "/assets/style-packs/choose-your-hook.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nShow two opening options, ask for a choice, and keep the payoff common to both. Use A and B as neutral labels.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main, duo, choice."
  },
  {
    "id": "chrome-launch",
    "name": "Chrome Launch",
    "collection": "motion",
    "description": "A rotating chrome object, moving studio reflections, oversized launch type, and a split-color end card.",
    "referenceBeats": "",
    "accent": "#FF6948",
    "palette": {
      "ink": "#10131B",
      "paper": "#F3F0EA",
      "accent": "#FF6948",
      "secondary": "#8596F6"
    },
    "posterUrl": "/assets/style-packs/chrome-launch.jpg",
    "prompt": "Create a 9\u201312 second vertical edit for **[topic or product]** using this pack. Watch `preview.mp4` and edit a copy of `template.json`. Use this direction for the edit.\n\nLead with a silhouette, move to a material close-up, then land on a clear product name. Keep the object visible between the headline and the bottom caption. Use three short sections with a single product message.\n\nReplace the `lead`, two `headline` lines, `items`, and `tag` per scene. Preserve each scene's number of items because they map to graphic slots. Update `seconds` to suit the new rhythm, and keep the scene `type` for this style. The optional `mode` selects the composition used by the corresponding scene index. Adjust the four colors in `palette` for the new brand. Use short, readable copy and preserve the font's natural proportions.\n\nRender the new MP4, inspect frames at the start, middle, and end of every scene, and deliver the updated JSON and final video. The sample uses vector animation and an original synthesized soundtrack. The artwork is generated by the included Python renderer.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. Windows Arial, Georgia, and Consolas fonts are used.\n\n```powershell\npython render.py template.json new-edit.mp4 --audio sample-audio.wav\n```\n\nUse a WAV or an MP4 with your own audio to change the soundtrack. A shorter track is padded with silence. Use the included WAV as an editable starting track."
  },
  {
    "id": "dashboard-cutaway",
    "name": "Dashboard Cutaway",
    "collection": "pins",
    "description": "Teal-and-amber creator lighting, punchy emphasis captions, a mock dashboard insert, and a highlighted cursor.",
    "referenceBeats": "Presenter establishes the problem. A logo, screenshot or interface enters on the spoken keyword, then the edit cuts to a closer tool view before returning to the host.",
    "accent": "#FFA86A",
    "palette": {
      "ink": "#0D181B",
      "paper": "#F8F5EB",
      "accent": "#FFA86A",
      "secondary": "#65DAB6"
    },
    "posterUrl": "/assets/style-packs/dashboard-cutaway.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nExplain one workflow. Use the talking head for the problem, a readable screen insert for the action, and a visible outcome. Replace the mock rows and statuses with real data when making a tutorial.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nThree software and workflow Pins.\n\nPresenter establishes the problem. A logo, screenshot or interface enters on the spoken keyword, then the edit cuts to a closer tool view before returning to the host.\n\n- [Subscription-tracking edit](https://www.pinterest.com/pin/914864111831776995/)\n- [Presenter-to-editor cut](https://www.pinterest.com/pin/1126603663099992579/)\n- [Cinematic timeline cutaway](https://www.pinterest.com/pin/800163058843135101/)\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main."
  },
  {
    "id": "desk-to-dashboard",
    "name": "Desk to Dashboard",
    "collection": "remix",
    "description": "A physical clutter problem cuts to a digital organization insert and a tidy desk payoff.",
    "referenceBeats": "",
    "accent": "#F7C282",
    "palette": {
      "ink": "#142829",
      "paper": "#FFF3DD",
      "accent": "#F7C282",
      "secondary": "#6ED4AD"
    },
    "posterUrl": "/assets/style-packs/desk-to-dashboard.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nShow the original problem in one physical frame, then let the interface demonstrate the fix.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "evidence-strip",
    "name": "Evidence Strip",
    "collection": "remix",
    "description": "A stacked caption, a sliding visual comparison, and a workspace close for a compact teardown.",
    "referenceBeats": "",
    "accent": "#E4B4F4",
    "palette": {
      "ink": "#222534",
      "paper": "#FFF5E4",
      "accent": "#E4B4F4",
      "secondary": "#99D7D3"
    },
    "posterUrl": "/assets/style-packs/evidence-strip.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nState the issue in one sentence, let the slider show the visual evidence, and close with the exact check to repeat.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "five-dollar-desk",
    "name": "The $5 Desk Reset",
    "collection": "creator",
    "description": "A visible budget, a failed purchase, and a before-and-after desk payoff.",
    "referenceBeats": "",
    "accent": "#F9CA63",
    "palette": {
      "ink": "#253B31",
      "paper": "#FFF1D6",
      "accent": "#F9CA63",
      "secondary": "#8BB39D"
    },
    "posterUrl": "/assets/style-packs/five-dollar-desk.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nShow a specific constraint and the starting state together. Let the setback register before changing the plan. Reconcile the budget in the last frame. Replace the illustrative prices with the real costs when filming your own edit.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nRyan Trahan.\n\nThe editable scenes specify the hook, development, and payoff.\n\n- [Penny challenge episode](https://www.youtube.com/watch?v=JEqi3VVLYkg)\n\nThe preview uses procedural graphics and animation with synthetic narration. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "frame-match-lab",
    "name": "Frame Match Lab",
    "collection": "remix",
    "description": "Matched object movement, two identical frames with different grades, and a waveform-style recap.",
    "referenceBeats": "",
    "accent": "#B8EDB8",
    "palette": {
      "ink": "#172332",
      "paper": "#E9F6EE",
      "accent": "#B8EDB8",
      "secondary": "#7FAFB4"
    },
    "posterUrl": "/assets/style-packs/frame-match-lab.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nMatch action across the first cut, keep the A/B framing identical, then summarize the difference in a single line.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "handheld-card-reveal",
    "name": "Handheld Card Reveal",
    "collection": "pins",
    "description": "A green printed-card sequence with perspective motion, serif copy, and pauses that make each message readable.",
    "referenceBeats": "A seated presenter lifts dark-green printed cards one at a time. The opening question fills the center, the middle card lists options, and the final card carries the call to action.",
    "accent": "#DCE777",
    "palette": {
      "ink": "#10291E",
      "paper": "#FFF4D8",
      "accent": "#DCE777",
      "secondary": "#22583B"
    },
    "posterUrl": "/assets/style-packs/handheld-card-reveal.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nWrite one idea per sign. Use two short serif lines and a tiny label. The preview uses a perspective-animated overlay. For a real blank prop, set the four corners with quad and keyframe them to your filmed card.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nAttached downloaded-file (7).mp4.\n\nA seated presenter lifts dark-green printed cards one at a time. The opening question fills the center, the middle card lists options, and the final card carries the call to action.\n\n\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main. Set `quad` to four [x, y] points ordered top-left, top-right, bottom-right, bottom-left. For a moving prop, use `quadKeyframes` with sorted scene-relative `time` in seconds and four `points` per keyframe."
  },
  {
    "id": "layered-keyword-story",
    "name": "Layered Keyword Story",
    "collection": "pins",
    "description": "A cinematic talking-head edit with stacked serif and sans captions, translucent cutaways, and one loud color accent.",
    "referenceBeats": "Serif and sans words stack in changing sizes. A large accent headline anchors the opening, while translucent inserts or timeline footage interrupt the portrait.",
    "accent": "#FFCB51",
    "palette": {
      "ink": "#241B20",
      "paper": "#FFF4E6",
      "accent": "#FFCB51",
      "secondary": "#D26D4D"
    },
    "posterUrl": "/assets/style-packs/layered-keyword-story.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nChoose one word to emphasize per beat. Let the quieter serif line do the setup, then switch to bold type on the payoff. Use the translucent cutaway to show something the narration refers to.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nEditorial collage and layered subtitle Pins.\n\nSerif and sans words stack in changing sizes. A large accent headline anchors the opening, while translucent inserts or timeline footage interrupt the portrait.\n\n- [Editorial content-story edit](https://www.pinterest.com/pin/229191068541013705/)\n- [Stacked subtitle reference](https://www.pinterest.com/pin/170362798400644982/)\n- [Foreground text and editor cutaway](https://www.pinterest.com/pin/889812838908940853/)\n- [Cinematic edit and timeline cutaway](https://www.pinterest.com/pin/800163058843135101/)\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main, cutaway."
  },
  {
    "id": "macro-mystery",
    "name": "Macro Mystery",
    "collection": "remix",
    "description": "A product macro opens a guessing game, then the full object resolves the question.",
    "referenceBeats": "",
    "accent": "#FFBD76",
    "palette": {
      "ink": "#1A1930",
      "paper": "#FFF1DE",
      "accent": "#FFBD76",
      "secondary": "#9A8DF2"
    },
    "posterUrl": "/assets/style-packs/macro-mystery.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nShow a detail people could recognize, give them a moment to guess, then keep the full object clear on the reveal.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "map-to-proof",
    "name": "Map to Proof",
    "collection": "remix",
    "description": "A route diagram sets up a split-screen visual comparison, then returns to the route.",
    "referenceBeats": "",
    "accent": "#FFBE78",
    "palette": {
      "ink": "#142A30",
      "paper": "#F6EFDC",
      "accent": "#FFBE78",
      "secondary": "#5A8B8C"
    },
    "posterUrl": "/assets/style-packs/map-to-proof.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nStart on the route, cut to a side-by-side view, and use the final map to locate the evidence.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "monochrome-orbit",
    "name": "Monochrome Orbit",
    "collection": "creator",
    "description": "Paper-white editorial collage, grayscale portrait, ochre orbit, tile montage and gold closing halo.",
    "referenceBeats": "0\u20133s headline, skyline and orbit. 4\u20137s grayscale portrait collage. 8\u201310s dark fact break. 11\u201314s brand-tile montage. 14\u201321s ensemble portrait. 22\u201327s floating paper and portrait. 30\u201333s warm ellipse closing line.",
    "accent": "#F4BC62",
    "palette": {},
    "posterUrl": "/assets/style-packs/monochrome-orbit.jpg",
    "prompt": "Create a new vertical short on **[topic]** using the supplied clean footage and script. Read `template.json` and preview `preview.mp4`. Keep the visual grammar of this pack. Write new `lead`, `headline`, `tag`, and `items` values in the existing scenes. Match `seconds` to the audio. Set `sourceStart` for each video shot when the same asset is used more than once. Keep text inside the safe area, preserve native font proportions, and use glow behind the glyphs and graphic shapes. Keep the subject's face clear. Render a new MP4 and deliver the updated JSON plus any new media references.\n\nReference timing observed in the attached edit\n\n0\u20133s headline, skyline and orbit. 4\u20137s grayscale portrait collage. 8\u201310s dark fact break. 11\u201314s brand-tile montage. 14\u201321s ensemble portrait. 22\u201327s floating paper and portrait. 30\u201333s warm ellipse closing line.\n\nThe preview uses a short timeline and new copy. For a longer cut, start from `reference-timeline.json`. Its scene boundaries approximate the original pacing. Replace the placeholder copy and align the beats to your own audio.\n\n## Edit and render on Windows\n\nInstall FFmpeg and put it on PATH. Install Python dependencies with `python -m pip install opencv-python numpy pillow`.\n\n```powershell\npython render.py template.json test.mp4 --audio preview.mp4\npython render.py template.json final.mp4 --footage \"main=your-clip.mp4\" --audio narration.wav\npython render.py template.json clean.mp4 --clean\n```\n\nUse one `--footage SLOT=PATH` option per replacement. Available slots are main. If a source shot is shorter than its scene, its last frame holds. Pass a mixed narration or music track explicitly with `--audio`. Use a transparent PNG for a custom collage cutout. The sample uses synthetic narration over animated stills. The original reference clips are separate."
  },
  {
    "id": "mystery-card-reveal",
    "name": "Mystery Card Reveal",
    "collection": "creator",
    "description": "Magenta and white stacked hook, three frosted mystery cards, dim viewfinder and timed icon reveals.",
    "referenceBeats": "Screenshot shows an uppercase magenta/white caption, three gray tiles with white question marks, tall corner brackets and a muted counter. Reveal order and timing were designed for this sample.",
    "accent": "#EF63DB",
    "palette": {},
    "posterUrl": "/assets/style-packs/mystery-card-reveal.jpg",
    "prompt": "Create a new vertical short on **[topic]** using the supplied clean footage and script. Read `template.json` and preview `preview.mp4`. Keep the visual grammar of this pack. Write new `lead`, `headline`, `tag`, and `items` values in the existing scenes. Match `seconds` to the audio. Set `sourceStart` for each video shot when the same asset is used more than once. Keep text inside the safe area, preserve native font proportions, and use glow behind the glyphs and graphic shapes. Keep the subject's face clear. Render a new MP4 and deliver the updated JSON plus any new media references.\n\nReference timing observed in the attached edit\n\nScreenshot shows an uppercase magenta/white caption, three gray tiles with white question marks, tall corner brackets and a muted counter. Reveal order and timing were designed for this sample.\n\nThe preview uses a short timeline and new copy. Use the sample timeline as a starting point for your own reveal.\n\n## Edit and render on Windows\n\nInstall FFmpeg and put it on PATH. Install Python dependencies with `python -m pip install opencv-python numpy pillow`.\n\n```powershell\npython render.py template.json test.mp4 --audio preview.mp4\npython render.py template.json final.mp4 --footage \"main=your-clip.mp4\" --audio narration.wav\npython render.py template.json clean.mp4 --clean\n```\n\nUse one `--footage SLOT=PATH` option per replacement. Available slots are main. If a source shot is shorter than its scene, its last frame holds. Pass a mixed narration or music track explicitly with `--audio`. Use a transparent PNG for a custom collage cutout. The sample uses synthetic narration over animated stills. The original reference clips are separate."
  },
  {
    "id": "neon-hook-wheel",
    "name": "Neon Hook Wheel",
    "collection": "creator",
    "description": "Heavy two-line hook, red-to-purple energy shift, numbered radial wedges and a recording-frame payoff.",
    "referenceBeats": "0\u20132.6s red spark and stacked hook. 2.6\u20135s violet wheel reveal behind host. 5\u201330s numbered radial sections. 30\u201335s teal recording example. 36\u201340s tilted screen insert. 40\u201359s product and REC proof beats. 59\u201360s return to the dark set.",
    "accent": "#C55BFF",
    "palette": {},
    "posterUrl": "/assets/style-packs/neon-hook-wheel.jpg",
    "prompt": "Create a new vertical short on **[topic]** using the supplied clean footage and script. Read `template.json` and preview `preview.mp4`. Keep the visual grammar of this pack. Write new `lead`, `headline`, `tag`, and `items` values in the existing scenes. Match `seconds` to the audio. Set `sourceStart` for each video shot when the same asset is used more than once. Keep text inside the safe area, preserve native font proportions, and use glow behind the glyphs and graphic shapes. Keep the subject's face clear. Render a new MP4 and deliver the updated JSON plus any new media references.\n\nReference timing observed in the attached edit\n\n0\u20132.6s red spark and stacked hook. 2.6\u20135s violet wheel reveal behind host. 5\u201330s numbered radial sections. 30\u201335s teal recording example. 36\u201340s tilted screen insert. 40\u201359s product and REC proof beats. 59\u201360s return to the dark set.\n\nThe preview uses a short timeline and new copy. For a longer cut, start from `reference-timeline.json`. Its scene boundaries approximate the original pacing. Replace the placeholder copy and align the beats to your own audio.\n\n## Edit and render on Windows\n\nInstall FFmpeg and put it on PATH. Install Python dependencies with `python -m pip install opencv-python numpy pillow`.\n\n```powershell\npython render.py template.json test.mp4 --audio preview.mp4\npython render.py template.json final.mp4 --footage \"main=your-clip.mp4\" --audio narration.wav\npython render.py template.json clean.mp4 --clean\n```\n\nUse one `--footage SLOT=PATH` option per replacement. Available slots are main. If a source shot is shorter than its scene, its last frame holds. Pass a mixed narration or music track explicitly with `--audio`. Use a transparent PNG for a custom collage cutout. The sample uses synthetic narration over animated stills. The original reference clips are separate."
  },
  {
    "id": "neon-talking-head",
    "name": "Neon Talking Head \u2014 One Clear Idea",
    "collection": "creator",
    "description": "",
    "referenceBeats": "",
    "accent": "#10B981",
    "palette": {
      "lime": "#D9FC64",
      "white": "#FFFDF4",
      "red": "#E82144",
      "soft": "#EFDCE2"
    },
    "posterUrl": "/assets/style-packs/neon-talking-head.jpg",
    "prompt": "Use the editable timeline in `template.json` and compare against `preview.mp4`. Replace the spoken topic and title text while retaining the lime headline, paper plane, red strike, flash, viewfinder, and two red callout cards. Keep the font's natural proportions and fit long copy to the available width. Keep the icon gutter and use diffuse bloom outside each card. Keep scene timing aligned to the new voiceover and preserve a clean cutaway under the camera insert.\n\nInstall FFmpeg and use `python -m pip install opencv-python numpy pillow`. Test against the supplied clean plate or replace it with a vertical clip at least as long as the JSON duration.\n\n```powershell\npython render.py clean.mp4 new-edit.mp4 --template template.json --clean-footage\n```"
  },
  {
    "id": "night-market-ledger",
    "name": "Night Market Ledger",
    "collection": "remix",
    "description": "A destination map, illustrated spending ledger, and warm cut-paper sign-off.",
    "referenceBeats": "",
    "accent": "#FFB55D",
    "palette": {
      "ink": "#193331",
      "paper": "#FFF1D3",
      "accent": "#FFB55D",
      "secondary": "#769A87"
    },
    "posterUrl": "/assets/style-packs/night-market-ledger.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nStart at the destination, show one honest budget figure, and end with an editorial title that names the outing.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses procedural graphics and animation with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "night-route",
    "name": "Night Route",
    "collection": "motion",
    "description": "Topographic contours, a glowing waypoint trail, changing coordinates, and quiet outdoor-film titles.",
    "referenceBeats": "",
    "accent": "#FFAD61",
    "palette": {
      "ink": "#101D25",
      "paper": "#F1EDDA",
      "accent": "#FFAD61",
      "secondary": "#50747B"
    },
    "posterUrl": "/assets/style-packs/night-route.jpg",
    "prompt": "Create a 9\u201312 second vertical edit for **[topic or product]** using this pack. Watch `preview.mp4` and edit a copy of `template.json`. Use this direction for the edit.\n\nTreat each scene as a new chapter in a short route. Use place names and simple practical details. Route points are illustrative unless the agent has actual coordinates and a track to map.\n\nReplace the `lead`, two `headline` lines, `items`, and `tag` per scene. Preserve each scene's number of items because they map to graphic slots. Update `seconds` to suit the new rhythm, and keep the scene `type` for this style. The optional `mode` selects the composition used by the corresponding scene index. Adjust the four colors in `palette` for the new brand. Use short, readable copy and preserve the font's natural proportions.\n\nRender the new MP4, inspect frames at the start, middle, and end of every scene, and deliver the updated JSON and final video. The sample uses vector animation and an original synthesized soundtrack. The artwork is generated by the included Python renderer.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. Windows Arial, Georgia, and Consolas fonts are used.\n\n```powershell\npython render.py template.json new-edit.mp4 --audio sample-audio.wav\n```\n\nUse a WAV or an MP4 with your own audio to change the soundtrack. A shorter track is padded with silence. Use the included WAV as an editable starting track."
  },
  {
    "id": "notebook-faceoff",
    "name": "Notebook Faceoff",
    "collection": "pins",
    "description": "A two-person challenge with a graph-paper backdrop, hand-lettered notebook title, sticker cues, and a reveal card.",
    "referenceBeats": "Two people face each other across a table. A ripped ruled-paper title and scattered labels occupy the space above them. Small doodles point toward the reveal.",
    "accent": "#FFD24C",
    "palette": {
      "ink": "#20272B",
      "paper": "#FCF9ED",
      "accent": "#FFD24C",
      "secondary": "#6AB2C2"
    },
    "posterUrl": "/assets/style-packs/notebook-faceoff.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nKeep faces and the gesture visible. Change both player labels, the challenge on the notebook sheet, and the final outcome. Place stickers around the title instead of on faces.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nAttached Brain Tease poster.\n\nTwo people face each other across a table. A ripped ruled-paper title and scattered labels occupy the space above them. Small doodles point toward the reveal.\n\n\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main."
  },
  {
    "id": "notebook-to-result",
    "name": "Notebook to Result",
    "collection": "remix",
    "description": "A handwritten question moves into a fair visual comparison and ends on a notebook reveal.",
    "referenceBeats": "",
    "accent": "#FDD15B",
    "palette": {
      "ink": "#25323F",
      "paper": "#FFF3D6",
      "accent": "#FDD15B",
      "secondary": "#75A4BC"
    },
    "posterUrl": "/assets/style-packs/notebook-to-result.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nLet the notebook set the question, give each option equal space, then end on one short answer.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main, choice."
  },
  {
    "id": "object-passport",
    "name": "Object Passport",
    "collection": "remix",
    "description": "A reflective object, a schematic route, and a bright launch card tell a three-beat product story.",
    "referenceBeats": "",
    "accent": "#FA7859",
    "palette": {
      "ink": "#151C2A",
      "paper": "#F4F0E6",
      "accent": "#FA7859",
      "secondary": "#90A6E2"
    },
    "posterUrl": "/assets/style-packs/object-passport.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nShow the object, show its journey through three labeled stations, then end with a product hold.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses procedural graphics and animation with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "one-lamp-three-shots",
    "name": "One Lamp, Three Shots",
    "collection": "creator",
    "description": "A macro reflection, a cut in the same direction, then a held view of the full object.",
    "referenceBeats": "",
    "accent": "#FF9C64",
    "palette": {
      "ink": "#10131C",
      "paper": "#FFF5E7",
      "accent": "#FF9C64",
      "secondary": "#789AC3"
    },
    "posterUrl": "/assets/style-packs/one-lamp-three-shots.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nUse one consistent key light and object. Keep the movement traveling in the same screen direction through the first cut. Use a short sound at each transition and leave the product in frame for the ending.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nDaniel Schiffer.\n\nThe editable scenes specify the hook, development, and payoff.\n\n- [Shot and transition planning](https://www.youtube.com/watch?v=3mZuJAWH1Ow)\n\nThe preview uses procedural graphics and animation with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "one-minute-poster",
    "name": "One-Minute Poster",
    "collection": "creator",
    "description": "An action-first hook, two visible poster changes, and a held finished result.",
    "referenceBeats": "",
    "accent": "#FF805C",
    "palette": {
      "ink": "#242024",
      "paper": "#FFF5DD",
      "accent": "#FF805C",
      "secondary": "#D7E99C"
    },
    "posterUrl": "/assets/style-packs/one-minute-poster.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nShow the messy poster and an already-running timer on the opening frame. Make hierarchy and cleanup visible as separate changes. End on the exact poster promised by the hook. This is an illustrative edit with a compressed timer.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nJenny Hoyos.\n\nThe editable scenes specify the hook, development, and payoff.\n\n- [Shorts interview with Jenny Hoyos](https://blog.youtube/creator-and-artist-stories/youtube-shorts-deep-dive/)\n\nThe preview uses procedural graphics and animation with synthetic narration. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "one-shot-score",
    "name": "One-Shot Score",
    "collection": "remix",
    "description": "A cobalt timer frames a single product move, with a scorecard finish and one concrete check.",
    "referenceBeats": "",
    "accent": "#FFE476",
    "palette": {
      "ink": "#18234F",
      "paper": "#F0F3FF",
      "accent": "#FFE476",
      "secondary": "#4D77E3"
    },
    "posterUrl": "/assets/style-packs/one-shot-score.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nGive yourself one timed attempt, show the unbroken object move, and use the scoreboard for one honest result.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses procedural graphics and animation with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --audio my-voiceover.wav\n```\n\nThe artwork in this pack is drawn by the renderer."
  },
  {
    "id": "paper-cut-manifesto",
    "name": "Paper Cut Manifesto",
    "collection": "motion",
    "description": "Cut-paper waves, grain, halftone print, rotating stickers, and bold type on a warm zine palette.",
    "referenceBeats": "",
    "accent": "#ED573E",
    "palette": {
      "ink": "#2B2347",
      "paper": "#F8EACC",
      "accent": "#ED573E",
      "secondary": "#F2BF58"
    },
    "posterUrl": "/assets/style-packs/paper-cut-manifesto.jpg",
    "prompt": "Create a 9\u201312 second vertical edit for **[topic or product]** using this pack. Watch `preview.mp4` and edit a copy of `template.json`. Use this direction for the edit.\n\nUse a short personal manifesto with two lines per beat. Let the paper and stamps move ahead of the words. Reserve the coral color for the action phrase and keep the type large and naturally proportioned.\n\nReplace the `lead`, two `headline` lines, `items`, and `tag` per scene. Preserve each scene's number of items because they map to graphic slots. Update `seconds` to suit the new rhythm, and keep the scene `type` for this style. The optional `mode` selects the composition used by the corresponding scene index. Adjust the four colors in `palette` for the new brand. Use short, readable copy and preserve the font's natural proportions.\n\nRender the new MP4, inspect frames at the start, middle, and end of every scene, and deliver the updated JSON and final video. The sample uses vector animation and an original synthesized soundtrack. The artwork is generated by the included Python renderer.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. Windows Arial, Georgia, and Consolas fonts are used.\n\n```powershell\npython render.py template.json new-edit.mp4 --audio sample-audio.wav\n```\n\nUse a WAV or an MP4 with your own audio to change the soundtrack. A shorter track is padded with silence. Use the included WAV as an editable starting track."
  },
  {
    "id": "paper-to-pixel",
    "name": "Paper to Pixel",
    "collection": "remix",
    "description": "Torn paper, a cursor-led workspace, and a final poster proof in one edit.",
    "referenceBeats": "",
    "accent": "#FF906A",
    "palette": {
      "ink": "#322642",
      "paper": "#F9E6CC",
      "accent": "#FF906A",
      "secondary": "#76D1C5"
    },
    "posterUrl": "/assets/style-packs/paper-to-pixel.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nTreat the paper as the rough draft. Cut to a visible digital action before showing the finished layout.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "podcast-keyword-cuts",
    "name": "Podcast Keyword Cuts",
    "collection": "creator",
    "description": "Conversation cuts, bold white keywords, small supporting words and airy B-roll.",
    "referenceBeats": "0\u20132.5s question and nested white words over speaker one. 2.5\u20138s second speaker with oversized keywords. 8\u201314s alternate speaker and close B-roll. 14\u201319.5s outdoor story B-roll. 19.5\u201320.5s return to guest.",
    "accent": "#FAFAFA",
    "palette": {},
    "posterUrl": "/assets/style-packs/podcast-keyword-cuts.jpg",
    "prompt": "Create a new vertical short on **[topic]** using the supplied clean footage and script. Read `template.json` and preview `preview.mp4`. Keep the visual grammar of this pack. Write new `lead`, `headline`, `tag`, and `items` values in the existing scenes. Match `seconds` to the audio. Set `sourceStart` for each video shot when the same asset is used more than once. Keep text inside the safe area, preserve native font proportions, and use glow behind the glyphs and graphic shapes. Keep the subject's face clear. Render a new MP4 and deliver the updated JSON plus any new media references.\n\nReference timing observed in the attached edit\n\n0\u20132.5s question and nested white words over speaker one. 2.5\u20138s second speaker with oversized keywords. 8\u201314s alternate speaker and close B-roll. 14\u201319.5s outdoor story B-roll. 19.5\u201320.5s return to guest.\n\nThe preview uses a short timeline and new copy. For a longer cut, start from `reference-timeline.json`. Its scene boundaries approximate the original pacing. Replace the placeholder copy and align the beats to your own audio.\n\n## Edit and render on Windows\n\nInstall FFmpeg and put it on PATH. Install Python dependencies with `python -m pip install opencv-python numpy pillow`.\n\n```powershell\npython render.py template.json test.mp4 --audio preview.mp4\npython render.py template.json final.mp4 --footage \"main=your-clip.mp4\" --audio narration.wav\npython render.py template.json clean.mp4 --clean\n```\n\nUse one `--footage SLOT=PATH` option per replacement. Available slots are main, broll. If a source shot is shorter than its scene, its last frame holds. Pass a mixed narration or music track explicitly with `--audio`. Use a transparent PNG for a custom collage cutout. The sample uses synthetic narration over animated stills. The original reference clips are separate."
  },
  {
    "id": "postcard-pop",
    "name": "Postcard Pop",
    "collection": "pins",
    "description": "A sunny host, fan-out photo postcards, vivid yellow emphasis, and a full-bleed destination reveal.",
    "referenceBeats": "Floating destination images frame a presenter, yellow keywords punctuate the pitch, and the edit cuts from the host to full-bleed architectural imagery and a card montage.",
    "accent": "#FFE047",
    "palette": {
      "ink": "#15364A",
      "paper": "#FFF8E9",
      "accent": "#FFE047",
      "secondary": "#1B78A1"
    },
    "posterUrl": "/assets/style-packs/postcard-pop.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nOpen with one destination question, reveal three labeled photos, then let a single place fill the screen. Use your own locations or label illustrative images in the edit.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nAugmented reality advertising Pin.\n\nFloating destination images frame a presenter, yellow keywords punctuate the pitch, and the edit cuts from the host to full-bleed architectural imagery and a card montage.\n\n- [Travel and property edit](https://www.pinterest.com/pin/877920521130797010/)\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main, coast, rooftops, arcade."
  },
  {
    "id": "pulse-score",
    "name": "Pulse Score",
    "collection": "motion",
    "description": "Cobalt scoreboards, huge timer digits, staggered performance bars, and a punchy competition-style end card.",
    "referenceBeats": "",
    "accent": "#FEDE61",
    "palette": {
      "ink": "#131C50",
      "paper": "#F2F5FE",
      "accent": "#FEDE61",
      "secondary": "#446AF4"
    },
    "posterUrl": "/assets/style-packs/pulse-score.jpg",
    "prompt": "Create a 9\u201312 second vertical edit for **[topic or product]** using this pack. Watch `preview.mp4` and edit a copy of `template.json`. Use this direction for the edit.\n\nOpen with a specific challenge, show the steps in the second beat, and use the final beat for a finish marker. Treat the numbers and labels as editable parts of the story. Avoid outcome claims if the input is illustrative.\n\nReplace the `lead`, two `headline` lines, `items`, and `tag` per scene. Preserve each scene's number of items because they map to graphic slots. Update `seconds` to suit the new rhythm, and keep the scene `type` for this style. The optional `mode` selects the composition used by the corresponding scene index. Adjust the four colors in `palette` for the new brand. Use short, readable copy and preserve the font's natural proportions.\n\nRender the new MP4, inspect frames at the start, middle, and end of every scene, and deliver the updated JSON and final video. The sample uses vector animation and an original synthesized soundtrack. The artwork is generated by the included Python renderer.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. Windows Arial, Georgia, and Consolas fonts are used.\n\n```powershell\npython render.py template.json new-edit.mp4 --audio sample-audio.wav\n```\n\nUse a WAV or an MP4 with your own audio to change the soundtrack. A shorter track is padded with silence. Use the included WAV as an editable starting track."
  },
  {
    "id": "quiet-case-study",
    "name": "Quiet Case Study",
    "collection": "remix",
    "description": "Warm journal texture, a clean poster proof, and an understated serif conclusion.",
    "referenceBeats": "",
    "accent": "#F4BF9C",
    "palette": {
      "ink": "#352624",
      "paper": "#FFF1E0",
      "accent": "#F4BF9C",
      "secondary": "#C78B78"
    },
    "posterUrl": "/assets/style-packs/quiet-case-study.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nKeep the pace unhurried. Show one change to the work, then use the final line to explain why it helped.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "red-storyboard",
    "name": "Red Storyboard",
    "collection": "creator",
    "description": "Dark host, hot-red keyword, handwritten accents and black-and-white graph-paper inserts.",
    "referenceBeats": "0\u20133.1s dark talking head with red number and handwriting. 3.2\u20135s grayscale grid card with tool icons. 5\u20138.7s talking head and red decision/burnout words. 8.7\u201311.6s grayscale concept image and clock card.",
    "accent": "#FF3B53",
    "palette": {},
    "posterUrl": "/assets/style-packs/red-storyboard.jpg",
    "prompt": "Create a new vertical short on **[topic]** using the supplied clean footage and script. Read `template.json` and preview `preview.mp4`. Keep the visual grammar of this pack. Write new `lead`, `headline`, `tag`, and `items` values in the existing scenes. Match `seconds` to the audio. Set `sourceStart` for each video shot when the same asset is used more than once. Keep text inside the safe area, preserve native font proportions, and use glow behind the glyphs and graphic shapes. Keep the subject's face clear. Render a new MP4 and deliver the updated JSON plus any new media references.\n\nReference timing observed in the attached edit\n\n0\u20133.1s dark talking head with red number and handwriting. 3.2\u20135s grayscale grid card with tool icons. 5\u20138.7s talking head and red decision/burnout words. 8.7\u201311.6s grayscale concept image and clock card.\n\nThe preview uses a short timeline and new copy. For a longer cut, start from `reference-timeline.json`. Its scene boundaries approximate the original pacing. Replace the placeholder copy and align the beats to your own audio.\n\n## Edit and render on Windows\n\nInstall FFmpeg and put it on PATH. Install Python dependencies with `python -m pip install opencv-python numpy pillow`.\n\n```powershell\npython render.py template.json test.mp4 --audio preview.mp4\npython render.py template.json final.mp4 --footage \"main=your-clip.mp4\" --audio narration.wav\npython render.py template.json clean.mp4 --clean\n```\n\nUse one `--footage SLOT=PATH` option per replacement. Available slots are main. If a source shot is shorter than its scene, its last frame holds. Pass a mixed narration or music track explicitly with `--audio`. Use a transparent PNG for a custom collage cutout. The sample uses synthetic narration over animated stills. The original reference clips are separate."
  },
  {
    "id": "signal-grid",
    "name": "Signal Grid",
    "collection": "motion",
    "description": "A dark broadcast grid with a responsive trace, signal pings, and kinetic mono typography.",
    "referenceBeats": "",
    "accent": "#D6F767",
    "palette": {
      "ink": "#101A13",
      "paper": "#EFF5E6",
      "accent": "#D6F767",
      "secondary": "#476348"
    },
    "posterUrl": "/assets/style-packs/signal-grid.jpg",
    "prompt": "Create a 9\u201312 second vertical edit for **[topic or product]** using this pack. Watch `preview.mp4` and edit a copy of `template.json`. Use this direction for the edit.\n\nUse one signal or takeaway per chapter. Open with an active trace, then isolate a detail, then resolve to the call to action. Keep numeric readouts clearly illustrative unless they come from real data.\n\nReplace the `lead`, two `headline` lines, `items`, and `tag` per scene. Preserve each scene's number of items because they map to graphic slots. Update `seconds` to suit the new rhythm, and keep the scene `type` for this style. The optional `mode` selects the composition used by the corresponding scene index. Adjust the four colors in `palette` for the new brand. Use short, readable copy and preserve the font's natural proportions.\n\nRender the new MP4, inspect frames at the start, middle, and end of every scene, and deliver the updated JSON and final video. The sample uses vector animation and an original synthesized soundtrack. The artwork is generated by the included Python renderer.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. Windows Arial, Georgia, and Consolas fonts are used.\n\n```powershell\npython render.py template.json new-edit.mp4 --audio sample-audio.wav\n```\n\nUse a WAV or an MP4 with your own audio to change the soundtrack. A shorter track is padded with silence. Use the included WAV as an editable starting track."
  },
  {
    "id": "split-decision",
    "name": "Split Decision",
    "collection": "motion",
    "description": "A tactile before-and-after slider, asymmetric type, and paired graphic scenes that reveal the difference in motion.",
    "referenceBeats": "",
    "accent": "#B7ECFF",
    "palette": {
      "ink": "#22223A",
      "paper": "#F1F1FA",
      "accent": "#B7ECFF",
      "secondary": "#E5D6FB"
    },
    "posterUrl": "/assets/style-packs/split-decision.jpg",
    "prompt": "Create a 9\u201312 second vertical edit for **[topic or product]** using this pack. Watch `preview.mp4` and edit a copy of `template.json`. Use this direction for the edit.\n\nCompare two concrete visual states. Keep both sides in the same visual frame of reference. Use short labels and a single sentence explaining what changed. The comparison is illustrative and does not claim measured improvement.\n\nReplace the `lead`, two `headline` lines, `items`, and `tag` per scene. Preserve each scene's number of items because they map to graphic slots. Update `seconds` to suit the new rhythm, and keep the scene `type` for this style. The optional `mode` selects the composition used by the corresponding scene index. Adjust the four colors in `palette` for the new brand. Use short, readable copy and preserve the font's natural proportions.\n\nRender the new MP4, inspect frames at the start, middle, and end of every scene, and deliver the updated JSON and final video. The sample uses vector animation and an original synthesized soundtrack. The artwork is generated by the included Python renderer.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. Windows Arial, Georgia, and Consolas fonts are used.\n\n```powershell\npython render.py template.json new-edit.mp4 --audio sample-audio.wav\n```\n\nUse a WAV or an MP4 with your own audio to change the soundtrack. A shorter track is padded with silence. Use the included WAV as an editable starting track."
  },
  {
    "id": "sunlit-data-drop",
    "name": "Sunlit Data Drop",
    "collection": "remix",
    "description": "Outdoor sky captions give way to a live-looking signal insert and a simple on-camera close.",
    "referenceBeats": "",
    "accent": "#FBF04E",
    "palette": {
      "ink": "#19304B",
      "paper": "#F3F9EF",
      "accent": "#FBF04E",
      "secondary": "#7CB4C6"
    },
    "posterUrl": "/assets/style-packs/sunlit-data-drop.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nLet the host ask the question in clean headroom. Use a labeled illustrative signal, then return to the human point.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "three-attempts",
    "name": "Three Attempts",
    "collection": "remix",
    "description": "Notebook challenge meets poster iteration and a timed finish.",
    "referenceBeats": "",
    "accent": "#FFB34F",
    "palette": {
      "ink": "#282735",
      "paper": "#FFF2D7",
      "accent": "#FFB34F",
      "secondary": "#9ED0C4"
    },
    "posterUrl": "/assets/style-packs/three-attempts.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nIntroduce the competitors, show one change in the work, and use the finish card to ask viewers to pick.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "three-second-audit",
    "name": "Three-Second Audit",
    "collection": "remix",
    "description": "A scoreboard starts the audit, yellow nodes isolate the issue, and a rebuilt poster closes it.",
    "referenceBeats": "",
    "accent": "#FAD642",
    "palette": {
      "ink": "#272537",
      "paper": "#FFF5DA",
      "accent": "#FAD642",
      "secondary": "#82D1EB"
    },
    "posterUrl": "/assets/style-packs/three-second-audit.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nUse the timer as a constraint. Mark the area that needs attention and finish on the changed design.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "title-surgery",
    "name": "Title Surgery",
    "collection": "remix",
    "description": "Tracking boxes isolate a type problem, a cue replay demonstrates timing, and the rebuilt poster proves the fix.",
    "referenceBeats": "",
    "accent": "#FFD34D",
    "palette": {
      "ink": "#24262E",
      "paper": "#FFF4DB",
      "accent": "#FFD34D",
      "secondary": "#63CEF0"
    },
    "posterUrl": "/assets/style-packs/title-surgery.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nShow one typographic fault, isolate when it lands, and reveal the repaired design with the original information.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main."
  },
  {
    "id": "violet-blueprint",
    "name": "Violet Blueprint",
    "collection": "creator",
    "description": "Blue-lit host, violet marker light, white explainer inserts and a glass blueprint panel.",
    "referenceBeats": "0\u20133s violet flash, host and animated underline. 3\u20136s white inset and answer slide. 6\u201311s host with mistake list. 11\u201314s lavender question card. 15\u201317s dark grid blueprint. 18\u201324s host, flow graphic and closing topic.",
    "accent": "#B77AFF",
    "palette": {},
    "posterUrl": "/assets/style-packs/violet-blueprint.jpg",
    "prompt": "Create a new vertical short on **[topic]** using the supplied clean footage and script. Read `template.json` and preview `preview.mp4`. Keep the visual grammar of this pack. Write new `lead`, `headline`, `tag`, and `items` values in the existing scenes. Match `seconds` to the audio. Set `sourceStart` for each video shot when the same asset is used more than once. Keep text inside the safe area, preserve native font proportions, and use glow behind the glyphs and graphic shapes. Keep the subject's face clear. Render a new MP4 and deliver the updated JSON plus any new media references.\n\nReference timing observed in the attached edit\n\n0\u20133s violet flash, host and animated underline. 3\u20136s white inset and answer slide. 6\u201311s host with mistake list. 11\u201314s lavender question card. 15\u201317s dark grid blueprint. 18\u201324s host, flow graphic and closing topic.\n\nThe preview uses a short timeline and new copy. For a longer cut, start from `reference-timeline.json`. Its scene boundaries approximate the original pacing. Replace the placeholder copy and align the beats to your own audio.\n\n## Edit and render on Windows\n\nInstall FFmpeg and put it on PATH. Install Python dependencies with `python -m pip install opencv-python numpy pillow`.\n\n```powershell\npython render.py template.json test.mp4 --audio preview.mp4\npython render.py template.json final.mp4 --footage \"main=your-clip.mp4\" --audio narration.wav\npython render.py template.json clean.mp4 --clean\n```\n\nUse one `--footage SLOT=PATH` option per replacement. Available slots are main. If a source shot is shorter than its scene, its last frame holds. Pass a mixed narration or music track explicitly with `--audio`. Use a transparent PNG for a custom collage cutout. The sample uses synthetic narration over animated stills. The original reference clips are separate."
  },
  {
    "id": "warm-editorial",
    "name": "Warm Editorial",
    "collection": "creator",
    "description": "Amber podcast lighting, elegant serif captions, cream metric cards and a search-field close.",
    "referenceBeats": "0\u20134s warm host, serif text, avatar proof card. 4\u201311s centered editorial phrase stacks. 12\u201317s peach card grid. 18\u201322s return to host. 23\u201325s clock and labels. 26\u201337s host, hand-drawn underline and search CTA.",
    "accent": "#DF9271",
    "palette": {},
    "posterUrl": "/assets/style-packs/warm-editorial.jpg",
    "prompt": "Create a new vertical short on **[topic]** using the supplied clean footage and script. Read `template.json` and preview `preview.mp4`. Keep the visual grammar of this pack. Write new `lead`, `headline`, `tag`, and `items` values in the existing scenes. Match `seconds` to the audio. Set `sourceStart` for each video shot when the same asset is used more than once. Keep text inside the safe area, preserve native font proportions, and use glow behind the glyphs and graphic shapes. Keep the subject's face clear. Render a new MP4 and deliver the updated JSON plus any new media references.\n\nReference timing observed in the attached edit\n\n0\u20134s warm host, serif text, avatar proof card. 4\u201311s centered editorial phrase stacks. 12\u201317s peach card grid. 18\u201322s return to host. 23\u201325s clock and labels. 26\u201337s host, hand-drawn underline and search CTA.\n\nThe preview uses a short timeline and new copy. For a longer cut, start from `reference-timeline.json`. Its scene boundaries approximate the original pacing. Replace the placeholder copy and align the beats to your own audio.\n\n## Edit and render on Windows\n\nInstall FFmpeg and put it on PATH. Install Python dependencies with `python -m pip install opencv-python numpy pillow`.\n\n```powershell\npython render.py template.json test.mp4 --audio preview.mp4\npython render.py template.json final.mp4 --footage \"main=your-clip.mp4\" --audio narration.wav\npython render.py template.json clean.mp4 --clean\n```\n\nUse one `--footage SLOT=PATH` option per replacement. Available slots are main. If a source shot is shorter than its scene, its last frame holds. Pass a mixed narration or music track explicitly with `--audio`. Use a transparent PNG for a custom collage cutout. The sample uses synthetic narration over animated stills. The original reference clips are separate."
  },
  {
    "id": "waterfront-reset",
    "name": "Waterfront Reset",
    "collection": "pins",
    "description": "Sunlit presenter reframes, open-sky captions, a bright yellow keyword, and a bold reset chapter card.",
    "referenceBeats": "A mid-shot asks the hook, a quick cut opens to a wide waterfront frame, then white upper captions alternate with punchy yellow keywords and a reset title.",
    "accent": "#FFF24B",
    "palette": {
      "ink": "#19304A",
      "paper": "#FFFFFF",
      "accent": "#FFF24B",
      "secondary": "#9CD5EB"
    },
    "posterUrl": "/assets/style-packs/waterfront-reset.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nStart close, cut wide on the first payoff, then move closer again. Fit a short supporting line above a yellow keyword in the sky. Use brief spoken phrases that map to each reveal.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nAttached downloaded-file (5).mp4.\n\nA mid-shot asks the hook, a quick cut opens to a wide waterfront frame, then white upper captions alternate with punchy yellow keywords and a reset title.\n\n\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main."
  },
  {
    "id": "weekend-draft",
    "name": "Weekend Draft",
    "collection": "remix",
    "description": "A travel postcard opener cuts to a torn-paper itinerary and finishes in a full-bleed destination.",
    "referenceBeats": "",
    "accent": "#FFD64D",
    "palette": {
      "ink": "#21404D",
      "paper": "#FFF3E0",
      "accent": "#FFD64D",
      "secondary": "#87B9CF"
    },
    "posterUrl": "/assets/style-packs/weekend-draft.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nOpen with a destination question, show a three-item itinerary, then hold the place that answers the hook.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nOriginal mixed-style study.\n\nThe editable scenes specify the hook, development, and payoff.\n\n\n\nThe preview uses generated photography with animated reframing and graphics with an original synthesized score. The animated overlays and scene timing are editable. Keep each scene's `engine` and `type` values when adapting its treatment.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace media with one `--footage SLOT=PATH` option per slot. Available slots are main, coast, rooftops, arcade."
  },
  {
    "id": "yellow-design-nodes",
    "name": "Yellow Design Nodes",
    "collection": "pins",
    "description": "A bright studio portrait with black editorial type, yellow pills, and tracked-looking design nodes.",
    "referenceBeats": "Black editorial headline above the subject, a yellow supporting pill, small tracking rectangles and dotted paths across the clothing, then a wide yellow action strip.",
    "accent": "#FFD52A",
    "palette": {
      "ink": "#141413",
      "paper": "#F8F7F3",
      "accent": "#FFD52A",
      "secondary": "#59CFF4"
    },
    "posterUrl": "/assets/style-packs/yellow-design-nodes.jpg",
    "prompt": "Create a vertical edit from my footage and script. Watch `preview.mp4` and edit a copy of `template.json`.\n\nPut the two-line promise in the headroom. Keep the nodes below the subject\u2019s face. Use the final yellow pill as the payoff. The nodes are animated decorative overlays and can be repositioned in the JSON.\n\nReplace the `lead`, `headline`, `tag`, and `items` with original copy. Keep the number of headline lines and item slots in each scene. Align the graphic entrances to the spoken hook and payoff. Use `sourceStart` to select the footage segment for each scene and `seconds` to control its duration. Preserve natural font proportions, keep the subject clear, and preview the result muted to check the visual story. Deliver an edited MP4 and updated JSON.\n\n## Reference and treatment\n\nAttached design-story poster.\n\nBlack editorial headline above the subject, a yellow supporting pill, small tracking rectangles and dotted paths across the clothing, then a wide yellow action strip.\n\n\n\nThe preview uses generated stills with reframing and synthetic narration. The animated overlays and scene timing are editable.\n\n## Re-render on Windows\n\nInstall FFmpeg on PATH and run `python -m pip install opencv-python numpy pillow`. The pack uses standard Windows fonts.\n\n```powershell\npython render.py template.json preview-copy.mp4 --audio sample-audio.wav\npython render.py template.json my-edit.mp4 --footage \"main=my-footage.mp4\" --audio my-voiceover.wav\n```\n\nReplace any available slot with another `--footage SLOT=PATH` option. Available slots are main. Set `nodes` in a scene to a list of [x, y] positions on the 720 \u00d7 1280 canvas."
  }
];

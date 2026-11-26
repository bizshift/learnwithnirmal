# LTX Desktop — Tester Build: Install Guide

This is a test build of LTX Desktop 1.3.3 (AI video generation, runs on your own PC).
It is the official 1.3.3 code with two changes:

- **Works on 8 GB NVIDIA cards** (e.g. RTX 4060). The official build needs 9 GB+ VRAM
  and shows "Coming soon to your device" on smaller cards. Very large jobs on small cards
  are attempted rather than refused, so they can fail partway through.
- **Fast decode is on by default**, so clips longer than ~3 seconds do not fail with
  `CAPABILITY_FAILED` on 8 GB cards. You can turn it off in Settings → Fast decode.

## What your PC needs

| | Minimum | Recommended |
|---|---|---|
| Windows | Windows 10/11, 64-bit | Windows 11 |
| Graphics card | **NVIDIA** with 8 GB VRAM | NVIDIA with 12 GB+ VRAM |
| RAM | 32 GB | 32 GB+ |
| Free disk space | ~80 GB on an SSD | NVMe SSD |
| Internet | Needed for the first-run downloads (~72 GB total) | Fast connection |

No NVIDIA card (AMD, Intel, laptop without a dedicated GPU)? The app installs and opens,
but cannot generate video on the PC. It can only generate through the paid LTX cloud API
(you would add an LTX API key in Settings).

## Install

1. Run **`LTX Desktop-Setup-1.3.3-tester.exe`**.
2. Windows shows **"Windows protected your PC"** because this test build is not code-signed.
   Click **More info** → **Run anyway**.
3. Choose **Only for me**, keep the folder, click **Install**. It also installs the
   Microsoft Visual C++ runtime if your PC needs it.
4. Open **LTX Desktop** from the desktop shortcut or Start menu.

## First launch (one time, mostly downloading)

1. The app downloads its Python runtime (~3.3 GB). Wait for it to finish.
2. **Hugging Face access** — the LTX 2.5 model is free but gated:
   - Click **Sign in with Hugging Face** and sign in (create a free account if needed).
   - Click **Accept the license** when asked, on the Hugging Face page that opens.
3. The app downloads the models (~68 GB). This takes a while; keep the app open.

## Make your first video

- Go to **Text to Video**, type a prompt, pick **540p** and **5s**, click **Generate**.
- On an RTX 4060 (8 GB): a 5-second 540p clip takes about **5 minutes**, a 20-second clip
  about **11 minutes**. Faster cards are quicker.
- **Close other GPU-heavy apps first** (ComfyUI, games, video editors). They take the
  memory the model needs.

## Good to know

- **Don't install app updates** if LTX Desktop offers one. An update installs the official
  version and removes the fixes in this test build.
- **Refine Details** and **Ingredients** need their own Hugging Face approval. If they fail
  to download, request access on their model pages:
  - https://huggingface.co/Lightricks/LTX-2.5-22b-IC-LoRA-Refine-Details
  - https://huggingface.co/Lightricks/LTX-2.5-22b-IC-LoRA-Ingredients
- **Silent install** (for IT / scripts): `"LTX Desktop-Setup-1.3.3-tester.exe" /S /currentuser`.
  Plain `/S` without `/currentuser` crashes the installer.

## Uninstall

Settings → Apps → **LTX Desktop** → Uninstall. The models stay on disk (~72 GB) in
`%LOCALAPPDATA%\LTXDesktop` — delete that folder to free the space.

## Report a problem

Send the newest log file from `%LOCALAPPDATA%\LTXDesktop\logs` along with what you clicked
and your graphics card model.

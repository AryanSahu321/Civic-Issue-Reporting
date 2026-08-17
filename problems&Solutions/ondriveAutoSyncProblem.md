The screenshot confirms that OneDrive was automatically pulling down individual library files (`semver`, `strip-ansi`) from inside the `node_modules` folder because Node.js tried to read them while the project was stored inside the OneDrive directory.

---

### What to Do Right Now

**1. Clean Up Synced `node_modules**`You do not need OneDrive to keep or sync these downloaded library files. Delete the entire`node_modules` folder so it doesn't clutter your OneDrive storage:

In your VS Code terminal (Git Bash), run:

```bash
rm -rf node_modules package-lock.json

```

---

**2. Move Project Outside OneDrive (Permanent Solution)**

To prevent OneDrive from ever popping up with automatic downloads during development:

1. Close VS Code.
2. In File Explorer, go to your main hard drive (e.g., `C:\`) and create a new folder named `Projects` (or `C:\Dev`).
3. Move the `Civic-Issue-Reporting` folder from `Desktop\civic_issue` to `C:\Projects\Civic-Issue-Reporting`.
4. Open the new path in VS Code (`File` $\rightarrow$ `Open Folder...` $\rightarrow$ `C:\Projects\Civic-Issue-Reporting`).
5. Open Git Bash terminal in VS Code and install your dependencies cleanly:

```bash
npm install --legacy-peer-deps
npx prisma generate

```

---

### Project Documentation Log Entry

**1) Task / Bug Name:**
Windows / OneDrive Automatic File Download Interception in `node_modules`

**2) Root Cause / Context:**
Hosting the project under the OneDrive-synced Desktop folder caused Windows Storage / OneDrive to dehydrate `node_modules` files into cloud-only placeholders. When Node.js attempted runtime reads, OneDrive triggered background downloads and system notifications.

**3) Final Solution / Decision:**
Removed the locally synced `node_modules` directory and relocated the project root directory outside of the OneDrive path (`C:\Projects\...`) to isolate local dependencies from cloud backup sync.

**4) Key Code Snippets / Commands:**

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npx prisma generate
node --watch src/server.js

```

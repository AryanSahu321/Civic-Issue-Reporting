# Project Architecture & Execution Plan

## 📁 Directory Structure

```text
src/
│
├── assets/         # Static files (images, global CSS, SVGs)
│
├── components/     # 🌐 GLOBAL UI ONLY (Dumb/Shared Components)
│   ├── ui/         # Small, highly reusable elements
│   │   ├── StatusBadge.jsx
│   │   ├── SubmitButton.jsx
│   │   └── SectionTitle.jsx
│   └── layout/     # Page wrappers and navigation
│       ├── MobileContainer.jsx
│       ├── TopHeader.jsx
│       └── BottomNav.jsx
│
├── features/       # 🧠 THE BRAINS (Grouped by Business Domain)
│   │
│   ├── feed/       # Everything related to scrolling issues
│   │   └── components/
│   │       ├── FeedPostCard.jsx
│   │       └── CategoryFilter.jsx
│   │
│   ├── reporting/  # Everything related to creating a new issue
│   │   └── components/
│   │       ├── PhotoUploader.jsx
│   │       ├── CategorySelector.jsx
│   │       └── UrgencyToggle.jsx
│   │
│   ├── tracking/   # Everything related to the live journey
│   │   └── components/
│   │       ├── JourneyProgressBar.jsx
│   │       ├── VerticalTimeline.jsx
│   │       ├── BottleneckAlert.jsx
│   │       └── CompactIssueCard.jsx
│   │
│   └── profile/    # Everything related to the user and gamification
│       ├── components/
│       │   ├── UserProfileHeader.jsx
│       │   ├── AchievementBadges.jsx
│       │   └── CivicImpactSummary.jsx
│       └── utils/
│           └── ImpactCalculator.js <-- Moved here because it only belongs to Profile
│
├── pages/          # 🗺️ SCREENS (These stitch features together)
│   ├── IssueFeed.jsx
│   ├── ReportIssue.jsx
│   ├── LiveIssueJourney.jsx
│   ├── MyTrackers.jsx
│   └── MyProfile.jsx
│
└── utils/          # Global utilities (e.g., Haversine distance formula)
```

By doing this, when a bug occurs in the **Photo Uploader**, you don't have to scan through 50 random files. You know exactly where it lives: `features/reporting/`.

This is the exact mindset of a Senior Engineer. Building everything at once and praying it works at the end is a recipe for disaster. We call your approach **Iterative Development with Component-Driven Testing**.

Since we have our folder structure planned and our `dataset.json` ready, here is your **5-Sprint Execution Plan**. We will build, render, and test one logical piece at a time.

### 🏃‍♂️ Sprint 1: The App Skeleton & Navigation (The Foundation)

Before building any complex features, we need the app to look like a mobile app and navigate correctly.

- **Create:** `MobileContainer.jsx`, `TopHeader.jsx`, and `BottomNav.jsx` in the `src/components/layout/` folder.
- **Create:** Blank placeholder files for our 5 pages in `src/pages/` (e.g., `return <div>Feed Page</div>;`).
- **Action:** Set up React Router in `App.jsx` to switch between these 5 pages.
- **🧪 How we test:** Click the icons on the `BottomNav`. Does the screen change? Does the purple mobile border stay consistent? If yes, the skeleton is solid.

### 🏃‍♂️ Sprint 2: The Profile Feature (Quick Win)

Since we already wrote the code for `MyProfile.jsx` and `ImpactCalculator.js`, let's lock this in first.

- **Move:** `ImpactCalculator.js` to `src/features/profile/utils/`.
- **Create:** `CivicImpactSummary.jsx`, `UserProfileHeader.jsx`, and `StatSummaryGrid.jsx` inside `src/features/profile/components/`.
- **Action:** Import them into `src/pages/MyProfile.jsx` and pass the calculated data as props.
- **🧪 How we test:** Navigate to the Profile tab. Do the math calculations match the dummy data? Does the layout look perfect?

### 🏃‍♂️ Sprint 3: The Issue Feed (The Core Experience)

This is where the user scrolls through reports. We will connect our `dataset.json` here.

- **Create:** `FeedPostCard.jsx` inside `src/features/feed/components/`.
- **Action:** In `src/pages/IssueFeed.jsx`, import `dataset.json`. Use a `.map()` function to generate a `FeedPostCard` for every issue in the dataset.
- **🧪 How we test:** Open the Feed tab. Do you see 5 distinct posts with real Unsplash images? Does scrolling work smoothly without breaking the top or bottom navigation bars?

### 🏃‍♂️ Sprint 4: The Report Form (State Management)

Forms are notorious for breaking, so we isolate this sprint to handle user input.

- **Create:** `PhotoUploader.jsx`, `CategorySelector.jsx`, and `UrgencyToggle.jsx` inside `src/features/reporting/components/`.
- **Create:** `SubmitButton.jsx` in `src/components/ui/`.
- **Action:** Assemble them in `src/pages/ReportIssue.jsx`. Set up React `useState` to capture what the user types or clicks.
- **🧪 How we test:** Click "Medium" urgency, select "Pothole", and type a title. Click Submit. We will write a `console.log()` to check if the React State correctly captured all the data the user inputted.

### 🏃‍♂️ Sprint 5: The Live Journey & Trackers (Complex UI)

This is the most visually complex part of the app.

- **Create:** `CompactIssueCard.jsx` for the `MyTrackers.jsx` page to show the list of tracked items.
- **Create:** `VerticalTimeline.jsx` and `BottleneckAlert.jsx` for the `LiveIssueJourney.jsx` page.
- **Action:** Route the app so that clicking a `CompactIssueCard` opens its specific `LiveIssueJourney` page, passing the `timeline` array from `dataset.json`.
- **🧪 How we test:** Does the timeline dynamically render green dots for "completed" steps and orange dots for "active" steps based on the JSON data?

---

### 🚀 Where do we start right now?

To begin **Sprint 1**, you need to set up your folders and routing.

If you are ready, I will give you the exact terminal commands to create the folder tree, and the code for `App.jsx` and `BottomNav.jsx` so we can get your mobile layout running on your screen immediately. Shall we begin?

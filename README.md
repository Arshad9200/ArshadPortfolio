# 🚀 Arshad Ali — 3D Portfolio (React)

---

## 📁 FOLDER STRUCTURE

```
arshad-portfolio/
│
├── public/
│   └── index.html              ← The ONE HTML file. React injects into <div id="root">
│
├── src/
│   ├── index.js                ← Entry point. Mounts App into index.html
│   ├── index.css               ← Global styles, CSS variables
│   ├── App.jsx                 ← Root component. Assembles all components
│   │
│   ├── data/
│   │   └── portfolioData.js    ← ALL content (name, skills, projects, etc.)
│   │
│   ├── hooks/
│   │   └── useMousePosition.js ← Custom hook for mouse tracking
│   │
│   └── components/
│       ├── Cursor.jsx          ← Custom animated cursor
│       ├── ParticleBackground.jsx ← Canvas particle network
│       ├── FloatingTech.jsx    ← Right sidebar tech labels
│       ├── Navbar.jsx          ← Navigation bar
│       ├── HeroCanvas.jsx      ← 3D rotating globe (canvas)
│       ├── Hero.jsx            ← Hero section (name, title, buttons)
│       ├── Skills.jsx          ← Skills grid with 3D tilt cards
│       ├── Experience.jsx      ← Timeline + animated stats
│       ├── Projects.jsx        ← Project cards
│       ├── Contact.jsx         ← Call/Email/Download buttons
│       └── Footer.jsx          ← Footer bar
│
├── package.json                ← Project config + dependencies list
└── README.md                   ← This file
```

---

## ⚙️ SETUP — STEP BY STEP (For Beginners)

### Step 1: Install Node.js
Download from https://nodejs.org — choose the "LTS" version.
After install, verify by opening terminal and typing:
```
node --version
npm --version
```
Both should print version numbers.

---

### Step 2: Create the project folder
Open a terminal (Command Prompt / PowerShell / Terminal) and run:
```bash
mkdir arshad-portfolio
cd arshad-portfolio
```

---

### Step 3: Create package.json
Copy the package.json file into this folder.

---

### Step 4: Install all packages
```bash
npm install
```
This reads package.json and downloads all dependencies into a "node_modules" folder.
It will take 1-2 minutes. You will see a progress bar.

**Packages installed and what they do:**

| Package | Purpose |
|---|---|
| `react` | The core React library |
| `react-dom` | Lets React work in the browser (DOM) |
| `react-scripts` | Create React App tools (build, start, etc.) |
| `framer-motion` | Smooth animations (fade, slide, spring) |
| `react-intersection-observer` | Detect when elements enter the viewport |
| `react-countup` | Animated number counting |
| `react-type-animation` | Typing effect for text |
| `react-scroll` | Smooth scrolling to page sections |

---

### Step 5: Create the folder structure
```bash
mkdir -p src/components src/data src/hooks public
```

---

### Step 6: Copy all files
Copy each file from this project into the matching folder.

---

### Step 7: Run the project
```bash
npm start
```
This opens http://localhost:3000 in your browser automatically.
The page hot-reloads — it updates INSTANTLY when you save a file!

---

### Step 8: Build for production (when deploying)
```bash
npm run build
```
Creates an optimized "build" folder you can upload to any hosting service.

---

## 🎓 HOW TO EXPLAIN THIS IN AN INTERVIEW

---

### Q1: "Tell me about this project. What did you build?"

**Your Answer:**
"I built a fully interactive 3D portfolio website using React.js. The portfolio showcases my skills, experience, and projects with modern animations. Key features include a 3D rotating globe built on HTML Canvas, particle network background, smooth scroll-triggered animations, and one-tap contact actions — clicking the phone button opens the dialer, email opens the mail app, and there's a resume download button. I structured the project following industry best practices: separating data from UI, creating reusable components, and using custom hooks."

---

### Q2: "What is React? Why did you use it?"

**Your Answer:**
"React is a JavaScript library for building user interfaces. It uses a component-based architecture — you break the UI into small, reusable pieces called components. For example, in my portfolio, the Navbar, SkillCard, and ProjectCard are all separate components. React has three main advantages:

1. **Virtual DOM** — React maintains a lightweight copy of the real DOM. When state changes, it only updates the specific parts that changed, making it very fast.
2. **Component Reusability** — I wrote the SkillCard component once and reused it 6 times.
3. **Unidirectional Data Flow** — Data flows one way: from parent to child via props, making bugs easier to find."

---

### Q3: "What are Components, Props, and State?"

**Your Answer:**
"These are the three core concepts in React.

**Components** are like functions that return UI. They're reusable building blocks. For example, my SkillCard component takes data and returns a card element.

**Props** (properties) are how parent components pass data to children — like function parameters. In my Skills section, I pass `name`, `icon`, and `tags` as props to each SkillCard.

**State** is data that can change over time and causes the component to re-render. I use `useState` to track hover states — when you hover a card, `isHovered` changes to true, and React re-renders only that card with updated styles. This is much more efficient than directly manipulating the DOM."

---

### Q4: "Explain useState and useEffect."

**Your Answer:**
"`useState` gives you a reactive variable. You get two things: the current value and a setter function. When you call the setter, React re-renders the component. I use it for hover states, scroll detection, and tilt angles.

`useEffect` handles side effects — things outside React's control like DOM manipulation, event listeners, timers, and API calls. The second argument is the dependency array. Empty `[]` means 'run once on mount'. A cleanup function (returned from useEffect) runs when the component unmounts, preventing memory leaks. I use it for my Canvas animations and scroll listeners."

---

### Q5: "What is a Custom Hook?"

**Your Answer:**
"A custom hook is a reusable function that starts with 'use' and can call other hooks internally. I created `useMousePosition` — it sets up a mousemove event listener inside useEffect and returns the `{x, y}` coordinates. Any component that needs mouse position imports this hook instead of duplicating the setup code. This is the DRY principle — Don't Repeat Yourself — applied to React logic."

---

### Q6: "What is Framer Motion and why use it?"

**Your Answer:**
"Framer Motion is a production-ready animation library for React. Instead of writing complex CSS keyframes or JavaScript timers, you use declarative props: `initial` (starting state), `animate` (end state), and `transition` (how to get there). For example, `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}` fades an element up from below. I also use `useSpring` for the cursor ring — it creates physics-based smooth following with configurable stiffness and damping."

---

### Q7: "What is the Intersection Observer API?"

**Your Answer:**
"It's a browser API that tells you when an element enters or leaves the viewport, without expensive scroll event listeners that fire 60+ times per second. I use the `react-intersection-observer` package which wraps it in a React hook. When `inView` becomes true, I trigger the entrance animation. The `triggerOnce: true` option means the animation only plays once — not every time the user scrolls."

---

### Q8: "How does the Canvas animation work?"

**Your Answer:**
"HTML Canvas provides a 2D drawing context where you can draw shapes with JavaScript. The key is `requestAnimationFrame` — it's the browser's built-in animation loop that runs approximately 60 times per second. Each frame I clear the canvas, update particle positions using velocity, and redraw them. For the 3D globe, I use trigonometry: `Math.sin()` and `Math.cos()` to calculate positions on a sphere from latitude/longitude angles. I increment the angle each frame to create rotation. Tech words orbit in an ellipse — compressing the Y-axis by 0.35 creates the 3D depth illusion."

---

### Q9: "What is the difference between tel: and mailto: links?"

**Your Answer:**
"`tel:` is a URI scheme for phone numbers. When tapped on mobile, the OS opens the Phone dialer with the number pre-filled. On desktop, it opens whatever app handles phone calls. `mailto:` opens the default email client with the To field pre-filled. These are native browser behaviors — no JavaScript needed. This is intentional: for critical contact actions, you want the most reliable, friction-free path. The resume download uses JavaScript's Blob API — I create a text file in memory, generate a temporary URL with `URL.createObjectURL()`, programmatically click a hidden link, then free the memory with `URL.revokeObjectURL()`."

---

### Q10: "How is data separated from UI in your project?"

**Your Answer:**
"I store all content in `src/data/portfolioData.js` as JavaScript objects and arrays. The components import this data and render it. The benefit is that if I want to update my job title, add a new project, or change my email, I only edit one file — the data file. The UI components never change. This is called Separation of Concerns. It also makes the code easier to test: I can test the component with mock data, and test the data separately."

---

## 📞 One-Tap Features Explained

| Button | How it works | Works on |
|---|---|---|
| 📞 Call Now | `href="tel:+917479914419"` | Mobile (opens dialer), Desktop (opens Skype/FaceTime) |
| ✉️ Email Me | `href="mailto:arshaddd0011@gmail.com"` | Mobile + Desktop (opens mail app) |
| ⬇ Download Resume | JavaScript Blob API creates + downloads a .txt file | All devices |

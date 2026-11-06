import React from 'react';

/**
 * Pixel-perfect SVG Tech Icons for Ashish Kumar's Technical Ecosystem.
 * Clean, lightweight, self-contained SVG vectors styled for the cinematic dark palette.
 */

// 1. Python
export function PythonIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M11.91 2C6.98 2 7.29 4.14 7.29 4.14V6.35H12.02V7.07H4.37S2 6.8 2 11.75C2 16.7 4.09 16.48 4.09 16.48H5.73V14.17S5.64 11.43 8.42 11.43H13.12S15.65 11.51 15.65 9.07V4.37S16.03 2 11.91 2ZM9.04 3.46C9.64 3.46 10.13 3.95 10.13 4.55C10.13 5.15 9.64 5.64 9.04 5.64C8.44 5.64 7.95 5.15 7.95 4.55C7.95 3.95 8.44 3.46 9.04 3.46Z"
        fill="#3776AB"
      />
      <path
        d="M12.09 22C17.02 22 16.71 19.86 16.71 19.86V17.65H11.98V16.93H19.63S22 17.2 22 12.25C22 7.3 19.91 7.52 19.91 7.52H18.27V9.83S18.36 12.57 15.58 12.57H10.88S8.35 12.49 8.35 14.93V19.63S7.97 22 12.09 22ZM14.96 20.54C14.36 20.54 13.87 20.05 13.87 19.45C13.87 18.85 14.36 18.36 14.96 18.36C15.56 18.36 16.05 18.85 16.05 19.45C16.05 20.05 15.56 20.54 14.96 20.54Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

// 2. Java
export function JavaIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M8.86 16.29c-.73.47-1.47.78-2.22.78-1.07 0-1.74-.6-1.74-1.57 0-1.46 1.48-2.45 3.96-2.45.69 0 1.34.07 1.89.19-.34 1.35-.97 2.45-1.89 3.05zm4.84-2.82c-.89-.13-1.88-.2-2.92-.2-1.39 0-2.65.17-3.71.5-.07-.37-.1-.76-.1-1.15 0-2.46 1.63-4.14 4.31-4.14 1.6 0 2.97.58 3.86 1.63.4.47.66 1.05.77 1.71-.62.63-1.38 1.19-2.21 1.65zm2.74-2.45c-.24-1.25-.85-2.3-1.77-3.05 1.58-.29 3.25.1 4.35 1.15 1.25 1.18 1.48 2.95.66 4.71-1.03 2.22-3.37 3.75-6.57 4.31 1.53-.78 2.62-1.79 3.1-3.01.27-.69.34-1.4.23-2.11zM7.22 8.35c.19-.8.61-1.55 1.26-2.18 1.77-1.71 4.54-2.17 7.22-1.17-.67.65-1.25 1.42-1.69 2.29-1.99-.58-4.42-.31-6.79 1.06zM3 18.5c1.86 1.83 5.4 2.87 9.17 2.5 3.8-.37 6.88-2.07 7.83-4.32.74-1.77.34-3.55-.95-4.88 1.78 3.22-.05 6.46-4.3 7.64-3.66 1.02-7.97.09-11.75-.94z" />
    </svg>
  );
}

// 3. JavaScript
export function JavaScriptIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6.5 18.5V14.8H8.8V18.5C8.8 19.8 8 20.5 6.5 20.5C5.4 20.5 4.6 20 4.2 19.1L5.8 18.1C6 18.5 6.3 18.7 6.6 18.7C7.1 18.7 7.3 18.5 7.3 18V14.8"
        stroke="#000000"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12.5 19.1C13 19.7 13.8 20.1 14.8 20.1C16.1 20.1 17 19.4 17 18.3C17 17.3 16.3 16.8 15.1 16.3L14.3 16C12.8 15.3 12 14.5 12 13.2C12 11.6 13.2 10.4 15 10.4C16.2 10.4 17.1 10.9 17.7 11.8L16.2 12.8C15.8 12.3 15.4 12 14.9 12C14.1 12 13.6 12.5 13.6 13.1C13.6 13.7 14.1 14.1 15 14.5L15.8 14.8C17.6 15.6 18.6 16.6 18.6 18.2C18.6 20 17.1 21.4 14.8 21.4C13.2 21.4 12 20.6 11.2 19.5L12.5 19.1Z"
        fill="#000000"
      />
    </svg>
  );
}

// 4. Kotlin
export function KotlinIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...props}>
      <defs>
        <linearGradient id="kotlin-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7F52FF" />
          <stop offset="50%" stopColor="#C711E1" />
          <stop offset="100%" stopColor="#E4485D" />
        </linearGradient>
      </defs>
      <polygon points="2,22 22,2 12,2 2,12" fill="url(#kotlin-grad)" />
      <polygon points="2,2 12,2 2,12" fill="#7F52FF" />
      <polygon points="2,22 12,12 22,22" fill="url(#kotlin-grad)" />
    </svg>
  );
}

// 5. Dart
export function DartIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M4 4L14 4L20 10L14 16L4 16L10 10L4 4Z" fill="#0175C2" />
      <path d="M10 10L14 16L14 20L8 20L4 16L10 10Z" fill="#02569B" />
      <path d="M14 4L20 10L20 14L14 20L14 16L20 10L14 4Z" fill="#29B6F6" />
    </svg>
  );
}

// 6. SQL / DBMS
export function SqlIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#F5A14B" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#E87524" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#C25A12" />
    </svg>
  );
}

// 7. React.js
export function ReactIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  );
}

// 8. HTML5
export function Html5Icon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M4 3L5.6 20.5L12 22.3L18.4 20.5L20 3H4Z" fill="#E44D26" />
      <path d="M12 4.6V20.6L16.9 19.2L18.3 4.6H12Z" fill="#F16529" />
      <path d="M8.2 7.8H15.8L15.6 9.8H10.5L10.7 12.1H15.4L15 15.9L12 16.8L9 15.9L8.8 13.9H7.1L7.4 17.3L12 18.6L16.6 17.3L17.2 11H8.5L8.2 7.8Z" fill="#FFFFFF" />
    </svg>
  );
}

// 9. CSS3
export function Css3Icon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M4 3L5.6 20.5L12 22.3L18.4 20.5L20 3H4Z" fill="#1572B6" />
      <path d="M12 4.6V20.6L16.9 19.2L18.3 4.6H12Z" fill="#33A9DC" />
      <path d="M8.2 7.8H15.8L15.6 9.8H10.5L10.7 12.1H15.4L15 15.9L12 16.8L9 15.9L8.8 13.9H7.1L7.4 17.3L12 18.6L16.6 17.3L17.2 11H8.5L8.2 7.8Z" fill="#FFFFFF" />
    </svg>
  );
}

// 10. Bootstrap
export function BootstrapIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect width="24" height="24" rx="5" fill="#7952B3" />
      <path
        d="M8 6h4.5c1.7 0 2.8.9 2.8 2.2 0 .9-.5 1.6-1.3 1.9 1.1.3 1.8 1.1 1.8 2.3 0 1.6-1.3 2.6-3.1 2.6H8V6zm2.2 3.8h2c.6 0 1-.3 1-.8s-.4-.8-1-.8h-2v1.6zm0 3.4h2.2c.7 0 1.2-.4 1.2-1 0-.6-.5-1-1.2-1h-2.2v2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 11. Android SDK
export function AndroidIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="#3DDC84" className={className} {...props}>
      <path d="M5.5 11C4.67 11 4 11.67 4 12.5V17.5C4 18.33 4.67 19 5.5 19C6.33 19 7 18.33 7 17.5V12.5C7 11.67 6.33 11 5.5 11ZM18.5 11C17.67 11 17 11.67 17 12.5V17.5C17 18.33 17.67 19 18.5 19C19.33 19 20 18.33 20 17.5V12.5C20 11.67 19.33 11 18.5 11ZM8 10H16V19H8V10ZM15.54 5.43L16.88 4.09C17.07 3.9 17.07 3.58 16.88 3.39C16.69 3.2 16.37 3.2 16.18 3.39L14.65 4.92C13.85 4.56 12.96 4.35 12 4.35C11.04 4.35 10.15 4.56 9.35 4.92L7.82 3.39C7.63 3.2 7.31 3.2 7.12 3.39C6.93 3.58 6.93 3.9 7.12 4.09L8.46 5.43C6.98 6.43 6 8.1 6 10H18C18 8.1 17.02 6.43 15.54 5.43ZM9.5 8C9.22 8 9 7.78 9 7.5C9 7.22 9.22 7 9.5 7C9.78 7 10 7.22 10 7.5C10 7.78 9.78 8 9.5 8ZM14.5 8C14.22 8 14 7.78 14 7.5C14 7.22 14.22 7 14.5 7C14.78 7 15 7.22 15 7.5C15 7.78 14.78 8 14.5 8Z" />
    </svg>
  );
}

// 12. Flutter
export function FlutterIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M14.2 2L3 13.2L6.7 16.9L17.9 5.7H14.2Z" fill="#02569B" />
      <path d="M14.2 10.5L8.5 16.2L12.2 19.9L17.9 14.2H14.2Z" fill="#0175C2" />
      <path d="M12.2 19.9L15.9 23.6H19.6L14.1 18.1L12.2 19.9Z" fill="#29B6F6" />
      <path d="M14.1 18.1L17.9 14.2L21.6 17.9L17.8 21.7L14.1 18.1Z" fill="#42A5F5" />
    </svg>
  );
}

// 13. Flask
export function FlaskIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M9 3h6M10 3v5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8V3" stroke="#F5F5F5" />
      <path d="M7 16h10" stroke="#E87524" />
      <circle cx="10" cy="18.5" r="1" fill="#E87524" />
      <circle cx="14" cy="18" r="0.8" fill="#F5A14B" />
    </svg>
  );
}

// 14. FastAPI
export function FastApiIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <circle cx="12" cy="12" r="10" fill="#009688" />
      <path d="M13 3L6 14H12L11 21L18 10H12L13 3Z" fill="#FFFFFF" />
    </svg>
  );
}

// 15. Node.js
export function NodeJsIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#339933" />
      <path d="M12 5.5L6.5 8.7V15.2L12 18.4L17.5 15.2V8.7L12 5.5Z" fill="#222222" />
      <path d="M10 9V15L14 12V9H10Z" fill="#68A063" />
    </svg>
  );
}

// 16. Express.js
export function ExpressIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M5.5 8H8l2.2 4-2.2 4H5.5l2.2-4-2.2-4zm8.3 0h3.5v2h-3.5v1.5h3v2h-3v2.5H12V8h1.8zm-4.3 0h2.5l2.2 4-2.2 4H9.5l2.2-4-2.2-4z" />
    </svg>
  );
}

// 17. REST APIs
export function RestApiIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <rect x="2" y="6" width="20" height="12" rx="3" stroke="#E87524" />
      <path d="M6 12h2M11 12h2M16 12h2" stroke="#F5A14B" strokeLinecap="round" />
      <path d="M6 9v6M18 9v6" stroke="#E87524" />
    </svg>
  );
}

// 18. SQLAlchemy
export function SqlAlchemyIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#D71F00" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" fill="#D71F00" />
      <path d="M12 8V16M8 12H16" stroke="#FFFFFF" strokeWidth="1.2" />
    </svg>
  );
}

// 19. JWT Authentication
export function JwtIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="#D63AFF" strokeWidth="1.6" />
      <circle cx="7.5" cy="12" r="1.8" fill="#FB015B" />
      <circle cx="12" cy="12" r="1.8" fill="#00B9F1" />
      <circle cx="16.5" cy="12" r="1.8" fill="#D63AFF" />
    </svg>
  );
}

// 20. MySQL
export function MySqlIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 3C7 3 3 6.5 3 11C3 13.8 4.6 16.3 7 17.6V21L10.8 19.2C11.2 19.3 11.6 19.3 12 19.3C17 19.3 21 15.8 21 11.3C21 6.5 17 3 12 3Z" fill="#00758F" />
      <path d="M12 6C9 6 7 8 7 10.5C7 12 8 13.5 10 14L12 16L14 14C16 13.5 17 12 17 10.5C17 8 15 6 12 6Z" fill="#F29111" />
    </svg>
  );
}

// 21. TiDB
export function TiDbIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <circle cx="12" cy="12" r="9" stroke="#E30C34" strokeWidth="1.8" />
      <path d="M8 8H16V10.5H13.3V16H10.7V10.5H8V8Z" fill="#E30C34" />
    </svg>
  );
}

// 22. MongoDB
export function MongoDbIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 2C11.6 2.4 7 8.2 7 13.2C7 17.3 9.4 20.7 12 22C14.6 20.7 17 17.3 17 13.2C17 8.2 12.4 2.4 12 2Z" fill="#47A248" />
      <path d="M12 2V22C12.3 21.8 17 18 17 13.2C17 8.2 12.4 2.4 12 2Z" fill="#4DB33D" />
      <path d="M12 22V13L10.5 14.5L12 22Z" fill="#3FA037" />
    </svg>
  );
}

// 23. Firebase
export function FirebaseIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M4.5 18L10 3.5L12.5 8.5L4.5 18Z" fill="#FFA000" />
      <path d="M19.5 18L14 8L12.5 8.5L19.5 18Z" fill="#F57C00" />
      <path d="M4.5 18L12 22L19.5 18L12.5 8.5L4.5 18Z" fill="#FFCA28" />
    </svg>
  );
}

// 24. AI / LLMs
export function LlmIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" fill="#E87524" fillOpacity="0.3" stroke="#F5A14B" />
      <circle cx="12" cy="10" r="2" fill="#E87524" />
      <path d="M19 16l1.2 2.8L23 20l-2.8 1.2L19 24l-1.2-2.8L15 20l2.8-1.2L19 16z" fill="#F5A14B" />
    </svg>
  );
}

// 25. Ollama
export function OllamaIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} {...props}>
      <circle cx="12" cy="12" r="9" stroke="#E87524" />
      <path d="M9 10h.01M15 10h.01M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5" stroke="#F5A14B" />
      <path d="M9 6l1 2M15 6l-1 2" stroke="#E87524" />
    </svg>
  );
}

// 26. RAG (Retrieval-Augmented Generation)
export function RagIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <rect x="3" y="4" width="8" height="11" rx="1.5" stroke="#F5A14B" />
      <path d="M6 8h2M6 11h2" stroke="#E87524" strokeLinecap="round" />
      <circle cx="17" cy="15" r="4" stroke="#E87524" />
      <path d="M11 9.5l3 3.5M14 9.5l-3 3.5" stroke="#F5A14B" strokeLinecap="round" />
    </svg>
  );
}

// 27. Vector Search
export function VectorIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <circle cx="6" cy="6" r="2.5" fill="#E87524" />
      <circle cx="18" cy="8" r="2" fill="#F5A14B" />
      <circle cx="14" cy="18" r="2.5" fill="#E87524" />
      <line x1="8.5" y1="6.5" x2="16" y2="7.5" stroke="#737373" strokeDasharray="2 2" />
      <line x1="6" y1="8.5" x2="13" y2="16" stroke="#E87524" />
      <line x1="17" y1="10" x2="14.5" y2="15.5" stroke="#737373" strokeDasharray="2 2" />
    </svg>
  );
}

// 28. Embeddings
export function EmbeddingsIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="#E87524" />
      <line x1="9" y1="4" x2="9" y2="20" stroke="#333333" />
      <line x1="15" y1="4" x2="15" y2="20" stroke="#333333" />
      <line x1="4" y1="9" x2="20" y2="9" stroke="#333333" />
      <line x1="4" y1="15" x2="20" y2="15" stroke="#333333" />
      <circle cx="12" cy="12" r="2" fill="#F5A14B" />
    </svg>
  );
}

// 29. Prompt Engineering
export function PromptIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="#525252" />
      <path d="M7 9l3 3-3 3M12 15h5" stroke="#E87524" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 30. Git
export function GitIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M21.5 10.5L13.5 2.5C13.1 2.1 12.5 2.1 12.1 2.5L10.6 4L13.1 6.5C13.8 6.2 14.7 6.4 15.3 7C15.9 7.6 16.1 8.5 15.8 9.2L18.2 11.6C18.9 11.3 19.8 11.5 20.4 12.1C21.2 12.9 21.2 14.1 20.4 14.9C19.6 15.7 18.4 15.7 17.6 14.9C17 14.3 16.8 13.4 17.1 12.7L14.8 10.4V15.7C15 16 15.1 16.4 15.1 16.8C15.1 17.9 14.2 18.8 13.1 18.8C12 18.8 11.1 17.9 11.1 16.8C11.1 16.1 11.5 15.5 12.1 15.2V9.8L9.7 12.2C9.9 12.6 10 13 10 13.4C10 14.5 9.1 15.4 8 15.4C6.9 15.4 6 14.5 6 13.4C6 12.3 6.9 11.4 8 11.4C8.4 11.4 8.8 11.5 9.1 11.7L11.5 9.3C11.3 8.9 11.1 8.5 11.1 8.1C11.1 7.4 11.5 6.7 12.1 6.4L9.6 3.9L2.5 11C2.1 11.4 2.1 12 2.5 12.4L10.5 20.4C10.9 20.8 11.5 20.8 11.9 20.4L21.5 10.8C21.9 10.4 21.9 9.8 21.5 10.5Z" fill="#F05032" />
    </svg>
  );
}

// 31. Linux
export function LinuxIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <path d="M12 3C9 3 7 5.5 7 9c0 2-.5 3.5-1.5 4.5-.8.8-.5 2.5.5 2.5h12c1 0 1.3-1.7.5-2.5-1-1-1.5-2.5-1.5-4.5 0-3.5-2-6-5-6z" stroke="#F5F5F5" />
      <circle cx="10" cy="8" r="1" fill="#E87524" />
      <circle cx="14" cy="8" r="1" fill="#E87524" />
      <path d="M10.5 11h3" stroke="#F5A14B" strokeLinecap="round" />
      <ellipse cx="8" cy="20" rx="3" ry="1.5" fill="#FFA000" />
      <ellipse cx="16" cy="20" rx="3" ry="1.5" fill="#FFA000" />
    </svg>
  );
}

// 32. Vercel
export function VercelIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <polygon points="12,2 22,20 2,20" />
    </svg>
  );
}

// 33. Render
export function RenderIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect width="24" height="24" rx="5" fill="#121212" stroke="#46E3B7" strokeWidth="1.5" />
      <path d="M7 17V7h5a3.5 3.5 0 0 1 0 7H9.5M12 14l3.5 3" stroke="#46E3B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 34. Agile / Scrum
export function AgileIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" stroke="#E87524" strokeLinecap="round" />
      <path d="M21 7l0 5-5 0" stroke="#F5A14B" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="#F5A14B" />
    </svg>
  );
}

// 35. Data Structures & Algorithms
export function DsaIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <circle cx="12" cy="5" r="2.5" fill="#E87524" stroke="#F5A14B" />
      <circle cx="6" cy="17" r="2.5" fill="#E87524" stroke="#F5A14B" />
      <circle cx="18" cy="17" r="2.5" fill="#E87524" stroke="#F5A14B" />
      <line x1="10.5" y1="7" x2="7.5" y2="15" stroke="#A1A1A1" />
      <line x1="13.5" y1="7" x2="16.5" y2="15" stroke="#A1A1A1" />
    </svg>
  );
}

// 36. Object-Oriented Programming (OOP)
export function OopIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#E87524" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke="#F5A14B" />
      <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

// 37. Computer Networks
export function NetworksIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
      <rect x="3" y="4" width="6" height="5" rx="1" stroke="#E87524" />
      <rect x="15" y="4" width="6" height="5" rx="1" stroke="#E87524" />
      <rect x="9" y="15" width="6" height="5" rx="1" stroke="#F5A14B" />
      <line x1="6" y1="9" x2="6" y2="12" stroke="#737373" />
      <line x1="18" y1="9" x2="18" y2="12" stroke="#737373" />
      <line x1="12" y1="12" x2="12" y2="15" stroke="#737373" />
      <line x1="6" y1="12" x2="18" y2="12" stroke="#737373" />
    </svg>
  );
}

// 38. Fallback Code Icon
export function DefaultTechIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <polyline points="16 18 22 12 16 6" stroke="#E87524" />
      <polyline points="8 6 2 12 8 18" stroke="#F5A14B" />
    </svg>
  );
}

/**
 * Universal TechIcon Component — Maps skill names to their precise SVG icons
 */
export function TechIcon({ name, className = 'w-4 h-4', ...props }) {
  if (!name) return <DefaultTechIcon className={className} {...props} />;

  const key = name.toLowerCase().trim();

  // Languages
  if (key === 'python') return <PythonIcon className={className} {...props} />;
  if (key === 'java') return <JavaIcon className={className} {...props} />;
  if (key === 'javascript' || key === 'js') return <JavaScriptIcon className={className} {...props} />;
  if (key === 'kotlin') return <KotlinIcon className={className} {...props} />;
  if (key === 'dart') return <DartIcon className={className} {...props} />;
  if (key === 'sql') return <SqlIcon className={className} {...props} />;

  // Frontend & Mobile
  if (key.includes('react')) return <ReactIcon className={className} {...props} />;
  if (key.includes('html')) return <Html5Icon className={className} {...props} />;
  if (key.includes('css')) return <Css3Icon className={className} {...props} />;
  if (key.includes('bootstrap')) return <BootstrapIcon className={className} {...props} />;
  if (key.includes('android')) return <AndroidIcon className={className} {...props} />;
  if (key.includes('flutter')) return <FlutterIcon className={className} {...props} />;

  // Backend & Databases
  if (key.includes('flask')) return <FlaskIcon className={className} {...props} />;
  if (key.includes('fastapi')) return <FastApiIcon className={className} {...props} />;
  if (key.includes('node')) return <NodeJsIcon className={className} {...props} />;
  if (key.includes('express')) return <ExpressIcon className={className} {...props} />;
  if (key.includes('rest')) return <RestApiIcon className={className} {...props} />;
  if (key.includes('sqlalchemy')) return <SqlAlchemyIcon className={className} {...props} />;
  if (key.includes('jwt')) return <JwtIcon className={className} {...props} />;
  if (key.includes('mysql')) return <MySqlIcon className={className} {...props} />;
  if (key.includes('tidb')) return <TiDbIcon className={className} {...props} />;
  if (key.includes('mongo')) return <MongoDbIcon className={className} {...props} />;
  if (key.includes('firebase') || key.includes('firestore')) return <FirebaseIcon className={className} {...props} />;

  // AI & ML
  if (key.includes('llm') || key.includes('language model')) return <LlmIcon className={className} {...props} />;
  if (key.includes('ollama')) return <OllamaIcon className={className} {...props} />;
  if (key.includes('rag') || key.includes('retrieval')) return <RagIcon className={className} {...props} />;
  if (key.includes('vector')) return <VectorIcon className={className} {...props} />;
  if (key.includes('embedding')) return <EmbeddingsIcon className={className} {...props} />;
  if (key.includes('prompt')) return <PromptIcon className={className} {...props} />;

  // Tools & Deployment
  if (key === 'git') return <GitIcon className={className} {...props} />;
  if (key.includes('github')) return <GitIcon className={className} {...props} />;
  if (key.includes('linux')) return <LinuxIcon className={className} {...props} />;
  if (key.includes('vercel')) return <VercelIcon className={className} {...props} />;
  if (key.includes('render')) return <RenderIcon className={className} {...props} />;
  if (key.includes('agile') || key.includes('scrum')) return <AgileIcon className={className} {...props} />;

  // Computer Science Core
  if (key.includes('data structure') || key.includes('algorithm') || key === 'dsa') return <DsaIcon className={className} {...props} />;
  if (key.includes('object-oriented') || key.includes('oop')) return <OopIcon className={className} {...props} />;
  if (key.includes('dbms')) return <SqlIcon className={className} {...props} />;
  if (key.includes('network')) return <NetworksIcon className={className} {...props} />;

  return <DefaultTechIcon className={className} {...props} />;
}

export default TechIcon;


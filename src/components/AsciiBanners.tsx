import React from "react";

export function AsciiHeroBanner() {
  return (
    <pre className="font-mono text-[9px] sm:text-[11px] md:text-xs leading-[1.1] text-[var(--muted)] opacity-60 select-none overflow-x-auto whitespace-pre">
{`
   _____ _    _ _______      __     _   _  _____    _____ _    _ _____ _______       
  / ____| |  | |_   _\\ \\    / /\\   | \\ | |/ ____|  / ____| |  | |  __ \\__   __|/\\    
 | (___ | |__| | | |  \\ \\  / /  \\  |  \\| | |  __  | |  __| |  | | |__) | | |  /  \\   
  \\___ \\|  __  | | |   \\ \\/ / /\\ \\ | . \` | | |_ | | | |_ | |  | |  ___/  | | / /\\ \\  
  ____) | |  | |_| |_   \\  / ____ \\| |\\  | |__| | | |__| | |__| | |      | |/ ____ \\ 
 |_____/|_|  |_|_____|   \\/_/    \\_\\_| \\_|\\_____|  \\_____|\\____/|_|      |_/_/    \\_\\
`}
    </pre>
  );
}

export function AsciiBuildsBanner() {
  return (
    <pre className="font-mono text-[9px] sm:text-[11px] leading-[1.1] text-[var(--accent)] select-none whitespace-pre">
{`
  ____  _    _ _____ _      _____   _____ 
 |  _ \\| |  | |_   _| |    |  __ \\ / ____|
 | |_) | |  | | | | | |    | |  | | (___  
 |  _ <| |  | | | | | |    | |  | |\\___ \\ 
 | |_) | |__| |_| |_| |____| |__| |____) |
 |____/ \\____/|_____|______|_____/|_____/ 
`}
    </pre>
  );
}

export function AsciiAboutBanner() {
  return (
    <pre className="font-mono text-[9px] sm:text-[11px] leading-[1.1] text-[var(--accent)] select-none whitespace-pre">
{`
           ____   ____  _    _ _______ 
     /\\   |  _ \\ / __ \\| |  | |__   __|
    /  \\  | |_) | |  | | |  | |  | |   
   / /\\ \\ |  _ <| |  | | |  | |  | |   
  / ____ \\| |_) | |__| | |__| |  | |   
 /_/    \\_\\____/ \\____/ \\____/   |_|   
`}
    </pre>
  );
}

export function AsciiIssueBanner() {
  return (
    <pre className="font-mono text-[9px] sm:text-[11px] leading-[1.1] text-[var(--accent)] select-none whitespace-pre">
{`
  _____  _____  _    _ ______ 
 |_   _|/ ____|| |  | |  ____|
   | | | (___  | |  | | |__   
   | |  \\___ \\ | |  | |  __|  
  _| |_ ____) || |__| | |____ 
 |_____|_____/  \\____/|______|
`}
    </pre>
  );
}

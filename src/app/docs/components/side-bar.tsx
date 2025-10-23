import Link from "next/link";

export const docsNav = [
  {
    title: "Getting Started",
    slug: "getting-started",
    children: [
      {
        title: "Installation",
        slug: "getting-started/installation",
      },
      {
        title: "Interface Overview",
        slug: "getting-started/interface-overview",
      },
      {
        title: "Importing Songs",
        slug: "getting-started/importing-songs",
      },
      {
        title: "First Play",
        slug: "getting-started/first-play",
      },
    ],
  },
  {
    title: "Playback Features",
    slug: "playback-features",
    children: [
      {
        title: "Playlists",
        slug: "playback-features/playlists",
      },
      {
        title: "Looping & Shuffle",
        slug: "playback-features/looping-shuffle",
      },
      {
        title: "Playback Speed",
        slug: "playback-features/playback-speed",
      },
    ],
  },
  {
    title: "Audio Effects",
    slug: "audio-effects",
    children: [
      {
        title: "Equalizer",
        slug: "audio-effects/equalizer",
      },
      {
        title: "Reverb & Delay",
        slug: "audio-effects/reverb-delay",
      },
      {
        title: "Custom FX Chains",
        slug: "audio-effects/custom-fx",
      },
    ],
  },
  {
    title: "Library Management",
    slug: "library-management",
    children: [
      {
        title: "Organizing Songs",
        slug: "library-management/organizing-songs",
      },
      {
        title: "Tag Editing",
        slug: "library-management/tag-editing",
      },
      {
        title: "Smart Playlists",
        slug: "library-management/smart-playlists",
      },
    ],
  },
  {
    title: "Settings & Customization",
    slug: "settings-customization",
    children: [
      {
        title: "Themes",
        slug: "settings-customization/themes",
      },
      {
        title: "Audio Devices",
        slug: "settings-customization/audio-devices",
      },
      {
        title: "Keyboard Shortcuts",
        slug: "settings-customization/keyboard-shortcuts",
      },
    ],
  },
  {
    title: "Troubleshooting",
    slug: "troubleshooting",
    children: [
      {
        title: "No Sound",
        slug: "troubleshooting/no-sound",
      },
      {
        title: "App Crashes",
        slug: "troubleshooting/app-crashes",
      },
      {
        title: "Performance Issues",
        slug: "troubleshooting/performance",
      },
    ],
  },
  {
    title: "Advanced Usage",
    slug: "advanced-usage",
    children: [
      {
        title: "MIDI Integration",
        slug: "advanced-usage/midi-integration",
      },
      {
        title: "Plugin Support",
        slug: "advanced-usage/plugin-support",
      },
      {
        title: "Developer Mode",
        slug: "advanced-usage/developer-mode",
      },
    ],
  },
];

export default function SideBar() {
  return (
    <div className="styled-scrollbar sticky top-[121px] flex h-[500px] w-[360px] flex-col gap-[1rem] overflow-y-auto">
      {docsNav.map((items) => (
        <div key={items.title} className="flex flex-col gap-2">
          <p className="text-sm text-[#a1a1a1]">{items.title}</p>
          {items.children && (
            <ul className="flex flex-col gap-2 text-sm">
              {items.children.map((child) => (
                <Link href={`docs/${child.slug}`} key={child.slug}>
                  <li key={child.slug}>{child.title}</li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

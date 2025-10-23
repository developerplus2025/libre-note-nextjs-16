import { LinearMediaPlayer } from "@/components/linear-player/components/media-player"

export default function Page() {
  return (
    <section className="dark flex h-dvh w-dvw bg-black">
      <LinearMediaPlayer src="https://static.linear.app/assets/web/quality/kevin-full.4CE3C73C-6032-4726-A296-E0AD9392874F.mp4" />
    </section>
  );
}

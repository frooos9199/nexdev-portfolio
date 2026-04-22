import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type AppShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AppShell({
  eyebrow,
  title,
  description,
  children,
}: AppShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-gray-950 text-white">
      <Navigation />

      <section className="relative isolate px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.16),_transparent_25%),linear-gradient(180deg,_rgba(2,6,23,0.2),_rgba(2,6,23,0.92))]" />
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              {description}
            </p>
          </div>

          {children}
        </div>
      </section>

      <Footer />
    </main>
  );
}
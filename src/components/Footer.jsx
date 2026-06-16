import { personalInfo } from '../data/portfolioData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-bold">
              <span className="text-gradient-duo">NH</span>
            </span>
            <p className="text-white/30 text-sm mt-4 max-w-md leading-relaxed font-light">
              A passionate developer who loves turning ideas into reality through clean, well-crafted code.
              Based in {personalInfo.location}.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Navigate</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-white/30 hover:text-white/70 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Connect</h4>
            <ul className="space-y-2">
              {Object.entries(personalInfo.social).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/30 hover:text-white/70 transition-colors capitalize"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-white/20">
            &copy; {year} Portfolio — Made with Độ MIXI ♥
          </p>
          <div className="flex gap-6 text-xs text-white/20">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Colophon</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

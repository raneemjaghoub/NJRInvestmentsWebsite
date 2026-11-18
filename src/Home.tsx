const imgHero = "/assets/imgHero-1024.webp";
const imgPhotoMonogramArtwork = "/assets/imgPhotoMonogramArtwork-480.webp";
const imgLogo = "/assets/imgLogo-360.webp";

type ButtonProps = {
  className?: string;
  label?: string;
  href?: string;
  state?: "Default";
  style?: "Primary" | "Outline light";
};

export function Button({ className, href = "/contact/", label = "Button", state = "Default", style = "Primary" }: ButtonProps) {
  const isOutlineLightAndDefault = style === "Outline light" && state === "Default";
  return (
    <a href={href} className={className || `content-stretch flex items-center justify-center px-[28px] py-[16px] relative rounded-[2px] ${isOutlineLightAndDefault ? String.raw`border border-[var(--color-white,white)] border-solid` : String.raw`bg-[var(--color-gold,#cfbb75)]`}`} id={isOutlineLightAndDefault ? "node-2004_14" : "node-2004_12"}>
      {style === "Primary" && state === "Default" && (
        <p className="[word-break:break-word] font-sans font-bold leading-[normal] relative shrink-0 text-[15px] text-[color:var(--color-ink,#121110)] tracking-[0.3px] whitespace-nowrap" data-node-id="2004:13">
          {label}
        </p>
      )}
      {isOutlineLightAndDefault && (
        <p className="[word-break:break-word] font-sans font-bold leading-[normal] relative shrink-0 text-[15px] text-[color:var(--color-white,white)] tracking-[0.3px] whitespace-nowrap" data-node-id="2004:15">
          {label}
        </p>
      )}
    </a>
  );
}

type ServiceCardProps = {
  className?: string;
  description?: string;
  number?: string;
  state?: "Default";
  title?: string;
  href?: string;
};

function ServiceCard({ className, description = "Service description", number = "01", title = "Service title", href = "/what-we-do" }: ServiceCardProps) {
  return (
    <a href={href} aria-label={`Learn more about ${title}`} style={{ textDecoration: 'none' }} className={className || "bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-col gap-[16px] items-start px-[32px] py-[36px] relative w-[282px]"} data-node-id="2005:40">
      <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.4px] whitespace-nowrap" data-node-id="2005:41">
        {number}
      </p>
      <h3 className="font-display font-normal leading-[1.25] min-w-full relative shrink-0 text-[24px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2005:42">
        {title}
      </h3>
      <p className="font-sans font-normal leading-[1.65] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-muted,#5c564e)] w-[min-content]" data-node-id="2005:43">
        {description}
      </p>
      <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color-ink,#121110)] whitespace-pre" data-node-id="2005:44">{`Learn more  →`}</p>
    </a>
  );
}

export default function Home() {
  return (
    <main className="bg-[var(--color-paper,#f9f8f5)] content-stretch flex flex-col items-start relative size-full" data-node-id="2004:19" data-name="Homepage v2 — Desktop 1440">
      <div className="content-stretch flex items-center overflow-clip pb-[150px] pt-[140px] px-[120px] relative shrink-0 w-full" data-node-id="2004:29" data-name="Hero">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[var(--color-ink,#121110)] inset-0" />
          <picture><source media="(max-width: 599px)" srcSet="/assets/hero-mobile-390.webp 390w, /assets/hero-mobile-780.webp 780w" sizes="100vw" /><img alt="" className="absolute max-w-none object-cover opacity-95 size-full" src={imgHero} srcSet="/assets/imgHero-768.webp 768w, /assets/imgHero-1024.webp 1024w" sizes="100vw" width="1024" height="1024" fetchPriority="high" /></picture>
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(18, 17, 16, 0.5) 0%, rgba(18, 17, 16, 0) 15%, rgba(18, 17, 16, 0) 85%, rgba(18, 17, 16, 0.6) 100%), linear-gradient(90deg, rgb(18, 17, 16) 0%, rgb(18, 17, 16) 38%, rgba(18, 17, 16, 0.35) 62%, rgba(18, 17, 16, 0.05) 100%), linear-gradient(90deg, rgba(18, 17, 16, 0.2) 0%, rgba(18, 17, 16, 0.2) 100%)" }} />
        </div>
        <div className="content-stretch flex flex-col gap-[28px] items-start overflow-clip relative shrink-0 w-[640px]" data-node-id="2009:43" data-name="Hero text">
          <p className="[word-break:break-word] font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold,#cfbb75)] tracking-[1.82px] uppercase whitespace-nowrap" data-node-id="2004:30">
            family-owned investment and advisory company · UAE
          </p>
          <h1 className="[word-break:break-word] font-display font-normal leading-[1.12] min-w-full relative shrink-0 text-[52px] text-[color:var(--color-white,white)] w-[min-content]" data-node-id="2004:31">
            Helping businesses enter, grow and find the right partners across the Gulf
          </h1>
          <p className="[word-break:break-word] font-sans font-normal leading-[1.55] min-w-full relative shrink-0 text-[20px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2004:32">
            <span className="desktop-only">NJR Investments is a multi-generational, family-owned company based in Dubai, with partners across the GCC, Europe, Asia, Africa and South America. We advise companies entering and growing in the UAE and the wider GCC, connect promising businesses with investors, clients and partners, and enter joint ventures with selected companies.</span><span className="mobile-only">A multi-generational, family-owned company in Dubai with global connections. We advise companies entering the UAE and the wider GCC, connect businesses with investors, clients and partners, and enter joint ventures.</span>
          </p>
          <div className="content-stretch cursor-pointer flex gap-[16px] items-start overflow-clip relative shrink-0" data-node-id="2004:33" data-name="CTAs">
            <Button className="border border-transparent border-solid bg-[var(--color-gold,#cfbb75)] content-stretch flex items-center justify-center px-[28px] py-[16px] relative rounded-[2px] shrink-0" label="Expanding into the Gulf" href="/what-we-do/" />
            <Button className="border border-[var(--color-white,white)] border-solid content-stretch flex items-center justify-center px-[28px] py-[16px] relative rounded-[2px] shrink-0" label="Connections and joint ventures" href="/what-we-do/" style="Outline light" />
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] bg-[var(--color-white,white)] border-[var(--color-line,#ddd8cc)] border-b border-solid content-stretch flex items-start leading-[normal] overflow-clip px-[120px] py-[40px] relative shrink-0 w-full whitespace-nowrap" data-node-id="2004:38" data-name="Key facts">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="2004:39" data-name="Fact — In business since">
          <p className="font-sans font-bold relative shrink-0 text-[12px] text-[color:var(--color-muted,#5c564e)] tracking-[1.44px] uppercase" data-node-id="2004:40">
            In business since
          </p>
          <p className="font-display font-normal relative shrink-0 text-[22px] text-[color:var(--color-ink,#121110)]" data-node-id="2004:41">
            1997
          </p>
        </div>
        <div className="border-[var(--color-line,#ddd8cc)] border-l border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip pl-[32px] relative" data-node-id="2004:42" data-name="Fact — Leadership">
          <p className="font-sans font-bold relative shrink-0 text-[12px] text-[color:var(--color-muted,#5c564e)] tracking-[1.44px] uppercase" data-node-id="2004:43">
            Leadership
          </p>
          <p className="font-display font-normal relative shrink-0 text-[22px] text-[color:var(--color-ink,#121110)]" data-node-id="2004:44">
            Two generations
          </p>
        </div>
        <div className="border-[var(--color-line,#ddd8cc)] border-l border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip pl-[32px] relative" data-node-id="2004:45" data-name="Fact — Headquarters">
          <p className="font-sans font-bold relative shrink-0 text-[12px] text-[color:var(--color-muted,#5c564e)] tracking-[1.44px] uppercase" data-node-id="2004:46">
            Headquarters
          </p>
          <p className="font-display font-normal relative shrink-0 text-[22px] text-[color:var(--color-ink,#121110)]" data-node-id="2004:47">
            United Arab Emirates
          </p>
        </div>
        <div className="border-[var(--color-line,#ddd8cc)] border-l border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip pl-[32px] relative" data-node-id="2021:50" data-name="Fact — Network">
          <p className="font-sans font-bold relative shrink-0 text-[12px] text-[color:var(--color-muted,#5c564e)] tracking-[1.44px] uppercase" data-node-id="2021:51">
            Network
          </p>
          <p className="font-display font-normal relative shrink-0 text-[22px] text-[color:var(--color-ink,#121110)]" data-node-id="2021:52">
            Global connections
          </p>
        </div>
      </div>
      <div className="[word-break:break-word] bg-[var(--color-paper,#f9f8f5)] content-stretch flex flex-col gap-[56px] items-start overflow-clip px-[120px] py-[112px] relative shrink-0 w-full" data-node-id="2005:5" data-name="Three ways we work">
        <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0" data-node-id="2005:6" data-name="Section heading">
          <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.82px] uppercase whitespace-nowrap" data-node-id="2005:7">
            How we work with you
          </p>
          <h2 className="font-display font-normal leading-[1.18] relative shrink-0 text-[44px] text-[color:var(--color-ink,#121110)] w-[760px]" data-node-id="2005:8">
            Three ways we work with companies
          </h2>
        </div>
        <div className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2005:9" data-name="Path cards">
          <div className="bg-[var(--color-white,white)] border-[var(--color-gold,#cfbb75)] border-solid border-t-3 content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px pb-[48px] pt-[44px] px-[48px] relative self-stretch" data-node-id="2005:10" data-name="Path — For companies entering the UAE">
            <p className="font-sans font-bold leading-[normal] min-w-full relative shrink-0 text-[12px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.44px] uppercase w-[min-content]" data-node-id="2005:11">
              For companies entering the Gulf
            </p>
            <h3 className="font-display font-normal leading-[1.2] min-w-full relative shrink-0 text-[32px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2005:12">
              Advisory services
            </h3>
            <p className="font-sans font-normal leading-[1.6] min-w-full relative shrink-0 text-[17px] text-[color:var(--color-muted,#5c564e)] w-[min-content]" data-node-id="2005:13">
              Strategic advice for companies entering and growing in the UAE and the wider GCC, from market strategy and regulatory guidance to the right local partnerships.
            </p>
            <a href="/what-we-do/#advisory" className="block cursor-pointer font-sans font-bold leading-[0] relative shrink-0 text-[15px] text-[color:var(--color-ink,#121110)] whitespace-nowrap" data-node-id="2005:14">
              <p className="leading-[normal] whitespace-pre">{`Learn more  →`}</p>
            </a>
          </div>
          <div className="bg-[var(--color-white,white)] border-[var(--color-gold,#cfbb75)] border-solid border-t-3 content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px pb-[48px] pt-[44px] px-[48px] relative self-stretch" data-node-id="2005:15" data-name="Path — Investor connections">
            <p className="font-sans font-bold leading-[normal] min-w-full relative shrink-0 text-[12px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.44px] uppercase w-[min-content]" data-node-id="2005:16">
              For companies seeking connections
            </p>
            <h3 className="font-display font-normal leading-[1.2] min-w-full relative shrink-0 text-[32px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2005:17">
              Strategic connections
            </h3>
            <p className="font-sans font-normal leading-[1.6] min-w-full relative shrink-0 text-[17px] text-[color:var(--color-muted,#5c564e)] w-[min-content]" data-node-id="2005:18">
              We identify promising companies and connect them with the right investors, clients and partners in our global network, supporting both sides as the relationship develops.
            </p>
            <a href="/what-we-do/#connections" className="block cursor-pointer font-sans font-bold leading-[0] relative shrink-0 text-[15px] text-[color:var(--color-ink,#121110)] whitespace-nowrap" data-node-id="2005:19">
              <p className="leading-[normal] whitespace-pre">{`Learn more  →`}</p>
            </a>
          </div>
          <div className="bg-[var(--color-white,white)] border-[var(--color-gold,#cfbb75)] border-solid border-t-3 content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px pb-[48px] pt-[44px] px-[48px] relative self-stretch" data-node-id="2018:50" data-name="Path — Joint ventures">
            <p className="font-sans font-bold leading-[normal] min-w-full relative shrink-0 text-[12px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.44px] uppercase w-[min-content]" data-node-id="2018:51">
              For partners building a venture
            </p>
            <h3 className="font-display font-normal leading-[1.2] min-w-full relative shrink-0 text-[32px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2018:52">
              Joint ventures
            </h3>
            <p className="font-sans font-normal leading-[1.6] min-w-full relative shrink-0 text-[17px] text-[color:var(--color-muted,#5c564e)] w-[min-content]" data-node-id="2018:53">
              For the right opportunities, we go further and partner with companies through a joint venture, including setting up and running the business in the region.
            </p>
            <a href="/contact/?type=joint-venture" className="block cursor-pointer font-sans font-bold leading-[0] relative shrink-0 text-[15px] text-[color:var(--color-ink,#121110)] whitespace-nowrap" data-node-id="2018:54">
              <p className="leading-[normal] whitespace-pre">{`Learn more  →`}</p>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-white,white)] content-stretch flex flex-col gap-[56px] items-start overflow-clip px-[120px] py-[112px] relative shrink-0 w-full" data-node-id="2022:50" data-name="Sectors and reach">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2022:51" data-name="Section heading">
          <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.82px] uppercase w-full" data-node-id="2022:52">
            Sectors and reach
          </p>
          <h2 className="font-display font-normal leading-[1.18] relative shrink-0 text-[44px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2022:53">
            Experience across sectors, partners on four continents
          </h2>
          <p className="font-sans font-normal leading-[1.6] relative shrink-0 text-[18px] text-[color:var(--color-muted,#5c564e)] w-full" data-node-id="2022:54">
            From our base in Dubai, we work with companies and partners across many industries and five regions. Sectors we have worked in include:
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2022:55" data-name="Industries">
          <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[12px] text-[color:var(--color-muted,#5c564e)] tracking-[1.44px] uppercase whitespace-nowrap" data-node-id="2022:56">
            Sectors include
          </p>
          <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2022:57" data-name="Industry tiles">
            <div className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px overflow-clip pb-[28px] pt-[24px] px-[18px] relative self-stretch" data-node-id="2022:58" data-name="Industry — Technology">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.3px] whitespace-nowrap" data-node-id="2022:59">
                01
              </p>
              <p className="font-display font-normal leading-[1.25] min-w-full relative shrink-0 text-[19px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2022:60">
                Technology
              </p>
            </div>
            <div className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px overflow-clip pb-[28px] pt-[24px] px-[18px] relative self-stretch" data-node-id="2022:61" data-name="Industry — Construction">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.3px] whitespace-nowrap" data-node-id="2022:62">
                02
              </p>
              <p className="font-display font-normal leading-[1.25] min-w-full relative shrink-0 text-[19px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2022:63">
                Construction
              </p>
            </div>
            <div className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px overflow-clip pb-[28px] pt-[24px] px-[18px] relative self-stretch" data-node-id="2022:64" data-name="Industry — Aviation">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.3px] whitespace-nowrap" data-node-id="2022:65">
                03
              </p>
              <p className="font-display font-normal leading-[1.25] min-w-full relative shrink-0 text-[19px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2022:66">
                Aviation
              </p>
            </div>
            <div className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px overflow-clip pb-[28px] pt-[24px] px-[18px] relative self-stretch" data-node-id="2022:67" data-name="Industry — Fintech and payments">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.3px] whitespace-nowrap" data-node-id="2022:68">
                04
              </p>
              <p className="font-display font-normal leading-[1.25] min-w-full relative shrink-0 text-[19px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2022:69">
                Fintech and payments
              </p>
            </div>
            <div className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px overflow-clip pb-[28px] pt-[24px] px-[18px] relative self-stretch" data-node-id="2022:70" data-name="Industry — Power and energy">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.3px] whitespace-nowrap" data-node-id="2022:71">
                05
              </p>
              <p className="font-display font-normal leading-[1.25] min-w-full relative shrink-0 text-[19px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2022:72">
                Power and energy
              </p>
            </div>
            <div className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px overflow-clip pb-[28px] pt-[24px] px-[18px] relative self-stretch" data-node-id="2028:56" data-name="Industry — Entertainment">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.3px] whitespace-nowrap" data-node-id="2028:57">
                06
              </p>
              <p className="font-display font-normal leading-[1.25] min-w-full relative shrink-0 text-[19px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2028:58">
                Entertainment
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2022:73" data-name="Regions">
          <p className="[word-break:break-word] font-sans font-bold leading-[normal] relative shrink-0 text-[12px] text-[color:var(--color-muted,#5c564e)] tracking-[1.44px] uppercase whitespace-nowrap" data-node-id="2022:74">
            Where our partners are
          </p>
          <div className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2022:75" data-name="Region list">
            <div className="border-[var(--color-gold,#cfbb75)] border-solid border-t-3 content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pt-[20px] relative" data-node-id="2022:76" data-name="Region — GCC">
              <p className="[word-break:break-word] font-display font-normal leading-[normal] relative shrink-0 text-[28px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2022:77">
                GCC
              </p>
            </div>
            <div className="border-[var(--color-line,#ddd8cc)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pt-[20px] relative" data-node-id="2022:79" data-name="Region — Europe">
              <p className="[word-break:break-word] font-display font-normal leading-[normal] relative shrink-0 text-[28px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2022:80">
                Europe
              </p>
            </div>
            <div className="border-[var(--color-line,#ddd8cc)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pt-[20px] relative" data-node-id="2022:82" data-name="Region — Asia">
              <p className="[word-break:break-word] font-display font-normal leading-[normal] relative shrink-0 text-[28px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2022:83">
                Asia
              </p>
            </div>
            <div className="border-[var(--color-line,#ddd8cc)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pt-[20px] relative" data-node-id="2062:38" data-name="Region — Africa">
              <p className="[word-break:break-word] font-display font-normal leading-[normal] relative shrink-0 text-[28px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2062:39">
                Africa
              </p>
            </div>
            <div className="border-[var(--color-line,#ddd8cc)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pt-[20px] relative" data-node-id="2022:85" data-name="Region — South America">
              <p className="[word-break:break-word] font-display font-normal leading-[normal] relative shrink-0 text-[28px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2022:86">
                South America
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-stone,#f3f1eb)] content-stretch flex flex-col items-start overflow-clip px-[120px] py-[112px] relative shrink-0 w-full" id="about" data-node-id="2005:20" data-name="About">
        <div className="content-stretch flex gap-[96px] items-center overflow-clip relative shrink-0 w-full" data-node-id="2005:21" data-name="About row">
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px overflow-clip relative" data-node-id="2005:22" data-name="About text">
            <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.82px] uppercase whitespace-nowrap" data-node-id="2005:23">
              About NJR
            </p>
            <h2 className="font-display font-normal leading-[1.18] min-w-full relative shrink-0 text-[44px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2005:24">
              Two generations, one long-term view
            </h2>
            <p className="font-sans font-normal leading-[1.65] min-w-full relative shrink-0 text-[17px] text-[color:var(--color-muted,#5c564e)] w-[min-content]" data-node-id="2005:25">
              NJR Investments is a family-owned investment company, founded and based in Dubai. Guided by two generations of leadership, we work across many industries, from technology and aviation to energy and entertainment, with partners on four continents.
            </p>
            <p className="font-sans font-normal leading-[1.65] min-w-full relative shrink-0 text-[17px] text-[color:var(--color-muted,#5c564e)] w-[min-content]" data-node-id="2005:26">
              The founding generation brings experience and relationships; the next brings a forward-looking perspective. Together they shape a balanced approach to every partnership and investment we take on.
            </p>
            <a href="/about/" className="block cursor-pointer font-sans font-bold leading-[0] relative shrink-0 text-[15px] text-[color:var(--color-ink,#121110)] whitespace-nowrap" data-node-id="2005:27">
              <p className="leading-[normal] whitespace-pre">{`Read our story  →`}</p>
            </a>
          </div>
          <div className="h-[437px] relative shrink-0 w-[480px]" data-node-id="2039:48" data-name="Photo — Monogram artwork">
            <img alt="NJR monogram painted in gold leaf" loading="lazy" decoding="async" width="480" height="437" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" srcSet="/assets/imgPhotoMonogramArtwork-480.webp 480w, /assets/imgPhotoMonogramArtwork-960.webp 960w" sizes="(max-width: 599px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 96px), 480px" src={imgPhotoMonogramArtwork} />
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] bg-[var(--color-white,white)] content-stretch flex flex-col gap-[56px] items-start overflow-clip px-[120px] py-[112px] relative shrink-0 w-full" id="services" data-node-id="2005:45" data-name="Services">
        <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0" data-node-id="2005:46" data-name="Section heading">
          <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.82px] uppercase whitespace-nowrap" data-node-id="2005:47">
            Advisory services
          </p>
          <h2 className="font-display font-normal leading-[1.18] relative shrink-0 text-[44px] text-[color:var(--color-ink,#121110)] w-[760px]" data-node-id="2005:48">
            Your bridge into Gulf markets
          </h2>
          <p className="font-sans font-normal leading-[1.6] relative shrink-0 text-[18px] text-[color:var(--color-muted,#5c564e)] w-[680px]" data-node-id="2005:49">
            Local knowledge and a global perspective, with practical support at every stage.
          </p>
        </div>
        <div className="content-stretch cursor-pointer flex gap-[24px] items-start overflow-clip relative shrink-0 text-left w-full" data-node-id="2005:50" data-name="Service cards">
          <ServiceCard className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px px-[32px] py-[36px] relative self-stretch" description="Market strategy, localisation support and regulatory guidance for companies establishing a presence in the region." title="Market entry and expansion" href="/what-we-do/" />
          <ServiceCard className="bg-[var(--color-paper,#f9f8f5)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px px-[32px] py-[36px] relative self-stretch" description="Hands-on support to scale operations, improve performance and adapt business models for the region." number="02" title="Growth enablement and execution" href="/what-we-do/"/>
        </div>
      </div>
      <div className="[word-break:break-word] bg-[var(--color-ink,#121110)] content-stretch flex flex-col gap-[56px] items-start overflow-clip px-[120px] py-[112px] relative shrink-0 w-full" data-node-id="2006:21" data-name="Why partner with us">
        <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0" data-node-id="2006:22" data-name="Section heading">
          <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color-gold,#cfbb75)] tracking-[1.82px] uppercase whitespace-nowrap" data-node-id="2006:23">
            Why partner with us
          </p>
          <h2 className="font-display font-normal leading-[1.18] relative shrink-0 text-[44px] text-[color:var(--color-white,white)] w-[760px]" data-node-id="2006:24">
            What you can expect from NJR
          </h2>
        </div>
        <div className="content-stretch flex font-normal gap-[40px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2006:25" data-name="Principles">
          <div className="border-[var(--color-gold,#cfbb75)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip pt-[28px] relative" data-node-id="2006:26" data-name="Principle — Aligned interests">
            <h3 className="font-display leading-[normal] relative shrink-0 text-[24px] text-[color:var(--color-white,white)] w-full" data-node-id="2006:27">
              Aligned interests
            </h3>
            <p className="font-sans leading-[1.65] relative shrink-0 text-[16px] text-[color:var(--color-stone,#f3f1eb)] w-full" data-node-id="2006:28">
              We succeed when our partners succeed, and structure every relationship around that.
            </p>
          </div>
          <div className="border-[var(--color-gold,#cfbb75)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip pt-[28px] relative" data-node-id="2006:29" data-name="Principle — Hands-on support">
            <h3 className="font-display leading-[normal] relative shrink-0 text-[24px] text-[color:var(--color-white,white)] w-full" data-node-id="2006:30">
              Hands-on support
            </h3>
            <p className="font-sans leading-[1.65] relative shrink-0 text-[16px] text-[color:var(--color-stone,#f3f1eb)] w-full" data-node-id="2006:31">
              We work alongside you on the ground, not just advise from a distance.
            </p>
          </div>
          <div className="border-[var(--color-gold,#cfbb75)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip pt-[28px] relative" data-node-id="2006:32" data-name="Principle — Local presence, global reach">
            <h3 className="font-display leading-[normal] relative shrink-0 text-[24px] text-[color:var(--color-white,white)] w-full" data-node-id="2006:33">
              Local presence, global reach
            </h3>
            <p className="font-sans leading-[1.65] relative shrink-0 text-[16px] text-[color:var(--color-stone,#f3f1eb)] w-full" data-node-id="2006:34">
              Based in Dubai, with the know-how to get things done across the GCC, and partners in Europe, Asia, Africa and South America.
            </p>
          </div>
          <div className="border-[var(--color-gold,#cfbb75)] border-solid border-t-2 content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip pt-[28px] relative" data-node-id="2006:35" data-name="Principle — A long-term view">
            <h3 className="font-display leading-[normal] relative shrink-0 text-[24px] text-[color:var(--color-white,white)] w-full" data-node-id="2006:36">
              A long-term view
            </h3>
            <p className="font-sans leading-[1.65] relative shrink-0 text-[16px] text-[color:var(--color-stone,#f3f1eb)] w-full" data-node-id="2006:37">
              As a multi-generational family company, we think in decades rather than quarters.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-paper,#f9f8f5)] content-stretch flex gap-[96px] items-center overflow-clip px-[120px] py-[112px] relative shrink-0 w-full" id="contact" data-node-id="2040:48" data-name="Start a conversation">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px overflow-clip relative" data-node-id="2042:44" data-name="Intro">
          <p className="[word-break:break-word] font-sans font-bold leading-[normal] min-w-full relative shrink-0 text-[13px] text-[color:var(--color-gold-text,#7a6528)] tracking-[1.82px] uppercase w-[min-content]" data-node-id="2042:45">
            Contact
          </p>
          <h2 className="[word-break:break-word] font-display font-normal leading-[1.18] min-w-full relative shrink-0 text-[44px] text-[color:var(--color-ink,#121110)] w-[min-content]" data-node-id="2042:46">
            Start a conversation
          </h2>
          <p className="[word-break:break-word] font-sans font-normal leading-[1.6] min-w-full relative shrink-0 text-[18px] text-[color:var(--color-muted,#5c564e)] w-[min-content]" data-node-id="2042:47">
            Whether you are entering the Gulf, looking for the right investors, clients or partners, or considering a joint venture, we would be glad to hear from you.
          </p>
          <div className="content-stretch flex flex-col items-start overflow-clip pt-[8px] relative shrink-0" data-node-id="2042:48" data-name="Button wrap">
            <Button className="bg-[var(--color-gold,#cfbb75)] content-stretch cursor-pointer flex items-center justify-center px-[28px] py-[16px] relative rounded-[2px] shrink-0" label="Start a conversation" />
          </div>
        </div>
        <div className="[word-break:break-word] bg-[var(--color-white,white)] border border-[var(--color-line,#ddd8cc)] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[40px] relative shrink-0 w-[520px]" data-node-id="2042:54" data-name="What to expect">
          <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[12px] text-[color:var(--color-muted,#5c564e)] tracking-[1.44px] uppercase w-full" data-node-id="2042:55">
            What to expect
          </p>
          <div className="content-stretch flex gap-[18px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2042:56" data-name="Step 1">
            <p className="font-display font-normal leading-[normal] relative shrink-0 text-[26px] text-[color:var(--color-gold-text,#7a6528)] whitespace-nowrap" data-node-id="2042:57">
              01
            </p>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="2042:58" data-name="Text">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[17px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2042:59">
                Tell us about your plans
              </p>
              <p className="font-sans font-normal leading-[1.6] relative shrink-0 text-[15px] text-[color:var(--color-muted,#5c564e)] w-full" data-node-id="2042:60">
                Your company, the market you are looking at, and whether you need advice, connections or a joint-venture partner.
              </p>
            </div>
          </div>
          <div className="border-[var(--color-line,#ddd8cc)] border-solid border-t content-stretch flex gap-[18px] items-start overflow-clip pt-[22px] relative shrink-0 w-full" data-node-id="2042:61" data-name="Step 2">
            <p className="font-display font-normal leading-[normal] relative shrink-0 text-[26px] text-[color:var(--color-gold-text,#7a6528)] whitespace-nowrap" data-node-id="2042:62">
              02
            </p>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="2042:63" data-name="Text">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[17px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2042:64">
                We review your enquiry
              </p>
              <p className="font-sans font-normal leading-[1.6] relative shrink-0 text-[15px] text-[color:var(--color-muted,#5c564e)] w-full" data-node-id="2042:65">
                The right person on our team looks at how we can help and gets back to you by email or phone.
              </p>
            </div>
          </div>
          <div className="border-[var(--color-line,#ddd8cc)] border-solid border-t content-stretch flex gap-[18px] items-start overflow-clip pt-[22px] relative shrink-0 w-full" data-node-id="2042:66" data-name="Step 3">
            <p className="font-display font-normal leading-[normal] relative shrink-0 text-[26px] text-[color:var(--color-gold-text,#7a6528)] whitespace-nowrap" data-node-id="2042:67">
              03
            </p>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="2042:68" data-name="Text">
              <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[17px] text-[color:var(--color-ink,#121110)] w-full" data-node-id="2042:69">
                We meet, in confidence
              </p>
              <p className="font-sans font-normal leading-[1.6] relative shrink-0 text-[15px] text-[color:var(--color-muted,#5c564e)] w-full" data-node-id="2042:70">
                If there is mutual alignment, we arrange an introductory call or an in-person meeting.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-ink,#121110)] content-stretch flex flex-col gap-[48px] items-start overflow-clip pb-[40px] pt-[80px] px-[120px] relative shrink-0 w-full" data-node-id="2006:81" data-name="Footer">
        <div className="content-stretch flex gap-[64px] items-start overflow-clip relative shrink-0 w-full" data-node-id="2006:82" data-name="Footer columns">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative" data-node-id="2006:83" data-name="Brand">
            <div className="h-[80px] relative shrink-0 w-[216px]" data-node-id="2014:43" data-name="Logo">
              <img alt="NJR Investments" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgLogo} srcSet="/assets/imgLogo-180.webp 180w, /assets/imgLogo-360.webp 360w, /assets/imgLogo-540.webp 540w" sizes="216px" width="216" height="80" loading="lazy" />
            </div>
            <div className="[word-break:break-word] font-sans font-normal leading-[0] relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] whitespace-normal w-full min-w-0" data-node-id="2006:85">
              <p className="leading-[1.6] mb-0">Family-owned investment and advisory company</p>
              <p className="leading-[1.6]">Dubai, United Arab Emirates</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[14px] items-start overflow-clip relative shrink-0 w-[200px]" data-node-id="2006:86" data-name="Col — Company">
            <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[12px] text-[color:var(--color-gold,#cfbb75)] tracking-[1.44px] uppercase whitespace-nowrap" data-node-id="2006:87">
              Company
            </p>
            <a href="/about/" className="block cursor-pointer font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:88">
              <p className="leading-[1.5]">About</p>
            </a>
            <a href="/what-we-do/" className="block cursor-pointer font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:89">
              <p className="leading-[1.5]">What we do</p>
            </a>
            <a href="/contact/" className="block cursor-pointer font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:91">
              <p className="leading-[1.5]">Contact</p>
            </a>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[14px] items-start overflow-clip relative shrink-0 w-[200px]" data-node-id="2006:92" data-name="Col — Services">
            <p className="font-sans font-bold leading-[normal] relative shrink-0 text-[12px] text-[color:var(--color-gold,#cfbb75)] tracking-[1.44px] uppercase whitespace-nowrap" data-node-id="2006:93">
              Services
            </p>
            <a href="/what-we-do/#advisory" className="block cursor-pointer font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:94">
              <p className="leading-[1.5]">Advisory services</p>
            </a>
            <a href="/what-we-do/#connections" className="block cursor-pointer font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:95">
              <p className="leading-[1.5]">Strategic connections</p>
            </a>
            <a href="/contact/?type=joint-venture" className="block cursor-pointer font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:96">
              <p className="leading-[1.5]">Joint ventures</p>
            </a>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[14px] items-start overflow-clip relative shrink-0 w-[260px]" data-node-id="2006:98" data-name="Col — Contact">
            <a href="/contact/" className="block cursor-pointer font-sans font-bold leading-[0] relative shrink-0 text-[12px] text-[color:var(--color-gold,#cfbb75)] tracking-[1.44px] uppercase whitespace-nowrap" data-node-id="2006:99">
              <p className="leading-[normal]">Contact</p>
            </a>
            <p className="font-sans font-normal leading-[1.5] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:101">
              info@njrinvestments.net
            </p>
            <div className="font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[15px] text-[color:var(--color-stone,#f3f1eb)] w-[min-content]" data-node-id="2006:102">
              <p className="leading-[1.5] mb-0">Office 1308, Tower B</p>
              <p className="leading-[1.5] mb-0">Business Central Towers</p>
              <p className="leading-[1.5]">Dubai Media City</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] border-[var(--color-white,white)] border-solid border-t content-stretch flex font-sans font-normal items-start justify-between overflow-clip pt-[24px] relative shrink-0 text-[13px] text-[color:var(--color-stone,#f3f1eb)] w-full whitespace-nowrap" data-node-id="2006:103" data-name="Footer legal">
          <p className="leading-[normal] relative shrink-0" data-node-id="2006:104">
            © 2026 NJR Investments LLC. All rights reserved.
          </p>
          <div className="content-stretch cursor-pointer flex gap-[24px] items-start leading-[0] overflow-clip relative shrink-0" data-node-id="2006:105" data-name="Legal links">
            <a href="/privacy-policy/" className="block relative shrink-0" data-node-id="2006:106">
              <p className="leading-[normal]">Privacy policy</p>
            </a>
            <a href="/terms-of-use/" className="block relative shrink-0" data-node-id="2006:107">
              <p className="leading-[normal]">Terms of use</p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

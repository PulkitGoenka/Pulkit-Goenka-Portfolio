import { DoodleStar } from "@/components/Doodles";

const ITEMS = ["JAVA", "SPRING BOOT", "REACT", "NODE.JS", "MONGODB", "REST APIS", "MICROSERVICES", "TAILWIND CSS", "MYSQL", "DOCKER"];

function Row({ hidden = false }) {
  return (
    <div className="flex items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="font-display text-3xl md:text-4xl whitespace-nowrap">{item}</span>
          <DoodleStar className="w-6 h-6 shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div data-testid="tech-marquee-wrap" className="overflow-hidden py-8 md:py-10">
      <section data-testid="tech-marquee" className="-rotate-1 bg-neon-purple border-y-2 border-black text-black overflow-hidden py-6 md:py-8">
        <div className="animate-marquee">
          <Row />
          <Row hidden />
        </div>
      </section>
    </div>
  );
}

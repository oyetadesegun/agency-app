// components/ServicesGrid.tsx
import LandingPageServiceCard from "./LandingPageServiceCard";

interface Service {
  title: string;
  shortDesc: string;
  color: string;
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service, index) => (
        <LandingPageServiceCard
          key={index}
          title={service.title}
          shortDesc={service.shortDesc}
          color={service.color}
        />
      ))}
    </div>
  );
}
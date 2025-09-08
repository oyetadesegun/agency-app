// components/ServicesGrid.tsx
import LandingPageServiceCard from "./LandingPageServiceCard";

interface Service {
  title: string;
  description: string;
  color: string;
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service, index) => (
        <landingPageServiceCard
          key={index}
          title={service.title}
          description={service.description}
          color={service.color}
        />
      ))}
    </div>
  );
}
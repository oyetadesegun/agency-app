import ServicesGrid from "@/components/ServicesGrid";

// pages/index.js or your main page component


// This could come from an API, CMS, or static data
const servicesData = [
  {
    title: "CAC Registration",
    description: "Business registration services",
    color: "blue"
  },
  {
    title: "TIN Application",
    description: "Tax identification number",
    color: "green"
  },
  {
    title: "SCUML Registration",
    description: "Securities commission registration",
    color: "purple"
  },
  {
    title: "International Passport",
    description: "Passport application services",
    color: "orange"
  },
  {
    title: "CAC Registration",
    description: "Business registration services",
    color: "blue"
  },
];

export default function AvailableServices() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Our Services</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Professional services to help your business grow</p>
        
        <ServicesGrid services={servicesData} />
      </div>
    </div>
  );
}
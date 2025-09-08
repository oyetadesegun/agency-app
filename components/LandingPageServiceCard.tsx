// components/ServiceCard.js
export default function LandingPageServiceCard({ title, description, color = 'blue' }:{title:string,description:string,color:any  }) {
  // Color configuration
  const colorConfig = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      title: 'text-blue-900 dark:text-blue-100',
      desc: 'text-blue-700 dark:text-blue-300'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      title: 'text-green-900 dark:text-green-100',
      desc: 'text-green-700 dark:text-green-300'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      title: 'text-purple-900 dark:text-purple-100',
      desc: 'text-purple-700 dark:text-purple-300'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      title: 'text-orange-900 dark:text-orange-100',
      desc: 'text-orange-700 dark:text-orange-300'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      title: 'text-red-900 dark:text-red-100',
      desc: 'text-red-700 dark:text-red-300'
    },
    teal: {
      bg: 'bg-teal-50 dark:bg-teal-900/20',
      title: 'text-teal-900 dark:text-teal-100',
      desc: 'text-teal-700 dark:text-teal-300'
    }
  };

  const colors = colorConfig[color] || colorConfig.blue;

  return (
    <div className={`p-4 rounded-lg ${colors.bg}`}>
      <h3 className={`font-semibold ${colors.title}`}>{title}</h3>
      <p className={`text-sm ${colors.desc}`}>{description}</p>
    </div>
  );
}
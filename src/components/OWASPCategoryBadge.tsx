import type { OWASPCategory } from '../utils/owaspMapping';

interface OWASPCategoryBadgeProps {
  category: OWASPCategory;
}

export const OWASPCategoryBadge = ({ category }: OWASPCategoryBadgeProps) => {
  if (!category) return null;

  const getCategoryStyles = (category: OWASPCategory) => {
    switch (category) {
      case 'SQL Injection':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'XSS':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Hardcoded Secrets':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryStyles(
        category
      )}`}
      title={`OWASP Category: ${category}`}
    >
      <span className="mr-1 font-semibold">OWASP:</span>
      {category}
    </span>
  );
};


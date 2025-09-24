import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  border = true,
  background = 'white',
  ...props 
}) => {
  const baseClasses = 'transition-all duration-200';
  
  const paddingClasses = {
    none: 'p-0',
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-mac',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    transparent: 'bg-transparent',
    gradient: 'bg-gradient-to-br from-blue-50 to-green-50'
  };

  const borderClass = border ? 'border border-gray-200' : '';
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

  const classes = `
    ${baseClasses} 
    ${paddingClasses[padding]} 
    ${shadowClasses[shadow]} 
    ${roundedClasses[rounded]} 
    ${backgroundClasses[background]} 
    ${borderClass} 
    ${hoverClass} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({ children, className = '' }) => (
  <div className={`pb-4 border-b border-gray-200 mb-4 ${className}`}>
    {children}
  </div>
);

// Card Title Component
export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

// Card Content Component
export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

// Card Footer Component
export const CardFooter = ({ children, className = '' }) => (
  <div className={`pt-4 border-t border-gray-200 mt-4 ${className}`}>
    {children}
  </div>
);

export default Card;
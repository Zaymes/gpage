import React, { FC, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white rounded-md shadow-md p-4 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div className={`flex items-center space-x-2 mb-2 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: FC<CardTitleProps> = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-lg font-medium ${className || ''}`} {...props}>
      {children}
    </h3>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: FC<CardContentProps> = ({ children, className, ...props }) => {
  return (
    <div className={`${className || ''}`} {...props}>
      {children}
    </div>
  );
};
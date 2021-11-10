import React, { ButtonHTMLAttributes } from 'react';

import './styles.css'

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button className="button-container" type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;

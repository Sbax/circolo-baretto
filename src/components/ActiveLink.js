import React from 'react';
import { useRoute, Link } from 'wouter';

const ActiveLink = props => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props} className={isActive ? 'active' : ''}>
      {props.children}
    </Link>
  );
};

export default ActiveLink;

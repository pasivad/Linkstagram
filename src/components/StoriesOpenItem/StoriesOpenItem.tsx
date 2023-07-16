import React from 'react';

import './StoriesOpenItem.scss';

interface StoriesOpenItemProps {
  className: string;
}

const StoriesOpenItem = ({ className }: StoriesOpenItemProps) => {
  return <div className={className}>story item</div>;
};

export default StoriesOpenItem;

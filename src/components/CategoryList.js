import React from 'react';

const CategoryList = ({ categories, onSelect }) => {
  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.category_id} onClick={() => onSelect(category.category_id)}>
            {category.category_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

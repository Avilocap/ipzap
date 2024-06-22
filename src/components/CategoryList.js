import React from 'react';
import PropTypes from 'prop-types';

const CategoryList = ({ categories, onSelect }) => {
  if (!categories || categories.length === 0) {
    return <p>No categories available</p>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.category_id}>
            <button onClick={() => onSelect(category.category_id)}>
              {category.category_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      category_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default React.memo(CategoryList);

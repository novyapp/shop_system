import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  CategoryPreviews,
  CategoryTitle,
} from "./category-preview.styles";

import { CategoryItem } from "../../store/categories/category.types";
import { FC } from "react";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
      </h2>
      <CategoryPreviews>
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </CategoryPreviews>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

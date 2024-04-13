import { mongooseConnect } from '../../lib/mongoose';
import Categories from '../../components/Categories';
import CategoryModel from '../../models/Category';

export default function CategoriesPage({ categories }) {
  return (
    <div>
      <Categories categories={categories} />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const categories = await CategoryModel.find().lean().exec();

  if (!categories) {
    return {
      notFound: true,
    };
  }

  const categoriesWithStrings = categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
    parent: category.parent ? category.parent.toString() : null,
  }));

  return {
    props: {
      categories: categoriesWithStrings,
    },
  };
}

import { Product } from '../models/Product';
import { mongooseConnect } from '../lib/mongoose';
import PricingPlans from '../components/Pricingplans';

const Pricing = ({ allProducts }) => {
  return (
    <div className='container mx-auto mt-8 w-full'>
      <h1 className='text-2xl font-bold mb-6 text-center text-text '>
        Plans and Pricing
      </h1>
      <div className='w-full mx-auto p-8'>
        <div className='grid grid-cols-1 gap-6 w-full '>
          {allProducts?.length > 0 && <PricingPlans products={allProducts} />}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}

export default Pricing;

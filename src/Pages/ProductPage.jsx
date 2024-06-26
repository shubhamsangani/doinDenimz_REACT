import { Spinner } from '@material-tailwind/react';
import React, { Suspense } from 'react';
import TopProduct from '../Components/Product/TopProduct'
import FilterandCard from '../Components/Product/FilterandCard'
// Lazy load components
// const TopProduct = React.lazy(() => import('../Components/Product/TopProduct'));
// const FilterandCard = React.lazy(() => import('../Components/Product/FilterandCard'));

function ProductPage() {
  return (
    <div className='pt-[62px] md:pt-[72px] xl:pt-[88px]'>
      {/* <Suspense fallback={
          <div className="h-[calc(100vh-88px)]  flex justify-center items-center">
            <Spinner color="indigo" className="h-12 w-12" />
          </div>
        }> */}
        <TopProduct />
        <FilterandCard />
      {/* </Suspense> */}
    </div>
  );
}

export default ProductPage;

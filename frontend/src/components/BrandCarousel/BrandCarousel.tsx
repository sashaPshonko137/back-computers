import { Carousel } from 'antd';
import './BrandsCarousel.scss';

const brands = [
  {  src: 'https://c.dns-shop.ru/thumb/st4/fit/105/35/5270dd067d709d8a92e575ea52746a44/97252067c06a393acd28c636b743004fab8398416a01214731e8a7f62307b4ea.png' },
  {  src: 'https://c.dns-shop.ru/thumb/st4/fit/105/35/e040fa32a8b0410009024b7dffea1e55/03e7153765bc99a50cc098b40225dc989af1e0078ca70726e6dc4c8525ce951a.png' },
  {  src: 'https://c.dns-shop.ru/thumb/st1/fit/105/35/98c5819519917b187346bd9a0d615984/54ab39bb87e2fec437537466d5f37717d023c1b0b7600d845bc7452fd719ba6f.png' },
  {  src: 'https://c.dns-shop.ru/thumb/st1/fit/105/35/095a484bd538242520c4df18cc4af564/611cd9f48cf251af70de71548bf1b79f83a1eef613d78066a157914f0c3b19ac.png' },
  {  src: 'https://c.dns-shop.ru/thumb/st4/fit/105/35/69c042237c8079d8c0d120a145155fe6/caeae0011d80dd375ca9d336f129c9f5a2f13c29b576ca8a63badbe71d6140b1.png' },
  { src: 'https://c.dns-shop.ru/thumb/st4/fit/105/35/e7654b3619ae1ad52b36406ac12966c0/9dc3e2df9326ce99e332feb4ee5f86ef3e2d7612ef75ea927683d6d7c70e6a9b.png' },
  { src: 'https://c.dns-shop.ru/thumb/st1/fit/105/35/85535a0fd9150be6c90292298a8c5f67/2fbcf344a788c5a249cfae374ee0912a8c4fed406d00f1669c6447d7118d94be.png' },
];

const BrandsCarousel = () => {
  return (
    <div className="homepage__brands">
      <div className="brands__container">
        {brands.map((brand, index) => (
          <div key={index} className="brand__card">
            <img alt="brand" src={brand.src} className="brand-card__image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsCarousel;

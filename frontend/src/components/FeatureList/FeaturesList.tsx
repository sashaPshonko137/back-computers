import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import './FeaturesList.scss';

const features = [
  {
    href: 'catalog',
    background: 'url("https://i.ibb.co/17c0zJW/7c196851b1fc9336bb7cd9b2a861ecbc8dbe2ae82bd376da819d6e806f6fbab1.png") 0% 0% / cover no-repeat',
    title: <Typography.Text>Каталог</Typography.Text>,
    description: <Typography.Text>Большой выбор <br/> компьюторной<br/> техники</Typography.Text>
  },
  {
    href: 'custombuild',
    background: 'url("https://i.ibb.co/dJ9YYC7/a9a6f297b2ae8520484dcdcb9e5c0d48f661c045e65bf4b34584c7b9151b3f38.png") 0% 0% / cover no-repeat',
    title: <Typography.Text>Собрать ПК</Typography.Text>,
    description: <Typography.Text>Без проблем<br/> c совместимостью</Typography.Text>
  },
  {
    href: 'giftcard',
    background: 'url("https://c.dns-shop.ru/thumb/st1/fit/0/0/5b399f82ba3a47a19d6e367f5ea523aa/5429b06ab913573be3ab9366ee4eb3b3b422db553c993945d2c5f30efacd28a5.png") 0% 0% / cover no-repeat',
    title: <Typography.Text>Подарочные <br/> карты</Typography.Text>,
    description: <Typography.Text>Дарите любимым</Typography.Text>
  },
  {
    href: 'service',
    background: 'url("https://c.dns-shop.ru/thumb/st1/fit/0/0/2c303fedcff9e53711fb330379389ca6/2c5bbe84d89f944524ebd0da31765b3bb29e648c6c0a178641e55f37e5fd4669.png") 0% 0% / cover no-repeat',
    title: <Typography.Text>Сервис</Typography.Text>,
    description: <Typography.Text>Гарантия, возврат,<br/> обмен и ремонт</Typography.Text>
  },
  {
    href: 'help',
    background: 'url("https://c.dns-shop.ru/thumb/st1/fit/0/0/8830f9785439c3597e5e5628c69abff8/114478695367147068c2b2ee158566a8cd971f70c34dc3afb45acf5546d69c8b.png") 0% 0% / cover no-repeat',
    title: <Typography.Text>Помощь</Typography.Text>,
    description: <Typography.Text>Частые вопросы,<br/> полезная информация</Typography.Text>
  },
];

const FeaturesList = () => {
  return (
    <div className="features-block homepage__features-block">
      <div className="features__container">
        {features.map((feature, index) => (
          <div key={index} className="feature-item" style={{ background: feature.background }}>
            <Link className="feature-item__link" to={feature.href}>
              <div className="feature-item__title">{feature.title}</div>
              <div className="feature-item__description">{feature.description}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;

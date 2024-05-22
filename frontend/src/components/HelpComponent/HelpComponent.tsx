import { Collapse, Typography } from 'antd';
import './HelpComponent.scss';

const { Panel } = Collapse;
const { Title } = Typography;

const faq = [
  {
    question: 'Как оформить заказ?',
    answer: 'Для оформления заказа выберите нужный товар, добавьте его в корзину и перейдите к оформлению заказа. Следуйте инструкциям на экране, чтобы завершить покупку.'
  },
  {
    question: 'Как можно оплатить заказ?',
    answer: 'Вы можете оплатить заказ с помощью кредитной карты, электронного кошелька или банковского перевода. Подробности об оплате вы найдете на странице оформления заказа.'
  },
  {
    question: 'Какие способы доставки доступны?',
    answer: 'Мы предлагаем несколько способов доставки: курьерская доставка, самовывоз из пункта выдачи и почтовая доставка. Выберите удобный для вас способ при оформлении заказа.'
  },
  {
    question: 'Можно ли вернуть товар?',
    answer: 'Да, вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и не иметь следов использования.'
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: 'Вы можете связаться с нашей службой поддержки через контактную форму на сайте, по телефону или по электронной почте. Мы готовы помочь вам с любыми вопросами.'
  }
];

const HelpComponent = () => {
  return (
    <div className="help-page">
      <Title level={2}>Помощь</Title>
      <Collapse accordion>
        {faq.map((item, index) => (
          <Panel header={item.question} key={index}>
            <p>{item.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default HelpComponent;

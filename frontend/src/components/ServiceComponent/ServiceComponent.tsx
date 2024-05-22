import { Collapse, Typography } from "antd";
import "./ServiceComponent.scss";

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const faq = [
  {
    question: "На какие случаи не распространяется гарантия?",
    answer: (
      <ul>
        <li>
          Неисправность устройства вызвана нарушением правил его эксплуатации,
          транспортировки и хранения, изложенных в «Руководстве пользователя».
        </li>
        <li>
          На устройстве отсутствует, нарушен или не читается оригинальный
          серийный номер.
        </li>
        <li>
          На устройстве отсутствуют или нарушены заводские, или гарантийные
          пломбы и наклейки.
        </li>
        <li>
          Ремонт, техническое обслуживание или модернизация устройства
          производились лицами, не уполномоченными на то
          компанией-производителем.
        </li>
        <li>
          Дефекты устройства вызваны использованием устройства с программным
          обеспечением, не входящим в комплект поставки устройства, или не
          одобренным для совместного использования производителем устройства.
        </li>
      </ul>
    ),
  },
  {
    question: "Потерян чек. Что делать?",
    answer: (
      <div>
        <Typography.Text>
          Конечно, старайтесь сохранять чек о покупке. Так вы сможете сэкономить
          свое время при гарантийном обращении.
        </Typography.Text> <br/>
        <Typography.Text>Если чек был утерян или испорчен, то:</Typography.Text>
        <ul>
          <li>
            постарайтесь заранее вспомнить, когда и где вы приобретали товар
            (точная или приблизительная дата покупки, магазин), приобретали ли
            вы вместе с товаром какие-либо аксессуары, другие устройства;
          </li>
          <li>
            обратитесь в сервисный центр или магазин, имея при себе товар и всю
            информацию о его покупке.
          </li>
        </ul>
        <Typography.Text>
          Специалист найдет вашу покупку в базе и предложит вариант решения в
          сложившейся ситуации.
        </Typography.Text>
        <Typography.Text>Надеемся, мы были вам полезны!</Typography.Text>
      </div>
    ),
  },
  {
    question:
      "Что делать если нет возможности привезти товар в сервисный центр?",
    answer: (
      <div>
        <Typography.Text>
          Если это крупногабаритная техника*, тогда вы можете обратиться в
          сервисный центр по телефону и заказать услугу вывоза крупногабаритной
          техники или вызов мастера на дом (если услуга доступна в вашем
          регионе).
        </Typography.Text>
        <Typography.Text>
          Если ваш товар средних размеров и меньше, то вы также можете
          обратиться в сервисный центр по телефону и вас проконсультируют
          удаленно по вопросам неисправной работы товара.
        </Typography.Text>
        <Typography.Text className="questions__cursive-text">
          *КБТ- Требует для перевозки грузовой автомобиль и несколько человек
          для переноски.
          <br />
          Размеры в упаковке:
          <br />
          1. Объемом от 0,25 до 1 куб. метра.
          <br />
          2. От 180 до 350 см в сумме трёх измерений: ширина + глубина + высота.
          <br />
          3. Вес более 5 кг.
        </Typography.Text>
        <Typography.Text className="questions__cursive-text">
          Типичные товары:
          <br />
          Холодильники, стиральные машины, электрические и газовые плиты,
          посудомоечные машины, встраиваемые духовки, воздухоочистители,
          телевизоры диагональю от 40″
        </Typography.Text>
      </div>
    ),
  },
];

const ServiceComponent = () => {
  return (
    <div className="service-center">
      <div className="service-center__content">
        <div className="service-center__banner">
          <Title level={2}>Сервисный центр</Title>
          <Paragraph className="service-center__banner-text">
            Просто решаем сложные проблемы.
            <br />
            Ремонтируем цифровую и бытовую технику в 226 городах России.
          </Paragraph>
          <div className="service-center__menu">
            <div
              className="service-center__menu-item"
            >
              <img
                className="service-center__menu-img"
                src="https://a.dns-shop.ru/static/05/1nfic0t/static/safe.png"
                alt=""
              />
              <Typography.Text>Возврат, обмен или ремонт</Typography.Text>
            </div>
            <div
              className="service-center__menu-item"
            >
              <img
                className="service-center__menu-img"
                src="https://a.dns-shop.ru/static/05/1nfic0t/static/search.png"
                alt=""
              />
              <Typography.Text>Поиск сервисных центров</Typography.Text>
            </div>
            <div
              className="service-center__menu-item"
            >
              <img
                className="service-center__menu-img"
                src="https://a.dns-shop.ru/static/05/1nfic0t/static/driver.png"
                alt=""
              />
              <Typography.Text>Драйверы и инструкции</Typography.Text>
            </div>
            <div
              className="service-center__menu-item"
            >
              <img
                className="service-center__menu-img"
                src="https://a.dns-shop.ru/static/05/1nfic0t/static/guarantee.png"
                alt=""
              />
              <Typography.Text>Платный ремонт</Typography.Text>
            </div>
            <div
              className="service-center__menu-item"
            >
              <img
                className="service-center__menu-img"
                src="https://a.dns-shop.ru/static/05/1nfic0t/static/status.png"
                alt=""
              />
              <div className="service-center__menu-content">
                <Typography.Text>
                  Проверить статус и оплатить ремонт
                </Typography.Text>
              </div>
            </div>
          </div>
        </div>
        <div className="service-center__text">
          <Typography.Text>
            Уже 35 мировых брендов доверили нам право ремонтировать их
            устройства.
          </Typography.Text>
          <br />
          <Typography.Text>
            Компании: Apple, Epson, Brother, Canon, Xiaomi, Indesit и другие
          </Typography.Text>
        </div>
        <div className="questions">
          <Title level={3} className="questions__head">
            Часто задаваемые вопросы
          </Title>
          <Collapse accordion>
            {faq.map((item, index) => (
              <Panel header={item.question} key={index}>
                <p>{item.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;

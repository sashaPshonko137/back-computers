import { useState } from "react";

import { Input, Button, Collapse, Typography, Tooltip, Card, QRCode } from "antd";

import "./GiftCardComponent.scss";


const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

const GiftCardComponent = () => {
  const [previewVisible, setPreviewVisible] = useState(true);
  const [cardValue, setCardValue] = useState("1000");
  const [cardTitle, setCardTitle] = useState("С днём рождения!!!!");
  const [cardMessage, setCardMessage] = useState("Поздравляю с днем рождения!\n Желаю тебе крепкого здоровья, огромного счастья и нескончаемого вдохновения!\n Пусть каждый день приносит радость и новые возможности, а все мечты и планы сбываются.\n Наслаждайся каждым мгновением и окружай себя людьми, которые приносят тебе свет и тепло.\n С праздником! ");

  const handlePreviewClick = () => {
    setPreviewVisible(!previewVisible);
  };

  return (
    <div className="container">
      <div className="gift-card-container">
        <div className="gift-card-header">
          <div className="gift-card-header__title">
            <Title level={2}>
              Подарочные карты TechNewShop – правильный выбор!
            </Title>
            <Paragraph>
              Радуйте родных, друзей, коллег по поводу и без
            </Paragraph>
          </div>
        </div>
        <div className="wrapper">
          <div className="gift-card-type">
            <div className="gift-electronic-card-type">
              <div className="gift-electronic-card-type__receiver-data">
                <div className="gift-electronic-card-type__input-price-wrapper">
                  <Input
                    className="gift-electronic-card-type__input-price"
                    placeholder="Номинал карты"
                    suffix="₽"
                    type="number"
                    value={cardValue}
                    onChange={(e) => setCardValue(e.target.value)}
                  />
                </div>
                <Input
                  className="gift-electronic-card-type__input-name"
                  placeholder="Заголовок обращения"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                />
                <Input.TextArea
                  className="gift-electronic-card-type__input-message"
                  placeholder="Сообщение для получателя"
                  maxLength={300}
                  rows={5}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                />
              </div>
              <div className="gift-electronic-card-type__btn">
                <Tooltip title="Скоро будет доступно">
                  <Button type="primary" disabled>
                    Оформить
                  </Button>
                </Tooltip>
                <Button type="primary" onClick={handlePreviewClick}>
                  Предпросмотр
                </Button>
              </div>
              <Paragraph
                type="secondary"
                className="gift-electronic-card-type__coming-soon"
              >
                Функция оформления скоро будет доступна.
              </Paragraph>
              {previewVisible && (
                <div className="gift-electronic-card-type__preview">
                  <Card
                    title={cardTitle}
                    bordered={false}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                    cover={
                      <img
                        alt="Preview"
                        src="https://o.dns-shop.ru/original/st4/5e1405ebe144ca54bddbbfe16703e84f/6eadccb37e20b8f3d66c13f97e106fec341d21d02904f2e22415f79d7554581b.png"
                      />
                    }
                  > <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <p>Номинал карты: {cardValue}₽</p>
                      <pre style={{ whiteSpace: "pre-wrap" }} >{cardMessage}</pre>
                      <QRCode
                        errorLevel="H"
                        value="https://ant.design/"
                        icon="https://i.ibb.co/JvrWYq9/logo-1.png"
                      />
                  </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="gift-card-using">
          <Title level={3} className="gift-card-using__title">
            Как использовать карту
          </Title>
          <div className="gift-card-using__info">
            <div className="gift-card-using__step">
              <div className="gift-card-using__number">
                <Text>1. </Text>
              </div>
              <div className="gift-card-using__step-content">
                <Text>
                  Выберите номинал в диапазоне от 500 до 50&nbsp;000&nbsp;₽ и
                  внешний вид карты
                </Text>
              </div>
            </div>
            <div className="gift-card-using__step">
              <div className="gift-card-using__number">
                <Text>2. </Text>
              </div>
              <div className="gift-card-using__step-content">
                <Text>
                  Перейдите к оформлению, выберите способ доставки -
                  самостоятельно, по SMS или Email. Оплатите заказ
                </Text>
              </div>
            </div>
            <div className="gift-card-using__step">
              <div className="gift-card-using__number">
                <Text>3. </Text>
              </div>
              <div className="gift-card-using__step-content">
                <Text>
                  После оплаты карта в виде pdf файла будет доставлена выбранным
                  способом
                </Text>
              </div>
            </div>
            <div className="gift-card-using__step">
              <div className="gift-card-using__number">
                <Text>4. </Text>
              </div>
              <div className="gift-card-using__step-content">
                <Text>Распечатайте или перешлите pdf в электронном виде</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="gift-card-questions-and-answers">
          <Title level={3} className="gift-card-questions-and-answers__title">
            Вопросы и ответы
          </Title>
          <Collapse>
            <Panel header="Какой срок действия подарочной карты?" key="1">
              <Paragraph>
                Подарочная карта действительна в течение 5 лет с момента
                приобретения.
              </Paragraph>
            </Panel>
            <Panel
              header="Начисляются ли бонусы, кэшбек при оплате подарочной картой?"
              key="2"
            >
              <Paragraph>Бонус или кэшбек не начисляются.</Paragraph>
            </Panel>
            <Panel
              header="Можно ли анонимно отправить подарочную карту?"
              key="3"
            >
              <Paragraph>
                Для Электронных подарочных карт предусмотрена такая возможность.
                При оформлении карты следует выбрать в разделе "Способ доставки
                карты" варианты - "отправка по SMS" или "отправка по E-mail".
              </Paragraph>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default GiftCardComponent;

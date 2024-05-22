import { useState, useMemo } from 'react';

import { Select, Button, List, Spin, Alert, Typography, Checkbox, message } from 'antd';
import { Navigate } from 'react-router-dom';

import { ImageInCard } from 'components/ImageInCard/ImageInCard';

import { useUpdateCustomBuildMutation, useGetProductByBuildQuery, useGetCustomBuildByIdQuery } from 'store/api/custom-builds/custom-builds-api';
import { UpdateCustomBuildDto } from 'store/api/custom-builds/types';

import { RouterPath } from 'configs/route-config';

import { useCartActions } from 'hooks/cart/use-cart-actions';
import { useGetUser } from 'hooks/user/use-get-user';

import './ComputerBuildComponent.scss';
import { IProduct } from 'types/IProduct';

const { Option } = Select;
const { Title, Text } = Typography;

const ComputerBuildComponent = () => {
  const { userData, isUserDataLoading } = useGetUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('processor');
  const { data: customBuild, isLoading: isBuildLoading, error: buildError } = useGetCustomBuildByIdQuery(userData?.id || 0);
  const { data: products, isLoading: isProductsLoading, error: productsError } = useGetProductByBuildQuery({ id: userData?.id || 0, url: selectedCategory });
  const [updateCustomBuild] = useUpdateCustomBuildMutation();
  const { handleAddToCartBuild: addToCart } = useCartActions();

  const handleProductSelection = async (productId: number) => {
    const updateData: UpdateCustomBuildDto = {
      [`${selectedCategory}_id`]: productId,
    };
    try {
      await updateCustomBuild({ id: userData?.id || 0, dto: updateData }).unwrap();
      message.success('Сборка обновлена');
    } catch (err) {
      console.error(err);
      message.error('Ошибка при обновлении сборки');
    }
  };

  const handleAddToCart = async () => {
    addToCart(userData?.id || 0);
  };

  const buildComponents = [
    { key: 'processor', label: 'Процессор', component: customBuild?.processor },
    { key: 'motherboard', label: 'Материнская плата', component: customBuild?.motherboard },
    { key: 'videocard', label: 'Видеокарта', component: customBuild?.videocard },
    { key: 'ram', label: 'Оперативная память', component: customBuild?.ram },
    { key: 'powerblock', label: 'Блок питания', component: customBuild?.powerblock },
    { key: 'drive', label: 'Накопитель', component: customBuild?.drive },
    { key: 'case', label: 'Корпус', component: customBuild?.case },
    { key: 'cooling', label: 'Охлаждение', component: customBuild?.cooling },
  ];

  const totalPrice = useMemo(() => {
    return buildComponents.reduce((sum, { component }) => sum + (component?.price || 0), 0);
  }, [buildComponents]);

  if (!isUserDataLoading && !userData) {
    return <Navigate to={RouterPath.not_authorized} />;
  }

  if (isBuildLoading || isProductsLoading || isUserDataLoading) return <Spin tip="Loading..." />;
  if (buildError) return <Alert message="Ошибка загрузки сборки" type="error" />;
  if (productsError) return <Alert message="Ошибка загрузки продуктов" type="error" />;

  return (
    <div className="computer-build">
      <div className="computer-build__status">
        <Title level={3}>Добавьте товар в сборку!</Title>
        <Text>Остальные комплектующие будут подобраны с учетом совместимости</Text>
      </div>
      <div className="computer-build__controls">
        <Select value={selectedCategory} onChange={(value) => setSelectedCategory(value)} style={{ width: '100%' }}>
          <Option value="processor">Процессор</Option>
          <Option value="motherboard">Материнская плата</Option>
          <Option value="videocard">Видеокарта</Option>
          <Option value="ram">Оперативная память</Option>
          <Option value="powerblock">Блок питания</Option>
          <Option value="drive">Накопитель</Option>
          <Option value="case">Корпус</Option>
          <Option value="cooling">Охлаждение</Option>
        </Select>
      </div>
      <div className="computer-build__products">
        <Title level={4}>Доступные товары</Title>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          dataSource={products}
          renderItem={(product: IProduct) => (
            <List.Item>
              <div className="product-item">
                <ImageInCard imageUrl={product?.image?.filename} className="product-item__image" />
                <div className="product-item__details">
                  <span className="product-item__name">{product?.name}</span>
                  <Button onClick={() => handleProductSelection(product?.id)}>Добавить в сборку</Button>
                  <span className="product-item__price">{product?.price} ₽</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <div className="computer-build__current">
        <Title level={4}>Текущая сборка</Title>
        <List
          bordered
          dataSource={buildComponents}
          renderItem={({ label, component }) => (
            component ? (
              <List.Item>
                <div className="current-item">
                  <ImageInCard imageUrl={component?.image?.filename} className="current-item__image" />
                  <div className="current-item__details">
                    <span className="current-item__name">{label}: {component?.name}</span>
                    <span className="current-item__price">{component?.price} ₽</span>
                  </div>
                </div>
              </List.Item>
            ) : null
          )}
        />
        <div className="total-price">
          <Title level={4}>Общая стоимость: {totalPrice} ₽</Title>
        </div>
        <Button type="primary" onClick={handleAddToCart}>Добавить сборку в корзину</Button>
      </div>
    </div>
  );
};

export default ComputerBuildComponent;

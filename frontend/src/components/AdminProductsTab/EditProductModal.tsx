import { Modal, Form, Button, message } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useEditProductsMutation } from "store/api/products/products-api";
import { IEditProductsRequest } from "store/api/products/types";

import { useGetAddOrEditProductFields } from "hooks/adminPanel/use-get-add-or-edit-product-fields";

import { IProduct } from "types/IProduct";

interface IEditProductModalProps {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  certainProductInModal: IProduct;
}

export const EditProductModal = (props: IEditProductModalProps) => {
  const { isOpenEditModal, onCloseEditModal, certainProductInModal } = props;

  const [editProduct, { isSuccess: isEditProductSuccess }] =
    useEditProductsMutation();

  const { FormItems, characteristics } = useGetAddOrEditProductFields({
    productFields: certainProductInModal,
  });

  const onFinishEditProduct = (formValues: IEditProductsRequest) => {
    editProduct({
      ...formValues,
      id: certainProductInModal.id,
      characteristics,
    });

    if (isEditProductSuccess) {
      message.success("Продукт успешно обновлен");
      setTimeout(() => onCloseEditModal(), 1000);
    } else {
      message.error("Произошла ошибка при обновлении продукта");
      return;
    }
  };

  return (
    <Modal
      open={isOpenEditModal}
      onCancel={onCloseEditModal}
      footer={null}
      title="Редактировать продукт"
      key={certainProductInModal.id}
    >
      <Form
        className={styles.editForm}
        layout="vertical"
        onFinish={onFinishEditProduct}
      >
        {FormItems}

        <Button type="primary" htmlType="submit" block>
          Редактировать
        </Button>
      </Form>
    </Modal>
  );
};
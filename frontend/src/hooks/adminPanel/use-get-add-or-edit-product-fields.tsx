import React from "react";

import { Form, Input, InputNumber, Select } from "antd";


import { DefaultOptionType } from "antd/es/select";

import { AddCharacteristicsInfo } from "components/AddCharacteristicsInfo/AddCharacteristicsInfo";
import styles from "components/AdminPanel/AdminPanelTab.module.scss";
import { ImageInCard } from "components/ImageInCard/ImageInCard";

import { useGetImagesQuery } from "store/api/images/images-api";
import { useGetTypesQuery } from "store/api/types/types-api";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";
import {
  adminProductFieldsDataIndexes,
  adminProductFieldsLabels,
} from "constants/products-constants";
import {
  DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
} from "constants/types-constants";

import { searchedOptions } from "utils/searched-option";

import { ICharacteristicsInfoRow } from "types/ICharacteristicsInfoRow";
import { IProduct } from "types/IProduct";
import { IType } from "types/IType";

interface IAddOrEditProductFieldsProps {
  productFields: IProduct;
  isEdit: boolean;
}

export const useGetAddOrEditProductFields = (props: IAddOrEditProductFieldsProps) => {
  const { productFields, isEdit } = props;

  const isRequired = isEdit ? false : true;

  const [editingRowKey, setEditingRowKey] = React.useState("");
  const [characteristics, setCharacteristics] = React.useState<ICharacteristicsInfoRow[]>([]);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const isEditingInProgress = editingRowKey !== "";

  const { data: typesData } = useGetTypesQuery({
    page: DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
    limit: DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  });

  const typesOptions = typesData?.types.map((type: IType) => ({
    label: type.name,
    value: type.id.toString(),
  }));

  const ramTypesOptions = [
    { label: "DDR3", value: "DDR3" },
    { label: "DDR4", value: "DDR4" },
    { label: "DDR5", value: "DDR5" },
  ]

  const { data: imagesData } = useGetImagesQuery(null);

  const imageOptions = imagesData?.images.map((image) => ({
    label: image.filename,
    value: image.id.toString(),
  }));

  const renderImageOption = (imageOption: DefaultOptionType) => (
    <div className={styles.imageOptionWrapper} key={imageOption.value}>
      <ImageInCard
        className={styles.imageInOption}
        imageUrl={imageOption.data.label}
      />
      {imageOption.label}
    </div>
  );

  const handleTypeChange = (value: string | null) => {
    console.log(value);
    
    setSelectedType(value);
  };

  const InputNumberStyles = {
    width: "100%",
  };

  const productsFields = [
    {
      label: adminProductFieldsLabels.image,
      name: adminProductFieldsDataIndexes.image_id,
      node: (
        <Select
          defaultValue={productFields?.image?.id}
          options={imageOptions}
          optionRender={renderImageOption}
        />
      ),
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} ссылку на картинку`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.name,
      label: adminProductFieldsLabels.name,
      node: <Input defaultValue={productFields?.name} />,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} название`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.description,
      label: adminProductFieldsLabels.description,
      node: <Input.TextArea defaultValue={productFields?.description} rows={4} />,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} описание`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.price,
      label: adminProductFieldsLabels.price,
      node: <InputNumber defaultValue={productFields?.price} style={InputNumberStyles} />,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} цену`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.type_id,
      label: adminProductFieldsLabels.type,
      node: (
        <Select
          defaultValue={productFields?.type?.id.toString()}
          options={typesOptions}
          showSearch
          filterOption={searchedOptions}
          onChange={handleTypeChange}
        />
      ),
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} категорию`,
        },
      ],
    },
    {
      label: adminProductFieldsLabels.characteristics,
      node: (
        <AddCharacteristicsInfo
          characteristics={productFields.characteristics ?? []}
          setCharacteristics={setCharacteristics}
          editingRowKey={editingRowKey}
          setEditingRowKey={setEditingRowKey}
          isEditingInProgress={isEditingInProgress}
        />
      ),
    },
  ];
  const selectedTypeValue = typesData?.types.find((type) => type.id.toString() === selectedType)?.url || "";
  const additionalFields = [
    ["motherboard", "cooling", "processor"].includes(selectedTypeValue) && {
      name: "socket",
      label: "Сокет",
      node: <Input />,
      rules: [{ required: true, message: `${DEFAULT_VALIDATE_MESSAGE} socket` }],
    },
    ["motherboard", "ram", "processor"].includes(selectedTypeValue) && {
      name: "ram_types",
      label: "Тип поддерживаемой оперативной памяти",
      node: <Select options={ramTypesOptions} mode="multiple" />,
      rules: [{ required: true, message: `${DEFAULT_VALIDATE_MESSAGE} RAM types` }],
    },
    ["case", "motherboard"].includes(selectedTypeValue) && {
      name: "form_factor",
      label: "Форм-фактор",
      node: <Input />,
      rules: [{ required: true, message: `${DEFAULT_VALIDATE_MESSAGE} form factor` }],
    },
    ["videocard", "case"].includes(selectedTypeValue) && {
      name: "gpu_width",
      label: "Ширина GPU",
      node: <InputNumber style={InputNumberStyles} />,
      rules: [{ required: true, message: `${DEFAULT_VALIDATE_MESSAGE} GPU width` }],
    },
    ["videocard", "case"].includes(selectedTypeValue) && {
      name: "gpu_height",
      label: "Длина GPU",
      node: <InputNumber style={InputNumberStyles} />,
      rules: [{ required: true, message: `${DEFAULT_VALIDATE_MESSAGE} GPU height` }],
    },
    ["motherboard", "ram"].includes(selectedTypeValue) && {
      name: "ram_capacity",
      label: "Количество оперативной памяти(шт.)",
      node: <InputNumber style={InputNumberStyles} />,
      rules: [{ required: true, message: `${DEFAULT_VALIDATE_MESSAGE} RAM capacity` }],
    },
  ].filter(Boolean);
  const FormItems = productsFields
  .map((field, index) => (
    <Form.Item key={index} {...field}>
      {field.node}
    </Form.Item>
  ))
  .concat(
    additionalFields
      .filter((field): field is Exclude<typeof field, false> => field !== false)
      .map((field, index) => (
        <Form.Item key={`additional-${index}`} {...field}>
          {field.node}
        </Form.Item>
      ))
  );

  return { FormItems, characteristics, isEditingInProgress };
};
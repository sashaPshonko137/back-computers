import { Form, Input } from "antd";

import {
  accountFieldsDataIndexes,
  accountFieldsTitles,
} from "constants/account-constants";

import { IUser } from "types/IUser";

interface IUseGetProfileFieldsArgs {
  userData?: IUser;
  isEditAccount: boolean;
}

export const useGetAccountFields = (args: IUseGetProfileFieldsArgs) => {
  const { userData, isEditAccount } = args;

  const accountFields = [
    {
      name: accountFieldsDataIndexes.name,
      label: accountFieldsTitles.name,
      node: <Input defaultValue={userData?.name} disabled={isEditAccount} />,
    },
    {
      name: accountFieldsDataIndexes.lastname,
      label: accountFieldsTitles.lastname,
      node: (
        <Input defaultValue={userData?.lastname} disabled={isEditAccount} />
      ),
    },
    {
      name: accountFieldsDataIndexes.surname,
      label: accountFieldsTitles.surname,
      node: <Input defaultValue={userData?.surname} disabled={isEditAccount} />,
    },
    {
      name: accountFieldsDataIndexes.email,
      label: accountFieldsTitles.email,
      node: <Input defaultValue={userData?.email} disabled={isEditAccount} />,
    },
    {
      name: accountFieldsDataIndexes.role,
      label: accountFieldsTitles.role,
      node: <Input defaultValue={userData?.role} disabled />,
    },
  ];

  const FormItems = accountFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems };
};

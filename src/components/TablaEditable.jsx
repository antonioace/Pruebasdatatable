import React, { useState } from "react";
import { Form, Input, Switch, Table } from "antd";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const EditableCell = ({ data, nameKey, dataSource, setDataSource }) => {
  const methods = useFormContext();
  const { control } = methods;

  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (data[nameKey] === methods.getValues(nameKey)) return;

    const nuevaData = dataSource.map((item) => {
      if (item.key === data.key) {
        return { ...item, [nameKey]: methods.getValues(nameKey) };
      }
      return item;
    });
    setDataSource(nuevaData);

    // Debo guardar la data
  };

  return (
    <td onDoubleClick={handleDoubleClick}>
      {editing ? (
        <Controller
          name={nameKey}
          control={control}
          render={({ field }) => (
            <Form.Item>
              <Input
                {...field}
                onBlur={handleBlur}
                onPressEnter={handleBlur}
                autoFocus
              />
            </Form.Item>
          )}
        />
      ) : (
        <span
          onClick={() => {
            setEditing(true);
            methods.reset({ [nameKey]: data[nameKey] });
          }}
        >
          {data[nameKey]}
        </span>
      )}
    </td>
  );
};

const MyTable = () => {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const [dataSource, setDataSource] = useState([]); // [{key: 1, name: "John Doe", email: "john.doe@example"}
  console.log("Get values", methods.watch());

  const onSubmit = (data) => {
    console.log(data);
  };
  React.useEffect(() => {
    setDataSource(data);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <EditableCell
          data={record}
          nameKey={"name"}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <EditableCell
          data={record}
          nameKey={"email"}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Switch
          /*    {...field} */
          checked={methods.getValues("seleccionado") === record.name}
          onChange={(e) => {
            /*    field.onChange(e); */

            if (e) {
              methods.setValue("seleccionado", record.name);
            } else {
              methods.setValue("seleccionado", null);
            }
          }}
        />
      ),
    },
  ];

  const data = [
    { key: 1, name: "John Doe", email: "john.doe@example.com" },
    { key: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { key: 3, name: "fff Smith", email: "jane.smitfffh@example.com" },
  ];

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <button type="submit">Submit</button>
      </Form>
    </FormProvider>
  );
};

export default MyTable;

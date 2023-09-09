import { Datagrid, List, TextInput, TextField } from 'react-admin';

const userFilters = [
  <TextInput label="Name" source="name" alwaysOn key="name" />,
  <TextInput label="Email" source="email" alwaysOn key="email" />,
];

export const UserList = (props: any) => (
  <List {...props} filters={userFilters} exporter={false}>
    <Datagrid bulkActionButtons={false} rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="created_at" />
    </Datagrid>
  </List>
);

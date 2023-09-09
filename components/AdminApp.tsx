// https://jsonplaceholder.typicode.com を使ったサンプル
// "use client"; // only needed if you choose App Router
// import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
// import jsonServerProvider from "ra-data-json-server";
//
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
//
// const AdminApp = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource
//       name="users"
//       list={ListGuesser}
//       edit={EditGuesser}
//       recordRepresentation="name"
//     />
//     <Resource
//       name="posts"
//       list={ListGuesser}
//       edit={EditGuesser}
//       recordRepresentation="title"
//     />
//     <Resource name="comments" list={ListGuesser} edit={EditGuesser} />
//   </Admin>
// );
//
// export default AdminApp;


// via https://marmelab.com/react-admin/NextJs.html
// これは動かなかった、というか色々足りない
// import * as React from "react";
// import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
// import postgrestRestProvider from "@raphiniert/ra-data-postgrest";
//
// const dataProvider = postgrestRestProvider("/api/admin");
//
// const AdminApp = () => (
//   <Admin dataProvider={dataProvider}>
//       <Resource name="users" list={ListGuesser} edit={EditGuesser} />
//   </Admin>
// );
//
// export default AdminApp;


// via https://github.com/raphiniert-com/ra-data-postgrest#usage
// import * as React from 'react';
// import { Admin, Resource, fetchUtils, ListGuesser } from 'react-admin';
// import postgrestRestProvider,
// { IDataProviderConfig,
//     defaultPrimaryKeys,
//     defaultSchema } from '@raphiniert/ra-data-postgrest';
//
// const config: IDataProviderConfig = { // The config object
//     apiUrl: '/api/admin',   // The base API URL
//     // この下は思いの外必須だった
//     httpClient: fetchUtils.fetchJson,   // A function that fetches the data
//     defaultListOp: 'eq',    // The default list operator
//     primaryKeys: defaultPrimaryKeys,    // The default primary keys
//     schema: defaultSchema   // The default schema
// }
// const AdminApp = () => (
//   <Admin dataProvider={postgrestRestProvider(config)}>
//       <Resource name="users" list={ListGuesser} />
//   </Admin>
// );
//
// export default AdminApp;


// 完成系
// 一つ前のを参考にした。
import * as React from "react";
import {
  Button,
  Admin,
  Create,
  Resource,
  required,
  fetchUtils,
  EditGuesser,
  ShowGuesser,
  SimpleForm,
  TextInput,
  DateInput,
  TopToolbar,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

// https://github.com/raphiniert-com/ra-data-postgrest
import postgrestRestProvider,
{
  IDataProviderConfig,
  defaultPrimaryKeys,
  defaultSchema
} from '@raphiniert/ra-data-postgrest';
import {UserList} from "@/features/user/";

const config: IDataProviderConfig = { // The config object
  apiUrl: '/api/admin',   // The base API URL
  // この下は思いの外必須だった
  httpClient: fetchUtils.fetchJson,   // A function that fetches the data
  defaultListOp: 'eq',    // The default list operator
  primaryKeys: defaultPrimaryKeys,    // The default primary keys
  schema: defaultSchema   // The default schema
}

const dataProvider = postgrestRestProvider(config);

const PostCreateActions = () => (
  <TopToolbar>
    {/* Add your custom actions */}
    <Button color="primary" onClick={() => {console.log(1)}}><span>ほげ</span></Button>
  </TopToolbar>
);

export const PostCreate = () => (
  <Create title="新規" actions={<PostCreateActions />}>
    <SimpleForm>
      <TextInput source="id" validate={[required()]} fullWidth/>
      <TextInput source="name" multiline={true} label="Short description"/>
      <TextInput source="email" validate={[required()]}/>
      <DateInput label="Created date" source="created_at" defaultValue={new Date()}/>
    </SimpleForm>
  </Create>
);

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="users"
      list={UserList}
      create={PostCreate}
      edit={EditGuesser}
      // show を指定することで、クリックしてもすぐに edit 画面に行かない。
      // ワンクッション置くことができる。
      show={ShowGuesser}
    />
  </Admin>
);

export default AdminApp;

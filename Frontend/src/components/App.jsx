import { Route, Routes } from "react-router";
// import { ContactsList } from "./Phonebook/Contacts/ContactsList";
// import { Filter } from "./Phonebook/Filter/Filter";
// import { Form } from "./Phonebook/Form/Form";
// import { Section } from "./Phonebook/Section/Section";
import { Layout } from "./Phonebook/Layout/Layout";
import { Home } from "./Phonebook/Home/Home";
import { LoginPage } from "./Phonebook/LoginPage/LoginPage";
import { RegisterPage } from "./Phonebook/RegisterPage/RegisterPage";
// import { PrivateRoute } from "./Phonebook/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./Phonebook/PublicRoute/PublicRoute";

export const App = () => {
  
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        </Route>
      </Routes>
    );
}

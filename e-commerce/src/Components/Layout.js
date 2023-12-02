import React from "react";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Helmet from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>

        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "E-commerce",
  description: "MERN stack e-commerce project",
  keywords: "mern html css mongodb nodejs",
  author: "Arun pratap singh",
};

export default Layout;

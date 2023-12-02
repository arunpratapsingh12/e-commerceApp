import React from 'react'

import { Link } from "react-router-dom";
import Layout from '../Components/Layout';

const Pagenotfound = () => {
  return (
    <div>
      <Layout title="Error-page">
        <div className="pnf">
          <h1 className="pnf-title">404</h1>
          <h2 className="pnf-heading">Oops ! Page Not Found</h2>
          <Link to="/" className="pnf-btn">
            Go Back
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export default Pagenotfound

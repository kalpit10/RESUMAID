import React from "react";
//import data from "./compiled/1673801839021.docx.json";
import Score from "./score";
import DefaultLayout from "../components/DefaultLayout";

function Result() {
  return (
    <DefaultLayout>
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossOrigin="anonymous"
        />

        {/* <link
          href="https://fonts.cdnfonts.com/css/manifestor"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/cera-round-pro"
          rel="stylesheet"
        /> */}

        <div className="d-grid gap-2 col-6 mx-auto position-absolute top-50 start-50 translate-middle mt-5 font-monospace">
          <button
            className="btn btn-primary btn-lg btn-outline-light"
            id="bt"
            onClick={Score}
          >
            Get your results here
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Result;

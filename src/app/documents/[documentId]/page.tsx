import React from "react";

type Props = {
  params: {
    documentId: string;
  };
};

function Page({ params }: Props) {
  console.log(params.documentId);

  return <div>Page</div>;
}

export default Page;

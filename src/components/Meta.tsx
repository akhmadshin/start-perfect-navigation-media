import React from 'react';

interface Props {
  title: string;
  canonical?: string;
  description?: string;
  isArticle?: boolean;
  image?: {
    url: string;
    height: number;
    width: number;
  };
  type?: string;
}

export const Meta: React.FC<Props> = ({
  canonical,
  title,
  description,
  type,
}) => {
  return (
    <>
      {canonical && (
        <>
          <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}${canonical}`}/>
          <meta
            property="og:url"
            content={`${process.env.NEXT_PUBLIC_URL}${canonical}`}
          />
          <meta
            property="twitter:url"
            content={`${process.env.NEXT_PUBLIC_URL}${canonical}`}
          />
        </>
      )}

      {title && (
        <>
          <title>{title}</title>
          <meta name="title" content={title}/>
          <meta property="og:title" content={title}/>
          <meta property="twitter:title" content={title}/>
        </>
      )}

      {description && (
        <>
          <meta name="description" content={description}/>
          <meta property="og:description" content={description}/>
          <meta property="twitter:description" content={description}/>
        </>
      )}

      {type && <meta property="og:type" content={type}/>}

      <meta property="twitter:card" content={'summary_large_image'}/>

      <meta property='og:site_name' content={process.env.NEXT_PUBLIC_URL}/>
    </>
  );
}

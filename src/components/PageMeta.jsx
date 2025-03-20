// PageMeta.jsx or PageMeta.tsx
import React from "react";
import { Helmet } from "react-helmet";

const PageMeta = ({
  title,
  description,
  keywords,
  canonicalUrl,
  metaScript,
  googleScript,
  noscriptData,
  googleTag,
  googleScriptData,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {metaScript && <script>{metaScript}</script>}
      {googleScript && <script>{googleScript}</script>}
      {noscriptData && <noscript>{noscriptData}</noscript>}
      {googleTag && <script async src={googleTag}></script>}
      {googleScriptData && <noscript>{googleScriptData}</noscript>}
    </Helmet>
  );
};

export default PageMeta;

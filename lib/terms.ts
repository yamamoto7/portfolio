/** Shared "terms-wrap" styling (DM Sans privacy-policy layout), ported from the
 *  original Sass module. Applied to a wrapper whose children are plain
 *  h2 / h4 / p / ul / li / span / a elements. */
export const TERMS_WRAPPER_CLASS = [
  "mx-auto w-[600px] max-w-[90%] font-dm text-haiti",
  "pt-[50px] pb-[35px] min-[768px]:pt-[90px] min-[768px]:pb-[60px] min-[992px]:pt-[100px] min-[992px]:pb-[80px]",
  "[&_h2]:mb-10 [&_h2]:text-center [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:tracking-[-1.98px] min-[576px]:[&_h2]:text-[40px] min-[768px]:[&_h2]:text-5xl min-[992px]:[&_h2]:text-6xl",
  "[&_h4]:mt-[30px] [&_h4]:mb-2.5 [&_h4]:text-2xl [&_h4]:font-bold [&_h4]:tracking-[-0.79px]",
  "[&_p]:my-3 [&_p]:text-base [&_p]:leading-7 [&_p]:tracking-[-0.53px]",
  "[&_li]:tracking-[-0.59px]",
  "[&_span]:mr-2.5 [&_span]:text-base [&_span]:font-bold",
  "[&_a]:underline",
].join(" ");

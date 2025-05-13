const convertTitleToSlug = (title) => {
  if (!title) {
    return "";
  }

  let slug = title.toLowerCase();
  slug = slug.replace(/\s+/g, "-");
  slug = slug.replace(/[^\w-]+/g, "");
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
};

export default convertTitleToSlug;

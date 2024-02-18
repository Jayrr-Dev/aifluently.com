import { supabase } from "$lib/supabaseClient";
type ProductDetail = {
  name: string;
  logo: string;
  rating: number;
  description: string;
  url: string;
  logoAlt: string;
};

type TagWithProducts = {
  tagName: string;
  productNames: string[];
  productDetails: ProductDetail[];
};
export async function getProduct(tagId: number): Promise<number[]> {
  const { data, error } = await supabase
    .from("junction_product_tag")
    .select("product_id")
    .eq("tag_id", tagId);

  if (error) throw new Error(error.message);
  return data.map((item) => item.product_id);
}

export async function getProductName(productIds: number[]): Promise<string[]> {
  const { data, error } = await supabase
    .from("product_table")
    .select("product_id, product_name")
    .in("product_id", productIds);

  if (error) throw new Error(error.message);
  return data.map((product) => product.product_name);
}

export async function getProductDetails(
  productIds: number[],
): Promise<ProductDetail[]> {
  const { data, error } = await supabase
    .from("product_table")
    .select(
      "product_name, product_logo, product_rating, product_description, product_url, product_logo_alt",
    )
    .in("product_id", productIds);

  if (error) throw new Error(error.message);
  return data.map((product) => ({
    name: product.product_name,
    logo: product.product_logo,
    rating: product.product_rating,
    description: product.product_description,
    url: product.product_url,
    logoAlt: product.product_logo_alt,
  }));
}

export async function fetchAllTagsWithProducts(
  categoryId: number,
): Promise<TagWithProducts[]> {
  const { data: tagsData, error: tagsError } = await supabase
    .from("tag_table")
    .select("tag_id, tag_name")
    .eq("category_id", categoryId);

  if (tagsError) throw new Error(tagsError.message);
  if (!tagsData || tagsData.length === 0) return [];

  const tagsWithProducts = await Promise.all(tagsData.map(async (tag) => {
    const productIds = await getProduct(tag.tag_id);
    const productNames = await getProductName(productIds);
    const productDetails = await getProductDetails(productIds);
    return { tagName: tag.tag_name, productNames, productDetails };
  }));

  return tagsWithProducts;
}

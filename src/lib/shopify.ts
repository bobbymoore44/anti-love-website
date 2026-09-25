// Shopify Storefront API Configuration
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'anti-love-7oyer.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '065f6fb27cc88fa2a294ae46e517333b';

// TypeScript interfaces for Shopify data
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    tags: string[];
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          } | null;
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

// GraphQL query to fetch products
const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

// Storefront API helper function
export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    throw new Error('Shopify API access requires an active Shopify billing plan.');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch products from Shopify
export async function fetchProducts(limit: number = 50, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, {
    first: limit,
    query: query || null,
  });

  return data.data.products.edges;
}

// Cart mutation
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Create checkout from cart items
export async function createStorefrontCheckout(items: Array<{
  variantId: string;
  quantity: number;
}>): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch (error) {
    console.error('Error creating storefront checkout:', error);
    throw error;
  }
}

// Customer creation/update for interest registration
const SHOPIFY_ADMIN_API_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_ADMIN_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN;

export interface InterestData {
  email: string;
  firstName?: string;
  productHandle: string;
  productTitle: string;
  productId: string;
  styleCode?: string;
  size?: string;
  colour?: string;
}

export interface CustomerInterest extends InterestData {
  id: string;
  createdAt?: string;
}

// Register product interest via edge function
export async function registerProductInterest(data: InterestData): Promise<any> {
  console.log('📤 Submitting interest:', data);
  
  const { supabase } = await import('@/integrations/supabase/client');
  
  const { data: result, error } = await supabase.functions.invoke('register-interest', {
    body: data
  });

  console.log('📥 Server response:', { result, error });

  if (error) {
    console.error('❌ Error invoking edge function:', error);
    throw new Error(error.message || 'Failed to register interest');
  }

  if (result?.error) {
    console.error('❌ Edge function returned error:', result);
    throw new Error(result.error);
  }

  console.log('✅ Interest registered successfully');
  return result;
}

// Admin API helper function (for admin dashboard only)
async function adminApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify Admin API: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

// Find customer by email
const CUSTOMER_SEARCH_QUERY = `
  query customerSearch($query: String!) {
    customers(first: 1, query: $query) {
      edges {
        node {
          id
          email
          tags
        }
      }
    }
  }
`;

// Create customer mutation
const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        tags
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Update customer tags mutation
const CUSTOMER_UPDATE_MUTATION = `
  mutation customerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        email
        tags
      }
      userErrors {
        field
        message
      }
    }
  }
`;


// Fetch all customers with interest tags
const FETCH_INTERESTED_CUSTOMERS_QUERY = `
  query fetchInterestedCustomers($cursor: String) {
    customers(first: 250, query: "tag:interest", after: $cursor) {
      edges {
        node {
          id
          email
          firstName
          lastName
          tags
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export async function fetchCustomerInterests(): Promise<CustomerInterest[]> {
  console.log('📊 Fetching customer interests via edge function...');
  
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase.functions.invoke('fetch-interests', {
      method: 'POST'
    });

    console.log('📥 Edge function response:', { 
      success: data?.success,
      count: data?.data?.length || 0,
      error 
    });

    if (error) {
      console.error('❌ Edge function error:', error);
      throw error;
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Failed to fetch interests');
    }

    const interests: CustomerInterest[] = (data.data || []).map((row: any) => ({
      id: row.id,
      email: row.email,
      firstName: row.first_name || '',
      productHandle: row.product_handle,
      productTitle: row.product_title,
      productId: row.product_id || '',
      styleCode: row.style_code || '',
      size: row.size || '',
      colour: row.colour || '',
      createdAt: row.created_at,
    }));

    console.log('✅ Fetched interests:', interests.length);
    return interests;
  } catch (error) {
    console.error('❌ Failed to fetch customer interests:', error);
    throw error;
  }
}

// Update customer interest
export async function updateCustomerInterest(
  id: string,
  updatedData: Partial<InterestData>
): Promise<void> {
  console.log('✏️ Updating interest via edge function:', { id, updatedData });
  
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    // Prepare updates in database format
    const updates: any = {};
    if (updatedData.email) updates.email = updatedData.email;
    if (updatedData.firstName !== undefined) updates.first_name = updatedData.firstName || null;
    if (updatedData.productHandle) updates.product_handle = updatedData.productHandle;
    if (updatedData.productTitle) updates.product_title = updatedData.productTitle;
    if (updatedData.productId !== undefined) updates.product_id = updatedData.productId;
    if (updatedData.styleCode !== undefined) updates.style_code = updatedData.styleCode || null;
    if (updatedData.size !== undefined) updates.size = updatedData.size || null;
    if (updatedData.colour !== undefined) updates.colour = updatedData.colour || null;

    const { data, error } = await supabase.functions.invoke('update-interest', {
      method: 'POST',
      body: { id, updates }
    });

    if (error) {
      console.error('❌ Edge function error:', error);
      throw error;
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Failed to update interest');
    }

    console.log('✅ Interest updated successfully');
  } catch (error) {
    console.error('❌ Failed to update customer interest:', error);
    throw error;
  }
}

// Delete customer interest
export async function deleteCustomerInterest(id: string): Promise<void> {
  console.log('🗑️ Deleting interest via edge function:', { id });
  
  try {
    const { supabase } = await import('@/integrations/supabase/client');

    const { data, error } = await supabase.functions.invoke('delete-interest', {
      method: 'POST',
      body: { id }
    });

    if (error) {
      console.error('❌ Edge function error:', error);
      throw error;
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Failed to delete interest');
    }

    console.log('✅ Interest deleted successfully');
  } catch (error) {
    console.error('❌ Failed to delete customer interest:', error);
    throw error;
  }
}

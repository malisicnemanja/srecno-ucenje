// CENTRALIZED VALIDATION FOR ALL CMS DATA

export const validateNavigationData = (data: any) => {
  if (!data) return []
  
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      url: item?.url || item?.href || item?.link || '/',
      href: item?.url || item?.href || item?.link || '/',
      title: item?.title || item?.label || 'Untitled',
      id: item?.id || `nav-${Date.now()}-${Math.random()}`
    }))
  }
  
  // If it's a navigation object with mainMenu
  if (data.mainMenu) {
    return {
      ...data,
      mainMenu: data.mainMenu.map((item: any) => ({
        ...item,
        href: item?.href || item?.url || item?.link || '/',
        label: item?.label || item?.title || 'Menu Item',
        subItems: item?.subItems?.map((sub: any) => ({
          ...sub,
          href: sub?.href || sub?.url || sub?.link || '/',
          label: sub?.label || sub?.title || 'Submenu Item'
        })) || []
      }))
    }
  }
  
  return data
}

export const validateLinks = (links: any) => {
  if (!Array.isArray(links)) return []
  
  return links.map(link => {
    // Try to find URL in different fields
    const url = link?.url || 
                link?.href || 
                link?.link || 
                link?.to || 
                link?.path || 
                (link?.slug ? `/${link.slug}` : null) ||
                (link?.slug?.current ? `/${link.slug.current}` : null) ||
                '#'
    
    return {
      ...link,
      url,
      href: url, // Duplicate for compatibility
      isValid: url !== '#'
    }
  })
}

export const validatePageData = (page: any) => {
  if (!page) return null
  
  return {
    ...page,
    url: page?.url || page?.href || `/pages/${page?.slug || page?.slug?.current || 'untitled'}`,
    title: page?.title || 'Untitled Page',
    content: page?.content || '',
  }
}

export const validateBlogPost = (post: any) => {
  if (!post) return null
  
  return {
    ...post,
    slug: post?.slug || { current: 'no-slug' },
    url: `/blog/${post?.slug?.current || 'no-slug'}`,
    href: `/blog/${post?.slug?.current || 'no-slug'}`,
    title: post?.title || 'Untitled Post',
    excerpt: post?.excerpt || '',
    category: post?.category ? {
      ...post.category,
      slug: post.category.slug || { current: 'uncategorized' },
      href: `/blog/kategorija/${post.category.slug?.current || 'uncategorized'}`
    } : null
  }
}

export const validateBook = (book: any) => {
  if (!book) return null
  
  return {
    ...book,
    slug: book?.slug || { current: 'no-slug' },
    url: `/knjige/${book?.slug?.current || 'no-slug'}`,
    href: `/knjige/${book?.slug?.current || 'no-slug'}`,
    title: book?.title || 'Untitled Book',
    coverImage: book?.coverImage ? {
      ...book.coverImage,
      asset: book.coverImage.asset || { url: '/placeholder-book.jpg' }
    } : null,
    purchaseLinks: book?.purchaseLinks?.map((link: any) => ({
      ...link,
      url: link?.url || link?.href || '#',
      storeName: link?.storeName || 'Store'
    })) || []
  }
}

// WRAPPER FOR ALL CMS CALLS
export const safeCMSFetch = async <T>(
  fetchFunction: () => Promise<T>, 
  validator?: (data: any) => any
): Promise<T | null> => {
  try {
    const data = await fetchFunction()
    return validator ? validator(data) : data
  } catch (error) {
    console.error('CMS Fetch Error:', error)
    return validator ? validator(null) : null
  }
}

// Batch validator for multiple items
export const validateBatch = (items: any[], type: 'blog' | 'book' | 'link' | 'page') => {
  if (!Array.isArray(items)) return []
  
  const validators: Record<string, (item: any) => any> = {
    blog: validateBlogPost,
    book: validateBook,
    link: (item) => validateLinks([item])[0],
    page: validatePageData
  }
  
  const validator = validators[type]
  return validator ? items.map(validator).filter(Boolean) : items
}
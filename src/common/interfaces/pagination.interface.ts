interface Navigation {
  first: number
  last: number
  next: number
  back: number
}

interface Page {
  index: number
  limit: number
}

interface Results {
  count: number
}

export interface Pagination {
  navigation: Navigation
  page: Page
  results: Results
}

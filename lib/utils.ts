export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function getComputedStyle(element: HTMLElement, property: string): string {
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    return window.getComputedStyle(element).getPropertyValue(property)
  }
  return ''
}

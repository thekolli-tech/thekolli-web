export interface NavItem {
  label: string;
  href: string;
  description?: string;
  hasDropdown?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    label: "Company",
    href: "/company",
    description: "Our identity, principles, and strategic focus.",
  },
  {
    label: "Engineering",
    href: "/engineering",
    description: "Methodologies, systems architecture, and rigor.",
  },
  {
    label: "Innovation",
    href: "/innovation",
    description: "Applied research, exploratory models, and future horizons.",
  },
  {
    label: "Products",
    href: "/products",
    description: "Enterprise software platforms and engineering solutions.",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Opportunities for engineers, researchers, and builders.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Initiate dialogue for partnerships and technical collaboration.",
  },
];

export const footerNavItems = {
  navigation: [
    { label: "Company", href: "/company" },
    { label: "Engineering", href: "/engineering" },
    { label: "Innovation", href: "/innovation" },
    { label: "Products", href: "/products" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

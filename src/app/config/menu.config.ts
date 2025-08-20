export interface MenuItem {
  icon?: string;
  label?: string;
  route?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {icon: '🧑', label: 'People', route: '/people'},
  {icon: '🪐', label: 'Planets', route: '/planets'}
];

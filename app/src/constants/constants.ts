export const EXPIRES = 60 * 60

export const LINKS = {
   'login': '/login',
   'home': '/',
   'register': '/register',
   'dashboard': '/dashboard'
}

export const LINKS_DASHBOARD = [
  { label: 'Inicio', href: '/dashboard' },
  { label: 'Actividad', href: '/dashboard/activity' },
  { label: 'Tu perfil', href: '/dashboard/profile' },
  { label: 'Cargar dinero', href: '/dashboard/deposit' },
  { label: 'Pagar Servicios', href: '/dashboard/payments' },
  { label: 'Tarjetas', href: '/dashboard/cards' },
];

export const LINK_BUTTON_ACTIONS = {
   'Cargar dinero':{ label: 'Cargar dinero', href: '/dashboard/deposit' },
   'Pagar Servicios':{ label: 'Pagar Servicios', href: '/dashboard/payments' },
   'Tarjetas': { label: 'Gestioná los medios de pago', href: '/dashboard/cards' },
   'Nueva Tarjeta':{ label: 'Nueva Tarjeta', href: '/dashboard/cards/newCard' },
   'Transferencia Bancaria':{ label: 'Transferencia Bancaria', href: '/dashboard/deposit/cash'},
   'Seleccionar tarjeta':{ label: 'Transferencia Bancaria', href: '/dashboard/deposit/card'},
   'Inicio':{ label: 'Ir al inicio', href: '/dashboard' },
   'Detail':{label:  'Detail',href: '/dashboard/activity/detail'}
}

export const LINK_BUTTON_BALANCED = {
   'Tu perfil':{ label: 'Ver CVU', href: '/dashboard/profile' },
   'Tarjetas':{ label: 'Ver Tarjetas', href: '/dashboard/cards' },
}

export const LINK_BUTTON_ACTIVITY = {
   'Actividad':{ label: 'Actividad', href: '/dashboard/activity' }
}
import routes from './routes'
export const MENUS = [
    {
        name: 'Người dùng',
        icon: 'bi bi-people-fill h4',
        route: routes.private.users
    },
    {
        name: 'Post',
        icon: 'bi bi-table',
        route: routes.private.dashboard
    },
]
import routes from './routes'
export const MENUS = [
    {
        id: 1,
        name: 'Người dùng',
        icon: 'bi bi-people-fill h4',
        route: routes.private.users
    },
    {
        id: 2,
        name: 'Bài học',
        icon: 'bi bi-book h4',
        route: routes.private.dashboard
    },
]
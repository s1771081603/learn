const test = () => import(/* webpackChunkName: "test" */ '@/views/test/test.vue');
export default [
    {
        path: '/test',
        name: 'test',
        component: test,
        meta: {
            title: ''
        }
    },
]
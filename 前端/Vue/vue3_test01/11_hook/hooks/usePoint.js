import { onBeforeUnmount, onMounted, reactive } from 'vue';
export default function (params) {
    let point = reactive({
        x: 0,
        y: 0
    })

    function savePoint(e) {
        point.x = e.pageX
        point.y = e.pageY
    }
    onMounted(()=>{
        window.addEventListener('click',savePoint)
    })
    onBeforeUnmount(()=>{
        window.removeEventListener('click',savePoint)
    })
    return point
}
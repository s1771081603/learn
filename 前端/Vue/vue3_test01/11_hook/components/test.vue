<template>
    <h1>我是test组件</h1>
</template>
<script>
import usePoint from '../hooks/usePoint'
export default {
	name: 'Test',
  setup(){
		let point = usePoint()

    return{
			point
    }
  },
}
</script>
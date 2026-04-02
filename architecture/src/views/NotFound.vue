<script lang="ts" setup>
    import { useRouter } from "vue-router"
    import { ArrowLeftOutlined } from "@ant-design/icons-vue"

    const router = useRouter()

    /**
     * 返回首页
     */
    const handleGoHome = () => {
        router.push("/")
    }

    /**
     * 返回上一页
     */
    const handleGoBack = () => {
        router.back()
    }
</script>

<template>
    <div class="flex items-center justify-baseline flex-col h-full">
        <div class="text-9xl font-bold mb-8 mt-10!">404</div>

        <!-- 错误信息 -->
        <h1 class="text-3xl font-bold text-gray-800 mb-6!">页面未找到</h1>

        <p class="text-gray-600 text-lg mb-4!">抱歉，您访问的页面不存在或已被移除</p>

        <a-card class="w-80 text-sm text-gray-700! mb-4!">
            <div class="mb-3">可能的原因：</div>
            <div class="flex items-center mb-1">
                <span class="text-red-500 mr-2">•</span>
                <span>网址输入错误</span>
            </div>
            <div class="flex items-center mb-1">
                <span class="text-red-500 mr-2">•</span>
                <span>页面已被删除或移动</span>
            </div>
            <div class="flex items-center mb-1">
                <span class="text-red-500 mr-2">•</span>
                <span>链接已过期</span>
            </div>
        </a-card>

        <div class="button">
            <a-button size="large" @click="handleGoBack">
                <div class="flex items-center justify-center">
                    <ArrowLeftOutlined class="mr-2" />
                    返回上一页
                </div>
            </a-button>
            <a-button class="ml-4!" size="large" type="primary" @click="handleGoHome">返回首页</a-button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

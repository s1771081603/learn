<script lang="ts" setup>
    import { ref } from "vue"

    const count = ref(0)
</script>

<template>
    <div class="container">
        首页
        <div class="mt-4 flex items-center">
            <div class="mr-4">{{ count }}</div>
            <a-button type="primary" @click="count++">按钮</a-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .home-container {
        animation: fadeIn 0.3s ease;
    }

    .card {
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    }

    .feature {
        .icon {
            flex-shrink: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

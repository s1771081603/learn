import { defineStore } from "pinia"
import { ref } from "vue"

export const fullScreenStore = defineStore("fullScreen", () => {
    // 全屏状态
    const isFullscreen = ref(false)

    /**
     * 进入全屏
     */
    const enterFullscreen = async () => {
        try {
            const element = document.documentElement as HTMLElement & {
                msRequestFullscreen?: () => Promise<void>
                mozRequestFullScreen?: () => Promise<void>
                webkitRequestFullscreen?: () => Promise<void>
            }

            if (element.requestFullscreen) {
                await element.requestFullscreen()
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen()
            } else if (element.mozRequestFullScreen) {
                await element.mozRequestFullScreen()
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen()
            }
            isFullscreen.value = true
        } catch (error) {
            console.error("进入全屏失败:", error)
            isFullscreen.value = false
        }
    }

    /**
     * 退出全屏
     */
    const exitFullscreen = async () => {
        try {
            const documentElement = document as Document & {
                msExitFullscreen?: () => Promise<void>
                mozCancelFullScreen?: () => Promise<void>
                webkitExitFullscreen?: () => Promise<void>
            }

            if (documentElement.exitFullscreen) {
                await documentElement.exitFullscreen()
            } else if (documentElement.msExitFullscreen) {
                await documentElement.msExitFullscreen()
            } else if (documentElement.mozCancelFullScreen) {
                await documentElement.mozCancelFullScreen()
            } else if (documentElement.webkitExitFullscreen) {
                await documentElement.webkitExitFullscreen()
            }
            isFullscreen.value = false
        } catch (error) {
            console.error("退出全屏失败:", error)
        }
    }

    /**
     * 切换全屏状态
     */
    const toggleFullscreen = async () => {
        if (isFullscreen.value) {
            await exitFullscreen()
        } else {
            await enterFullscreen()
        }
    }

    /**
     * 监听全屏状态变化
     */
    const setupFullscreenListener = () => {
        const handleFullscreenChange = () => {
            isFullscreen.value = !!(
                document.fullscreenElement ||
                (
                    document as Document & {
                        msFullscreenElement?: Element
                        mozFullScreenElement?: Element
                        webkitFullscreenElement?: Element
                    }
                ).msFullscreenElement ||
                (
                    document as Document & {
                        msFullscreenElement?: Element
                        mozFullScreenElement?: Element
                        webkitFullscreenElement?: Element
                    }
                ).mozFullScreenElement ||
                (
                    document as Document & {
                        msFullscreenElement?: Element
                        mozFullScreenElement?: Element
                        webkitFullscreenElement?: Element
                    }
                ).webkitFullscreenElement
            )
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        document.addEventListener("msfullscreenchange", handleFullscreenChange)
        document.addEventListener("mozfullscreenchange", handleFullscreenChange)
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange)

        // 清理监听器
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
            document.removeEventListener("msfullscreenchange", handleFullscreenChange)
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
        }
    }

    // 初始化监听器
    setupFullscreenListener()

    return {
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen
    }
})

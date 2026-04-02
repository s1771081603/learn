import { defineStore } from "pinia"
import { reactive, toRefs } from "vue"
import Avatar from "@/static/images/Avatar.jpg"

export interface UserInfo {
    userId: string
    userName: string
    email: string
    phone: string
    avatar: string
    roles: string[]
    permissions: string[]
    token: string
}

interface UserInfoState {
    userInfo: UserInfo
}

export const userInfoStore = defineStore("userInfo", () => {
    // 初始化状态
    const state = reactive<UserInfoState>({
        userInfo: {
            userId: "1",
            userName: "宋利生",
            email: "1771081603@qq.com",
            phone: "13477622913",
            avatar: Avatar,
            roles: ["admin"],
            permissions: ["all"],
            token: "token"
        }
    })

    /**
     * 设置用户信息
     * @param info 用户信息对象
     */
    const setUserInfo = (info: UserInfo) => {
        Object.assign(state.userInfo, info)
    }

    /**
     * 获取用户信息
     * @returns 用户信息对象
     */
    const getUserInfo = (): UserInfo => {
        return state.userInfo
    }

    /**
     * 清空用户信息
     */
    const clearUserInfo = () => {
        Object.assign(state.userInfo, {
            userId: "",
            userName: "",
            email: "",
            phone: "",
            avatar: "",
            roles: [],
            permissions: [],
            token: ""
        })
    }

    /**
     * 更新 Token
     * @param token 新的 token
     */
    const updateToken = (token: string) => {
        state.userInfo.token = token
    }

    return {
        ...toRefs(state),
        setUserInfo,
        getUserInfo,
        clearUserInfo,
        updateToken
    }
})

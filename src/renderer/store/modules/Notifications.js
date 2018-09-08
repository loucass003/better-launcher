const store = {
    notification: {
        display: false,
        message: null,
        timeout: 1500,
        type: 'info'
    }
}

const mutations = {
    SET_MESSAGE (store, { message , timeout, type }) {
        store.notification.message = message;
        store.notification.timeout = timeout;
        store.notification.type = type
    },
    DISPLAY (store, display) {
        store.notification.display = display;
    }
} 

const actions = {
    sendNotification({ commit }, { message, timeout = 3000, type = "info" }) {
        commit('SET_MESSAGE', { message, timeout, type });
        commit('DISPLAY', true);
    }
}

const getters = {
    notification: ({ notification }) => {
        return notification;
    }
}

export {
    store,
    mutations,
    actions,
    getters
}
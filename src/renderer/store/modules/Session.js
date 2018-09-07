import { authenticate as auth, invalidate, refresh, isValid } from 'mojang'
import { db } from '../index'
import fs from 'fs';
import { SKINS } from '../../utils'
import path from 'path'

const beforeLoad = (db) => {
    console.log("Before Load")
    db.defaults(state).write()
    
    state.users = db.get('users').value();
    state.selected = db.get('selected').value();

    
    /*  if (!await isValid(selected))
    {
       const nextSession = await refresh(selected)
    } */
    console.log("Before Load Done")
}

const afterLoad = (store) => {
    console.log("After Load")
    const selected = store.getters['session/selected'];
    if (selected)
    {
        isValid(selected)
            .then((data) => {
                console.log('isValid', data)
                refresh(selected)
                    .then(({ accessToken }) => store.commit('session/REFRESH_TOKEN', { accessToken, selected: selected.userId }))
                    .catch(err => console.error('refresh error', err));
            })
            .catch(err => console.error('isValid error', err))
    }
    console.log("After Load Done")
}

const state = {
    users: [],
    selected: null,
}

const mutations = {
    ADD_USER ({ users }, user) {
        users.push(user)
        db.set('users', users).write();
    },
    REFRESH_TOKEN ({ users }, { selected, accessToken }) {
        const user = users.find(({ userId }) => userId == selected);
        user.accessToken = accessToken;
        db.set('users', users).write();
        console.log('new token', accessToken)
    },
    DEL_USER ({ users }, id) {
        const user = users.findIndex(
            ({ userId }) => userId == id
        );

        if (user !== -1) {
            const skin_path = path.join(SKINS, `${users[user].uuid}`)
            users.splice(user, 1)
            db.set('users', users).write();
            
            console.log(skin_path)
            if (fs.existsSync(skin_path)) {
                fs.unlinkSync(skin_path);
            }
        }
    },
    SET_SELECTED_USER (state, id) {
        state.selected = id;
        db.set('selected', id).write();
    }
}

const actions = {
    authenticate({ commit }, { username, password }) {
        return auth(
            { username, password, agent: { name: "Minecraft", version: 1} } 
        ).then(({ accessToken, clientToken, selectedProfile: { id: uuid, userId, name }, user: { email, username }}) => {
            const user = { userId, name, username, email, uuid, accessToken, clientToken }
            commit('ADD_USER', user);
            commit('SET_SELECTED_USER', user.userId)
            return user;
        })
    },
    logout({ commit, state: { users } }, user) {
        const { accessToken, clientToken } = user;
        return invalidate({ accessToken, clientToken })
            .then(() => {
                commit('DEL_USER', user.userId);
                commit('SET_SELECTED_USER', users.length > 0 ? users[users.length - 1].userId : null)
            })
    },
    async refreshUser({ commit, state: { users }}, user) {
        if (await !isValid(user))
            return false
        /*isValid(user)
            .then((data) => data && refresh(user)
                .then(({ accessToken }) => {
                    commit('REFRESH_TOKEN', { accessToken, selected: selected.userId })
                    return user;
                })
                .catch(err => console.error('refresh error', err))
            )
            .catch(err => console.error('isValid error', err))*/
    },
    selectUser({ commit, state: { users } }, id) {
        const user = users.find(
            ({ userId }) => userId == id
        );
        if (user) {
            commit('SET_SELECTED_USER', user.userId)
            return user;
        }
    }
}

const getters = {
    selected: ({ users, selected = null }) => {
        return users.find(({ userId }) => userId == selected)
    },
    users: ({ users }) => {
        return users;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    beforeLoad,
    afterLoad
}